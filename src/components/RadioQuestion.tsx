import { memo, useCallback, useMemo, useState } from "react";
import Question, { AnswerOption } from "../data/Question";
import RadioAnswerOption from "./RadioAnswerOption";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import HTMLPaserImageOptions from "../utils";

interface IRadioQuestionItemProps {
  question: Question;
  index: number;
}

const RadioQuestion = memo(({ question, index }: IRadioQuestionItemProps) => {
  const answerOptionBullets = ["A", "B", "C", "D"];
  const [selectedValue, setSelectedValue] = useState("0");

  const className = useMemo(() => {
    return `RadioQuestion${
      question.correct_answer.includes(0) ? " noAnswer" : ""
    }`;
  }, [question.correct_answer]);
  const questionDirection = useMemo(() => {
    const cleanHTML = DOMPurify.sanitize(question.question_direction, {
      USE_PROFILES: { html: true },
    });

    return parse(cleanHTML, HTMLPaserImageOptions);
  }, [question.question_direction]);

  const renderRadioOption = useCallback(
    (answerOption: AnswerOption) => {
      return (
        <RadioAnswerOption
          answerOption={answerOption}
          question={question}
          answerOptionBullet={answerOptionBullets[index]}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          key={`${question.id}_${answerOption.id}`}
        ></RadioAnswerOption>
      );
    },
    [selectedValue]
  );

  return (
    <div className={className}>
      <div className="QuestionContainerDirection">
        <p className="QuestionContainerNumber">
          {`Câu ${index + 1}: (ID-${question.id})`}
        </p>
        <div>{questionDirection}</div>
      </div>
      <div className="AnswerOptions">
        {question.answer_option.map(renderRadioOption)}
      </div>
    </div>
  );
});

export default RadioQuestion;
