import {
  ComponentPropsWithoutRef,
  forwardRef,
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

const CheckboxQuestion = forwardRef<HTMLDivElement, ICheckboxQuestionItemProps>(
  ({ question, number, ...props }, ref) => {
    const [selectedValue, setSelectedValue] = useState<boolean[]>([
      false,
      false,
      false,
      false,
    ]);

    const haveAnswer = useMemo(() => {
      return question.correct_answer.some(
        (x) => x > -1
      );
    }, [question.correct_answer]);

    const className = haveAnswer
      ? "CheckboxQuestion"
      : `CheckboxQuestion noAnswer`;

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
      <div className={className} {...props} ref={ref}>
        <QuestionDirection
          number={number}
          id={question.id}
          directionText={question.question_direction}
          haveAnswer={haveAnswer}></QuestionDirection>

        <div className="AnswerOptions">
          {question.answer_option.map(renderAnswerOption)}
        </div>
      </div>
    );
  }
);

CheckboxQuestion.displayName = "CheckboxQuestion";
export default memo(CheckboxQuestion);
