import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isTestFininshed: false,
  correctAnswerCount: 0,
  wrongAnswerCount: 0,
};

const TestResultSlice = createSlice({
  name: "testResult",
  initialState,
  reducers: {
    setIsTestFinished: (state, action: PayloadAction<boolean>) => {
      state.isTestFininshed = action.payload;
    },

    addCorrectAnswerCount: (state) => {
      state.correctAnswerCount++;
    },

    addWrongAnswerCount: (state) => {
      state.wrongAnswerCount++;
    },
  },
});

const TestResultReducer = TestResultSlice.reducer;
export const { addCorrectAnswerCount, addWrongAnswerCount, setIsTestFinished } =
  TestResultSlice.actions;
export default TestResultReducer;
