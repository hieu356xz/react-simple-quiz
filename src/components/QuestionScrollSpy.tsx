import { useScrollspy } from "@makotot/ghostui";
import {
  ComponentPropsWithoutRef,
  ComponentType,
  ElementType,
  ReactNode,
  RefObject,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
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

  const currentQuestionNumber = useSelector(
    (state: RootState) => state.testNavigation.currentQuestionNumber
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (scrollSpy.currentElementIndexInViewport === -1) return;
    const newQuestionNumber = scrollSpy.currentElementIndexInViewport + 1;
    if (newQuestionNumber === currentQuestionNumber) return;

    dispatch(setCurrentQuestion(scrollSpy.currentElementIndexInViewport + 1));
  }, [scrollSpy]);

  const Component = as || "div";
  return <Component {...props}>{children}</Component>;
};

export default QuestionScrollSpy;
