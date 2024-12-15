import { createSlice } from "@reduxjs/toolkit";

const getThemeFromLocal = () => {
  let savedTheme = localStorage.getItem("theme");

  if (!savedTheme) {
    savedTheme = "dark"; //default theme
    saveThemeToLocal(savedTheme);
  }

  return savedTheme;
};

const saveThemeToLocal = (theme: string) => {
  localStorage.setItem("theme", theme);
};

const initialState = {
  theme: getThemeFromLocal(),
};

const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    switchTheme: (state) => {
      state.theme = state.theme == "dark" ? "light" : "dark";
      saveThemeToLocal(state.theme);
    },
  },
});

const ThemeReducer = ThemeSlice.reducer;
export const { switchTheme } = ThemeSlice.actions;
export default ThemeReducer;
