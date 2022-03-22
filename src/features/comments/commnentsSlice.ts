import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import request from "../../api/api";
import { RootState } from "../../app/store";
import { ICommentData } from "../../app/types";

export interface Comments {
  authorDisplayName: string;
  authorProfileImageUrl: string;
  id: string;
  publishedAt: string;
  textDisplay: string;
}

export interface CommentsState {
  comments: Comments[];
  loading: boolean;
  error: any;
}

export interface CommentOption {
  id: string | undefined;
  text: string;
}

const initialState: CommentsState = {
  comments: [] as Comments[],
  loading: false,
  error: "",
};

export const getCommentsOfVideoById = createAsyncThunk(
  "comments/comments_list",
  async (id: string | undefined, { rejectWithValue }) => {
    try {
      const { data }: { data: ICommentData } = await request(
        "/commentThreads",
        {
          params: {
            part: "snippet",
            videoId: id,
          },
        }
      );

      const comments = data.items.map((comment) => {
        const {
          authorDisplayName,
          authorProfileImageUrl,
          publishedAt,
          textDisplay,
        } = comment.snippet.topLevelComment.snippet;

        return {
          id: comment.id,
          authorDisplayName,
          authorProfileImageUrl,
          publishedAt,
          textDisplay,
        };
      });

      return comments;
    } catch (error: any) {
      let e: Error = error;
      return rejectWithValue(e.message);
    }
  }
);

export const addComment = createAsyncThunk(
  "commenta/create_commnet",
  async (
    commentOption: CommentOption,
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const { id, text } = commentOption;

      const obj = {
        snippet: {
          videoId: id,
          topLevelComment: {
            snippet: {
              textOriginal: text,
            },
          },
        },
      };

      await request.post("/commentThreads", obj, {
        params: {
          part: "snippet",
        },
        headers: {
          Authorization: `Bearer ${(getState() as RootState).auth.accessToken}`,
        },
      });

      setTimeout(() => dispatch(getCommentsOfVideoById(id)), 3000);
    } catch (error: any) {
      let e: Error = error;
      console.error(e.message);

      return rejectWithValue(e.message);
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    createComment: (state, action) => {
      state.comments.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsOfVideoById.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getCommentsOfVideoById.fulfilled,
        (state, action: PayloadAction<Comments[]>) => {
          state.comments = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        getCommentsOfVideoById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(addComment.fulfilled, (state) => {})
      .addCase(addComment.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      });
  },
});

export const { createComment } = commentsSlice.actions;

export const selectComments = (state: RootState) => state.commentList.comments;
export const selectSubscribiption = (state: RootState) =>
  state.channelDetails.subscriptionStatus;

export default commentsSlice.reducer;
