class Semester {
  id!: number;
  name!: string;

  constructor(obj: Semester) {
    Object.assign(this, obj);
  }
}

export default Semester;
