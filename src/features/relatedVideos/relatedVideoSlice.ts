import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import request from "../../api/api";
import { RootState } from "../../app/store";
import { IRelatedId } from "../../app/types";

export interface VideoState {
  videos: IRelatedId[];
  loading: boolean;
  error: any;
}

const initialState: VideoState = {
  videos: [],
  loading: false,
  error: "",
};

export const getRelatedVideos = createAsyncThunk(
  "video/related",
  async (id: string, { rejectWithValue }) => {
    try {
      const {
        data,
      }: {
        data: {
          items: IRelatedId[];
        };
      } = await request("/search", {
        params: {
          part: "snippet",
          relatedToVideoId: id,
          maxResults: 15,
          type: "video",
        },
      });
      console.log(data);

      return data.items;
    } catch (error: any) {
      let e: Error = error;
      return rejectWithValue(e.message);
    }
  }
);

const relatedVideoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRelatedVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getRelatedVideos.fulfilled,
        (state, action: PayloadAction<IRelatedId[]>) => {
          state.loading = false;
          state.videos = action.payload;
        }
      )
      .addCase(
        getRelatedVideos.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const selectRelatedVideo = (state: RootState) => state.relatedVideos;

export default relatedVideoSlice.reducer;
