import { useEffect } from "react";
import QueryDb from "../data/QueryDb";
import Question from "../data/Question";
import RadioQuestion from "./RadioQuestion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setTestQuestion } from "../redux/TestQuestionSlice";
import { setCurrentQuestion } from "../redux/testNavigationSlice";
import CheckboxQuestion from "./CheckboxQuestion";
import shuffle from "lodash/shuffle";
import LoadingView from "./LoadingView";

const TestContainerPaginated = () => {
  const testQuestions = useSelector(
    (state: RootState) => state.testQuestion.questions
  );
  const isTestFininshed = useSelector(
    (state: RootState) => state.testResult.isTestFininshed
  );
  const currCourse = useSelector((state: RootState) => state.currCourse.course);
  const currentQuestionNumber = useSelector(
    (state: RootState) => state.testNavigation.currentQuestionNumber
  );
  const { shuffleAnswer, questionCount } = useSelector(
    (state: RootState) => state.testConfig
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // Reset current question number on new test
    if (!isTestFininshed) dispatch(setCurrentQuestion(1));
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

  if (!testQuestions || testQuestions.length == 0) {
    return (
      <div className="TestContainer">
        <LoadingView />
      </div>
    );
  }

  return (
    <div className="TestContainer TestContainerPaginated">
      {testQuestions.map((question, index) => {
        return question.question_type === "radio" ? (
          <div
            className="RadioQuestionWrapper"
            style={
              currentQuestionNumber !== index + 1 ? { display: "none" } : {}
            }
            key={question.id}>
            <RadioQuestion
              question={question}
              number={index + 1}></RadioQuestion>
          </div>
        ) : (
          <div
            className="CheckboxQuestionWrapper"
            style={
              currentQuestionNumber !== index + 1 ? { display: "none" } : {}
            }
            key={question.id}>
            <CheckboxQuestion
              question={question}
              number={index + 1}></CheckboxQuestion>
          </div>
        );
      })}
    </div>
  );
};

export default TestContainerPaginated;
