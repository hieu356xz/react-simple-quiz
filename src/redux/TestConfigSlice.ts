import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  shuffleAnswer: true,
  showAnswerOnChose: false,
  questionCount: "15",
};

const TestConfigSlice = createSlice({
  name: "testConfig",
  initialState,
  reducers: {
    toggleShuffleAnswer: (state) => {
      state.shuffleAnswer = !state.shuffleAnswer;
    },
    toggleShowAnswerOnChosen: (state) => {
      state.showAnswerOnChose = !state.showAnswerOnChose;
    },
    setQuestionCount: (state, action: PayloadAction<string>) => {
      state.questionCount = action.payload;
    },
  },
});

const TestConfigReducer = TestConfigSlice.reducer;
export const {
  toggleShuffleAnswer,
  setQuestionCount,
  toggleShowAnswerOnChosen,
} = TestConfigSlice.actions;
export default TestConfigReducer;
