import { useDispatch, useSelector } from "react-redux";
import NavbarItem from "./NavbarItem";
import { RootState } from "../redux/store";
import ToggleThemeButton from "./ToggleThemeButton";
import { FiEdit } from "react-icons/fi";
import { useMediaQuery } from "@react-hook/media-query";
import {
  addCorrectAnswer,
  addWrongAnswer,
  setIsTestFinished,
} from "../redux/TestResultSlice";
import { useState } from "react";

const TestNavbar = () => {
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

  const [score, setScore] = useState("");

  const calculateScore = () => {
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
    });

    setScore(((correctAnswersCount / testQuestions.length) * 10).toFixed(2));
    dispatch(setIsTestFinished(true));
  };

  return (
    <nav className="Navbar">
      <div className="TestNavbarContainer">
        {!screenMatches && (
          <NavbarItem>
            <span>{currSubject && currSubject?.name}</span>
          </NavbarItem>
        )}
        {testResult.isTestFininshed ? (
          <NavbarItem className="ScoreBoxContainer">
            <button className="ScoreBoxBtn">
              <div>Điểm: {score}</div>
              <div>
                Kết quả: {testResult.correctAnswers.length}/
                {testQuestions.length}
              </div>
            </button>
          </NavbarItem>
        ) : (
          <NavbarItem className="BtnSubmitTestContainer">
            <button className="BtnSubmitTest" onClick={calculateScore}>
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

      <NavbarItem>
        <ToggleThemeButton />
      </NavbarItem>
    </nav>
  );
};

export default TestNavbar;
