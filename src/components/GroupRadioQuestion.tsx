import { ComponentPropsWithoutRef, forwardRef, memo, useMemo } from "react";
import Question from "../data/Question";
import GroupRadioInputQuestion from "./GroupRadioInputQuestion";
import QuestionDirection from "./QuestionDirection";

interface IGroupRadioQuestionItemProps extends ComponentPropsWithoutRef<"div"> {
  topicQuestion: Question;
  inputQuestions: Question[];
  number: number;
}

const GroupRadioQuestion = forwardRef<
  HTMLDivElement,
  IGroupRadioQuestionItemProps
>(({ topicQuestion, inputQuestions, number, ...props }, ref) => {
  const haveAnswer = useMemo(() => {
    let result = true;
    inputQuestions.forEach((question) => {
      if (!question.correct_answer.some((x) => x > -1)) {
        result = false;
      }
    });

    return result;
  }, [inputQuestions]);

  const className = haveAnswer
    ? "GroupRadioQuestion"
    : `GroupRadioQuestion noAnswer`;

  return (
    <div className={className} {...props} ref={ref}>
      <QuestionDirection
        number={number}
        id={topicQuestion.id}
        directionText={topicQuestion.question_direction}
        haveAnswer={haveAnswer}></QuestionDirection>

      <div className="GroupRadioInputQuestions">
        {inputQuestions.map((inputQuestion, index) => (
          <GroupRadioInputQuestion
            question={inputQuestion}
            index={index + 1}
            key={inputQuestion.id}></GroupRadioInputQuestion>
        ))}
      </div>
    </div>
  );
});

GroupRadioQuestion.displayName = "GroupRadioQuestion";
export default memo(GroupRadioQuestion);
