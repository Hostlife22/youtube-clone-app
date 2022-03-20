import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import channelReducer from "../features/channel/channelSlice";
import userReducer from "../features/user/userSlice";
import videoReducer from "../features/video/videoSlice";
import videosReducer from "../features/videos/videosSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    homeVideos: videosReducer,
    selectedVideo: videoReducer,
    channelDetails: channelReducer,
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
