import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import request from "../../api/api";
import { RootState } from "../../app/store";
import { IUploadChannel, IvideoChannel, IVideosChannel } from "../../app/types";

export interface SubscriptionsState {
  videos: IvideoChannel[];
  loading: boolean;
  error: any;
}

const initialState: SubscriptionsState = {
  videos: [] as IvideoChannel[],
  loading: false,
  error: "",
};

export const getVideosByChannel = createAsyncThunk(
  "channel/videos_channel",
  async (id: string | undefined, { rejectWithValue }) => {
    try {
      const {
        data: { items },
      }: { data: IUploadChannel } = await request("/channels", {
        params: {
          part: "contentDetails",
          id: id,
        },
      });

      const uploadPlayListId = items[0].contentDetails.relatedPlaylists.uploads;

      const { data }: { data: IVideosChannel } = await request(
        "/playlistItems",
        {
          params: {
            part: "contentDetails, snippet",
            playlistId: uploadPlayListId,
            maxResults: 30,
          },
        }
      );

      return data.items;
    } catch (error: any) {
      let e: Error = error;
      return rejectWithValue(e.message);
    }
  }
);

export const videosChannelSlice = createSlice({
  name: "channelVideos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVideosByChannel.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getVideosByChannel.fulfilled,
        (state, action: PayloadAction<IvideoChannel[]>) => {
          state.loading = false;
          state.videos = action.payload;
        }
      )
      .addCase(
        getVideosByChannel.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const selectVideosChannel = (state: RootState) => state.channelVideos;

export default videosChannelSlice.reducer;
