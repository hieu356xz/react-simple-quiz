import Question from "../data/Question";
import RadioAnswerOption from "./RadioAnswerOption";

interface IQuestionContainerItemProps {
  question: Question;
  index: number;
}

const QuestionContainer = ({
  question,
  index,
}: IQuestionContainerItemProps) => {
  const answerOptionBullets = ["A", "B", "C", "D"];

  return (
    <div className="QuestionContainer">
      <div className="QuestionContainerDirection">
        <p className="QuestionContainerNumber">
          {`Câu ${index + 1}: (ID-${question.id})`}
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html: question.question_direction,
          }}
        ></div>
      </div>
      <div className="AnswerOptions">
        {question.question_type === "radio"
          ? question.answer_option.map((answerOption, index) => {
              return (
                <RadioAnswerOption
                  answerOption={answerOption}
                  questionID={question.id}
                  answerOptionBullet={answerOptionBullets[index]}
                  key={index}
                ></RadioAnswerOption>
              );
            })
          : question.answer_option.map((answerOption, index) => {
              return <>Checkbox Answer Option</>;
            })}
      </div>
    </div>
  );
};

export default QuestionContainer;
