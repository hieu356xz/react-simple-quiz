import { ReactNode, useEffect, useState } from "react";
import { PiDotOutlineFill } from "react-icons/pi";
import Test from "../data/Test";

interface ISidebarItemProps {
  children: ReactNode;
  currTest: Test;
  setCurrTest: React.Dispatch<React.SetStateAction<Test>>;
  test: Test;
}

const SidebarItem = ({ children, ...props }: ISidebarItemProps) => {
  const [isItemSelected, setIsItemSelected] = useState(false);

  useEffect(() => {
    props.currTest && setIsItemSelected(props.currTest.ID == props.test.ID);
  }, [props.currTest]);

  return (
    <li className={`SidebarItem ${isItemSelected ? "selected" : ""}`}>
      <button onClick={() => props.setCurrTest(props.test)}>
        <PiDotOutlineFill strokeWidth={"70px"} className="icon" /> {children}
      </button>
    </li>
  );
};

export default SidebarItem;
