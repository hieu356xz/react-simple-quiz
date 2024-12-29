import { ChangeEvent } from "react";
import { AnswerOption } from "../data/Question";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserAnswer,
  removeAllUserAnswerById,
} from "../redux/UserAnswerSlice";
import { RootState } from "../redux/store";

interface IRadioQuestionOptionItemProps {
  className?: string;
  answerOption: AnswerOption;
  questionID: number;
  answerOptionBullet: string;
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
}

const RadioQuestionOption = ({
  className = "",
  answerOption,
  questionID,
  answerOptionBullet,
  selectedValue,
  setSelectedValue,
}: IRadioQuestionOptionItemProps) => {
  const isTestFininshed = useSelector(
    (state: RootState) => state.testResult.isTestFininshed
  );
  const dispatch = useDispatch();

  const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (isTestFininshed) return;

    setSelectedValue(e.target.value);
    dispatch(removeAllUserAnswerById(questionID));
    dispatch(addUserAnswer({ id: questionID, answer: answerOption.id }));
  };

  return (
    <div className={`RadioAnswerOption ${className}`}>
      <span className="AnswerOptionBullet">{answerOptionBullet}</span>
      <label>
        <input
          type="radio"
          name={`question_${questionID}`}
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
