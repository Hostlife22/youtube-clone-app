import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import videosReducer from "../features/videos/videosSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    homeVideos: videosReducer,
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
