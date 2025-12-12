import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    avatarUrl: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.avatarUrl = null;
    },
    setAvatar(state, action) {
      state.avatarUrl = action.payload;
    },
  },
});

export const { setUser, clearUser, setAvatar } = authSlice.actions;
export default authSlice.reducer;
