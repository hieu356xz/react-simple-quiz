import { AnswerOption } from "../data/Question";
import { useDispatch } from "react-redux";
import { addUserAnswer, removeUserAnswer } from "../redux/UserAnswerSlice";

interface ICheckboxQuestionOptionItemProps {
  answerOption: AnswerOption;
  questionID: number;
  answerOptionBullet: string;
  index: number;
  selectedValue: boolean[];
  setSelectedValue: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const CheckboxQuestionOption = ({
  answerOption,
  questionID,
  answerOptionBullet,
  index,
  selectedValue,
  setSelectedValue,
}: ICheckboxQuestionOptionItemProps) => {
  const dispatch = useDispatch();

  const onInputChangeHandler = () => {
    if (selectedValue[index]) {
      dispatch(removeUserAnswer({ id: questionID, answer: answerOption.id }));
    } else {
      dispatch(addUserAnswer({ id: questionID, answer: answerOption.id }));
    }

    setSelectedValue(
      selectedValue.map((value, i) => {
        return i == index ? !value : value;
      })
    );
  };

  return (
    <div className="CheckboxAnswerOption">
      <span className="AnswerOptionBullet">{answerOptionBullet}</span>
      <label>
        <input
          type="checkbox"
          name={`question_${questionID}_${index}`}
          checked={selectedValue[index]}
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

export default CheckboxQuestionOption;
