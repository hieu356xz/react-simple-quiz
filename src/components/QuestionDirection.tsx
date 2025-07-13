import parse from "html-react-parser";
import DOMPurify from "dompurify";
import HTMLPaserImageOptions from "../utils";
import { memo, useMemo, ReactNode } from "react";

interface IQuestionDirectionProps {
  number: number;
  id: number;
  directionText: string;
  haveAnswer: boolean;
  children?: ReactNode;
}

const QuestionDirection = ({
  number,
  id,
  directionText,
  haveAnswer,
  children,
}: IQuestionDirectionProps) => {
  const parsedQuestionDirection = useMemo(() => {
    const cleanHTML = DOMPurify.sanitize(directionText, {
      USE_PROFILES: { html: true },
    });

    return parse(cleanHTML, HTMLPaserImageOptions);
  }, [directionText]);

  return (
    <div className="QuestionContainerDirection">
      <div className="QuestionContainerHeader">
        <span className="QuestionContainerNumber">
          {`Câu ${number}: (ID-${id})`}
        </span>
        {!haveAnswer && (
          <span className="QuestionNoAnswerMessage">Chưa có đáp án</span>
        )}
      </div>
      <div className="QuestionContainerContent">{parsedQuestionDirection}</div>
      {children && (
        <div className="QuestionContainerAdditional">{children}</div>
      )}
    </div>
  );
};

export default memo(QuestionDirection);
