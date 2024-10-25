import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Membuat fungsi utilitas untuk mengambil token dari local storage
const getToken = () => {
  return localStorage.getItem("token");
};

// Async thunk untuk menambah webinar
export const addWebinar = createAsyncThunk("webinars/addWebinar", async (formData, { rejectWithValue }) => {
  try {
    const token = getToken(); // Mengambil token dari local storage
    if (!token) {
      throw new Error("Token not found in local storage");
    }

    const response = await axios.post("https://digiumkm-backend.vercel.app/webinar/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const webinarSlice = createSlice({
  name: "webinars",
  initialState: {
    webinars: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addWebinar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWebinar.fulfilled, (state, action) => {
        state.loading = false;
        state.webinars.push(action.payload);
      })
      .addCase(addWebinar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default webinarSlice.reducer;
