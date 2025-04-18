import parse from "html-react-parser";
import DOMPurify from "dompurify";
import HTMLPaserImageOptions from "../utils";
import { memo, useMemo } from "react";

interface IQuestionDirectionProps {
  number: number;
  id: number;
  directionText: string;
}

const QuestionDirection = ({
  number,
  id,
  directionText,
}: IQuestionDirectionProps) => {
  const parsedQuestionDirection = useMemo(() => {
    const cleanHTML = DOMPurify.sanitize(directionText, {
      USE_PROFILES: { html: true },
    });

    return parse(cleanHTML, HTMLPaserImageOptions);
  }, [directionText]);

  return (
    <div className="QuestionContainerDirection">
      <p className="QuestionContainerNumber">{`Câu ${number}: (ID-${id})`}</p>
      <div>{parsedQuestionDirection}</div>
    </div>
  );
};

export default memo(QuestionDirection);
