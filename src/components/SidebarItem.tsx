import { ReactNode, useEffect, useState } from "react";
import { useMediaQuery } from "@react-hook/media-query";
import { useDispatch } from "react-redux";
import { PiDotOutlineFill } from "react-icons/pi";
import Course from "../data/Course";
import { setIsSidebarOpen } from "../redux/SidebarOpenSlice";
import { setCurrCourse } from "../redux/CurrCourseSlice";

interface ISidebarItemProps {
  children: ReactNode;
  currCourse: Course | null;
  course: Course;
}

const SidebarItem = ({ children, ...props }: ISidebarItemProps) => {
  const [isItemSelected, setIsItemSelected] = useState(false);
  const dispatch = useDispatch();

  const screenMatches = useMediaQuery("screen and (max-width: 768px)");

  useEffect(() => {
    if (props.currCourse) {
      setIsItemSelected(props.currCourse.id == props.course.id);
    } else {
      setIsItemSelected(false);
    }
  }, [props.currCourse]);

  const changeCourse = () => {
    dispatch(setCurrCourse(props.course));
    // Tự động đóng sidebar trên màn hình nhỏ
    if (screenMatches) dispatch(setIsSidebarOpen(false));
  };

  return (
    <li className={`SidebarItem ${isItemSelected ? "selected" : ""}`}>
      <button onClick={changeCourse}>
        <PiDotOutlineFill strokeWidth={"70px"} className="icon" /> {children}
      </button>
    </li>
  );
};

export default SidebarItem;
