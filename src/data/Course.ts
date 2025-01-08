class Course {
  id!: number;
  name!: string;
  subject_id!: number;
  private _questions?: number[];
  question_per_test!: number;

  get questions(): number[] {
    return this._questions ?? [];
  }

  set questions(value: number[] | string) {
    if (typeof value === "string") {
      this._questions = JSON.parse(value);
    } else {
      this._questions = value;
    }
  }

  constructor(obj: Course) {
    Object.assign(this, obj);
  }
}

export default Course;
