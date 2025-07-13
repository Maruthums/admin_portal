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
