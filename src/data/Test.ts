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
}

export default Test;
