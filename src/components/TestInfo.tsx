import { FiEdit } from "react-icons/fi";
import { SidebarOpenContext } from "../contexts/SidebarOpenProvider";
import { CurrSubjectContext } from "../contexts/CurrSubjectProvider";
import { CurrTestContext } from "../contexts/CurrTestProvider";
import { useContext, useEffect, useState } from "react";
import QueryDb from "../data/QueryDb";
import Semester from "../data/Semester";

const TestInfo = () => {
  const { isSidebarOpen } = useContext(SidebarOpenContext);
  const { currTest } = useContext(CurrTestContext);
  const { currSubject } = useContext(CurrSubjectContext);
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
    <div className={`TestInfo ${isSidebarOpen ? "shrink" : ""}`}>
      {!currTest ? (
        <span>Hãy chọn một bài để bắt đầu</span>
      ) : (
        <table>
          <tbody>
            <tr className="TestInfoTableName">
              <th colSpan={2}>{currTest?.Name}</th>
            </tr>
            <tr className="TestInfoTableRow">
              <th>Học phần</th>
              <td>{currSubject?.Name}</td>
            </tr>
            <tr className="TestInfoTableRow">
              <th>Học kì</th>
              <td>{semester?.Name}</td>
            </tr>
            <tr className="TestInfoTableRow">
              <th>Số lượng câu hỏi</th>
              <td>{currTest?.Questions.length}</td>
            </tr>
            <tr className="TestInfoTableRow">
              <th colSpan={2}>
                <button className="BtnDoTest">
                  <FiEdit
                    className="icon"
                    stroke="#e0e0e0"
                    strokeWidth={3}
                    size={"15px"}
                    style={{ backgroundColor: "#00000000" }}
                  />
                  Test
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TestInfo;
