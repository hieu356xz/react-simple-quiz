import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserAnswerSlice {
  answers: Record<number, number[]>;
  input_answers: Record<number, string | null>;
}

const initialState: UserAnswerSlice = {
  answers: {},
  input_answers: {},
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

    setInputAnswer: (
      state,
      action: PayloadAction<{ id: number; answer: string | null }>
    ) => {
      state.input_answers[action.payload.id] = action.payload.answer;
    },

    removeInputAnswer: (state, action: PayloadAction<number>) => {
      if (state.input_answers[action.payload]) {
        delete state.input_answers[action.payload];
      }
    },

    removeAllUserAnswerById: (state, action: PayloadAction<number>) => {
      if (state.answers[action.payload]) {
        state.answers[action.payload] = [];
      }
      if (state.input_answers[action.payload]) {
        delete state.input_answers[action.payload];
      }
    },

    resetUserAnwser: (state) => {
      state.answers = {};
      state.input_answers = {};
    },
  },
});

const UserAnswerReducer = UserAnswerSlice.reducer;
export const {
  addUserAnswer,
  removeUserAnswer,
  updateUserAnswer,
  setInputAnswer,
  removeInputAnswer,
  removeAllUserAnswerById,
  resetUserAnwser,
} = UserAnswerSlice.actions;
export default UserAnswerReducer;
