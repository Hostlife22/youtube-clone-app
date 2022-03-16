import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import request from "../../api/api";
import { RootState } from "../../app/store";
import { IVideo, IVideos } from "../../app/types";

export interface VideosState {
  videos: IVideo[];
  nextPageToken: string;
  loading: boolean;
  error: any;
  activeCategory: string;
}

const initialState = {
  videos: [] as IVideo[],
  nextPageToken: "",
  loading: false,
  error: null,
  activeCategory: "",
};

export const getPopularVideos = createAsyncThunk(
  "videos/popular_videos",
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

export const getVideosCategory = createAsyncThunk(
  "videos/videos_category",
  async (keyword: string, { rejectWithValue, getState }) => {
    try {
      const { nextPageToken } = getState() as VideosState;
      const { data } = await request("/search", {
        params: {
          part: "snippet",
          maxResults: 20,
          pageToken: nextPageToken,
          q: keyword,
          type: "video",
        },
      });

      return { data, keyword };
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
          state.activeCategory = "all";
        }
      )
      .addCase(
        getPopularVideos.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          state.activeCategory = "";
        }
      )
      .addCase(getVideosCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getVideosCategory.fulfilled,
        (state, action: PayloadAction<{ data: IVideos; keyword: string }>) => {
          state.loading = false;
          state.videos = action.payload.data.items;
          state.nextPageToken = action.payload.data.nextPageToken;
          state.activeCategory = action.payload.keyword;
        }
      )
      .addCase(
        getVideosCategory.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          state.activeCategory = "";
        }
      );
  },
});

export const { increment, decrement } = videosSlice.actions;

export const selectHomeVideos = (state: RootState) => state.homeVideos.videos;

export default videosSlice.reducer;
