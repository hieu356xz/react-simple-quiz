import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Semester from "../data/Semester";
import { QueryDb } from "../data/SQLDatabase";

const fetchSemester = async (id: string) => {
  try {
    const data = await QueryDb(
      `select *
            from Semester 
            where id = ${id}
            limit 1`
    );

    const semester = new Semester(JSON.parse(data)[0]);
    return semester;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const getSemesterFromLocal = async () => {
  let savedSemesterId = localStorage.getItem("SemesterId");

  if (savedSemesterId) {
    const semester = await fetchSemester(savedSemesterId);
    if (semester) {
      localStorage.setItem("SemesterId", semester.id.toString());
      return semester;
    }
  }

  return null;
};

const loadCurrSemester = createAsyncThunk(
  "currSemester/loadCurrSemester",

  async (_, { rejectWithValue }) => {
    try {
      const semester = await getSemesterFromLocal();
      if (semester) {
        return semester;
      } else {
        return rejectWithValue("No semester found in local storage");
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

interface CurrSemesterSlice {
  semester: Semester | null;
  loading: boolean;
  error: string | null;
}

const initialState: CurrSemesterSlice = {
  semester: null,
  loading: false,
  error: null,
};

const currSemesterSlice = createSlice({
  name: "currSemester",
  initialState,
  reducers: {
    setCurrSemester: (state, action: PayloadAction<Semester | null>) => {
      state.semester = action.payload;
      if (action.payload) {
        localStorage.setItem("SemesterId", action.payload.id.toString());
      } else {
        localStorage.removeItem("SemesterId");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCurrSemester.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCurrSemester.fulfilled, (state, action) => {
        state.loading = false;
        state.semester = action.payload;
      })
      .addCase(loadCurrSemester.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

const CurrSemesterReducer = currSemesterSlice.reducer;
export const { setCurrSemester } = currSemesterSlice.actions;
export { loadCurrSemester };
export default CurrSemesterReducer;
