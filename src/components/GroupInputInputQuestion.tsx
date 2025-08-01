import Question from "../data/Question";
import { useDispatch, useSelector } from "react-redux";
import { setInputAnswer } from "../redux/UserAnswerSlice";
import { RootState } from "../redux/store";
import { useEffect, useMemo, useCallback, useState } from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { HTMLPaserImageOptions } from "../utils";
import { debounce } from "lodash";

interface IGroupInputInputQuestionProps {
  question: Question;
  index: number;
}

const GroupInputInputQuestion = ({
  question,
  index,
}: IGroupInputInputQuestionProps) => {
  const [answerOptionStatus, setAnswerOptionStatus] = useState("");
  const [inputValue, setInputValue] = useState<string>("");

  const isTestFininshed = useSelector(
    (state: RootState) => state.testResult.isTestFininshed
  );
  const userAnswers = useSelector(
    (state: RootState) => state.userAnswer.input_answers[question.id]
  );
  const showAnwserOnChosen = useSelector(
    (state: RootState) => state.testConfig.showAnswerOnChosen
  );
  const dispatch = useDispatch();

  const parsedQuestionDirection = useMemo(() => {
    const cleanHTML = DOMPurify.sanitize(question.question_direction, {
      USE_PROFILES: { html: true },
    });
    return parse(cleanHTML, HTMLPaserImageOptions);
  }, [question.question_direction]);

  useEffect(() => {
    if (!isTestFininshed) return;

    if (!userAnswers) {
      setAnswerOptionStatus(" unanswer");
      return;
    }

    if (
      question?.input_correct_answer?.toLowerCase() ===
      userAnswers.toLowerCase()
    ) {
      setAnswerOptionStatus(" correct");
    } else {
      setAnswerOptionStatus(" incorrect");
    }
  }, [isTestFininshed]);

  useEffect(() => {
    if (!showAnwserOnChosen) return;

    setAnswerOptionStatus("");

    if (!userAnswers) return;

    if (
      question?.input_correct_answer?.toLowerCase() ===
      userAnswers.toLowerCase()
    ) {
      setAnswerOptionStatus(" correct");
    } else {
      setAnswerOptionStatus(" incorrect");
    }
  }, [showAnwserOnChosen, userAnswers]);

  // Debounce longer for first input
  const debounceTimeout = userAnswers ? 350 : 1000;

  // Debounce to avoid too many dispatches when user types quickly
  const debouncedSetInputAnswer = useCallback(
    debounce((value: string) => {
      dispatch(setInputAnswer({ id: question.id, answer: value }));
    }, debounceTimeout),
    [dispatch, question.id, debounceTimeout]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isTestFininshed) return;

    const value = e.target.value;
    setInputValue(value);
    debouncedSetInputAnswer(value);
  };

  return (
    <div className={`GroupInputInputQuestion${answerOptionStatus}`}>
      <label
        htmlFor={`input-question-${question.id}`}
        className="GroupInputInputTextDirection">
        {`${index}) ${parsedQuestionDirection}`}
      </label>
      <span className="GroupInputInputContainer">
        <input
          type="text"
          id={`input-question-${question.id}`}
          value={inputValue}
          onInput={handleInputChange}
          spellCheck={false}
          style={{
            cursor: isTestFininshed ? "default" : "text",
          }}
        />
      </span>
      {question.input_correct_answer && (
        <span className="GroupInputInputCorrectAnswer">
          Đáp án đúng: {question.input_correct_answer}
        </span>
      )}
    </div>
  );
};

export default GroupInputInputQuestion;
