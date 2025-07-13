class Question {
  id!: number;
  private _question_direction?: string;
  question_type!: string;
  private _answer_option?: AnswerOption[];
  private _correct_answer?: number[];
  cdr!: number;
  group_id!: number;
  private _shuffleable?: boolean;

  get question_direction(): string {
    return this._question_direction ?? "";
  }

  set question_direction(value: string) {
    this._question_direction = value.replace(/\\"/g, '"');
  }

  get answer_option(): AnswerOption[] {
    return this._answer_option ?? [];
  }

  set answer_option(value: string | AnswerOption[]) {
    if (typeof value === "string") {
      this._answer_option = JSON.parse(value);
    } else {
      this._answer_option = value;
    }
  }

  get correct_answer(): number[] {
    return this._correct_answer ?? [];
  }

  set correct_answer(value: number | string | number[]) {
    if (typeof value === "number") {
      this._correct_answer = [value];
    } else if (typeof value === "string") {
      const parsedValue = JSON.parse(value);

      if (typeof parsedValue === "number") {
        this._correct_answer = [parsedValue];
      } else {
        this._correct_answer = JSON.parse(value);
      }
    } else {
      this._correct_answer = value;
    }
  }

  get shuffleable(): boolean {
    return this._shuffleable ?? false;
  }

  set shuffleable(value: boolean | number) {
    if (typeof value === "number") {
      this._shuffleable = value === 0 ? false : true;
    } else {
      this._shuffleable = value;
    }
  }

  constructor(obj: Question) {
    Object.assign(this, obj);
  }
}

interface AnswerOption {
  id: string;
  value: string;
}

export type { AnswerOption };
export default Question;
