import Question, { AnswerOption } from "../data/Question";
import { memo, useMemo } from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { HTMLPaserImageOptions } from "../utils";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface IDragDropQuestionOptionItemProps {
  answerOption: AnswerOption;
  question: Question;
}

const DragDropAnswerOption = memo(
  ({ answerOption, question }: IDragDropQuestionOptionItemProps) => {
    const isTestFininshed = useSelector(
      (state: RootState) => state.testResult.isTestFininshed
    );

    const answerOptionText = useMemo(() => {
      const cleanHTML = DOMPurify.sanitize(answerOption.value, {
        USE_PROFILES: { html: true },
      });

      return parse(cleanHTML, HTMLPaserImageOptions);
    }, [answerOption.value]);

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: `answer-option-${question.id}-${answerOption.id}`,
      data: {
        answerOptionId: answerOption.id,
        questionId: question.id,
      },
      disabled: isTestFininshed,
    });

    const style = {
      transform: CSS.Translate.toString(transform),
      cursor: isTestFininshed ? "default" : "move",
      touchAction: "none",
    };

    return (
      <span
        id={`question_${question.id}_${answerOption.id}`}
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        className="DragDropAnswerOption">
        <span className="AnswerOptionText">{answerOptionText}</span>
      </span>
    );
  }
);

DragDropAnswerOption.displayName = "DragDropAnswerOption";
export default DragDropAnswerOption;
