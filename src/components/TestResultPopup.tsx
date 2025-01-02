import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";

interface ITestResultPopupProps {
  hidePopup: boolean;
  setHidePopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const TestResultPopup = ({
  hidePopup,
  setHidePopup,
}: ITestResultPopupProps) => {
  const { score, isTestFininshed, correctAnswers } = useSelector(
    (state: RootState) => state.testResult
  );
  const testQuestions = useSelector(
    (state: RootState) => state.testQuestion.questions
  );

  const [testResultBoxClassName, setTestResultBoxClassName] = useState("");

  useEffect(() => {
    isTestFininshed && setHidePopup(false);

    if (score < 5) {
      setTestResultBoxClassName("lowScore");
    } else if (score < 8) {
      setTestResultBoxClassName("mediumScore");
    }
  }, [isTestFininshed]);

  return (
    <div className={`TestResultPopup ${hidePopup ? "hide" : ""}`}>
      {!hidePopup && (
        <div className={`TestResultBox ${testResultBoxClassName}`}>
          <h1>Kết quả</h1>
          <p>Điểm của bạn: {score}</p>
          <p>
            Số câu trả lời đúng: {correctAnswers.length}/{testQuestions.length}
          </p>
          <button onClick={() => setHidePopup(true)}>Đóng</button>
        </div>
      )}
    </div>
  );
};

export default TestResultPopup;
