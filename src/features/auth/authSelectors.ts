import type { RootState } from "../../app/store";

export const selectUser = ( state : RootState ) => state.auth.user;
export const selectToken = ( state : RootState ) => state.auth.token;
export const selectUsers = ( state : RootState ) => state.auth.users;
export const selectLoading = ( state : RootState ) => state.auth.loading;
export const selectTotal_records = ( state : RootState ) => state.auth.records;