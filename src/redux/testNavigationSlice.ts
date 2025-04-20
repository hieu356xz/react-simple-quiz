import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const testNavigationSlice = createSlice({
  name: "testNavigation",
  initialState: {
    currentQuestionNumber: 1,
  },
  reducers: {
    setCurrentQuestion: (state, action: PayloadAction<number>) => {
      state.currentQuestionNumber = action.payload;
    },
  },
});

const testNavigationReducer = testNavigationSlice.reducer;
export const { setCurrentQuestion } = testNavigationSlice.actions;
export default testNavigationReducer;
