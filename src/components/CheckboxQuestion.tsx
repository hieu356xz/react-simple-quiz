import { useState } from "react";
import Question from "../data/Question";
import CheckboxAnswerOption from "./CheckboxAnswerOption";

interface ICheckboxQuestionItemProps {
  question: Question;
  index: number;
}

const CheckboxQuestion = ({ question, index }: ICheckboxQuestionItemProps) => {
  const answerOptionBullets = ["A", "B", "C", "D"];
  const [selectedValue, setSelectedValue] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  return (
    <div className="CheckboxQuestion">
      <div className="QuestionContainerDirection">
        <p className="QuestionContainerNumber">
          {`Câu ${index + 1}: (ID-${question.id})`}
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html: question.question_direction,
          }}
        ></div>
      </div>
      <div className="AnswerOptions">
        {question.answer_option.map((answerOption, index) => {
          return (
            <CheckboxAnswerOption
              answerOption={answerOption}
              question={question}
              answerOptionBullet={answerOptionBullets[index]}
              index={index}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
              key={index}
            ></CheckboxAnswerOption>
          );
        })}
      </div>
    </div>
  );
};

export default CheckboxQuestion;
