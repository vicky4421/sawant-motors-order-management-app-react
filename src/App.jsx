// imports from third party libraries
import { Routes, Route } from "react-router-dom";

// imports from this project
import Home from "./routes/home/home.component";
import Products from "./routes/products/products.component";
import Suppliers from "./routes/suppliers/suppliers.component";
import Order from "./routes/order/order.component";
import "./App.css";
import Navigation from "./routes/navigation/navigation.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="order" element={<Order />} />
        <Route path="products" element={<Products />} />
        <Route path="suppliers" element={<Suppliers />} />
      </Route>
    </Routes>
  );
}

export default App;
