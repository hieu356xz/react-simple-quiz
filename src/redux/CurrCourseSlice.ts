import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Course from "../data/Course";
import QueryDb from "../data/QueryDb";

const fetchCourse = async (id: string) => {
  try {
    const data = await QueryDb(
      `select *
            from Course 
            where id = ${id}
            limit 1`
    );

    const course = new Course(JSON.parse(data)[0]);
    return course;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const getCourseFromLocal = async () => {
  let savedCourseId = localStorage.getItem("CourseId");

  if (savedCourseId) {
    const course = await fetchCourse(savedCourseId);
    if (course) {
      localStorage.setItem("CourseId", JSON.stringify(course.id));
      return course;
    }
  }

  return null;
};

const initialState = {
  course: await getCourseFromLocal(),
};

const CurrCourseSlice = createSlice({
  name: "currCourse",
  initialState,
  reducers: {
    setCurrCourse: (state, action: PayloadAction<Course | null>) => {
      state.course = action.payload;
      if (action.payload) {
        localStorage.setItem("CourseId", JSON.stringify(action.payload.id));
      } else {
        localStorage.removeItem("CourseId");
      }
    },
  },
});

const CurrCourseReducer = CurrCourseSlice.reducer;
export const { setCurrCourse } = CurrCourseSlice.actions;
export default CurrCourseReducer;
