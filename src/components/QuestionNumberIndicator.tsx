import { useRef, memo, useEffect, useState } from "react";

interface IQuestionNumberIndicatorProps {
  currentIndex: number;
  questionNumbers: number[];
}

const QuestionNumberIndicator = ({
  currentIndex,
  questionNumbers,
}: IQuestionNumberIndicatorProps) => {
  // How many fake items in QuestionNumberIndicatorList on each side
  const FAKE_ITEM_COUNT = 2;

  const containerRef = useRef<HTMLDivElement>(null);
  const questionListRef = useRef<HTMLDivElement>(null);
  const [defaultItemWidth, setDefaultItemWidth] = useState(0);
  const [questionListOffset, setQuestionListOffset] = useState(0);

  useEffect(() => {
    if (questionListRef.current && containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const { defaultWidth, offsetFromCenter } = measureWidths(
        questionListRef.current,
        containerWidth
      );

      setDefaultItemWidth(defaultWidth);
      setQuestionListOffset(offsetFromCenter);
    }
  }, []);

  useEffect(() => {
    if (!defaultItemWidth || !questionListOffset) return;
    if (questionListRef.current && containerRef.current) {
      // Set default to 1 if ScrollSpy has not finished initialization
      const index =
        (currentIndex !== -1 ? currentIndex : 1) - 1 + FAKE_ITEM_COUNT;

      const itemList = questionListRef.current.querySelectorAll(
        ".QuestionNumberIndicatorItem"
      );
      const currentItem = itemList[index] as HTMLElement;

      itemList.forEach((item, i) => {
        item.classList.remove("neighbour", "current");
        if (i === index) {
          item.classList.add("current");
        }
        if (Math.abs(i - index) === 1) {
          item.classList.add("neighbour");
        }
      });
      // // Easy solution
      // if (currentItem) {
      //   currentItem.scrollIntoView({
      //     behavior: "smooth",
      //     block: "start",
      //     inline: "center",
      //   });
      // }
      if (currentItem) {
        questionListRef.current.style.transform = `translateX(${
          -(defaultItemWidth * index) + questionListOffset
        }px)`;
      }
    }
  }, [currentIndex, defaultItemWidth, questionListOffset]);

  return (
    <div className="QuestionNumberIndicatorContainer" ref={containerRef}>
      <div className="QuestionNumberIndicator" ref={questionListRef}>
        <QuestionNumberIndicatorList
          questionNumbers={questionNumbers}
          fakeItemCount={FAKE_ITEM_COUNT}
        />
      </div>
    </div>
  );
};

const QuestionNumberIndicatorList = memo(
  ({
    questionNumbers,
    fakeItemCount,
  }: {
    questionNumbers: number[];
    fakeItemCount: number;
  }) => {
    const fakeItems = (startIndex: number) => {
      return Array(fakeItemCount)
        .fill(0)
        .map((item, index) => {
          return (
            <div
              className="QuestionNumberIndicatorItem fake"
              key={index + startIndex}>
              {item}
            </div>
          );
        });
    };
    return (
      <>
        {fakeItems(-fakeItemCount)}
        {questionNumbers.map((item) => (
          <div className="QuestionNumberIndicatorItem" key={item}>
            {item}
          </div>
        ))}
        {fakeItems(questionNumbers.length + 1)}
      </>
    );
  }
);

QuestionNumberIndicatorList.displayName = "QuestionNumberIndicatorList";
export default QuestionNumberIndicator;

const measureWidths = (parent: HTMLElement, containerWidth: number) => {
  // Create an invisible test item and delete it when finished
  const testItem = document.createElement("div");
  testItem.className = "QuestionNumberIndicatorItem";
  testItem.textContent = "0";
  testItem.style.visibility = "hidden";
  testItem.style.position = "absolute";
  testItem.style.top = "0";
  testItem.style.left = "0";
  parent.appendChild(testItem);

  // Measure default state
  const defaultWidth = getOuterWidth(testItem);

  // Measure neighbor state
  testItem.classList.add("neighbour");
  const neighborWidth = getOuterWidth(testItem);

  // Measure current state
  testItem.classList.remove("neighbour");
  testItem.classList.add("current");
  const currentWidth = getOuterWidth(testItem);

  // Take me a few hours to handle this correctly
  const differentStateOffset = neighborWidth - defaultWidth;

  const offsetFromCenter =
    (containerWidth - currentWidth) / 2 - differentStateOffset;

  parent.removeChild(testItem);

  return {
    defaultWidth,
    neighborWidth,
    currentWidth,
    offsetFromCenter,
  };
};

const getOuterWidth = (element: HTMLElement) => {
  const width = element.offsetWidth;

  const style = getComputedStyle(element);
  const outerWidth =
    width + parseInt(style.marginLeft) + parseInt(style.marginRight);

  return outerWidth;
};
