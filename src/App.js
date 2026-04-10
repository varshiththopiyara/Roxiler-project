import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"

import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/UserDashboard/Dashboard"
import StoreDashboard from "./Components/StoreOwner/StoreDashboard";
import AdminDashboard from "./Components/SystemAdministrator/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path ="/dashboard" element={<Dashboard/>}/>
        <Route path="/store-dashboard" element= {<StoreDashboard/>}/>
        <Route path="/admin-dashboard" element = {<AdminDashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;