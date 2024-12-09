import { FiEdit } from "react-icons/fi";

const TestInfo = () => {
  return (
    <div className="TestInfo">
      <table>
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
      </table>
    </div>
  );
};

export default TestInfo;
