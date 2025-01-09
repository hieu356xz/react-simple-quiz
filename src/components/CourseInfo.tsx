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
  const shuffleAnswer = useSelector(
    (state: RootState) => state.testConfig.shuffleAnswer
  );
  const [semester, setSemester] = useState<Semester | null>(null);
  const [questionCountOptions, setQuestionCountOptions] = useState<ReactNode[]>(
    []
  );
  // State từ redux không đồng bồ với state cục bộ (?) nên cần tạo state cục bộ
  const [localQuestionCount, setLocalQuestionCount] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const createQuestionCountOptions = () => {
      const presets = [10, 15, 20, 30, 40, 50, 60, 100, 150];
      const MenuItemList: ReactNode[] = [];
      let isDefaultValueAdded = false;

      presets.forEach((value) => {
        if (
          currCourse.course &&
          value >= currCourse.course?.question_per_test
        ) {
          if (!isDefaultValueAdded) {
            const defaultValue = currCourse.course?.question_per_test;

            MenuItemList.push(
              <MenuItem
                value={defaultValue}
                sx={{ fontSize: 14 }}
                key={defaultValue}
              >
                {defaultValue}
              </MenuItem>
            );
            isDefaultValueAdded = true;
          }
          return;
        }

        MenuItemList.push(
          <MenuItem value={value} key={value} sx={{ fontSize: 14 }}>
            {value}
          </MenuItem>
        );
      });

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
      const data = await QueryDb(
        `select *
        from Semester
        where id = ${currSubject.subject?.semester_id}`
      );

      setSemester(JSON.parse(data)[0]);
    };

    currSubject.subject && fetchData();
  }, [currSubject.subject]);

  useEffect(() => {
    if (currCourse.course) {
      const defaultQuestionCount = currCourse.course.question_per_test;
      setLocalQuestionCount(defaultQuestionCount.toString());
      dispatch(setQuestionCount(defaultQuestionCount.toString()));
    }
  }, [currCourse.course]);

  const handleQuestionCountChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setLocalQuestionCount(value);
    dispatch(setQuestionCount(value));
  };

  return (
    <div className={`CourseInfo ${isSidebarOpen ? "shrink" : ""}`}>
      {!semester || currCourse.loading || currSubject.loading ? (
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
              <td>{semester?.name}</td>
            </tr>
            <tr className="CourseInfoTableRow">
              <th>Số lượng câu hỏi hiện có</th>
              <td>{currCourse.course?.questions.length}</td>
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
                  inputProps={{ "aria-label": "controlled" }}
                ></Checkbox>
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
                    }}
                  >
                    {questionCountOptions}
                  </Select>
                </FormControl>
              </td>
            </tr>
            <tr className="CourseInfoTableRow">
              <th colSpan={2}>
                <button
                  className="BtnDoTest"
                  onClick={() => dispatch(toggleActiveTest())}
                >
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
