import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface UserState {
  username: string | null;
}

const initialState: UserState = {
  username: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    logout: (state) => {
      state = initialState;
    },
  },
});

export const { updateUser, logout } = userSlice.actions;

export const selectUsername = (state: RootState) => state.user.username;

export default userSlice.reducer;
