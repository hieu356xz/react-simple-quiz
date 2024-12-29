import { AnswerOption } from "../data/Question";
import { useDispatch, useSelector } from "react-redux";
import { addUserAnswer, removeUserAnswer } from "../redux/UserAnswerSlice";
import { RootState } from "../redux/store";

interface ICheckboxQuestionOptionItemProps {
  className?: string;
  answerOption: AnswerOption;
  questionID: number;
  answerOptionBullet: string;
  index: number;
  selectedValue: boolean[];
  setSelectedValue: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const CheckboxQuestionOption = ({
  className = "",
  answerOption,
  questionID,
  answerOptionBullet,
  index,
  selectedValue,
  setSelectedValue,
}: ICheckboxQuestionOptionItemProps) => {
  const isTestFininshed = useSelector(
    (state: RootState) => state.testResult.isTestFininshed
  );
  const dispatch = useDispatch();

  const onInputChangeHandler = () => {
    if (isTestFininshed) return;

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
    <div className={`CheckboxAnswerOption ${className}`}>
      <span className="AnswerOptionBullet">{answerOptionBullet}</span>
      <label>
        <input
          type="checkbox"
          name={`question_${questionID}_${index}`}
          checked={selectedValue[index]}
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

export default CheckboxQuestionOption;
