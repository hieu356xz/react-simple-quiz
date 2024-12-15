import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Subject from "../data/Subject";
import QueryDb from "../data/QueryDb";

const fetchDefaultSubject = async () => {
  try {
    const data = await QueryDb(
      `select *
            from Subjects 
            where SemesterID = (select ID 
                                from Semesters 
                                where ID = 6)
            limit 1`
    );

    const subject = new Subject(JSON.parse(data)[0]);
    return subject;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const initialState = {
  subject: await fetchDefaultSubject(),
};

const CurrSubjectSlice = createSlice({
  name: "currSubject",
  initialState,
  reducers: {
    setCurrSubject: (state, action: PayloadAction<Subject>) => {
      state.subject = action.payload;
    },
  },
});

const CurrSubjectReducer = CurrSubjectSlice.reducer;
export const { setCurrSubject } = CurrSubjectSlice.actions;
export default CurrSubjectReducer;
