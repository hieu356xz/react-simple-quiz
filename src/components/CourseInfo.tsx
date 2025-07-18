import { ReactNode, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { QueryDb } from "../data/SQLDatabase";
import Semester from "../data/Semester";
import Question from "../data/Question";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toggleActiveTest } from "../redux/ActiveTestSlice";
import LoadingView from "./LoadingView";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import {
  setQuestionCount,
  toggleShowAnswerOnChosen,
  toggleShowQuestionByPage,
  toggleShuffleAnswer,
} from "../redux/TestConfigSlice";
import { questionFilter } from "../utils";

const BootstrapInput = styled(OutlinedInput)(() => ({
  "& .MuiInputBase-input": {
    borderRadius: 4,
    fontSize: 14,
    paddingTop: 10,
    paddingBottom: 10,
    color: "var(--primary-text-color)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--blue-color-2)",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    height: "100%",
    border: "2px solid var(--secondary-text-color)",
  },
  "& .MuiSvgIcon-root": {
    color: "var(--secondary-text-color)",
  },
}));

const CourseInfo = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const isSidebarOpen = useSelector(
    (state: RootState) => state.sidebarOpen.sidebarOpen
  );
  const currSubject = useSelector((state: RootState) => state.currSubject);
  const currCourse = useSelector((state: RootState) => state.currCourse);
  const { shuffleAnswer, showAnswerOnChosen, showQuestionByPage } = useSelector(
    (state: RootState) => state.testConfig
  );
  const [semester, setSemester] = useState({
    semester: null as Semester | null,
    loading: false,
  });
  const [questionCountOptions, setQuestionCountOptions] = useState<ReactNode[]>(
    []
  );
  // State từ redux không đồng bồ với state cục bộ (?) nên cần tạo state cục bộ
  const [localQuestionCount, setLocalQuestionCount] = useState("");
  const [questionsHavingAnswerCount, setQuestionsHavingAnswerCount] = useState({
    value: 0,
    loading: false,
  });
  const [totalQuestionCount, setTotalQuestionCount] = useState({
    value: 0,
    loading: false,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const createQuestionCountOptions = () => {
      if (!currCourse.course) return;

      const presets = [10, 15, 20, 30, 40, 50, 60, 80, 100, 150];
      const MenuItemList: ReactNode[] = [];
      const defaultValue = currCourse.course.question_per_test;

      // Add default value if not in preset
      if (!presets.includes(defaultValue)) {
        presets.push(defaultValue);
        presets.sort();
      }

      presets.forEach((value) => {
        if (
          !currCourse.course ||
          value >= currCourse.course?.questions.length
        ) {
          return;
        }

        MenuItemList.push(
          <MenuItem value={value} key={value} sx={{ fontSize: 14 }}>
            {value}
          </MenuItem>
        );
      });

      // Add all option at the end
      MenuItemList.push(
        <MenuItem value="all" sx={{ fontSize: 14 }} key={"all"}>
          Tất cả
        </MenuItem>
      );

      setQuestionCountOptions(MenuItemList);
    };

    createQuestionCountOptions();
  }, [currCourse.course]);

  useEffect(() => {
    const fetchData = async () => {
      setSemester({ ...semester, loading: true });
      const data = await QueryDb<Semester>(
        `select *
        from Semester
        where id = ${currSubject.subject?.semester_id}`
      );

      setSemester({ semester: new Semester(data[0]), loading: false });
    };

    currSubject.subject && fetchData();
  }, [currSubject.subject]);

  useEffect(() => {
    if (currCourse.course) {
      const defaultQuestionCount = currCourse.course.question_per_test;
      setLocalQuestionCount(defaultQuestionCount.toString());
      dispatch(setQuestionCount(defaultQuestionCount.toString()));
    }

    const getQuestions = async () => {
      if (!currCourse.course) return;
      const data = await QueryDb<Question>(`
        SELECT *
        FROM Question
        WHERE id IN (${currCourse.course.questions.join(",")})
      `);
      const questions: Question[] = data.map(
        (question: Question) => new Question(question)
      );

      const { filteredQuestions, groupedQuestions } = questionFilter(questions);
      const totalQuestionCount = filteredQuestions.length;

      // Count total questions having answers
      let questionsHavingAnswerCount = filteredQuestions.filter(
        (question) =>
          !question.correct_answer.some((x) => x < 0) &&
          (question.question_type === "radio" ||
            question.question_type === "checkbox")
      ).length;

      for (const key in groupedQuestions) {
        if (groupedQuestions.hasOwnProperty(key)) {
          let haveAnswer = true;
          groupedQuestions[key].forEach((question) => {
            if (question.question_type !== "group-input") {
              if (question.correct_answer.some((x) => x < 0)) {
                haveAnswer = false;
              }
            } else {
              if (!question.input_correct_answer) {
                haveAnswer = false;
              }
            }
          });
          if (haveAnswer) {
            questionsHavingAnswerCount++;
          }
        }
      }

      setQuestionsHavingAnswerCount({
        value: questionsHavingAnswerCount,
        loading: false,
      });
      setTotalQuestionCount({ value: totalQuestionCount, loading: false });
    };

    getQuestions();
  }, [currCourse.course]);

  const handleQuestionCountChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setLocalQuestionCount(value);
    dispatch(setQuestionCount(value));
  };

  if (
    semester.loading ||
    currCourse.loading ||
    currSubject.loading ||
    questionsHavingAnswerCount.loading ||
    totalQuestionCount.loading
  ) {
    return (
      <div className={`CourseInfo ${isSidebarOpen ? "shrink" : ""}`}>
        <LoadingView />
      </div>
    );
  }

  if (!currSubject.subject || !currCourse.course) {
    return (
      <div className={`CourseInfo ${isSidebarOpen ? "shrink" : ""}`}>
        <span>Hãy chọn một bài để bắt đầu</span>
      </div>
    );
  }

  return (
    <div className={`CourseInfo ${isSidebarOpen ? "shrink" : ""}`}>
      <div className="CourseInfoTable">
        <table>
          <tbody>
            <tr className="CourseInfoTableHeader">
              <th colSpan={2}>{currCourse.course?.name}</th>
            </tr>
            <tr className="CourseInfoTableRow">
              <th>Học phần</th>
              <td>{currSubject.subject?.name}</td>
            </tr>
            <tr className="CourseInfoTableRow">
              <th>Học kì</th>
              <td>{semester.semester?.name}</td>
            </tr>
            <tr className="CourseInfoTableRow">
              <th>Số lượng câu hỏi hiện có</th>
              <td>{totalQuestionCount.value}</td>
            </tr>
            <tr className="CourseInfoTableRow">
              <th>Số lượng câu hỏi đã có đáp án</th>
              <td>{questionsHavingAnswerCount.value}</td>
            </tr>
            <tr className="CourseInfoTableHeader">
              <th colSpan={2}>Tùy chỉnh</th>
            </tr>
            <tr className="CourseInfoTableRow">
              <th>Đảo đáp án</th>
              <td>
                <Checkbox
                  sx={{
                    padding: "4px",
                    margin: "-4px",
                    color: "var(--secondary-text-color)",
                  }}
                  checked={shuffleAnswer}
                  onClick={() => dispatch(toggleShuffleAnswer())}
                  inputProps={{ "aria-label": "controlled" }}></Checkbox>
              </td>
            </tr>
            <tr className="CourseInfoTableRow">
              <th>Hiện đáp án ngay sau khi chọn</th>
              <td>
                <Checkbox
                  sx={{
                    padding: "4px",
                    margin: "-4px",
                    color: "var(--secondary-text-color)",
                  }}
                  checked={showAnswerOnChosen}
                  onClick={() => dispatch(toggleShowAnswerOnChosen())}
                  inputProps={{ "aria-label": "controlled" }}></Checkbox>
              </td>
            </tr>
            <tr className="CourseInfoTableRow">
              <th>Hiện từng câu hỏi theo trang</th>
              <td>
                <Checkbox
                  sx={{
                    padding: "4px",
                    margin: "-4px",
                    color: "var(--secondary-text-color)",
                  }}
                  checked={showQuestionByPage}
                  onClick={() => dispatch(toggleShowQuestionByPage())}
                  inputProps={{ "aria-label": "controlled" }}></Checkbox>
              </td>
            </tr>
            <tr className="CourseInfoTableRow">
              <th>Số lượng câu hỏi</th>
              <td>
                <FormControl sx={{ m: 0, minWidth: 120 }} size="small">
                  <Select
                    value={localQuestionCount}
                    onChange={handleQuestionCountChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    input={<BootstrapInput />}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          backgroundColor: "var(--background-color)",
                          fontSize: 14,
                          color: "var(--primary-text-color)",
                        },
                        "data-theme": theme,
                      },
                    }}>
                    {questionCountOptions}
                  </Select>
                </FormControl>
              </td>
            </tr>
            <tr className="CourseInfoTableRow">
              <th colSpan={2}>
                <button
                  className="BtnDoTest"
                  onClick={() => dispatch(toggleActiveTest())}>
                  <FiEdit
                    className="icon"
                    stroke="#e0e0e0"
                    strokeWidth={3}
                    size={"15px"}
                    style={{ backgroundColor: "#00000000" }}
                  />
                  Làm bài
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseInfo;
export { BootstrapInput };
