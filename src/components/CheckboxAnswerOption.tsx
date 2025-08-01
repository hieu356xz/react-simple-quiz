import Question, { AnswerOption } from "../data/Question";
import { useDispatch, useSelector } from "react-redux";
import { addUserAnswer, removeUserAnswer } from "../redux/UserAnswerSlice";
import { RootState } from "../redux/store";
import { memo, useEffect, useMemo, useState } from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { HTMLPaserImageOptions } from "../utils";
import Checkbox from "@mui/material/Checkbox";

interface ICheckboxQuestionOptionItemProps {
  answerOption: AnswerOption;
  question: Question;
  answerOptionBullet: string;
  index: number;
  selectedValue: boolean[];
  setSelectedValue: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const CheckboxAnswerOption = memo(
  ({
    answerOption,
    question,
    answerOptionBullet,
    index,
    selectedValue,
    setSelectedValue,
  }: ICheckboxQuestionOptionItemProps) => {
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
    const [startShowAnswerOnChosen, setStartShowAnswerOnChosen] =
      useState(false);
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

      if (!userAnswers || userAnswers.length == 0) {
        if (question.correct_answer.includes(answerOptionId)) {
          setAnswerOptionStatus(" unanswer");
        }
        return;
      }

      if (userAnswers && userAnswers.includes(answerOptionId)) {
        if (!question.correct_answer.includes(answerOptionId)) {
          setAnswerOptionStatus(" incorrect");
        }
      }

      if (question.correct_answer.includes(answerOptionId)) {
        setAnswerOptionStatus(" correct");
      }
    }, [isTestFininshed]);

    useEffect(() => {
      if (!showAnwserOnChosen) return;

      setAnswerOptionStatus("");

      if (!userAnswers || userAnswers.length == 0) return;
      setStartShowAnswerOnChosen((prev) =>
        prev ? prev : userAnswers.length >= question.correct_answer.length
      );
      if (!startShowAnswerOnChosen) return;

      const answerOptionId = Number.parseInt(answerOption.id);

      if (userAnswers && userAnswers.includes(answerOptionId)) {
        if (!question.correct_answer.includes(answerOptionId)) {
          setAnswerOptionStatus(" incorrect");
        }
      }

      if (question.correct_answer.includes(answerOptionId)) {
        setAnswerOptionStatus(" correct");
      }
    }, [showAnwserOnChosen, startShowAnswerOnChosen, userAnswers]);

    const onInputChangeHandler = () => {
      if (isTestFininshed) return;

      if (selectedValue[index]) {
        dispatch(
          removeUserAnswer({ id: question.id, answer: answerOption.id })
        );
      } else {
        dispatch(addUserAnswer({ id: question.id, answer: answerOption.id }));
      }

      setSelectedValue(
        selectedValue.map((value, i) => {
          return i == index ? !value : value;
        })
      );
    };

    return (
      <div className={`CheckboxAnswerOption${answerOptionStatus}`}>
        <span className="AnswerOptionBullet">{answerOptionBullet}</span>
        <label>
          <Checkbox
            name={`question_${question.id}_${index}`}
            checked={selectedValue[index]}
            onChange={onInputChangeHandler}
            sx={{
              color: "var(--secondary-text-color)",
              padding: "8px",
              margin: "-8px",
            }}></Checkbox>
          <span className="AnswerOptionText">{answerOptionText}</span>
        </label>
      </div>
    );
  }
);

CheckboxAnswerOption.displayName = "CheckboxAnswerOption";
export default CheckboxAnswerOption;
