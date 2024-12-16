import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTest: false,
};

const ActiveTestSlice = createSlice({
  name: "activeTest",
  initialState,
  reducers: {
    toggleActiveTest: (state) => {
      state.activeTest = !state.activeTest;
    },
  },
});

const ActiveTestReducer = ActiveTestSlice.reducer;
export const { toggleActiveTest } = ActiveTestSlice.actions;
export default ActiveTestReducer;
