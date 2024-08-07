// imports from third party libraries
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

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

// async save product actions
export const saveProduct = createAsyncThunk(
  "product/saveProduct",
  async (product, { dispatch }) => {
    const response = await axios
      .post("http://localhost:9000/product", product)
      .then((response) => response.data);
    dispatch(getProducts());
    return response;
  }
);

// async delete product actions
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { dispatch }) => {
    const response = await axios
      .delete(`http://localhost:9000/product/deleteProduct/${id}`)
      .then((response) => response.data);
    dispatch(getProducts());
    return response;
  }
);

// async update product actions
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (product, { dispatch }) => {
    const response = await axios
      .put(`http://localhost:9000/product`, product)
      .then((response) => response.data);
    dispatch(getProducts());
    return response;
  }
);

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
      })
      .addCase(saveProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.concat(action.payload);
        state.error = "";
        Swal.fire({
          icon: "success",
          title: "Product added successfully",
          timer: 2000,
          timerProgressBar: true,
          confirmButtonColor: "#3a3a3a",
        });
      })
      .addCase(saveProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const productId = action.payload.id;
        state.isLoading = false;
        state.error = "";
        state.products = state.products.filter(
          (product) => product.id !== productId
        );
        Swal.fire({
          icon: "success",
          title: "Product deleted successfully",
          timer: 2000,
          timerProgressBar: true,
          confirmButtonColor: "#3a3a3a",
        });
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: action.error.message,
          timer: 2000,
          timerProgressBar: true,
          confirmButtonColor: "#3a3a3a",
        });
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const { id } = action.payload.id;
        state.products = state.products.map((product) => {
          if (product.id === id) {
            return action.payload;
          }
          return product;
        });
        state.isLoading = false;
        state.error = "";
        Swal.fire({
          icon: "success",
          title: "Product updated successfully",
          timer: 2000,
          timerProgressBar: true,
          confirmButtonColor: "#3a3a3a",
        });
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: action.error.message,
          timer: 2000,
          timerProgressBar: true,
          confirmButtonColor: "#3a3a3a",
        });
      });
  },
});

// export actions
export const { resetError } = productSlice.actions;
export default productSlice.reducer;
