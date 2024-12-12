class Question {
  ID!: number;
  QuestionText!: string;
  AnswerOptions!: string;
  CorrectAnswers!: string;
  QuestionType!: string;
  Cdr!: number;
  private _Shuffleable?: boolean;

  get Shuffleable() {
    return this._Shuffleable ?? false;
  }

  set Shuffleable(value: boolean | number) {
    if (typeof value === "number") {
      this._Shuffleable = value === 0 ? false : true;
    } else {
      this._Shuffleable = value;
    }
  }

  constructor(obj: Question) {
    Object.assign(this, obj);
  }
}

export default Question;
