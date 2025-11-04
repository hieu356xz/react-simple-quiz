import { HTMLReactParserOptions, Element } from "html-react-parser";
import Question from "../data/Question";
import shuffle from "lodash/shuffle";

const HTMLPaserImageOptions: HTMLReactParserOptions = {
  replace(domNode) {
    const element = domNode as Element;
    if (
      element.attribs &&
      (element.attribs["data-org"] === "serverAws" ||
        element.attribs["alt"]?.includes("serverAws"))
    ) {
      element.attribs[
        "src"
      ] = `https://pczxqazwgbrrqalnwolo.supabase.co/storage/v1/object/public/react-simple-quiz-images/${element.attribs["src"]}.png`;
    }
  },
};

const questionFilter = (questions: Question[]) => {
  const filteredQuestions: Question[] = [];
  const groupedQuestions: Record<number, Question[]> = {};

  questions.forEach((question) => {
    const isGrouping =
      (question.question_type === "grouping" && question.group_id) ||
      (question.question_type === "group-input" && question.group_id) ||
      (question.question_type === "drag_drop" && question.group_id) ||
      (question.question_type === "group-radio" && question.group_id);

    if (isGrouping) {
      groupedQuestions[question.group_id] = [
        ...(groupedQuestions[question.group_id] || []),
        question,
      ];
    } else {
      filteredQuestions.push(question);
    }
  });

  return { filteredQuestions, groupedQuestions };
};

const shuffleAnswer = (questions: Question[]) => {
  questions.forEach((question) => {
    if (question.shuffleable) {
      question.answer_option = shuffle(question.answer_option);
    }
  });
};

const shuffleQuestion = (questions: Question[], count: number) => {
  const shuffledQuestions = shuffle(questions);
  shuffledQuestions.sort((a, b) => a.cdr - b.cdr);
  if (count < 0) {
    return shuffledQuestions;
  } else {
    return shuffledQuestions.slice(0, count);
  }
};

export {
  HTMLPaserImageOptions,
  questionFilter,
  shuffleAnswer,
  shuffleQuestion,
};
