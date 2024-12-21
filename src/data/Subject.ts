class Subject {
  id!: number;
  name!: string;
  semester_id!: number;

  constructor(obj: Subject) {
    Object.assign(this, obj);
  }
}

export default Subject;
