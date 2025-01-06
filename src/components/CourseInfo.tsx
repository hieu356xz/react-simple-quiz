import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import QueryDb from "../data/QueryDb";
import Semester from "../data/Semester";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toggleActiveTest } from "../redux/ActiveTestSlice";
import LoadingView from "./LoadingView";

const CourseInfo = () => {
  const isSidebarOpen = useSelector(
    (state: RootState) => state.sidebarOpen.sidebarOpen
  );
  const currSubject = useSelector((state: RootState) => state.currSubject);
  const currCourse = useSelector((state: RootState) => state.currCourse);
  const [semester, setSemester] = useState<Semester | null>(null);
  const dispatch = useDispatch();

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

  return (
    <div className={`CourseInfo ${isSidebarOpen ? "shrink" : ""}`}>
      {!semester || currCourse.loading || currSubject.loading ? (
        <LoadingView />
      ) : !(currSubject.subject && currCourse.course) ? (
        <span>Hãy chọn một bài để bắt đầu</span>
      ) : (
        <table>
          <tbody>
            <tr className="CourseInfoTableName">
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
              <th>Số lượng câu hỏi</th>
              <td>{currCourse.course?.questions.length}</td>
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
