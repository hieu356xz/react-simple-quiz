import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

interface ITestFooterProps {
  currentQuestionNumber: number;
  setCurrentQuestionNumber: React.Dispatch<React.SetStateAction<number>>;
}

const TestFooter = ({
  currentQuestionNumber,
  setCurrentQuestionNumber,
}: ITestFooterProps) => {
  const allQuestionCount = useSelector(
    (state: RootState) => state.testQuestion.questions.length
  );
  const questionCount = useSelector(
    (state: RootState) => state.testConfig.questionCount
  );

  const maxQuestionCount =
    questionCount !== "all" ? parseInt(questionCount) : allQuestionCount;

  const onNextQuestionBtnClick = () => {
    const nextQuestionNumber = Math.min(
      currentQuestionNumber + 1,
      maxQuestionCount
    );
    setCurrentQuestionNumber(nextQuestionNumber);
  };

  const onPreviousQuestionBtnClick = () => {
    const nextQuestionNumber = Math.max(currentQuestionNumber - 1, 1);
    setCurrentQuestionNumber(nextQuestionNumber);
  };

  return (
    <div className="Footer">
      <button
        className="PreviousQuestionBtn"
        onClick={onPreviousQuestionBtnClick}
        disabled={currentQuestionNumber <= 1}>
        <span className="PreviousQuestionBtnText">Câu hỏi trước đó</span>
        <span className="PreviousQuestionBtnIcon">
          <FaArrowLeft className="icon" />
        </span>
      </button>

      <button
        className="NextQuestionBtn"
        onClick={onNextQuestionBtnClick}
        disabled={currentQuestionNumber === maxQuestionCount}>
        <span className="NextQuestionBtnText">Câu hỏi tiếp theo</span>
        <span className="NextQuestionBtnIcon">
          <FaArrowRight className="icon" />
        </span>
      </button>
    </div>
  );
};

export default TestFooter;
