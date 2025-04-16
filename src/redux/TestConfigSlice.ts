import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const getShufflePreference = () => {
  const shuffleAnswerOption =
    localStorage.getItem("shuffleAnswerOption") || "true";
  return shuffleAnswerOption === "true";
};

const getShowAnswerPreference = () => {
  // Default is false
  return localStorage.getItem("showAnswerOnChoseOption") === "true";
};

const initialState = {
  shuffleAnswer: getShufflePreference(),
  showAnswerOnChose: getShowAnswerPreference(),
  questionCount: "15",
};

const TestConfigSlice = createSlice({
  name: "testConfig",
  initialState,
  reducers: {
    toggleShuffleAnswer: (state) => {
      state.shuffleAnswer = !state.shuffleAnswer;
      localStorage.setItem(
        "shuffleAnswerOption",
        JSON.stringify(state.shuffleAnswer)
      );
    },
    toggleShowAnswerOnChosen: (state) => {
      state.showAnswerOnChose = !state.showAnswerOnChose;
      localStorage.setItem(
        "showAnswerOnChoseOption",
        JSON.stringify(state.showAnswerOnChose)
      );
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
