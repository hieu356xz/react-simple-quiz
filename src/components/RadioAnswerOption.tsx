import { ChangeEvent, memo, useEffect, useMemo, useState } from "react";
import Question, { AnswerOption } from "../data/Question";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserAnswer,
  removeAllUserAnswerById,
} from "../redux/UserAnswerSlice";
import { RootState } from "../redux/store";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import HTMLPaserImageOptions from "../utils";
import Radio from "@mui/material/Radio";

interface IRadioQuestionOptionItemProps {
  answerOption: AnswerOption;
  question: Question;
  answerOptionBullet: string;
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
}

const RadioAnswerOption = memo(
  ({
    answerOption,
    question,
    answerOptionBullet,
    selectedValue,
    setSelectedValue,
  }: IRadioQuestionOptionItemProps) => {
    const [answerOptionStatus, setAnswerOptionStatus] = useState("");
    const isTestFininshed = useSelector(
      (state: RootState) => state.testResult.isTestFininshed
    );
    const userAnswers = useSelector(
      (state: RootState) => state.userAnswer.answers
    );
    const dispatch = useDispatch();

    const answerOptionText = useMemo(() => {
      const cleanHTML = DOMPurify.sanitize(answerOption.value, {
        USE_PROFILES: { html: true },
      });

      return parse(cleanHTML, HTMLPaserImageOptions);
    }, [answerOption.value]);

    useEffect(() => {
      if (!isTestFininshed) return;

      const answerOptionId = Number.parseInt(answerOption.id);

      if (
        !userAnswers[question.id] ||
        (userAnswers[question.id] && userAnswers[question.id].length == 0)
      ) {
        if (question.correct_answer.includes(answerOptionId)) {
          setAnswerOptionStatus(" unanswer");
        }
        return;
      }

      if (userAnswers[question.id].includes(answerOptionId)) {
        if (!question.correct_answer.includes(answerOptionId)) {
          setAnswerOptionStatus(" incorrect");
        }
      }

      if (question.correct_answer.includes(answerOptionId)) {
        setAnswerOptionStatus(" correct");
      }
    }, [isTestFininshed]);

    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      if (isTestFininshed) return;

      setSelectedValue(e.target.value);
      dispatch(removeAllUserAnswerById(question.id));
      dispatch(addUserAnswer({ id: question.id, answer: answerOption.id }));
    };

    return (
      <div className={`RadioAnswerOption ${answerOptionStatus}`}>
        <span className="AnswerOptionBullet">{answerOptionBullet}</span>
        <label>
          <Radio
            name={`question_${question.id}`}
            checked={selectedValue === answerOption.id}
            value={answerOption.id}
            onChange={onInputChangeHandler}
            sx={{
              color: "var(--secondary-text-color)",
              padding: "8px",
              margin: "-8px",
            }}
          ></Radio>
          <span className="AnswerOptionText">{answerOptionText}</span>
        </label>
      </div>
    );
  }
);

export default RadioAnswerOption;
