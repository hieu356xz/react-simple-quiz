class Subject {
  ID!: number;
  Name!: string;
  SemesterID!: number;

  constructor(obj: Subject) {
    Object.assign(this, obj);
  }
}

export default Subject;
