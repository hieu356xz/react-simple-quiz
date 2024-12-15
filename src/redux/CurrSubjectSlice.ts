import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Subject from "../data/Subject";

const initialState = {
  subject: null as Subject | null,
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
