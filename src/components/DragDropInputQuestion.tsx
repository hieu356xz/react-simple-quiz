import Question, { AnswerOption } from "../data/Question";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAnswer } from "../redux/UserAnswerSlice";
import { RootState } from "../redux/store";
import { useEffect, useMemo, useState } from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { HTMLPaserImageOptions } from "../utils";
import { useDroppable } from "@dnd-kit/core";

interface IDragDropInputQuestionProps {
  question: Question;
  answerOption: AnswerOption[];
  index?: number;
  selectedAnswers: number[];
  children?: React.ReactNode[];
}

const DragDropInputQuestion = ({
  question,
  answerOption,
  index,
  selectedAnswers,
  children,
}: IDragDropInputQuestionProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: question.id,
  });

  const [answerOptionStatus, setAnswerOptionStatus] = useState("");
  const isTestFininshed = useSelector(
    (state: RootState) => state.testResult.isTestFininshed
  );
  const userAnswers = useSelector(
    (state: RootState) => state.userAnswer.answers[question.id]
  );
  const showAnwserOnChosen = useSelector(
    (state: RootState) => state.testConfig.showAnswerOnChosen
  );
  const dispatch = useDispatch();

  const correctAnswerString = useMemo(() => {
    const filleredAnswer = answerOption.filter((x) =>
      question.correct_answer.includes(Number(x.id))
    );

    if (filleredAnswer.length > 1) {
      return filleredAnswer.map((x) => `[${x.value}]`).join(", ");
    } else {
      return filleredAnswer.map((x) => x.value).join(", ");
    }
  }, [answerOption, question.correct_answer]);

  const parsedQuestionDirection = useMemo(() => {
    const cleanHTML = DOMPurify.sanitize(question.question_direction, {
      USE_PROFILES: { html: true },
    });
    return parse(cleanHTML, HTMLPaserImageOptions);
  }, [question.question_direction]);

  useEffect(() => {
    if (!isTestFininshed) return;

    if (!userAnswers || userAnswers.length == 0) {
      if (question.correct_answer.length > 0) {
        setAnswerOptionStatus(" unanswer");
      }
      return;
    }

    const correctAnswerStringify = JSON.stringify(
      question.correct_answer.sort()
    );
    const userAnswerStringify = JSON.stringify(
      // Copy and sort array using spread operator because state is immutatable
      userAnswers && [...userAnswers].sort()
    );

    if (correctAnswerStringify === userAnswerStringify) {
      setAnswerOptionStatus(" correct");
    } else {
      setAnswerOptionStatus(" incorrect");
    }
  }, [isTestFininshed]);

  useEffect(() => {
    if (!showAnwserOnChosen) return;

    setAnswerOptionStatus("");

    if (!userAnswers || userAnswers.length == 0) return;

    const correctAnswerStringify = JSON.stringify(
      question.correct_answer.sort()
    );
    const userAnswerStringify = JSON.stringify(
      // Copy and sort array using spread operator because state is immutatable
      userAnswers && [...userAnswers].sort()
    );

    if (correctAnswerStringify === userAnswerStringify) {
      setAnswerOptionStatus(" correct");
    } else {
      setAnswerOptionStatus(" incorrect");
    }
  }, [showAnwserOnChosen, userAnswers]);

  useEffect(() => {
    if (isTestFininshed) return;

    // Skip initial render
    if (userAnswers === undefined && selectedAnswers.length === 0) return;

    dispatch(
      updateUserAnswer({
        id: question.id,
        answers: selectedAnswers,
      })
    );
  }, [selectedAnswers]);

  return (
    <div className={`DragDropInputQuestion${answerOptionStatus}`}>
      <div className="DragDropInputWrapper">
        <span className="DragDropInputTextDirection">
          {index
            ? `${index}) ${parsedQuestionDirection}`
            : parsedQuestionDirection}
        </span>
        <span className="DragDropInputContainer">
          <div className="DragDropInputDroppable" ref={setNodeRef}>
            {children}
          </div>
          <p
            className="DragDropInputMessage"
            style={isOver || children?.length ? { display: "none" } : {}}>
            Kéo và thẻ các đáp án vào đây
          </p>
        </span>
      </div>
      {correctAnswerString && (
        <span className="DragDropInputCorrectAnswer">
          Đáp án đúng: {correctAnswerString}
        </span>
      )}
    </div>
  );
};

export default DragDropInputQuestion;
