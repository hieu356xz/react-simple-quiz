import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpen: false,
};

const SidebarOpenSlice = createSlice({
  name: "sidebarOpen",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setIsSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
  },
});

const SidebarOpenReducer = SidebarOpenSlice.reducer;
export const { toggleSidebar, setIsSidebarOpen } = SidebarOpenSlice.actions;
export default SidebarOpenReducer;
