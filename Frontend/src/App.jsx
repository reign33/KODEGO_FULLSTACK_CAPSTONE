import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import "./index.css";
import LoginUi from "./components/LoginUi";
import SignUpUi from './components/SignUpUi';
import categoryService from "./services/categoryService.js";
import Dashboard from './pages/Dashboard';
import AddCategory from './pages/AddCategory';
import ManageProducts from './pages/ManageProducts';
import ManageCategory from './pages/ManageCategory';
import ManageUnit from './pages/ManageUnit';
import AddProducts from './pages/AddProducts';
import AddUnit from './pages/AddUnit';
import Users from './pages/Users';
import Reports from './pages/Reports';
import Sidebar from './pages/Sidebar';
import NavbarSignIn from './pages/NavbarSignIn.jsx';
import unitService from './services/unitService.js';
import productService from './services/productService.js';
import profileService from './services/profileService.js';


function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const hideSidebar1 = location.pathname === '/login';
  const hideSidebar2 = location.pathname === '/signup';
 

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      categoryService.setToken(user.token);
      unitService.setToken(user.token);
      productService.setToken(user.token);
      setUser(user);
      profileService.setToken(user.token);
    }
  }, []);

  
  return (
  <div>
    {!hideSidebar1&&!hideSidebar2 && <NavbarSignIn user={user} setUser={setUser} />}
      <div className={!hideSidebar1&&!hideSidebar2? 'flex bg-gray-50' : ''}>
        {!hideSidebar1&&!hideSidebar2 && <Sidebar user={user} setUser={setUser} />}
      
      <Routes>
        <Route 
          path="/login" 
          element={<LoginUi
          user={user}
          setUser={setUser}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          />} />
        <Route 
          path="/signup" 
          element={<SignUpUi
          user={user}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          />} />

          <Route 
          path="/" 
          element={<Dashboard 
          user={user} 
          setUser={setUser}/>} />
          
          <Route 
          path="/addunit" 
          element={<AddUnit 
          user={user} 
          isLoading={isLoading} 
          setIsLoading={setIsLoading} 
          />} />

          <Route path="/manageunit" element={<ManageUnit 
          user={user} 
          isLoading={isLoading} 
          setIsLoading={setIsLoading} 
          />} />
          
          <Route 
          path="/addcategory" 
          element={<AddCategory 
          user={user} 
          setUser={setUser} 
          isLoading={isLoading} 
          setIsLoading={setIsLoading} 
          />} />

          <Route 
          path="/managecategory" 
          element={<ManageCategory 
          user={user} 
          isLoading={isLoading} 
          setIsLoading={setIsLoading} 
          />} />
          
          <Route 
          path="/addproducts" 
          element={<AddProducts 
          user={user} 
          isLoading={isLoading} 
          setIsLoading={setIsLoading} 
          />} />
          
          <Route 
          path="/manageproducts" 
          element={<ManageProducts 
          user={user}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          />} />
          
          <Route 
          path="/manageusers" 
          element={<Users 
          user={user}
          isLoading={isLoading}
          setIsLoading={setIsLoading} 
          />} />

          <Route 
          path="/reports" 
          element={<Reports 
          user={user} 
          isLoading={isLoading} 
          setIsLoading={setIsLoading} 
          />} />

          <Route path="*" element={<Navigate to="/login"/>} />
        
      </Routes>
    </div>
  </div>
       
  );
}


export default App;
