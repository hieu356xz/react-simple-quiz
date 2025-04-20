import { useScrollspy } from "@makotot/ghostui";
import { ReactNode, RefObject, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentQuestion } from "../redux/testNavigationSlice";

interface IScrollSpyProps {
  children: ReactNode;
  sectionRefs: RefObject<Element>[];
  rootSelector?: string;
  offset?: number;
}

const QuestionScrollSpy = ({
  children,
  sectionRefs,
  rootSelector,
  offset,
}: IScrollSpyProps) => {
  const scrollSpy = useScrollspy({
    sectionRefs: sectionRefs,
    rootSelector: rootSelector,
    offset: offset,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (scrollSpy.currentElementIndexInViewport === -1) return;
    dispatch(setCurrentQuestion(scrollSpy.currentElementIndexInViewport + 1));
  }, [scrollSpy]);

  return <>{children}</>;
};

export default QuestionScrollSpy;
