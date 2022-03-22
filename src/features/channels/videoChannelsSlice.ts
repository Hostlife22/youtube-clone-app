import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import request from "../../api/api";
import { RootState } from "../../app/store";
import { ISubscriptionChannel, ISubscriptionsChannel } from "../../app/types";

export interface SubscriptionsState {
  videos: ISubscriptionChannel[];
  loading: boolean;
  error: any;
}

const initialState: SubscriptionsState = {
  videos: [] as ISubscriptionChannel[],
  loading: false,
  error: "any",
};

export const getSubscribedChannels = createAsyncThunk(
  "channel/subscription_channels",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).auth.accessToken;
      const { data }: { data: ISubscriptionsChannel } = await request(
        "/subscriptions",
        {
          params: {
            part: "snippet,contentDetails",
            mine: true,
          },
          headers: {
            Authorization: `Bearer ${token}`,
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

export const subscriptionsChannelSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubscribedChannels.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getSubscribedChannels.fulfilled,
        (state, action: PayloadAction<ISubscriptionChannel[]>) => {
          state.videos = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        getSubscribedChannels.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
          state.loading = false;
        }
      );
  },
});

export const selectSubsctiptions = (state: RootState) =>
  state.subscriptionsChannel;

export default subscriptionsChannelSlice.reducer;
