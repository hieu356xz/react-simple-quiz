import { ReactNode, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import QueryDb from "../data/QueryDb";
import Semester from "../data/Semester";
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
  const [questionWithAnswerCount, setQuestionWithAnswerCount] = useState({
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
      const data = await QueryDb(
        `select *
        from Semester
        where id = ${currSubject.subject?.semester_id}`
      );

      setSemester({ semester: JSON.parse(data)[0], loading: false });
    };

    currSubject.subject && fetchData();
  }, [currSubject.subject]);

  useEffect(() => {
    if (currCourse.course) {
      const defaultQuestionCount = currCourse.course.question_per_test;
      setLocalQuestionCount(defaultQuestionCount.toString());
      dispatch(setQuestionCount(defaultQuestionCount.toString()));
    }

    const getQuestionWithAnswerCount = async () => {
      if (!currCourse.course) return;
      // The first 3 lines in the condition is to check when correct answer is a json array
      // The last line is to check when correct answer is a number (0 or 1)
      const data = await QueryDb(`
        SELECT COUNT(DISTINCT Question.id) as count
        FROM Question
        WHERE id IN (${currCourse.course.questions.join(",")})
        AND (
          (json_valid(correct_answer)
          AND json_array_length(correct_answer) > 0
          AND EXISTS (SELECT 1 FROM json_each(correct_answer) WHERE json_each.value > 0))
          OR correct_answer != 0
        )
      `);
      const result = JSON.parse(data)[0].count;
      setQuestionWithAnswerCount({ value: result, loading: false });
    };

    getQuestionWithAnswerCount();
  }, [currCourse.course]);

  const handleQuestionCountChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setLocalQuestionCount(value);
    dispatch(setQuestionCount(value));
  };

  return (
    <div className={`CourseInfo ${isSidebarOpen ? "shrink" : ""}`}>
      {semester.loading ||
      currCourse.loading ||
      currSubject.loading ||
      questionWithAnswerCount.loading ? (
        <LoadingView />
      ) : !(currSubject.subject && currCourse.course) ? (
        <span>Hãy chọn một bài để bắt đầu</span>
      ) : (
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
              <td>{currCourse.course?.questions.length}</td>
            </tr>
            <tr className="CourseInfoTableRow">
              <th>Số lượng câu hỏi đã có đáp án</th>
              <td>{questionWithAnswerCount.value}</td>
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
      )}
    </div>
  );
};

export default CourseInfo;
