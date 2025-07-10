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
      console.error(err);
      return rejectWithValue(err.response?.data?.detail || "Login failed");
    }
  }
);

export const fetchDailyUpdates = createAsyncThunk(
  "employee/fetchDailyUpdates",
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().employee;
    try {
      const response = await axios.get(
        `${USER_API_END_POINT}/employee/daily-employee-update`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Expecting an array of employee objects
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Fetch failed");
    }
  }
);

export const fetchAvailableCycles = createAsyncThunk(
  "employee/fetchAvailableCycles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${USER_API_END_POINT}/admin/available-cycles`);
      return response.data.cycles || [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch cycles");
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    user: null, // You can populate this with decoded JWT later if needed
    token: sessionStorage.getItem("token") || null,
    loading: false,
    error: null,
    employeeList: [],
     cycles: [],
  cyclesLoading: false,
  cyclesError: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      sessionStorage.removeItem("token");
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
        sessionStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDailyUpdates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailyUpdates.fulfilled, (state, action) => {
        state.loading = false;
        state.employeeList = action.payload;
      })
      .addCase(fetchDailyUpdates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAvailableCycles.pending, (state) => {
        state.cyclesLoading = true;
        state.cyclesError = null;
      })
      .addCase(fetchAvailableCycles.fulfilled, (state, action) => {
        state.cyclesLoading = false;
        state.cycles = action.payload;
      })
      .addCase(fetchAvailableCycles.rejected, (state, action) => {
        state.cyclesLoading = false;
        state.cyclesError = action.payload;
      });
  },
});

export const { logout } = employeeSlice.actions;
export default employeeSlice.reducer;
