import {
  createRef,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import QueryDb from "../data/QueryDb";
import Question from "../data/Question";
import RadioQuestion from "./RadioQuestion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setTestQuestion } from "../redux/TestQuestionSlice";
import CheckboxQuestion from "./CheckboxQuestion";
import shuffle from "lodash/shuffle";
import LoadingView from "./LoadingView";
import QuestionScrollSpy from "./QuestionScrollSpy";

const TestContainer = () => {
  const testQuestions = useSelector(
    (state: RootState) => state.testQuestion.questions
  );
  const isTestFininshed = useSelector(
    (state: RootState) => state.testResult.isTestFininshed
  );
  const currCourse = useSelector((state: RootState) => state.currCourse.course);
  const { shuffleAnswer, questionCount } = useSelector(
    (state: RootState) => state.testConfig
  );
  const dispatch = useDispatch();

  // ScrollSpy
  const questionRefs = useRef<RefObject<HTMLDivElement>[]>([]);
  const NAVBAR_HEIGHT = 60;
  const [scrollSpyOffset, setScrollSpyOffset] = useState(-NAVBAR_HEIGHT);

  useEffect(() => {
    if (window.innerHeight !== 0) {
      setScrollSpyOffset(-NAVBAR_HEIGHT - window.innerHeight / 4);
    }
  }, [window.innerHeight]);

  useMemo(() => {
    if (questionRefs.current.length === testQuestions.length) return;
    questionRefs.current = Array(testQuestions.length)
      .fill(null)
      .map((_, i) => questionRefs.current[i] || createRef<HTMLDivElement>());
  }, [testQuestions.length]);

  // Get test questions
  useEffect(() => {
    if (isTestFininshed) return;

    dispatch(setTestQuestion([]));
    const fetchData = async () => {
      const data = await QueryDb(`
        select * from Question
        where id in (select json_each.value
                      from Course, json_each(questions)
                      where Course.id = ${currCourse?.id})`);

      const questionList: Question[] = JSON.parse(data).map(
        (question: Question) => {
          return new Question(question);
        }
      );

      const shuffledQuestions = handleShuffleQuestion(questionList);
      hanldeShuffleAnswer(shuffledQuestions);
      dispatch(setTestQuestion(shuffledQuestions));
    };

    fetchData();
  }, [isTestFininshed]);

  const hanldeShuffleAnswer = (questions: Question[]) => {
    questions.forEach((question) => {
      if (shuffleAnswer && question.shuffleable) {
        question.answer_option = shuffle(question.answer_option);
      }
    });
  };

  const handleShuffleQuestion = (questions: Question[]) => {
    const shuffledQuestions = shuffle(questions);
    shuffledQuestions.sort((a, b) => a.cdr - b.cdr);
    if (
      questionCount === "all" ||
      Number.isNaN(Number.parseInt(questionCount))
    ) {
      return shuffledQuestions;
    } else {
      return shuffledQuestions.slice(0, Number.parseInt(questionCount));
    }
  };

  if (!testQuestions || testQuestions.length == 0 || !questionRefs.current) {
    return (
      <div className="TestContainer">
        <LoadingView />
      </div>
    );
  }

  return (
    <QuestionScrollSpy
      as="div"
      className="TestContainer"
      sectionRefs={questionRefs.current}
      offset={scrollSpyOffset}>
      {testQuestions.map((question, index) => {
        return question.question_type === "radio" ? (
          <RadioQuestion
            ref={questionRefs.current[index]}
            question={question}
            id={`questionNumber_${index + 1}`}
            number={index + 1}
            key={question.id}></RadioQuestion>
        ) : (
          <CheckboxQuestion
            ref={questionRefs.current[index]}
            question={question}
            id={`questionNumber_${index + 1}`}
            number={index + 1}
            key={question.id}></CheckboxQuestion>
        );
      })}
    </QuestionScrollSpy>
  );
};

export default TestContainer;
