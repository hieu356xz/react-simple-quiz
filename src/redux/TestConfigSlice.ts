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

const getshowQuestionPreference = () => {
  // Default is false
  return localStorage.getItem("showQuestionByPageOption") === "true";
};

const initialState = {
  shuffleAnswer: getShufflePreference(),
  showAnswerOnChosen: getShowAnswerPreference(),
  showQuestionByPage: getshowQuestionPreference(),
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
      state.showAnswerOnChosen = !state.showAnswerOnChosen;
      localStorage.setItem(
        "showAnswerOnChoseOption",
        JSON.stringify(state.showAnswerOnChosen)
      );
    },
    toggleShowQuestionByPage: (state) => {
      state.showQuestionByPage = !state.showQuestionByPage;
      localStorage.setItem(
        "showQuestionByPageOption",
        JSON.stringify(state.showQuestionByPage)
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
  toggleShowQuestionByPage,
} = TestConfigSlice.actions;
export default TestConfigReducer;
