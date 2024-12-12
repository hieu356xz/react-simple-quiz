import { useContext, useEffect, useState } from "react";
import Subject from "../data/Subject";
import { CurrSubjectContext } from "../contexts/CurrSubjectProvider";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

interface ISidebarGroupItemProps {
  subject: Subject;
  key: number;
}

const SidebarGroupItem = (props: ISidebarGroupItemProps) => {
  const { currSubject, setCurrSubject } = useContext(CurrSubjectContext);
  const [isItemSelected, setIsItemSelected] = useState(false);

  useEffect(() => {
    setIsItemSelected(currSubject?.ID == props.subject.ID);
  }, [currSubject]);

  return (
    <li
      key={props.key}
      className={`SidebarGroupItem ${isItemSelected ? "selected" : ""}`}
    >
      <button onClick={() => setCurrSubject(props.subject)}>
        <div className="SidebarGroupItemContainer">
          <span>{props.subject.Name}</span>
          <MdOutlineKeyboardArrowUp
            className="icon"
            style={{ minWidth: "20px", minHeight: "20px" }}
          />
        </div>
      </button>
    </li>
  );
};

export default SidebarGroupItem;
