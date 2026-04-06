import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import AddUser from "./components/pages/user/AddUser";
import User from "./components/pages/user/UserList";
import AddProduct from "./components/pages/product/AddProduct";
import Product from "./components/pages/product/ProductList";
import AddCategory from "./components/pages/category/AddCategory";
import Category from "./components/pages/category/CategoryList";
import Subcategory from "./components/pages/subcategory/SubcategoryList";
import AddSubcategory from "./components/pages/subcategory/AddSubcategory";
import Orders from "./components/pages/order/Order";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/users" element={<User/>} />
        <Route path="/add-product" element={<AddProduct/>} />
        <Route path="/products" element={<Product/>} />
        <Route path="/add-category" element={<AddCategory/>} />
        <Route path="/category" element={<Category/>} />
        <Route path="/add-subcategory" element={<AddSubcategory/>} />
        <Route path="/subcategory" element={<Subcategory/>} />
        <Route path="/orders" element={<Orders/>} />
      </Routes>
    </Router>
  );
}

export default App;