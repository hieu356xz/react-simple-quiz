import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Course from "../data/Course";

const initialState = {
  course: null as Course | null,
};

const CurrCourseSlice = createSlice({
  name: "currCourse",
  initialState,
  reducers: {
    setCurrCourse: (state, action: PayloadAction<Course | null>) => {
      state.course = action.payload;
    },
  },
});

const CurrCourseReducer = CurrCourseSlice.reducer;
export const { setCurrCourse } = CurrCourseSlice.actions;
export default CurrCourseReducer;
