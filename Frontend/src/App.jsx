import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import "./index.css";
import LoginUi from "./components/LoginUi";
import SignUpUi from './components/SignUpUi';
// import noteService from "./services/userService.js";
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

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const hideSidebar1 = location.pathname == '/login';
  const hideSidebar2 = location.pathname == '/signup';

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNotesUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      // noteService.setToken(user.token);
      setUser(user);
    }
  }, []);

  
  return (
      
    < div className={!hideSidebar1&&!hideSidebar2 &&'flex bg-gray-50'}>
        {!hideSidebar1&&!hideSidebar2 && <Sidebar />}
      
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

          <Route path="/" element={<Dashboard user={user} setUser={setUser}/>} />
          <Route path="/addunit" element={<AddUnit />} />
          <Route path="/manageunit" element={<ManageUnit />} />
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/managecategory" element={<ManageCategory />} />
          <Route path="/addproducts" element={<AddProducts />} />
          <Route path="/manageproducts" element={<ManageProducts />} />
          <Route path="/manageusers" element={<Users />} />
          <Route path="/reports" element={<Reports />} />
      </Routes>
      </div>
      
 
    
  );
}


export default App;
