import {
  ComponentPropsWithoutRef,
  memo,
  useCallback,
  useMemo,
  useState,
} from "react";
import Question, { AnswerOption } from "../data/Question";
import RadioAnswerOption from "./RadioAnswerOption";
import QuestionDirection from "./QuestionDirection";

interface IRadioQuestionItemProps extends ComponentPropsWithoutRef<"div"> {
  question: Question;
  number: number;
}

const RadioQuestion = memo(
  ({ question, number, ...props }: IRadioQuestionItemProps) => {
    const [selectedValue, setSelectedValue] = useState("0");

    const haveAnswer = useMemo(() => {
      return question.correct_answer.some(
        (x) => x > 0 && x <= question.answer_option.length
      );
    }, [question.correct_answer]);

    const className = haveAnswer ? "RadioQuestion" : `RadioQuestion noAnswer`;

    const getAnswerOptionBullet = (index: number) => {
      // Giới hạn giá trị trong khoảng [65, 90] tức giá trị A - Z
      const charCode = Math.min(Math.max(65, index + 65), 90);
      return String.fromCharCode(charCode);
    };

    const renderRadioOption = useCallback(
      (answerOption: AnswerOption, index: number) => {
        return (
          <RadioAnswerOption
            answerOption={answerOption}
            question={question}
            answerOptionBullet={getAnswerOptionBullet(index)}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            key={`${question.id}_${answerOption.id}`}></RadioAnswerOption>
        );
      },
      [selectedValue]
    );

    return (
      <div className={className} {...props}>
        <QuestionDirection
          number={number}
          id={question.id}
          directionText={question.question_direction}
          haveAnswer={haveAnswer}></QuestionDirection>

        <div className="AnswerOptions">
          {question.answer_option.map(renderRadioOption)}
        </div>
      </div>
    );
  }
);

RadioQuestion.displayName = "RadioQuestion";
export default RadioQuestion;
