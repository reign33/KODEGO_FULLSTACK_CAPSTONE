import React from 'react';
import "./index.css";
import LoginUi from "./components/LoginUi";
import SignUpUi from './components/SignUpUi';
import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
  <>
  <BrowserRouter>
  <Routes>
    <Route>
    <Route exact path="/" element={<p>Homepage sample</p>} />
        <Route path="/login" element={<LoginUi/>} />
        <Route path="/signup" element={<SignUpUi/>} />
    </Route>
  </Routes>
  </BrowserRouter>
  </>
    
  )
}

export default App;