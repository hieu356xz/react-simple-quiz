import { useScrollspy } from "@makotot/ghostui";
import {
  ComponentPropsWithoutRef,
  ComponentType,
  ElementType,
  ReactNode,
  RefObject,
  useEffect,
} from "react";
import { useDispatch } from "react-redux";
import { setCurrentQuestion } from "../redux/testNavigationSlice";

type QuestionScrollSpyProps<C extends ElementType | ComponentType = "div"> = {
  children: ReactNode;
  sectionRefs: RefObject<Element>[];
  rootSelector?: string;
  offset?: number;
  as?: C;
} & Omit<
  ComponentPropsWithoutRef<C>,
  "children" | "sectionRefs" | "rootSelector" | "offset" | "as"
>;

const QuestionScrollSpy = <C extends ElementType | ComponentType = "div">({
  children,
  sectionRefs,
  rootSelector,
  offset,
  as,
  ...props
}: QuestionScrollSpyProps<C>) => {
  const scrollSpy = useScrollspy({
    sectionRefs,
    rootSelector,
    offset,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (scrollSpy.currentElementIndexInViewport === -1) return;
    dispatch(setCurrentQuestion(scrollSpy.currentElementIndexInViewport + 1));
  }, [scrollSpy]);

  const Component = as || "div";
  return <Component {...props}>{children}</Component>;
};

export default QuestionScrollSpy;
