import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { FaArrowLeft, FaArrowRight, FaBars } from "react-icons/fa6";
import { useState, MouseEvent, useMemo } from "react";
import Popover from "@mui/material/Popover";

interface ITestFooterProps {
  currentQuestionNumber: number;
  setCurrentQuestionNumber: React.Dispatch<React.SetStateAction<number>>;
}

const TestFooter = ({
  currentQuestionNumber,
  setCurrentQuestionNumber,
}: ITestFooterProps) => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const allQuestionCount = useSelector(
    (state: RootState) => state.testQuestion.questions.length
  );
  const questionCount = useSelector(
    (state: RootState) => state.testConfig.questionCount
  );

  const maxQuestionCount =
    questionCount !== "all" ? parseInt(questionCount) : allQuestionCount;

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

  const handleQuesionListMenuItemClick = (questionNumber: number) => {
    setCurrentQuestionNumber(questionNumber);
    handleQuesionListMenuClose();
  };

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
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "bottom", horizontal: "right" }}
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
              className={`QuestionListMenuItem${
                currentQuestionNumber === item ? " selected" : ""
              }`}
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
