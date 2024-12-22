import { AnswerOption } from "../data/Question";

interface IRadioQuestionOptionItemProps {
  answerOption: AnswerOption;
  questionID: number;
  answerOptionBullet: string;
}

const RadioQuestionOption = ({
  answerOption,
  questionID,
  answerOptionBullet,
}: IRadioQuestionOptionItemProps) => {
  return (
    <div className="RadioAnswerOption">
      <span className="AnswerOptionBullet">{answerOptionBullet}</span>
      <label>
        <input
          type="radio"
          name={`question_${questionID}`}
          onChange={() => {}}
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
