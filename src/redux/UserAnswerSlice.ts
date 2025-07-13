import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AnswersState {
  [key: number]: number[];
}

const initialState: { answers: AnswersState } = {
  answers: {},
};

const UserAnswerSlice = createSlice({
  name: "userAnswer",
  initialState,
  reducers: {
    addUserAnswer: (
      state,
      action: PayloadAction<{ id: number; answer: string }>
    ) => {
      if (state.answers[action.payload.id]) {
        state.answers[action.payload.id].push(
          Number.parseInt(action.payload.answer)
        );
      } else {
        state.answers[action.payload.id] = [
          Number.parseInt(action.payload.answer),
        ];
      }
    },

    removeUserAnswer: (
      state,
      action: PayloadAction<{ id: number; answer: string }>
    ) => {
      if (state.answers[action.payload.id]) {
        state.answers[action.payload.id] = state.answers[
          action.payload.id
        ].filter((x) => x != Number.parseInt(action.payload.answer));
      }
    },

    updateUserAnswer: (
      state,
      action: PayloadAction<{ id: number; answers: string[] | number[] }>
    ) => {
      const answers = action.payload.answers
        .map(Number)
        .filter((x) => !isNaN(x));
      state.answers[action.payload.id] = answers;
    },

    removeAllUserAnswerById: (state, action: PayloadAction<number>) => {
      if (state.answers[action.payload]) {
        state.answers[action.payload] = [];
      }
    },

    resetUserAnwser: (state) => {
      state.answers = {};
    },
  },
});

const UserAnswerReducer = UserAnswerSlice.reducer;
export const {
  addUserAnswer,
  removeUserAnswer,
  updateUserAnswer,
  removeAllUserAnswerById,
  resetUserAnwser,
} = UserAnswerSlice.actions;
export default UserAnswerReducer;
