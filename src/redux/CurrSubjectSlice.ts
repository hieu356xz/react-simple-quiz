import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Subject from "../data/Subject";
import QueryDb from "../data/QueryDb";

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

const initialState = {
  subject: await getSubjectFromLocal(),
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
});

const CurrSubjectReducer = CurrSubjectSlice.reducer;
export const { setCurrSubject } = CurrSubjectSlice.actions;
export default CurrSubjectReducer;
