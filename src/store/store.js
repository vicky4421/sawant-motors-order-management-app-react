// imports from third party libraries
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

// imports from project
import supplierReducer from "./supplier/supplier.slice";

const store = configureStore({
  reducer: {
    supplier: supplierReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
