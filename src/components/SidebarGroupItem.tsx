import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "@react-hook/media-query";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { CurrSubjectContext } from "../contexts/CurrSubjectProvider";
import { CurrTestContext } from "../contexts/CurrTestProvider";
import { SidebarOpenContext } from "../contexts/SidebarOpenProvider";
import Subject from "../data/Subject";
import Test from "../data/Test";
import QueryDb from "../data/QueryDb";
import SidebarItem from "./SidebarItem";

interface ISidebarGroupItemProps {
  subject: Subject;
}

const SidebarGroupItem = (props: ISidebarGroupItemProps) => {
  const { currSubject, setCurrSubject } = useContext(CurrSubjectContext);
  const { currTest, setCurrTest } = useContext(CurrTestContext);
  const { setIsSidebarOpen } = useContext(SidebarOpenContext);

  const [isItemSelected, setIsItemSelected] = useState(false);
  const [testList, setTestList] = useState<Test[]>([]);

  const screenMatches = useMediaQuery("screen and (max-width: 768px)");

  useEffect(() => {
    setIsItemSelected(currSubject?.ID == props.subject.ID);
  }, [currSubject]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await QueryDb(
        `select *
        from Tests
        where SubjectID = ${props.subject.ID}`
      );

      const testList: Test[] = JSON.parse(data).map(
        (test: Test) => new Test(test)
      );
      if (testList) {
        setTestList(testList);
      }
    };

    fetchData();
  }, []);

  const changeSubject = () => {
    if (currSubject != props.subject) setCurrTest(null);
    setCurrSubject(props.subject);
    // Tự động đóng sidebar trên màn hình nhỏ
    screenMatches && setIsSidebarOpen(false);
  };

  return (
    <li className={`SidebarGroupItem ${isItemSelected ? "selected" : ""}`}>
      <button onClick={changeSubject}>
        <div className="SidebarGroupItemContainer">
          <span>{props.subject.Name}</span>
          <MdOutlineKeyboardArrowUp
            className="icon"
            style={{ minWidth: "20px", minHeight: "20px" }}
          />
        </div>
      </button>

      <div className={`SidebarItemsContainer ${isItemSelected ? "show" : ""}`}>
        <ul>
          {testList.map((test, index) => {
            return (
              <SidebarItem
                key={index}
                currTest={currTest}
                setCurrTest={setCurrTest}
                test={test}
              >
                {test.Name}
              </SidebarItem>
            );
          })}
        </ul>
      </div>
    </li>
  );
};

export default SidebarGroupItem;
