import React from "react";
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import CountryDetails from "./Components/Pages/CountryDetails";
import Home from "./Components/Pages/Home";
function App() {
  
  return (
    <div className="app">
      <BrowserRouter>
       <Routes>
          <Route path="/*"  element={<Navigate to="home"/> }/>
          <Route path="/home" element={<Home />} />
          <Route path="/country/:name" element={<CountryDetails />} />
       </Routes>
      </BrowserRouter>
       
    </div>
  );
}

export default App;
