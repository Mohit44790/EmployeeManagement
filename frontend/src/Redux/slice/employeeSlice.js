import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_API_END_POINT } from "../constants/backendapi";

export const loginUser = createAsyncThunk(
  'employee/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      params.append('username', username);
      params.append('password', password);

      const response = await axios.post(
        `${USER_API_END_POINT}/auth/login`,
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
          },
        }
      );

      return {
        token: response.data.access_token,
        tokenType: response.data.token_type,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || "Login failed");
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    user: null, // You can populate this with decoded JWT later if needed
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    employeeList: [],
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = employeeSlice.actions;
export default employeeSlice.reducer;
