import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { FaArrowLeft, FaArrowRight, FaBars } from "react-icons/fa6";
import { useState, MouseEvent, useMemo } from "react";
import Popover from "@mui/material/Popover";
import Question from "../data/Question";
import QuestionNumberIndicator from "./QuestionNumberIndicator";
import { setCurrentQuestion } from "../redux/testNavigationSlice";

const TestFooter = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const userAnswers = useSelector(
    (state: RootState) => state.userAnswer.answers
  );
  const filteredQuestion = useSelector(
    (state: RootState) => state.testQuestion.filteredQuestions
  );
  const { correctAnswers, wrongAnswers } = useSelector(
    (state: RootState) => state.testResult
  );
  const { questionCount, showQuestionByPage } = useSelector(
    (state: RootState) => state.testConfig
  );
  const currentQuestionNumber = useSelector(
    (state: RootState) => state.testNavigation.currentQuestionNumber
  );

  const dispatch = useDispatch();

  const maxQuestionCount =
    questionCount !== "all" ? parseInt(questionCount) : filteredQuestion.length;
  // console.log(testQuestions);
  const questionNumbers = useMemo(
    () => [...Array(maxQuestionCount).keys()].map((v) => v + 1),
    [maxQuestionCount]
  );

  // MUI Menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleQuesionListMenuClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleQuesionListMenuClose = () => {
    setAnchorEl(null);
  };

  const getQuestionListMenuItemClassName = (questionNumber: number) => {
    let className = "QuestionListMenuItem";
    // console.log("Question data:", {
    //   type: typeof currentQuestion,
    //   isInstance: currentQuestion instanceof Question,
    //   properties: currentQuestion ? Object.keys(currentQuestion) : [],
    //   id: currentQuestion?.id,
    //   className: currentQuestion?.constructor?.name,
    //   questionType: currentQuestion?.question_type,
    // });
    try {
      const currentQuestion = filteredQuestion[questionNumber - 1];

      if (currentQuestion instanceof Question) {
        if (
          !userAnswers ||
          (userAnswers && !userAnswers[currentQuestion?.id])
        ) {
          className += " unanswer";
        } else {
          if (correctAnswers.includes(currentQuestion?.id))
            className += " correct";
          else if (wrongAnswers.includes(currentQuestion?.id))
            className += " incorrect";
        }
      }
    } catch {
      console.log(`Question number ${questionNumber} does not exists`);
    }

    if (questionNumber === currentQuestionNumber) className += " selected";
    return className;
  };

  const handleQuesionListMenuItemClick = (questionNumber: number) => {
    if (showQuestionByPage) {
      dispatch(setCurrentQuestion(questionNumber));
    } else {
      scrollToQuestionNumber(questionNumber);
    }

    handleQuesionListMenuClose();
  };

  const onNextQuestionBtnClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const nextQuestionNumber = Math.min(
      currentQuestionNumber + 1,
      maxQuestionCount
    );
    /**
     * Stop focus the button just right before is disabled
     * to fix scrollTo() from stop working when button is disabled
     * https://github.com/facebook/react/issues/20770#issuecomment-2085547545
     */
    if (currentQuestionNumber >= maxQuestionCount - 1)
      event.currentTarget.blur();

    if (showQuestionByPage) {
      dispatch(setCurrentQuestion(nextQuestionNumber));
    } else {
      scrollToQuestionNumber(nextQuestionNumber);
    }
  };

  const onPreviousQuestionBtnClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    /**
     * Stop focus the button just right before is disabled
     * to fix scrollTo() from stop working when button is disabled
     * https://github.com/facebook/react/issues/20770#issuecomment-2085547545
     */
    if (currentQuestionNumber <= 2) event.currentTarget.blur();

    const prevQuestionNumber = Math.max(currentQuestionNumber - 1, 1);
    if (showQuestionByPage) {
      dispatch(setCurrentQuestion(prevQuestionNumber));
    } else {
      scrollToQuestionNumber(prevQuestionNumber);
    }
  };

  if (!filteredQuestion || filteredQuestion.length == 0) {
    return <div className="Footer"></div>;
  }

  return (
    <div className="Footer">
      <button
        id="QuestionListShowBtn"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleQuesionListMenuClick}>
        <FaBars className="icon" size={16}></FaBars>
      </button>
      <Popover
        // id="QuestionListMenu"
        // MenuListProps={{ "aria-labelledby": "QuestionListShowBtn" }}
        anchorOrigin={{ vertical: "top", horizontal: -10 }}
        transformOrigin={{ vertical: "bottom", horizontal: "left" }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleQuesionListMenuClose}
        disableRestoreFocus={false}
        closeAfterTransition={true}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "var(--background-color)",
              color: "var(--primary-text-color)",
              transform: "translateY(-10px) !important",
            },
          },
        }}
        data-theme={theme}>
        <div className="QuestionListMenuContent">
          {questionNumbers.map((item) => (
            <button
              className={getQuestionListMenuItemClassName(item)}
              key={item}
              onClick={() => handleQuesionListMenuItemClick(item)}>
              {item}
            </button>
          ))}
        </div>
      </Popover>

      <button
        className="PreviousQuestionBtn"
        onClick={onPreviousQuestionBtnClick}
        disabled={currentQuestionNumber <= 1}>
        <span className="PreviousQuestionBtnText">Câu hỏi trước đó</span>
        <span className="PreviousQuestionBtnIcon">
          <FaArrowLeft className="icon" />
        </span>
      </button>

      <QuestionNumberIndicator
        currentIndex={currentQuestionNumber}
        questionNumbers={questionNumbers}
      />

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

const scrollToQuestionNumber = (questionNumber: number, offset: number = 0) => {
  const questionNode = document.getElementById(
    `questionNumber_${questionNumber}`
  );
  if (!questionNode) return;

  const NAVBAR_HEIGHT = 60;
  const OFFSET_FROM_TOP = 20;

  const height =
    questionNode.offsetTop - NAVBAR_HEIGHT - OFFSET_FROM_TOP - offset;

  window.scroll({
    top: height,
    behavior: "smooth",
  });
};

export default TestFooter;
