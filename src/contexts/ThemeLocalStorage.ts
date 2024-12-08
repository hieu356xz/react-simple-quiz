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

export { getThemeFromLocal, saveThemeToLocal };
