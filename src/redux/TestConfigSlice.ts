import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  shuffleAnswer: true,
  questionCount: "15",
};

const TestConfigSlice = createSlice({
  name: "testConfig",
  initialState,
  reducers: {
    toggleShuffleAnswer: (state) => {
      state.shuffleAnswer = !state.shuffleAnswer;
    },
    setQuestionCount: (state, action: PayloadAction<string>) => {
      state.questionCount = action.payload;
    },
  },
});

const TestConfigReducer = TestConfigSlice.reducer;
export const { toggleShuffleAnswer, setQuestionCount } =
  TestConfigSlice.actions;
export default TestConfigReducer;
