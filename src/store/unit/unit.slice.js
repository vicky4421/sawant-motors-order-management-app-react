// imports from third party libraries
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// default state
const initialState = {
  units: [],
  isLoading: false,
  error: "",
};

// async get all units actions
export const getUnits = createAsyncThunk("unit/getUnit", async () => {
  return await axios
    .get("http://localhost:9000/unit/allUnits")
    .then((response) => response.data);
});

// slice
const unitSlice = createSlice({
  name: "unit",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUnits.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUnits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.units = action.payload;
      })
      .addCase(getUnits.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.units = [];
      });
  },
});

export default unitSlice.reducer;
export const { resetError } = unitSlice.actions;
