import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fungsi utilitas untuk mengambil token dari local storage
const getToken = () => localStorage.getItem("token");

// Async thunk untuk menambah webinar
export const addWebinar = createAsyncThunk("webinars/addWebinar", async (formData, { rejectWithValue }) => {
  try {
    const token = getToken(); // Mengambil token dari local storage
    if (!token) {
      throw new Error("Token tidak ditemukan di local storage");
    }

    // Mengirim data dalam format JSON
    const response = await axios.post("https://digiumkm-backend.vercel.app/webinar/add", formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response ? err.response.data : err.message);
  }
});

const webinarSlice = createSlice({
  name: "webinars",
  initialState: {
    webinars: [],
    loading: false,
    error: null,
  },
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
