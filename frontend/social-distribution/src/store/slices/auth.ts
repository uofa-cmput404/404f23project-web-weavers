import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthorResponse } from "../../types";

type State = {
  token: string | null;
  refreshToken: string | null;
  account: AuthorResponse | null;
};

const initialState: State = { token: null, refreshToken: null, account: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthTokens(
      state: State,
      action: PayloadAction<{ token: string; refreshToken: string }>
    ) {
      state.refreshToken = action.payload.refreshToken;
      state.token = action.payload.token;
    },
    setAccount(state: State, action: PayloadAction<AuthorResponse>) {
      state.account = action.payload;
    },
    logout(state: State) {
      state.account = null;
      state.refreshToken = null;
      state.token = null;
    },
    register(state: State, action: PayloadAction<AuthorResponse>) {
      state.account = action.payload;
    }
  },
});

export default authSlice;