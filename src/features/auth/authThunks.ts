import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import {
  registerApi,
  verifyEmailApi,
  type getAllUserApiResponse,
  type RegisterPayload,
  type RegisterResponse,
} from "./authService";

import { loginApi, type LoginPayload, type LoginResponse } from "./authService";
import { getUserApi, type userDetailPayload, type userDetailResponse } from "./authService";

interface ErrorResponse {
  message: string;
}

// ----------REGISTER
export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterPayload,
  { rejectValue: string }
>("auth/register", async (data, { rejectWithValue }) => {
  try {
    const res = await registerApi(data);

   
    return res.data.data;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;
    return rejectWithValue(
      error.response?.data?.message || "Registration failed"
    );
  }
});

//-------VERIFY EMAIL
export const verifyEmail = createAsyncThunk<
  string,
  { token: string; userId: string },
  { rejectValue: string }
>("auth/verifyEmail", async ({ token, userId }, { rejectWithValue }) => {
  try {
    const res = await verifyEmailApi(token, userId);
    return res.data.message;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;
    return rejectWithValue(
      error.response?.data?.message || "Email verification failed"
    );
  }
});


// -----------login
export const loginUser = createAsyncThunk<LoginResponse, LoginPayload, { rejectValue : string } >("auth/login", async (data, {rejectWithValue}) => {
  try {
    const res = await loginApi(data);

    return res.data.data;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>;
    return rejectWithValue(
      error.response?.data?.message || "Login failed"
    )
  }
})

//----------------user details
export const getUser = createAsyncThunk<userDetailResponse, userDetailPayload, { rejectValue : string }>("auth/user", async (data, {rejectWithValue}) => {
  try {
    const res = await getUserApi(data);

    return res.data.user;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch details"
    )
  }
})

//-------------getAll user
import { getAllUserApi, type getAllUserPayload } from "./authService";
export const getAllUser = createAsyncThunk<getAllUserApiResponse, getAllUserPayload, {rejectValue : string}>("auth/users", async (data, {rejectWithValue}) => {
  try {
    const res = await getAllUserApi(data);
    console.log("API response : ",res.data)

    return res.data;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch details"
    )
  }
})

//---------------delete user
import { deleteApi,type deleteResponse } from "./authService";
export const deleteUser = createAsyncThunk<deleteResponse,string, {rejectValue : string }>("auth/deleteUser", async (data, {rejectWithValue}) => {
  try {
    const res = await deleteApi(data);

    return res.data;
  } catch (err) {
    const error = err as AxiosError<ErrorResponse>
    return rejectWithValue(
      error.response?.data?.message || "Failed to delete details"
    )
  }
})


