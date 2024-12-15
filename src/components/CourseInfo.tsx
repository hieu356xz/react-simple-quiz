import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import QueryDb from "../data/QueryDb";
import Semester from "../data/Semester";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const CourseInfo = () => {
  const isSidebarOpen = useSelector(
    (state: RootState) => state.sidebarOpen.sidebarOpen
  );
  const currSubject = useSelector(
    (state: RootState) => state.currSubject.subject
  );
  const currCourse = useSelector((state: RootState) => state.currCourse.course);
  const [semester, setSemester] = useState<Semester | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await QueryDb(
        `select *
        from Semesters
        where ID = ${currSubject?.SemesterID}`
      );

      setSemester(JSON.parse(data)[0]);
    };

    currSubject && fetchData();
  }, [currSubject]);

  return (
    <div className={`CourseInfo ${isSidebarOpen ? "shrink" : ""}`}>
      {!currCourse ? (
        <span>Hãy chọn một bài để bắt đầu</span>
      ) : (
        <table>
          <tbody>
            <tr className="CourseInfoTableName">
              <th colSpan={2}>{currCourse?.Name}</th>
            </tr>
            <tr className="CourseInfoTableRow">
              <th>Học phần</th>
              <td>{currSubject?.Name}</td>
            </tr>
            <tr className="CourseInfoTableRow">
              <th>Học kì</th>
              <td>{semester?.Name}</td>
            </tr>
            <tr className="CourseInfoTableRow">
              <th>Số lượng câu hỏi</th>
              <td>{currCourse?.Questions.length}</td>
            </tr>
            <tr className="CourseInfoTableRow">
              <th colSpan={2}>
                <button className="BtnDoTest">
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
