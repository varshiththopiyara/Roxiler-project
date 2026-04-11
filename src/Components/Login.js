import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Login() {
  const navigate = useNavigate();
  let [showPassword,setShowPassword] = useState(false);
  const {login}= useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [snackbar, setSnackbar] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { email, password } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

    if (!passwordRegex.test(password)) {
      return "Password must include uppercase & special character";
    }

    return null;
  };

  const handleSubmit = async(e) => {
  e.preventDefault();
   console.log("hello",formData);

  try {
    const res = await login({
        email: formData.email,
        password: formData.password,
      });
      if(res.data.success){
        navigate("/dashboard")
      }
  } catch (error) {
    console.error("Login error:", error);

    setSnackbar({
      show: true,
      message: error || "Login failed",
      type: "error",
    });
    
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">

      {snackbar.show && (
        <div
          className={`fixed top-5 right-5 px-6 py-3 rounded-lg shadow-lg text-white ${
            snackbar.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {snackbar.message}
        </div>
      )}

      <div className="bg-white p-8 rounded-2xl shadow-lg w-[350px]">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            className="px-4 py-2 border rounded-lg"
          />

          <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                className="px-4 py-2 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                required
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 z-10"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

          <button className="bg-indigo-600 text-white py-2 rounded-lg">
            Login
          </button>
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-indigo-600 cursor-pointer hover:underline"
            >
              Register
            </span>
            </p>
        </form>
      </div>
    </div>
  );
}

export default Login;