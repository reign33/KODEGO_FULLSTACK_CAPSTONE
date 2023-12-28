import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./index.css";
import LoginUi from "./components/LoginUi";
import SignUpUi from './components/SignUpUi';
import Dashboard from './pages/Dashboard';
import AddCategory from './pages/AddCategory';
import ManageProducts from './pages/ManageProducts';
import ManageCategory from './pages/ManageCategory';
import ManageUnit from './pages/ManageUnit';
import AddProducts from './pages/AddProducts';
import AddUnit from './pages/AddUnit';
import Users from './pages/Users';
import Reports from './pages/Reports';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/addunit" element={<AddUnit />} />
          <Route path="/manageunit" element={<ManageUnit />} />
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/managecategory" element={<ManageCategory />} />
          <Route path="/addproducts" element={<AddProducts />} />
          <Route path="/manageproducts" element={<ManageProducts />} />
          <Route path="/users" element={<Users />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/login" element={<LoginUi />} />
          <Route path="/signup" element={<SignUpUi />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
