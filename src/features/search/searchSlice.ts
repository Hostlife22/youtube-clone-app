import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import request from "../../api/api";
import { RootState } from "../../app/store";
import { IRelatedId } from "../../app/types";

export interface VideosState {
  videos: IRelatedId[];
  loading: boolean;
  error: any;
}

const initialState = {
  videos: [] as IRelatedId[],
  loading: false,
  error: null,
};

type DataType = {
  data: {
    items: IRelatedId[];
  };
};

export const getVideosBySearch = createAsyncThunk(
  "search/search_videos",
  async (keyword: string | undefined, { rejectWithValue }) => {
    try {
      const { data }: DataType = await request("/search", {
        params: {
          part: "snippet",
          maxResults: 20,
          q: keyword,
          type: "video,channel",
        },
      });

      return data.items;
    } catch (error: any) {
      let e: Error = error;
      return rejectWithValue(e.message);
    }
  }
);

export const searchedVideosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVideosBySearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getVideosBySearch.fulfilled,
        (state, action: PayloadAction<IRelatedId[]>) => {
          state.loading = false;
          state.videos = action.payload;
        }
      )
      .addCase(
        getVideosBySearch.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const selectSearchedVideos = (state: RootState) => state.searchedVideos;

export default searchedVideosSlice.reducer;
