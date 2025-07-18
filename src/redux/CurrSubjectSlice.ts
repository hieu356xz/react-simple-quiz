import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Subject from "../data/Subject";
import { QueryDb } from "../data/SQLDatabase";

const fetchSubject = async (id: string) => {
  try {
    const data = await QueryDb(
      `select *
            from Subject 
            where id = ${id}
            limit 1`
    );

    const subject = new Subject(JSON.parse(data)[0]);
    return subject;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const getSubjectFromLocal = async () => {
  let savedSubjectId = localStorage.getItem("SubjectId");

  if (savedSubjectId) {
    const subject = await fetchSubject(savedSubjectId);
    if (subject) {
      localStorage.setItem("SubjectId", subject.id);
      return subject;
    }
  }

  return null;
};

const loadCurrSubject = createAsyncThunk(
  "currSubject/loadCurrSubject",

  async (_, { rejectWithValue }) => {
    try {
      const subject = await getSubjectFromLocal();
      if (subject) {
        return subject;
      } else {
        return rejectWithValue("No subject found in local storage");
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

interface CurrSubjectSlice {
  subject: Subject | null;
  loading: boolean;
  error: string | null;
}

const initialState: CurrSubjectSlice = {
  subject: null,
  loading: false,
  error: null,
};

const CurrSubjectSlice = createSlice({
  name: "currSubject",
  initialState,
  reducers: {
    setCurrSubject: (state, action: PayloadAction<Subject>) => {
      state.subject = action.payload;
      localStorage.setItem("SubjectId", action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCurrSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCurrSubject.fulfilled, (state, action) => {
        state.subject = action.payload;
        state.loading = false;
      })
      .addCase(loadCurrSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

const CurrSubjectReducer = CurrSubjectSlice.reducer;
export const { setCurrSubject } = CurrSubjectSlice.actions;
export { loadCurrSubject };
export default CurrSubjectReducer;
