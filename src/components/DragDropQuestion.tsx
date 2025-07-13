import {
  ComponentPropsWithoutRef,
  forwardRef,
  memo,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import Question, { AnswerOption } from "../data/Question";
import DragDropAnswerOption from "./DragDropAnswerOption";
import DragDropInputQuestion from "./DragDropInputQuestion";
import QuestionDirection from "./QuestionDirection";

interface IDragDropQuestionItemProps extends ComponentPropsWithoutRef<"div"> {
  dragQuestion: Question;
  inputQuestions: Question[];
  number: number;
}

const DragDropQuestion = forwardRef<HTMLDivElement, IDragDropQuestionItemProps>(
  ({ dragQuestion, inputQuestions, number, ...props }, ref) => {
    const [seletedAnswerMap, setSelectedAnswerMap] = useState<
      Record<number, number[]>
    >({
      [dragQuestion.id]: dragQuestion.answer_option.map((option) =>
        Number(option.id)
      ),
    });

    const isMultipleChoice = dragQuestion.question_type === "grouping";

    const haveAnswer = useMemo(() => {
      let result = true;
      inputQuestions.forEach((question) => {
        if (!question.correct_answer.some((x) => x > 0)) {
          result = false;
        }
      });

      return result;
    }, [inputQuestions]);

    const className = haveAnswer
      ? "DragDropQuestion"
      : `DragDropQuestion noAnswer`;

    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over || !active.data.current) return;

      const answerOptionId = Number(active.data.current.answerOptionId);
      const newInputContainer = over.id as number;

      setSelectedAnswerMap((prev) => {
        const newMap = { ...prev };

        if (!newMap[newInputContainer]) {
          newMap[newInputContainer] = [];
        }

        let oldInputContainer = -1;
        for (const key in newMap) {
          if (
            newMap.hasOwnProperty(key) &&
            newMap[key].includes(answerOptionId)
          ) {
            oldInputContainer = Number(key);
            break;
          }
        }

        if (oldInputContainer !== -1) {
          if (
            !isMultipleChoice &&
            newInputContainer !== dragQuestion.id &&
            newMap[newInputContainer] &&
            newMap[newInputContainer].length >= 1
          ) {
            // Replace the existing answer option if is not multiple choice
            const oldAnswerOptionId = newMap[newInputContainer][0];
            newMap[newInputContainer] = [answerOptionId];
            newMap[oldInputContainer] = newMap[oldInputContainer].filter(
              (id) => id !== answerOptionId
            );
            newMap[oldInputContainer] = [
              ...newMap[oldInputContainer],
              oldAnswerOptionId,
            ];
          } else {
            newMap[oldInputContainer] = newMap[oldInputContainer].filter(
              (id) => id !== answerOptionId
            );
            newMap[newInputContainer] = [
              ...newMap[newInputContainer],
              answerOptionId,
            ];
          }
        }

        return newMap;
      });
    };

    const renderDragDropOption = useCallback(
      (answerOption: AnswerOption) => {
        return (
          <DragDropAnswerOption
            answerOption={answerOption}
            question={dragQuestion}
            key={`${dragQuestion.id}_${answerOption.id}`}></DragDropAnswerOption>
        );
      },
      [dragQuestion]
    );

    return (
      <div className={className} {...props} ref={ref}>
        <DndContext
          onDragEnd={handleDragEnd}
          modifiers={[restrictToWindowEdges]}>
          <QuestionDirection
            number={number}
            id={dragQuestion.id}
            directionText={dragQuestion.question_direction}
            haveAnswer={haveAnswer}>
            <DragDropAnswerOptions id={dragQuestion.id}>
              {dragQuestion.answer_option
                .filter((option) =>
                  seletedAnswerMap[dragQuestion.id].includes(Number(option.id))
                )
                .map(renderDragDropOption)}
            </DragDropAnswerOptions>
          </QuestionDirection>

          <div className="DragDropInputQuestions">
            {inputQuestions.map((inputQuestion) => (
              <DragDropInputQuestion
                question={inputQuestion}
                selectedAnswerMap={seletedAnswerMap}
                selectedAnswers={seletedAnswerMap[inputQuestion.id] || []}
                variant={isMultipleChoice ? "card" : "row"}
                key={inputQuestion.id}>
                {seletedAnswerMap[inputQuestion.id] &&
                  dragQuestion.answer_option
                    .filter((option) =>
                      seletedAnswerMap[inputQuestion.id].includes(
                        Number(option.id)
                      )
                    )
                    .map(renderDragDropOption)}
              </DragDropInputQuestion>
            ))}
          </div>
        </DndContext>
      </div>
    );
  }
);

interface IDragDropAnswerOptionsProps {
  children: ReactNode[];
  id: number;
}

const DragDropAnswerOptions = ({
  children,
  id,
}: IDragDropAnswerOptionsProps) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div className="DragDropAnswerOptions" ref={setNodeRef}>
      {children}
    </div>
  );
};

DragDropQuestion.displayName = "DragDropQuestion";
export default memo(DragDropQuestion);
