import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

type Post = {
  type?: string | undefined;
  id?: string | null | undefined;
  content?: string | undefined;
  owner?: string | null | undefined;
  timestamp?: number | undefined;
} | null;

export interface PostsState {
  posts: Post[];
  nextToken?: string | null;
  isLoading: boolean;
}

const initialState: PostsState = {
  posts: [],
  nextToken: null,
  isLoading: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    initialQuery: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    additionalQuery: (state, action: PayloadAction<Post[]>) => {
      state.posts = [...state.posts, ...action.payload];
    },
    subscriptionPosts: (state, action: PayloadAction<Post>) => {
      state.posts = [action.payload, ...state.posts];
    },
    fetchNextToken: (state, action: PayloadAction<string>) => {
      state.nextToken = action.payload;
    },
    changeLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  initialQuery,
  additionalQuery,
  subscriptionPosts,
  fetchNextToken,
  changeLoadingStatus,
} = postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectNextToken = (state: RootState) => state.posts.nextToken;
export const selectIsLoading = (state: RootState) => state.posts.isLoading;

export default postsSlice.reducer;
