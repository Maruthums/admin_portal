import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUserList } from "../apis/userService";

export const userSlice: any = createSlice({
  name: "user",
  initialState: {
    list: {
      isLoading: false,
      status: "",
      data: [],
    },
    sideBarEnable: true,
  },
  reducers: {
    resetUserDetails: (state) => {
		},
    setSideBarEnable: (state, {payload}) =>{
      state.sideBarEnable = payload;
    },
    resetUser: () => {
      // Reset to the initial state
      return userSlice.getInitialState();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserList.pending, (state) => {
        state.list.status = "pending";
        state.list.isLoading = true;
      })
      .addCase(getUserList.fulfilled, (state, { payload }: any) => {
        state.list.status = "success";
        state.list.data = payload;
        state.list.isLoading = false;
      })
      .addCase(getUserList.rejected, (state, action: any) => {
        state.list.status = "failed";
        state.list.isLoading = false;
        toast.error(
          action.payload?.message ? action.payload.message.toString() : "Something went wrong!"
        );
      })
  },
});

export const { resetUserDetails, resetUser, setSideBarEnable } = userSlice.actions;

export default userSlice.reducer;
