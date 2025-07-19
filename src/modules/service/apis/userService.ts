import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import instance from "../network/config";

export const getUserList = createAsyncThunk(
  "getUserList/list",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await instance.get(`users/get/`);
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err.response!.data);
      } else {
        console.log("Unexpected error", err);
      }
    }
  }
);

export const getEventImageFolders = createAsyncThunk(
  "eventImage/folders-with-images",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await instance.get(`eventImage/folders-with-images`, data);
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err.response!.data);
      } else {
        console.log("Unexpected error", err);
      }
    }
  }
);

export const getBus = createAsyncThunk(
  "bus",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await instance.get(`bus/list`, data);
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err.response!.data);
      } else {
        console.log("Unexpected error", err);
      }
    }
  }
);

export const getVideos = createAsyncThunk(
  "videos",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await instance.get(`video/list`, data);
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err.response!.data);
      } else {
        console.log("Unexpected error", err);
      }
    }
  }
);

