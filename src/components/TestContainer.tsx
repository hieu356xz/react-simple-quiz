import { useEffect } from "react";
import QueryDb from "../data/QueryDb";
import Question from "../data/Question";
import RadioQuestion from "./RadioQuestion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setTestQuestion } from "../redux/TestQuestionSlice";
import CheckboxQuestion from "./CheckboxQuestion";
import _ from "lodash";
import LoadingView from "./LoadingView";

const TestContainer = () => {
  const testQuestions = useSelector(
    (state: RootState) => state.testQuestion.questions
  );
  const isTestFininshed = useSelector(
    (state: RootState) => state.testResult.isTestFininshed
  );
  const currCourse = useSelector((state: RootState) => state.currCourse.course);
  const { shuffleAnswer } = useSelector((state: RootState) => state.testConfig);
  const dispatch = useDispatch();

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
          const newQuestion = new Question(question);
          if (shuffleAnswer && newQuestion.shuffleable) {
            newQuestion.answer_option = _.shuffle(newQuestion.answer_option);
          }

          return newQuestion;
        }
      );

      dispatch(setTestQuestion(questionList));
    };

    fetchData();
  }, [isTestFininshed]);

  return (
    <div className="TestContainer">
      {!testQuestions || testQuestions.length == 0 ? (
        <LoadingView />
      ) : (
        testQuestions.map((question, index) => {
          if (question.question_type === "radio") {
            return (
              <RadioQuestion
                question={question}
                index={index}
                key={index}
              ></RadioQuestion>
            );
          } else {
            return (
              <CheckboxQuestion
                question={question}
                index={index}
                key={index}
              ></CheckboxQuestion>
            );
          }
        })
      )}
    </div>
  );
};

export default TestContainer;
