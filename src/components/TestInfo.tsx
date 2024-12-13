import { FiEdit } from "react-icons/fi";
import { SidebarOpenContext } from "../contexts/SidebarOpenProvider";
import { useContext } from "react";

const TestInfo = () => {
  const { isSidebarOpen } = useContext(SidebarOpenContext);

  return (
    <div className={`TestInfo ${isSidebarOpen ? "shrink" : ""}`}>
      <table>
        <tbody>
          <tr className="TestInfoTableName">
            <th colSpan={2}>Test</th>
          </tr>
          <tr className="TestInfoTableRow">
            <th>Học phần</th>
            <td>TEST12414</td>
          </tr>
          <tr className="TestInfoTableRow">
            <th>Số lượng câu hỏi</th>
            <td>12313</td>
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
    </div>
  );
};

export default TestInfo;
