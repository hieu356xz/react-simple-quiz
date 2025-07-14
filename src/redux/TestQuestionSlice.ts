import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { questionFilter } from "../utils";
import Question from "../data/Question";

const initialState = {
  questions: [] as Question[],
  filteredQuestions: [] as Question[],
  groupedQuestions: {} as Record<number, Question[]>,
};

const TestQuestionSlice = createSlice({
  name: "testQuestion",
  initialState,
  reducers: {
    addTestQuestion: (state, action: PayloadAction<Question>) => {
      state.questions.push(action.payload);
      const { filteredQuestions, groupedQuestions } = questionFilter(
        state.questions
      );
      state.filteredQuestions = filteredQuestions;
      state.groupedQuestions = groupedQuestions;
    },

    setTestQuestion: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
      const { filteredQuestions, groupedQuestions } = questionFilter(
        state.questions
      );
      state.filteredQuestions = filteredQuestions;
      state.groupedQuestions = groupedQuestions;
    },
  },
});

const TestQuestionReducer = TestQuestionSlice.reducer;
export const { addTestQuestion, setTestQuestion } = TestQuestionSlice.actions;
export default TestQuestionReducer;
