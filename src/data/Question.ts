class Question {
  ID!: number;
  QuestionText!: string;
  private _AnswerOptions?: AnswerOption[];
  CorrectAnswers!: string;
  QuestionType!: string;
  Cdr!: number;
  private _Shuffleable?: boolean;

  get AnwserOptions() {
    return this._AnswerOptions ?? [];
  }

  set AnwserOptions(value: string | AnswerOption[]) {
    if (typeof value === "string") {
      this._AnswerOptions = JSON.parse(value);
    } else {
      this._AnswerOptions = value;
    }
  }

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

type AnswerOption = {
  ID: number;
  Value: string;
};

export default Question;
