import { useDispatch, useSelector } from "react-redux";
import NavbarItem from "./NavbarItem";
import { RootState } from "../redux/store";
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

interface ITestNavbarProps {
  setHidePopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const TestNavbar = ({ setHidePopup }: ITestNavbarProps) => {
  const currSubject = useSelector(
    (state: RootState) => state.currSubject.subject
  );
  const testQuestions = useSelector(
    (state: RootState) => state.testQuestion.questions
  );
  const userAnswers = useSelector(
    (state: RootState) => state.userAnswer.answers
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
  };

  const onSubmitTest = () => {
    let correctAnswersCount = 0;

    testQuestions.forEach((question) => {
      const correctAnswerStringify = JSON.stringify(
        question.correct_answer.sort()
      );
      const userAnswerStringify = JSON.stringify(
        // Copy and sort array using spread operator because state is immutatable
        userAnswers[question.id] && [...userAnswers[question.id]].sort()
      );

      if (correctAnswerStringify === userAnswerStringify) {
        correctAnswersCount++;
        dispatch(addCorrectAnswer(question.id));
      } else {
        dispatch(addWrongAnswer(question.id));
      }

      const score = parseFloat(
        ((correctAnswersCount / testQuestions.length) * 10).toFixed(2)
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
                <button
                  className="IconBtn"
                  onClick={() => dispatch(setIsTestFinished(false))}
                >
                  <FaRedo />
                </button>
              </NavbarItem>
              <NavbarItem>
                <button
                  className="ScoreBoxBtn"
                  onClick={() => setHidePopup((prev) => !prev)}
                >
                  <div>Điểm: {testResult.score}</div>
                  <div>
                    Kết quả: {testResult.correctAnswers.length}/
                    {testQuestions.length}
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
