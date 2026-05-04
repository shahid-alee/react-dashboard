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
import OrderView from "./components/pages/order/OrderView";
import OrderEdit from "./components/pages/order/OrderEdit";
import EditUser from "./components/pages/user/EditUser";
import EditCategory from "./components/pages/category/EditCategory";
import EditSubcategory from "./components/pages/subcategory/EditSubcategory";
import Login from "./components/pages/auth/login";
import Register from "./components/pages/auth/Register";
import EditProfile from "./components/pages/profile/EditProfile";
import ChangePassword from "./components/pages/profile/ChangePassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/users" element={<User />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/products" element={<Product />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/category" element={<Category />} />
        <Route path="/edit-category/:id" element={<EditCategory />} />
        <Route path="/add-subcategory" element={<AddSubcategory />} />
        <Route path="/subcategory" element={<Subcategory />} />
        <Route path="/edit-subcategory/:id" element={<EditSubcategory />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order/:id" element={<OrderView />} />
        <Route path="/order-edit/:id" element={<OrderEdit />} />


      </Routes>
    </Router>
  );
}

export default App;