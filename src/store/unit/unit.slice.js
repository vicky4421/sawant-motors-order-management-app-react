// imports from third party libraries
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

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

// async save unit actions
export const saveUnit = createAsyncThunk(
  "unit/saveUnit",
  async (unit, { dispatch }) => {
    const response = await axios
      .post("http://localhost:9000/unit", unit)
      .then((response) => response.data);
    dispatch(getUnits());
    return response;
  }
);

// async update unit actions
export const updateUnit = createAsyncThunk(
  "unit/updateUnit",
  async (unit, { dispatch }) => {
    const response = await axios
      .put(`http://localhost:9000/unit`, unit)
      .then((response) => response.data);
    dispatch(getUnits());
    return response;
  }
);

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
      })
      .addCase(saveUnit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveUnit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.units = state.units.concat(action.payload);
        state.error = "";
        Swal.fire({
          icon: "success",
          title: "Unit added successfully",
          timer: 2000,
          timerProgressBar: true,
          confirmButtonColor: "#3a3a3a",
        });
      })
      .addCase(saveUnit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      .addCase(updateUnit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUnit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.units = state.units.map((unit) => {
          if (unit.id === action.payload.id) {
            return action.payload;
          }
          return unit;
        });
        state.error = "";
        Swal.fire({
          icon: "success",
          title: "Unit updated successfully",
          timer: 2000,
          timerProgressBar: true,
          confirmButtonColor: "#3a3a3a",
        });
      })
      .addCase(updateUnit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default unitSlice.reducer;
export const { resetError } = unitSlice.actions;
