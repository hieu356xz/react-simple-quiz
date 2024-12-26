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

    removeAllUserAnswerById: (state, action: PayloadAction<number>) => {
      if (state.answers[action.payload]) {
        state.answers[action.payload] = [];
      }
    },
  },
});

const UserAnswerReducer = UserAnswerSlice.reducer;
export const { addUserAnswer, removeUserAnswer, removeAllUserAnswerById } =
  UserAnswerSlice.actions;
export default UserAnswerReducer;
