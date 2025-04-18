import {
  ComponentPropsWithoutRef,
  memo,
  useCallback,
  useMemo,
  useState,
} from "react";
import Question, { AnswerOption } from "../data/Question";
import CheckboxAnswerOption from "./CheckboxAnswerOption";
import QuestionDirection from "./QuestionDirection";

interface ICheckboxQuestionItemProps extends ComponentPropsWithoutRef<"div"> {
  question: Question;
  number: number;
}

const CheckboxQuestion = memo(
  ({ question, number, ...props }: ICheckboxQuestionItemProps) => {
    const [selectedValue, setSelectedValue] = useState<boolean[]>([
      false,
      false,
      false,
      false,
    ]);

    const className = useMemo(() => {
      return `CheckboxQuestion${
        question.correct_answer.includes(0) ? " noAnswer" : ""
      }`;
    }, [question.correct_answer]);

    const getAnswerOptionBullet = (index: number) => {
      // Giới hạn giá trị trong khoảng [65, 90] tức giá trị A - Z
      const charCode = Math.min(Math.max(65, index + 65), 90);
      return String.fromCharCode(charCode);
    };

    const renderAnswerOption = useCallback(
      (answerOption: AnswerOption, index: number) => {
        return (
          <CheckboxAnswerOption
            answerOption={answerOption}
            question={question}
            answerOptionBullet={getAnswerOptionBullet(index)}
            index={index}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            key={`${question.id}_${answerOption.id}`}></CheckboxAnswerOption>
        );
      },
      [selectedValue]
    );

    return (
      <div className={className} {...props}>
        <QuestionDirection
          number={number}
          id={question.id}
          directionText={question.question_direction}></QuestionDirection>

        <div className="AnswerOptions">
          {question.answer_option.map(renderAnswerOption)}
        </div>
      </div>
    );
  }
);

CheckboxQuestion.displayName = "CheckboxQuestion";
export default CheckboxQuestion;
