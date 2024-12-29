import { ChangeEvent, useEffect, useState } from "react";
import Question, { AnswerOption } from "../data/Question";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserAnswer,
  removeAllUserAnswerById,
} from "../redux/UserAnswerSlice";
import { RootState } from "../redux/store";

interface IRadioQuestionOptionItemProps {
  answerOption: AnswerOption;
  question: Question;
  answerOptionBullet: string;
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
}

const RadioQuestionOption = ({
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
        <input
          type="radio"
          name={`question_${question.id}`}
          checked={selectedValue === answerOption.id}
          value={answerOption.id}
          onChange={onInputChangeHandler}
          hidden={isTestFininshed}
        ></input>
        <span
          className="AnswerOptionText"
          dangerouslySetInnerHTML={{ __html: answerOption.value }}
        ></span>
      </label>
    </div>
  );
};

export default RadioQuestionOption;
