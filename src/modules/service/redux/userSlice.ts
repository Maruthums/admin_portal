import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getBus, getEventImageFolders, getUserList, getVideos } from "../apis/userService";


export const userSlice: any = createSlice({
  name: "user",
  initialState: {
    list: {
      isLoading: false,
      status: "",
      data: [],
    },
    eventImage: {
      isLoading: false,
      status: "",
      data: {},
    },
    bus: {
      isLoading: false,
      status: "",
      data: [],
    },
    videos: {
      isLoading: false,
      status: "",
      data: [],
    },
    sideBarEnable: true,
  },
  reducers: {
    reseteventImage: (state) => {
    },
    setSideBarEnable: (state, { payload }) => {
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
      .addCase(getEventImageFolders.pending, (state) => {
        state.eventImage.status = "pending";
        state.eventImage.isLoading = true;
      })
      .addCase(getEventImageFolders.fulfilled, (state, { payload }: any) => {
        state.eventImage.status = "success";
        state.eventImage.data = payload;
        state.eventImage.isLoading = false;
      })
      .addCase(getEventImageFolders.rejected, (state, action: any) => {
        state.eventImage.status = "failed";
        state.eventImage.isLoading = false;
        toast.error(
          action.payload?.message ? action.payload.message.toString() : "Something went wrong!"
        );
      })
      .addCase(getBus.pending, (state) => {
        state.bus.status = "pending";
        state.bus.isLoading = true;
      })
      .addCase(getBus.fulfilled, (state, { payload }: any) => {
        state.bus.status = "success";
        state.bus.data = payload;
        state.bus.isLoading = false;
      })
      .addCase(getBus.rejected, (state, action: any) => {
        state.bus.status = "failed";
        state.bus.isLoading = false;
        toast.error(
          action.payload?.message ? action.payload.message.toString() : "Something went wrong!"
        );
      }
      )
      .addCase(getVideos.pending, (state) => {
        state.videos.status = "pending"
        state.videos.isLoading = true
      })
      .addCase(getVideos.fulfilled, (state, { payload }: any) => {
        state.videos.status = "success"
        state.videos.data = payload
        state.videos.isLoading = false
      })
      .addCase(getVideos.rejected, (state, action: any) => {
        state.videos.status = "failed"
        state.videos.isLoading = false
        toast.error(
          action.payload?.message ? action.payload.message.toString() : "Something went wrong!"
        )
      });
  },
});

export const { reseteventImage, resetUser, setSideBarEnable } = userSlice.actions;

export default userSlice.reducer;
