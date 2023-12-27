import React from 'react';
import "./index.css";
import LoginUi from "./components/LoginUi";
import SignUpUi from './components/SignUpUi';
import Sidebar from './pages/Sidebar'
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
  <>
  <Sidebar />
  <BrowserRouter>
  <Routes>
    <Route>
    <Route exact path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginUi/>} />
        <Route path="/signup" element={<SignUpUi/>} />
    </Route>
  </Routes>
  </BrowserRouter>
  </>
    
  )
}

export default App;