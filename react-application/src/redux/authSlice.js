import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// dummy user list
const DUMMY_USERS = [
  { id: 1, username: "alice", password: "1234", name: "Alice" },
  { id: 2, username: "bob", password: "abcd", name: "Bob" },
];

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    const user = DUMMY_USERS.find(u => u.username === username && u.password === password);
    if (!user) return rejectWithValue("Invalid credentials");
    return { id: user.id, username: user.username, name: user.name };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, user: null, loading: false, error: null },
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(login.fulfilled, (s, a) => { s.loading = false; s.isLoggedIn = true; s.user = a.payload; })
      .addCase(login.rejected, (s, a) => { s.loading = false; s.error = a.payload || "Login failed"; });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
