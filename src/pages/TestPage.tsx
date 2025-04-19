import { useEffect, useState } from "react";
import TestContainer from "../components/TestContainer";
import TestNavbar from "../components/TestNavbar";
import TestResultPopup from "../components/TestResultPopup";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TestContainerPaginated from "../components/TestContainerPaginated";
import TestFooter from "../components/TestFooter";

const TestPage = () => {
  const [hidePopup, setHidePopup] = useState(true);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);

  const isTestFininshed = useSelector(
    (state: RootState) => state.testResult.isTestFininshed
  );

  const showQuestionByPage = useSelector(
    (state: RootState) => state.testConfig.showQuestionByPage
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
        {showQuestionByPage ? (
          <TestContainerPaginated
            currentQuestionNumber={currentQuestionNumber}
          />
        ) : (
          <TestContainer
            currentQuestionNumber={currentQuestionNumber}
            setCurrentQuestionNumber={setCurrentQuestionNumber}
          />
        )}
        <TestResultPopup hidePopup={hidePopup} setHidePopup={setHidePopup} />
      </div>
      <TestFooter
        currentQuestionNumber={currentQuestionNumber}
        setCurrentQuestionNumber={setCurrentQuestionNumber}
      />
    </>
  );
};

export default TestPage;
