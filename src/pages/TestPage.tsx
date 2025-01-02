import { useState } from "react";
import TestContainer from "../components/TestContainer";
import TestNavbar from "../components/TestNavbar";
import TestResultPopup from "../components/TestResultPopup";

const TestPage = () => {
  const [hidePopup, setHidePopup] = useState(true);

  return (
    <>
      <TestNavbar setHidePopup={setHidePopup} />
      <div className="Main">
        <TestContainer />
        <TestResultPopup hidePopup={hidePopup} setHidePopup={setHidePopup} />
      </div>
    </>
  );
};

export default TestPage;
