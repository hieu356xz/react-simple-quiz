import { useDispatch, useSelector } from "react-redux";
import NavbarItem from "./NavbarItem";
import store, { RootState } from "../redux/store";
import ToggleThemeButton from "./ToggleThemeButton";
import { toggleActiveTest } from "../redux/ActiveTestSlice";
import { FiEdit } from "react-icons/fi";
import { FaRedo } from "react-icons/fa";
import { TbArrowBackUp } from "react-icons/tb";
import { useMediaQuery } from "@react-hook/media-query";
import {
  addCorrectAnswer,
  addWrongAnswer,
  resetTestResut,
  setIsTestFinished,
  setScore,
} from "../redux/TestResultSlice";
import { resetUserAnwser } from "../redux/UserAnswerSlice";

interface ITestNavbarProps {
  setHidePopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const TestNavbar = ({ setHidePopup }: ITestNavbarProps) => {
  const currSubject = useSelector(
    (state: RootState) => state.currSubject.subject
  );
  const filteredQuestions = useSelector(
    (state: RootState) => state.testQuestion.filteredQuestions
  );
  const groupedQuestions = useSelector(
    (state: RootState) => state.testQuestion.groupedQuestions
  );
  const testResult = useSelector((state: RootState) => state.testResult);
  const dispatch = useDispatch();

  const screenMatches = useMediaQuery("screen and (max-width: 768px)");

  const onBackBtnClick = () => {
    if (!testResult.isTestFininshed) {
      const confirmation = window.confirm(
        "Bài kiểm tra chưa hoàn thành. Bạn có muốn chắc chắn muốn thoát không?"
      );
      if (!confirmation) {
        return;
      }
    }
    dispatch(toggleActiveTest());
    dispatch(resetTestResut());
    dispatch(resetUserAnwser());
  };

  const onRedoBtnClick = () => {
    dispatch(setIsTestFinished(false));
    dispatch(resetTestResut());
    dispatch(resetUserAnwser());
  };

  const compareAnswers = (
    userAnswer: number[] | string,
    correctAnswer: number[] | string
  ) => {
    if (Array.isArray(userAnswer) && Array.isArray(correctAnswer)) {
      // Create copies before sorting to avoid mutating read-only arrays
      const correctAnswerStringify = JSON.stringify([...correctAnswer].sort());
      const userAnswerStringify = JSON.stringify([...userAnswer].sort());

      return correctAnswerStringify === userAnswerStringify;
    } else if (
      typeof userAnswer === "string" &&
      typeof correctAnswer === "string"
    ) {
      return (
        userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
      );
    }
    return false; // Fallback for unexpected types
  };

  const onSubmitTest = () => {
    const state = store.getState();
    const userAnswers = state.userAnswer.answers;
    const inputUserAnswers = state.userAnswer.input_answers;
    let correctAnswersCount = 0;

    filteredQuestions.forEach((question) => {
      // Handle grouped questions
      if (groupedQuestions[question.id]) {
        let isCorrect = true;
        groupedQuestions[question.id].forEach((q) => {
          if (q.question_type !== "group-input") {
            // Handle other question types
            const cloneUserAnswer = userAnswers[q.id] || [];
            if (!compareAnswers(cloneUserAnswer, q.correct_answer)) {
              isCorrect = false;
            }
          } else {
            // Handle group-input question type
            const inputUserAnswer = inputUserAnswers[q.id] || null;
            if (!inputUserAnswer || !q.input_correct_answer) {
              isCorrect = false;
            } else {
              if (!compareAnswers(inputUserAnswer, q.input_correct_answer)) {
                isCorrect = false;
              }
            }
          }
        });

        if (isCorrect) {
          correctAnswersCount++;
          dispatch(addCorrectAnswer(question.id));
        } else {
          dispatch(addWrongAnswer(question.id));
        }
      } else {
        // Handle single questions
        let isCorrect = true;
        if (question.question_type !== "group-input") {
          const cloneUserAnswer = userAnswers[question.id] || [];
          if (!compareAnswers(cloneUserAnswer, question.correct_answer)) {
            isCorrect = false;
          }
        } else {
          const inputUserAnswer = inputUserAnswers[question.id] || null;
          if (!inputUserAnswer || !question.input_correct_answer) {
            isCorrect = false;
          } else {
            if (
              !compareAnswers(inputUserAnswer, question.input_correct_answer)
            ) {
              isCorrect = false;
            }
          }
        }

        if (isCorrect) {
          correctAnswersCount++;
          dispatch(addCorrectAnswer(question.id));
        } else {
          dispatch(addWrongAnswer(question.id));
        }
      }

      const score = parseFloat(
        ((correctAnswersCount / filteredQuestions.length) * 10).toFixed(2)
      );
      dispatch(setScore(score));
    });

    dispatch(setIsTestFinished(true));
  };

  return (
    <nav className="Navbar">
      <NavbarItem>
        <button className="IconBtn" onClick={onBackBtnClick}>
          <TbArrowBackUp size={"24px"}></TbArrowBackUp>
        </button>
      </NavbarItem>
      <div className="TestNavbarContainer">
        {!screenMatches && (
          <NavbarItem>
            <span>{currSubject && currSubject?.name}</span>
          </NavbarItem>
        )}
        <div className="TestNavBarRightSide">
          {testResult.isTestFininshed ? (
            <>
              <NavbarItem>
                <button className="IconBtn" onClick={onRedoBtnClick}>
                  <FaRedo />
                </button>
              </NavbarItem>
              <NavbarItem>
                <button
                  className="ScoreBoxBtn"
                  onClick={() => setHidePopup((prev) => !prev)}>
                  <div>Điểm: {testResult.score}</div>
                  <div>
                    Kết quả: {testResult.correctAnswers.length}/
                    {filteredQuestions.length}
                  </div>
                </button>
              </NavbarItem>
            </>
          ) : (
            <NavbarItem>
              <button className="BtnSubmitTest" onClick={onSubmitTest}>
                <FiEdit
                  className="icon"
                  stroke="#e0e0e0"
                  strokeWidth={3}
                  size={"17px"}
                  style={{ backgroundColor: "#00000000" }}
                />
                Nộp bài
              </button>
            </NavbarItem>
          )}
        </div>
      </div>

      <NavbarItem>
        <ToggleThemeButton />
      </NavbarItem>
    </nav>
  );
};

export default TestNavbar;
