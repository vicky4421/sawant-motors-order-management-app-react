// imports from third party libraries
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

// default state
const initialState = {
  categories: [],
  isLoading: false,
  error: "",
};

// async get all categories actions
export const getCategories = createAsyncThunk(
  "category/getCategory",
  async () => {
    return await axios
      .get("http://localhost:9000/productCategory/allCategories")
      .then((response) => response.data);
  }
);

// async save category actions
export const saveCategory = createAsyncThunk(
  "category/saveCategory",
  async (category, { dispatch }) => {
    const response = await axios
      .post("http://localhost:9000/productCategory", category)
      .then((response) => response.data);
    dispatch(getCategories());
    return response;
  }
);

// async delete category actions
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (categoryId, { dispatch }) => {
    const response = await axios
      .delete(
        `http://localhost:9000/productCategory/deleteCategory/${categoryId}`
      )
      .then((response) => response.data);
    dispatch(getCategories());
    return response;
  }
);

// async update category actions
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (category, { dispatch }) => {
    const response = await axios
      .put(`http://localhost:9000/productCategory`, category)
      .then((response) => response.data);
    dispatch(getCategories());
    return response;
  }
);

// slice
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = state.categories.concat(action.payload);
        state.error = "";
        Swal.fire({
          icon: "success",
          title: "Category added successfully",
          timer: 2000,
          timerProgressBar: true,
          confirmButtonColor: "#3a3a3a",
        });
      })
      .addCase(saveCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
        state.error = "";
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.categories = [];
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        const categoryId = action.payload.id;
        state.isLoading = false;
        state.categories = state.categories.filter(
          (category) => category.id !== categoryId
        );
        state.error = "";
        Swal.fire({
          icon: "success",
          title: "Category deleted successfully",
          text: "success",
          confirmButtonColor: "#3a3a3a",
          timer: 2000,
          timerProgressBar: true,
        });
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const { categoryId, parentCategory } = action.payload.id;
        state.isLoading = false;
        state.categories = state.categories.map((category) => {
          if (category.id === categoryId) {
            return { ...category, parentCategory };
          }
          return category;
        });
        state.error = "";
        Swal.fire({
          icon: "success",
          title: "Category updated successfully",
          text: "success",
          confirmButtonColor: "#3a3a3a",
          timer: 2000,
          timerProgressBar: true,
        });
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// export actions
export const { resetError } = categorySlice.actions;
export default categorySlice.reducer;
