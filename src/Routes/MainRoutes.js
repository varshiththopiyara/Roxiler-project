import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Components/Login";
import Register from "../Components/Register";
import Dashboard from "../Components/UserDashboard/Dashboard";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import Users from "../Components/Users";
import Store from "../Components/Store";
import YourStores from "../Components/YourStores";

function MainRoutes() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/store-dashboard" element={<StoreDashboard />} /> */}
            {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
            <Route path="/users" element={<Users />} />
            <Route path ="/stores/all" element={<Store/>}/>
            <Route path ="/your-stores" element={<YourStores/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default MainRoutes;
