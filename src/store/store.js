// imports from third party libraries
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

// imports from project
import supplierReducer from "./supplier/supplier.slice";
import categoryReducer from "./category/category.slice";
import productReducer from "./product/product.slice";
import unitReducer from "./unit/unit.slice";

const store = configureStore({
  reducer: {
    supplier: supplierReducer,
    category: categoryReducer,
    product: productReducer,
    unit: unitReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
