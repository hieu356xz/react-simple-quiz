import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isTestFininshed: false,
  correctAnswers: [] as number[],
  wrongAnswers: [] as number[],
  score: 0,
};

const TestResultSlice = createSlice({
  name: "testResult",
  initialState,
  reducers: {
    setIsTestFinished: (state, action: PayloadAction<boolean>) => {
      state.isTestFininshed = action.payload;
    },

    addCorrectAnswer: (state, action: PayloadAction<number>) => {
      state.correctAnswers.push(action.payload);
    },

    addWrongAnswer: (state, action: PayloadAction<number>) => {
      state.wrongAnswers.push(action.payload);
    },
    setScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
  },
});

const TestResultReducer = TestResultSlice.reducer;
export const { addCorrectAnswer, addWrongAnswer, setIsTestFinished, setScore } =
  TestResultSlice.actions;
export default TestResultReducer;
