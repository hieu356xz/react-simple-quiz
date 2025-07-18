import { useEffect, useState } from "react";
import SidebarGroupItem from "./SidebarGroupItem";
import { QueryDb } from "../data/SQLDatabase";
import Subject from "../data/Subject";
import Semester from "../data/Semester";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setCurrSemester } from "../redux/CurrSemesterSlice";
import LoadingView from "./LoadingView";
import { toggleSidebar } from "../redux/SidebarOpenSlice";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";

const BootstrapInput = styled(OutlinedInput)(() => ({
  "& .MuiInputBase-input": {
    borderRadius: 4,
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

const Sidebar = () => {
  const isSidebarOpen = useSelector(
    (state: RootState) => state.sidebarOpen.sidebarOpen
  );
  const currentSemester = useSelector(
    (state: RootState) => state.currSemester.semester
  );
  const [subjects, setSubjects] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjectsBySemester, setSubjectsBySemester] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const data = await QueryDb("select * from Subject");
      setSubjects(JSON.parse(data));

      const semesterData = await QueryDb("select * from Semester");
      setSemesters(JSON.parse(semesterData));
    };

    fetchData();
  }, []);

  useEffect(() => {
    const subjectsBySemester = currentSemester
      ? subjects.filter(
          (subject: Subject) => subject.semester_id === currentSemester.id
        )
      : subjects;
    setSubjectsBySemester(subjectsBySemester);
  }, [currentSemester, subjects]);

  const handleSemesterChange = (event: SelectChangeEvent<number>) => {
    const semesterId = Number(event.target.value);
    if (semesterId === -1) {
      dispatch(setCurrSemester(null));
    } else {
      const selectedSemester = semesters.find(
        (semester: Semester) => semester.id === semesterId
      );
      if (selectedSemester) dispatch(setCurrSemester(selectedSemester));
    }
  };

  return (
    <div className={`Sidebar ${isSidebarOpen ? "" : "hide"}`}>
      {!subjects || !semesters ? (
        <LoadingView />
      ) : (
        <>
          <Select
            name="semester"
            value={
              currentSemester && semesters.length > 0 ? currentSemester.id : -1
            }
            onChange={handleSemesterChange}
            input={<BootstrapInput />}
            MenuProps={{
              sx: {
                transform: "translateX(-8px)",
              },
            }}>
            <MenuItem value={-1}>Tất cả</MenuItem>
            {semesters.map((semester: Semester) => (
              <MenuItem key={semester.id} value={semester.id}>
                {semester.name}
              </MenuItem>
            ))}
          </Select>
          {!subjectsBySemester || subjectsBySemester.length === 0 ? (
            <div className="SidebarEmpty">
              <p>Không có môn học nào trong học kỳ này</p>
            </div>
          ) : (
            <ul>
              {subjectsBySemester.map((subject: Subject) => {
                return <SidebarGroupItem subject={subject} key={subject.id} />;
              })}
            </ul>
          )}
        </>
      )}
      <div
        className="SidebarOverlay"
        onClick={() => dispatch(toggleSidebar())}></div>
    </div>
  );
};

export default Sidebar;
