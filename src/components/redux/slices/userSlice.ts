import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  roles: any[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  roles: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setRoles: (state, action: PayloadAction<any[]>) => {
      state.roles = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setRoles, setError } = userSlice.actions;
export default userSlice.reducer;