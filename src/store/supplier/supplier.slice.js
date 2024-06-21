// imports from third party libraries
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

// default state
const initialState = {
  name: "",
  whatsappNumber: "",
  alternateNumber: "",
  suppliers: [],
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

export const getSupplier = createAsyncThunk(
  "supplier/getSupplier",
  async () => {
    return await axios
      .get("http://localhost:9000/supplier/allSuppliers")
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
        state.whatsappNumber = action.payload.whatsappNumber;
        state.alternateNumber = action.payload.alternateNumber;
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
        state.whatsappNumber = "";
        state.alternateNumber = "";
        state.error = action.error.message;
      })

      .addCase(getSupplier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suppliers = action.payload;
      })
      .addCase(getSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.suppliers = [];
        state.error = action.error.message;
      });
  },
});

export const { resetError } = supplierSlice.actions;
export default supplierSlice.reducer;
