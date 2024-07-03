// imports from third party libraries
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import Swal from "sweetalert2";

// default state
const initialState = {
  products: [],
  isLoading: false,
  error: "",
};

// async get all products actions
export const getProducts = createAsyncThunk("product/getProduct", async () => {
  return await axios
    .get("http://localhost:9000/product/allProducts")
    .then((response) => response.data);
});

// slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.products = [];
      });
  },
});

// export actions
export const { resetError } = productSlice.actions;
export default productSlice.reducer;
