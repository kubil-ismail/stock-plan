import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "@/types/index";

export interface AuthState {
  profile: Profile | null;
}

const initialState: AuthState = {
  profile: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<Profile | null>) => {
      state.profile = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
