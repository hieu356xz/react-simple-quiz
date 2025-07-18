import {
  createRef,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { QueryDb } from "../data/SQLDatabase";
import Question from "../data/Question";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setTestQuestion } from "../redux/TestQuestionSlice";
import RadioQuestion from "./RadioQuestion";
import CheckboxQuestion from "./CheckboxQuestion";
import DragDropQuestion from "./DragDropQuestion";
import GroupInputQuestion from "./GroupInputQuestion";
import GroupRadioQuestion from "./GroupRadioQuestion";
import shuffle from "lodash/shuffle";
import LoadingView from "./LoadingView";
import QuestionScrollSpy from "./QuestionScrollSpy";

const TestContainer = () => {
  const filteredQuestions = useSelector(
    (state: RootState) => state.testQuestion.filteredQuestions
  );
  const groupedQuestions = useSelector(
    (state: RootState) => state.testQuestion.groupedQuestions
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
    if (questionRefs.current.length === filteredQuestions.length) return;
    questionRefs.current = Array(filteredQuestions.length)
      .fill(null)
      .map((_, i) => questionRefs.current[i] || createRef<HTMLDivElement>());
  }, [filteredQuestions.length]);

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

  if (
    !filteredQuestions ||
    filteredQuestions.length == 0 ||
    !questionRefs.current
  ) {
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
      {filteredQuestions.map((question, index) => {
        return question.question_type === "radio" ? (
          <RadioQuestion
            ref={questionRefs.current[index]}
            question={question}
            id={`questionNumber_${index + 1}`}
            number={index + 1}
            key={question.id}></RadioQuestion>
        ) : question.question_type === "drag_drop" ||
          question.question_type === "grouping" ? (
          <DragDropQuestion
            ref={questionRefs.current[index]}
            dragQuestion={question}
            inputQuestions={groupedQuestions[question.id] || []}
            id={`questionNumber_${index + 1}`}
            number={index + 1}
            key={question.id}></DragDropQuestion>
        ) : question.question_type === "group-input" ? (
          <GroupInputQuestion
            ref={questionRefs.current[index]}
            topicQuestion={question}
            inputQuestions={groupedQuestions[question.id] || []}
            id={`questionNumber_${index + 1}`}
            number={index + 1}
            key={question.id}></GroupInputQuestion>
        ) : question.question_type === "group-radio" ? (
          <GroupRadioQuestion
            ref={questionRefs.current[index]}
            topicQuestion={question}
            inputQuestions={groupedQuestions[question.id] || []}
            id={`questionNumber_${index + 1}`}
            number={index + 1}
            key={question.id}></GroupRadioQuestion>
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
