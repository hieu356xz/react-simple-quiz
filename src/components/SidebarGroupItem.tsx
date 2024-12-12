import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "@react-hook/media-query";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { CurrSubjectContext } from "../contexts/CurrSubjectProvider";
import { SidebarOpenContext } from "../contexts/SidebarOpenProvider";
import Subject from "../data/Subject";

interface ISidebarGroupItemProps {
  subject: Subject;
  key: number;
}

const SidebarGroupItem = (props: ISidebarGroupItemProps) => {
  const { currSubject, setCurrSubject } = useContext(CurrSubjectContext);
  const { setIsSidebarOpen } = useContext(SidebarOpenContext);
  const [isItemSelected, setIsItemSelected] = useState(false);
  const screenMatches = useMediaQuery("screen and (max-width: 768px)");

  useEffect(() => {
    setIsItemSelected(currSubject?.ID == props.subject.ID);
  }, [currSubject]);

  const changeSubject = () => {
    setCurrSubject(props.subject);
    // Tự động đóng sidebar trên màn hình nhỏ
    screenMatches && setIsSidebarOpen(false);
  };

  return (
    <li
      key={props.key}
      className={`SidebarGroupItem ${isItemSelected ? "selected" : ""}`}
    >
      <button onClick={changeSubject}>
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
