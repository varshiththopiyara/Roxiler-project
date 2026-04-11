import React from "react";
import "./App.css";
import MainRoutes from "./Routes/MainRoutes";
import { AuthProvider } from "./Components/AuthContext";

function App() {
  return (
    <AuthProvider>
      <MainRoutes />
    </AuthProvider>
  );
}

export default App;
