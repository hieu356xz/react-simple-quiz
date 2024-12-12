interface IQuestion {
  ID: number;
  QuestionText: string;
  AnswerOptions: string;
  CorrectAnswers: string;
  QuestionType: string;
  Cdr: number;
  Shuffleable: boolean;
}

export default IQuestion;
