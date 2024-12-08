interface IQuestion {
  ID: number;
  QuestionText: string;
  AnswerOptions: string;
  CorrectAnswers: string;
  QuestionType: string;
  Cdr: number;
  Shuffleable: boolean;
  IsConfirmedCorrect: number;
}

export default IQuestion;
