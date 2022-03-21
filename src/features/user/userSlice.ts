import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { RootState } from "../../app/store";
import auth from "../../firebase";

export interface CounterState {
  accessToken: string | null;
  user: {} | null;
  loading: boolean;
  error: any;
}

const initialState: CounterState = {
  accessToken: sessionStorage.getItem("ytc-access-token")
    ? sessionStorage.getItem("ytc-access-token")
    : null,
  user: sessionStorage.getItem("ytc-user")
    ? JSON.parse(sessionStorage.getItem("ytc-user") || "")
    : null,
  loading: false,
  error: null,
};

export const userLogin = createAsyncThunk(
  "user/login",
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const accessToken = await res.user.getIdToken();
      const user = {
        name: res.user.displayName,
        photoUrl: res.user.photoURL,
      };
      provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");
      console.log(accessToken);

      sessionStorage.setItem("ytc-access-token", accessToken);
      sessionStorage.setItem("ytc-user", JSON.stringify(user));

      return {
        accessToken,
        user,
      };
    } catch (error: any) {
      let e: Error = error;

      return rejectWithValue(e.message);
    }
  }
);

export const logOutUser = createAsyncThunk("user/log-out", async () => {
  await auth.signOut();

  sessionStorage.removeItem("ytc-access-token");
  sessionStorage.removeItem("ytc-user");
});

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {},
    decrement: (state) => {},
    incrementByAmount: (state, action: PayloadAction<number>) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload?.accessToken;
        state.user = action.payload?.user;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.accessToken = null;
        state.user = null;
      });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectUser = (state: RootState) => state.auth.user;

export default counterSlice.reducer;
