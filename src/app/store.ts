import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import channelReducer from "../features/channel/channelSlice";
import subscriptionChannelsReducer from "../features/channels/videoChannelsSlice";
import commnentsReducer from "../features/comments/commnentsSlice";
import relatedVideoReducer from "../features/relatedVideos/relatedVideoSlice";
import searchedVideosReducer from "../features/search/searchSlice";
import userReducer from "../features/user/userSlice";
import videoReducer from "../features/video/videoSlice";
import videosReducer from "../features/videos/videosSlice";
import videosChannelReducer from "../features/videosChannel/videosChannelSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    homeVideos: videosReducer,
    selectedVideo: videoReducer,
    channelDetails: channelReducer,
    commentList: commnentsReducer,
    relatedVideos: relatedVideoReducer,
    searchedVideos: searchedVideosReducer,
    subscriptionsChannel: subscriptionChannelsReducer,
    channelVideos: videosChannelReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
