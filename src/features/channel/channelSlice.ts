import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import request from "../../api/api";
import { RootState } from "../../app/store";
import { IChannel, IChannelDetails } from "../../app/types";

export interface ChannelState {
  channel: IChannel;
  loading: boolean;
  error: any;
  subscriptionStatus: boolean;
}

const initialState: ChannelState = {
  channel: {} as IChannel,
  loading: false,
  subscriptionStatus: false,
  error: "",
};

export const getChannelDetails = createAsyncThunk(
  "channel/channel_details",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data }: { data: IChannelDetails } = await request("/channels", {
        params: {
          part: "snippet,statistics,contentDetails",
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

export const checkSubscriptionStatus = createAsyncThunk(
  "subscription/set_subscription_status",
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).auth.accessToken;
      const { data }: { data: IChannelDetails } = await request(
        "/subscriptions",
        {
          params: {
            part: "snippet,contentDetails",
            forChannelId: id,
            mine: true,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return { status: data.items.length !== 0 };
    } catch (error: any) {
      let e: Error = error;
      return rejectWithValue(e.message);
    }
  }
);

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChannelDetails.pending, (state) => {
        state.loading = true;
        state.channel = {} as IChannel;
      })
      .addCase(
        getChannelDetails.fulfilled,
        (state, action: PayloadAction<IChannel>) => {
          state.channel = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        getChannelDetails.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.channel = {} as IChannel;
          state.error = action.payload;
        }
      )
      .addCase(
        checkSubscriptionStatus.fulfilled,
        (state, action: PayloadAction<{ status: boolean }>) => {
          state.subscriptionStatus = action.payload.status;
        }
      );
  },
});

export const selectChannel = (state: RootState) => state.channelDetails.channel;
export const selectSubscribiption = (state: RootState) =>
  state.channelDetails.subscriptionStatus;

export default channelSlice.reducer;
