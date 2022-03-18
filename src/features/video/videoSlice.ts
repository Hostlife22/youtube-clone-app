import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import request from "../../api/api";
import { RootState } from "../../app/store";
import { IVideoById, IVideosById } from "../../app/types";

export interface VideoState {
  video: IVideoById | null;
  loading: boolean;
  error: any;
}

const initialState: VideoState = {
  video: null,
  loading: false,
  error: "",
};

export const getVideoById = createAsyncThunk(
  "video/selected_video",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data }: { data: IVideosById } = await request("/videos", {
        params: {
          part: "snippet,statistics",
          id: id,
        },
      });

      return data.items[0];
    } catch (error: any) {
      let e: Error = error;
      return rejectWithValue(e.message);
    }
  }
);

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVideoById.pending, (state) => {
        state.loading = true;
        state.video = null;
      })
      .addCase(
        getVideoById.fulfilled,
        (state, action: PayloadAction<IVideoById>) => {
          state.video = action.payload;
          state.loading = false;
        }
      )
      .addCase(getVideoById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.video = null;
        state.error = action.payload;
      });
  },
});

export const selectVideo = (state: RootState) => state.selectedVideo;

export default videoSlice.reducer;
