import { useEffect, useState } from "react";
import TestContainer from "../components/TestContainer";
import TestNavbar from "../components/TestNavbar";
import TestResultPopup from "../components/TestResultPopup";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const TestPage = () => {
  const [hidePopup, setHidePopup] = useState(true);

  const isTestFininshed = useSelector(
    (state: RootState) => state.testResult.isTestFininshed
  );

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isTestFininshed) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isTestFininshed]);

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
