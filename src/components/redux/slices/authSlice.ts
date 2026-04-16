import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: any;
   accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ✅ Start Loading
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // ✅ Set User
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },

    // ✅ Set Token
   setToken: (state, action: PayloadAction<string>) => {
  state.accessToken = action.payload;
},

    // ✅ Set Error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // ✅ Logout
    logout: (state) => {
  state.user = null;
  state.accessToken = null;
  state.error = null;
  state.loading = false;
},
  },
});

export const { setUser, setToken, setLoading, setError, logout } = authSlice.actions;
export default authSlice.reducer;