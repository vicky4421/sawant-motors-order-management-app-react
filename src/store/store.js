// imports from third party libraries
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

// imports from project
import supplierReducer from "./supplier/supplier.slice";
import categoryReducer from "./category/categorySlice";

const store = configureStore({
  reducer: {
    supplier: supplierReducer,
    category: categoryReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
