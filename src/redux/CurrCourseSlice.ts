import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Course from "../data/Course";
import { QueryDb } from "../data/SQLDatabase";

const fetchCourse = async (id: string) => {
  try {
    const data = await QueryDb<Course>(
      `select *
            from Course 
            where id = ${id}
            limit 1`
    );

    const course = new Course(data[0]);
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

const loadCurrCourse = createAsyncThunk(
  "currCourse/loadCurrCourse",

  async (_, { rejectWithValue }) => {
    try {
      const course = await getCourseFromLocal();

      if (course) {
        return course;
      } else {
        return rejectWithValue("No course found in local storage");
      }
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue(String(error));
      }
    }
  }
);

interface CurrCourseState {
  course: Course | null;
  loading: boolean;
  error: string | null;
}

const initialState: CurrCourseState = {
  course: null,
  loading: false,
  error: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(loadCurrCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCurrCourse.fulfilled, (state, action) => {
        state.course = action.payload;
        state.loading = false;
      })
      .addCase(loadCurrCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

const CurrCourseReducer = CurrCourseSlice.reducer;
export const { setCurrCourse } = CurrCourseSlice.actions;
export { loadCurrCourse };
export default CurrCourseReducer;
