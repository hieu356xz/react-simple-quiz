import { ComponentPropsWithoutRef, forwardRef, memo, useMemo } from "react";
import Question from "../data/Question";
import GroupInputInputQuestion from "./GroupInputInputQuestion";
import QuestionDirection from "./QuestionDirection";

interface IGroupInputQuestionItemProps extends ComponentPropsWithoutRef<"div"> {
  topicQuestion: Question;
  inputQuestions: Question[];
  number: number;
}

const GroupInputQuestion = forwardRef<
  HTMLDivElement,
  IGroupInputQuestionItemProps
>(({ topicQuestion: dragQuestion, inputQuestions, number, ...props }, ref) => {
  const haveAnswer = useMemo(() => {
    return !inputQuestions.some((question) => {
      return question.input_correct_answer === null;
    });
  }, [inputQuestions]);

  const className = haveAnswer
    ? "GroupInputQuestion"
    : `GroupInputQuestion noAnswer`;

  return (
    <div className={className} {...props} ref={ref}>
      <QuestionDirection
        number={number}
        id={dragQuestion.id}
        directionText={dragQuestion.question_direction}
        haveAnswer={haveAnswer}></QuestionDirection>

      <div className="GroupInputInputQuestions">
        {inputQuestions.map((inputQuestion, index) => (
          <GroupInputInputQuestion
            question={inputQuestion}
            index={index + 1}
            key={inputQuestion.id}></GroupInputInputQuestion>
        ))}
      </div>
    </div>
  );
});

GroupInputQuestion.displayName = "GroupInputQuestion";
export default memo(GroupInputQuestion);
