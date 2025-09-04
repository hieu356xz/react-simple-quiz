import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { questionFilter, shuffleAnswer, shuffleQuestion } from "../utils";
import Question from "../data/Question";

const initialState = {
  questions: [] as Question[],
  filteredQuestions: [] as Question[],
  groupedQuestions: {} as Record<number, Question[]>,
};

type setTestQuestionPayload = {
  questions: Question[];
  count?: number;
  shuffleAnswer?: boolean;
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

    setTestQuestion: (state, action: PayloadAction<setTestQuestionPayload>) => {
      const {
        questions,
        count = -1,
        shuffleAnswer: isShuffleAnswer = false,
      } = action.payload;

      if (isShuffleAnswer) {
        shuffleAnswer(questions);
      }

      state.questions = questions;
      const { filteredQuestions, groupedQuestions } = questionFilter(
        state.questions
      );

      state.filteredQuestions = shuffleQuestion(filteredQuestions, count);
      state.groupedQuestions = groupedQuestions;
    },

    clearTestQuestion: (state) => {
      state.questions = [];
      state.filteredQuestions = [];
      state.groupedQuestions = {};
    },
  },
});

const TestQuestionReducer = TestQuestionSlice.reducer;
export const { addTestQuestion, setTestQuestion, clearTestQuestion } =
  TestQuestionSlice.actions;
export default TestQuestionReducer;
