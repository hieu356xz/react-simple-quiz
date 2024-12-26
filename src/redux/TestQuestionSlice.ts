import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Question from "../data/Question";

const initialState = {
  questions: [] as Question[],
};

const TestQuestionSlice = createSlice({
  name: "testQuestion",
  initialState,
  reducers: {
    addTestQuestion: (state, action: PayloadAction<Question>) => {
      state.questions.push(action.payload);
    },

    setTestQuestion: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },
  },
});

const TestQuestionReducer = TestQuestionSlice.reducer;
export const { addTestQuestion, setTestQuestion } = TestQuestionSlice.actions;
export default TestQuestionReducer;
