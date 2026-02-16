import axiosInstance from "../../services/axiosInsrtance";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: string;
  name: string;
  email: string;
  emailVerificationTOken: string;
}

export interface RegisterApiResponse {
  data: RegisterResponse;
  message: string;
}

export const registerApi = (payload: RegisterPayload) => {
  return axiosInstance.post<RegisterApiResponse>("/user", payload);
};

export const verifyEmailApi = (verificationToken: string, userId: string) => {
  return axiosInstance.get<{ message: string }>(
    `/user/email/verification?token=${verificationToken}&userId=${userId}`,
  );
};

/* ---------- LOGIN ---------- */
export interface LoginPayload {
  email: string;
  password: string;
}
export interface LoginResponse {
  token: string;
  email: string;
  name: string;
}
interface LoginApiResponse {
  data: LoginResponse;
  message: string;
}
export const loginApi = (payload: LoginPayload) => {
  return axiosInstance.post<LoginApiResponse>("/user/login", payload);
};

//-------------user details
export interface userDetailPayload {
  userId: string;
}

export interface userDetailResponse {
  id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  createAt: string;
  updateAt: string;
}
export interface userDetailsApiResponse {
  message: string;
  user: userDetailResponse;
}

export const getUserApi = (payload: userDetailPayload) => {
  return axiosInstance.get<userDetailsApiResponse>(`/user/${payload.userId}`);
};

//-----------------all register users

export interface allUsersInfo {
  id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  createAt: string;
  updateAt: string;
}

export interface getAllUserApiResponse {
  message: string;
  data: allUsersInfo[];
  totalRecords: number;
}

export interface getAllUserPayload {
  pageNumber : number;
  pageSize : number;
}

export const getAllUserApi = ({ pageNumber, pageSize} : getAllUserPayload) => {
  return axiosInstance.get<getAllUserApiResponse>(`/user?pageNumber=${pageNumber}&pageSize=${pageSize}`)
}

// -----------delete user
export interface deleteUsePayload {
  id : string
}

export interface deleteResponse {
  message : string
}

export const deleteApi = ( id  : string ) => {
  return axiosInstance.delete<deleteResponse>(`/user/${id}`)
}