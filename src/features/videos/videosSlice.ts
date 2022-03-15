import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import request from "../../api/api";
import { RootState } from "../../app/store";
import { IVideo, IVideos } from "../../app/types";

export interface VideosState {
  videos: IVideo[];
  nextPageToken: string;
  loading: boolean;
  error: any;
}

const initialState = {
  videos: [] as IVideo[],
  nextPageToken: "",
  loading: false,
  error: null,
};

export const getPopularVideos = createAsyncThunk(
  "videos/popular-videos",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await request("/videos", {
        params: {
          part: "snippet,contentDetails,statistics",
          chart: "mostPopular",
          regionCode: "US",
          maxResults: 20,
          pageToken: "",
        },
      });

      return data;
    } catch (error: any) {
      let e: Error = error;
      return rejectWithValue(e.message);
    }
  }
);

export const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    increment: (state) => {},
    decrement: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPopularVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getPopularVideos.fulfilled,
        (state, action: PayloadAction<IVideos>) => {
          state.loading = false;
          state.videos = action.payload.items;
          state.nextPageToken = action.payload.nextPageToken;
        }
      )
      .addCase(
        getPopularVideos.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { increment, decrement } = videosSlice.actions;

export const selectHomeVideos = (state: RootState) => state.homeVideos.videos;

export default videosSlice.reducer;
