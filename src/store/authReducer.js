import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = localStorage.getItem("authState")
  ? JSON.parse(localStorage.getItem("authState"))
  : {
      email: null,
      token: null,
      userId: null,
      isLoggedIn: false,
      showForgotPasswordModal: false,
      
    };

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.isLoggedIn = true;
      localStorage.setItem("authState", JSON.stringify(state));
    },
    logout(state) {
      state.token = null;
      state.userId = null;
      state.isLoggedIn = false;
      localStorage.removeItem("authState");
    },
    showForgotPassword(state) {
      state.showForgotPasswordModal = true;
    },

    hideForgotPassword(state) {
      state.showForgotPasswordModal = false;
    },
    // fetchUserData(state, action) {
    //   state.userData = action.payload;
    // }
  },
});

export const { login, logout, showForgotPassword, hideForgotPassword, } =
  authSlice.actions;
export default authSlice.reducer;
