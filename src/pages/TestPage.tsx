import TestContainer from "../components/TestContainer";
import TestNavbar from "../components/TestNavbar";

const TestPage = () => {
  return (
    <>
      <TestNavbar />
      <div className="Main">
        <TestContainer></TestContainer>
      </div>
    </>
  );
};

export default TestPage;
