import { useEffect, useState } from "react";
import QueryDb from "../data/QueryDb";
import Question from "../data/Question";
import QuestionContainer from "./QuestionContainer";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const TestContainer = () => {
  //Test
  const [questions, setQuestions] = useState<Question[]>([]);
  const currCourse = useSelector((state: RootState) => state.currCourse.course);

  useEffect(() => {
    const fetchData = async () => {
      const data = await QueryDb(`
        select * from Question
        where id in (select json_each.value
                      from Course, json_each(questions)
                      where Course.id = ${currCourse?.id})`);
      const questionList: Question[] = JSON.parse(data).map(
        (question: Question) => new Question(question)
      );

      setQuestions(questionList);
    };

    fetchData();
  }, []);

  return (
    <div className="TestContainer">
      {questions.map((question, index) => {
        return (
          <QuestionContainer
            question={question}
            index={index}
            key={index}
          ></QuestionContainer>
        );
      })}
    </div>
  );
};

export default TestContainer;
