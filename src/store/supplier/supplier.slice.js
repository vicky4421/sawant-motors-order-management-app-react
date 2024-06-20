// imports from third party libraries
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// default state
const initialState = {
  name: "",
  contactNumbersList: [],
  isLoading: false,
  error: "",
};

export const saveSupplier = createAsyncThunk(
  "supplier/saveSupplier",
  async (supplier) => {
    console.log(supplier);
    return await axios
      .post("http://localhost:9000/supplier", supplier)
      .then((response) => response.data);
  }
);

const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(saveSupplier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.name = action.payload.name;
        state.contactNumbersList = action.payload.contactNumbersList;
      })
      .addCase(saveSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default supplierSlice.reducer;
