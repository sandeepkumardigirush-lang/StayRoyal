import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    profileImage?: string;
    about?: string;
    location?: string;
    work?: string;
    school?: string;
    languages?: string[];
    obsessedWith?: string;
    decadedBorn?: string;
    uselessSkill?: string;
    favouriteSong?: string;
    funFact?: string;
    biographyTitle?: string;
    spendTooMuchTime?: string;
    wantedToGo?: string;
  } | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  userInfo: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.userInfo = null;
      state.isLoggedIn = false;
    },
    updateProfile: (state, action: PayloadAction<Partial<UserState['userInfo']>>) => {
      if (state.userInfo) {
        state.userInfo = { ...state.userInfo, ...action.payload };
      }
    },
  },
});

export const { login, logout, updateProfile } = userSlice.actions;
export default userSlice.reducer;
