class Semester {
  ID!: number;
  Name!: string;

  constructor(obj: Semester) {
    Object.assign(this, obj);
  }
}

export default Semester;
