// imports from third party libraries
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

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
    return await axios
      .post("http://localhost:9000/supplier", supplier)
      .then((response) => response.data);
  }
);

const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveSupplier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.name = action.payload.name;
        state.contactNumbersList = action.payload.contactNumbersList;
        state.error = "";
        Swal.fire({
          icon: "success",
          title: "Supplier saved successfully",
          text: "success",
          confirmButtonColor: "#3a3a3a",
        });
      })
      .addCase(saveSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.name = "";
        state.contactNumbersList = [];
        state.error = action.error.message;
      });
  },
});

export const { resetError } = supplierSlice.actions;
export default supplierSlice.reducer;
