import { createSlice } from "@reduxjs/toolkit";
import { registerUser, verifyEmail, loginUser, getUser, getAllUser, deleteUser } from "./authThunks";
import { showSuccess, showError } from "../../utils/toast";
import type { userDetailResponse, allUsersInfo } from "./authService";

interface AuthState {
  loading: null | "getUser" | "getAllUser" | "deleteUser" | "register" | "verify" | "login";
  verificationToken: string | null;
  userId: string | null;
  token: string | null;
  user: userDetailResponse | null;
  users : allUsersInfo[];
  records : number;
}

const initialState: AuthState = {
  loading: null,
  verificationToken: null,
  userId: null,
  token: localStorage.getItem("LoginToken"),
  user: null,
  users : [],
  records : 0
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = "register";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = null;
        state.userId = action.payload.id;
        state.verificationToken = action.payload.emailVerificationTOken;
        localStorage.setItem("userID", action.payload.id);
        showSuccess("Registration successful");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = null;
        showError(action.payload || "Email already registered");
      })

      // VERIFY EMAIL
      .addCase(verifyEmail.pending, (state)=>{
        state.loading = "verify"
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.loading = null
        showSuccess("Email verified successfully");
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = null
        showError(action.payload || "Verification failed");
      })

      // Login USER
      .addCase(loginUser.pending, (state) => {
        state.loading = "login";
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = null;

        state.token = action.payload.token;
        // state.userId = action.payload.;

        localStorage.setItem("LoginToken", action.payload.token);
        // localStorage.setItem("userID", action.payload.id);

        showSuccess(`Welcome!! dear ${action.payload.name}`);
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = null;
        showError(action.payload || "Invalid credentials");
      })

      //-----------get details
      .addCase(getUser.pending, (state) => {
        state.loading = "getUser";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = null;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = null;
      })

      //-----------------getAll details
      .addCase(getAllUser.pending, (state) => {
        state.loading = "getAllUser";
      })
      .addCase(getAllUser.fulfilled, (state, action)=> {
        state.loading = null;
        state.users = action.payload.data;
        state.records = action.payload.totalRecords;
      })
      .addCase(getAllUser.rejected, (state) => {
        state.loading = null;
      })

      //------------------delete user
      .addCase(deleteUser.pending,(state)=>{
        state.loading = "deleteUser";
      })
      .addCase(deleteUser.fulfilled,(state)=>{
        state.loading = null;
      })
       .addCase(deleteUser.rejected, (state) => {
        state.loading = null;
      })     
  },
});

export default authSlice.reducer;
