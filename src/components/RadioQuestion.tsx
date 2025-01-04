import { useState } from "react";
import Question from "../data/Question";
import RadioAnswerOption from "./RadioAnswerOption";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import HTMLPaserImageOptions from "../utils";

interface IRadioQuestionItemProps {
  question: Question;
  index: number;
}

const RadioQuestion = ({ question, index }: IRadioQuestionItemProps) => {
  const answerOptionBullets = ["A", "B", "C", "D"];
  const [selectedValue, setSelectedValue] = useState("0");

  const cleanHTML = DOMPurify.sanitize(question.question_direction, {
    USE_PROFILES: { html: true },
  });

  return (
    <div className="RadioQuestion">
      <div className="QuestionContainerDirection">
        <p className="QuestionContainerNumber">
          {`Câu ${index + 1}: (ID-${question.id})`}
        </p>
        <div>{parse(cleanHTML, HTMLPaserImageOptions)}</div>
      </div>
      <div className="AnswerOptions">
        {question.answer_option.map((answerOption, index) => {
          return (
            <RadioAnswerOption
              answerOption={answerOption}
              question={question}
              answerOptionBullet={answerOptionBullets[index]}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
              key={index}
            ></RadioAnswerOption>
          );
        })}
      </div>
    </div>
  );
};

export default RadioQuestion;
