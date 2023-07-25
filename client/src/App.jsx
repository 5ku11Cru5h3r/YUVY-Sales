import { Route, Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Policy from "./pages/Policy.jsx";
import Register from "./pages/Auth/Register.jsx";
import Pagenotfound from "./pages/Pagenotfound.jsx";
import Login from "./pages/Auth/Login.jsx";
import Dashboard from './pages/user/Dashboard.jsx';
import PrivateRoute from './components/Routes/Private.jsx';
import ForgotPassword from './pages/Auth/ForgotPassword.jsx';
import AdminRoute from './components/Routes/AdminRoute.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import CreateCategory from './pages/Admin/CreateCategory.jsx';
import CreateProduct from './pages/Admin/CreateProduct.jsx';
import Users from './pages/Admin/Users.jsx';
import Orders from './pages/user/Orders.jsx';
import Profile from './pages/user/Profile.jsx';
import Products from './pages/Admin/Products.jsx';
import UpdateProduct from './pages/Admin/UpdateProduct.jsx';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<Users />} />
        </Route>
        <Route path="/*" element={<Pagenotfound />} />
      </Routes>
    </>
  )
}

export default App
