class Test {
  ID!: number;
  Name!: string;
  SubjectID!: number;
  private _Questions?: number[];

  get Questions() {
    return this._Questions ?? [];
  }

  set Questions(value: number[] | string) {
    if (typeof value === "string") {
      this._Questions = JSON.parse(value);
    } else {
      this._Questions = value;
    }
  }

  constructor(obj: Test) {
    Object.assign(this, obj);
  }
}

export default Test;
