import { useScrollspy } from "@makotot/ghostui";
import { ReactNode, RefObject, useEffect } from "react";

interface IScrollSpyProps {
  children: ReactNode;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  sectionRefs: RefObject<Element>[];
  rootSelector?: string;
  offset?: number;
}

const ScrollSpy = ({
  children,
  setCurrentIndex,
  sectionRefs,
  rootSelector,
  offset,
}: IScrollSpyProps) => {
  const scrollSpy = useScrollspy({
    sectionRefs: sectionRefs,
    rootSelector: rootSelector,
    offset: offset,
  });

  useEffect(() => {
    setCurrentIndex(scrollSpy.currentElementIndexInViewport + 1);
  }, [scrollSpy]);

  return children;
};

export default ScrollSpy;
