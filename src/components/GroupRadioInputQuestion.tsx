import Question from "../data/Question";
import { useMemo, useState } from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { HTMLPaserImageOptions } from "../utils";
import GroupRadioAnswerOption from "./GroupRadioAnswerOption";

interface IGroupRadioInputQuestionProps {
  question: Question;
  index: number;
}

const GroupRadioInputQuestion = ({
  question,
  index,
}: IGroupRadioInputQuestionProps) => {
  const [selectedValue, setSelectedValue] = useState("-1");

  const parsedQuestionDirection = useMemo(() => {
    const cleanHTML = DOMPurify.sanitize(question.question_direction, {
      USE_PROFILES: { html: true },
    });
    return parse(cleanHTML, HTMLPaserImageOptions);
  }, [question.question_direction]);

  return (
    <div className={`GroupRadioInputQuestion`}>
      <label
        htmlFor={`input-question-${question.id}`}
        className="GroupRadioInputTextDirection">
        {`${index}) ${parsedQuestionDirection}`}
      </label>
      <div className="GroupRadioInputContainer">
        {question.answer_option.map((answerOption) => (
          <GroupRadioAnswerOption
            key={answerOption.id}
            answerOption={answerOption}
            question={question}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupRadioInputQuestion;
