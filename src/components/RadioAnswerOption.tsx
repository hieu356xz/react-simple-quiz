import { ChangeEvent } from "react";
import { AnswerOption } from "../data/Question";
import { useDispatch } from "react-redux";
import {
  addUserAnswer,
  removeAllUserAnswerById,
} from "../redux/UserAnswerSlice";

interface IRadioQuestionOptionItemProps {
  answerOption: AnswerOption;
  questionID: number;
  answerOptionBullet: string;
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
}

const RadioQuestionOption = ({
  answerOption,
  questionID,
  answerOptionBullet,
  selectedValue,
  setSelectedValue,
}: IRadioQuestionOptionItemProps) => {
  const dispatch = useDispatch();

  const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);
    dispatch(removeAllUserAnswerById(questionID));
    dispatch(addUserAnswer({ id: questionID, answer: answerOption.id }));
  };

  return (
    <div className="RadioAnswerOption">
      <span className="AnswerOptionBullet">{answerOptionBullet}</span>
      <label>
        <input
          type="radio"
          name={`question_${questionID}`}
          checked={selectedValue === answerOption.id}
          value={answerOption.id}
          onChange={onInputChangeHandler}
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
