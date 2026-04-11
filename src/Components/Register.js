import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../lib/instance";
import { useAuth } from "./AuthContext";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { registerUser } = useAuth();
  const [loading,setLoading]=useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    password: "",
    role: "USER",
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
    const { name, address, email, password } = formData;

    if (name.length < 20 || name.length > 60) {
      return "Name must be between 20 and 60 characters";
    }

    if (address.length > 400) {
      return "Address must not exceed 400 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

    if (!passwordRegex.test(password)) {
      return "Password must be 8-16 chars, include 1 uppercase & 1 special character";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    console.log("fcghb", formData);
    setLoading(true);
    try {
      const res = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        role: formData.role,
      });
      if (res.data.success) {
        setSnackbar({
          show: true,
          message: res.data.message || "Registration Successful 🎉",
          type: "success",
        });
        setTimeout(() => {
          setSnackbar((prev) => ({ ...prev, show: false }));
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      setSnackbar({
        show: true,
        message: err || "Login failed",
        type: "error",
      });
    }
    finally {
      setLoading(false);
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

      <div className="bg-white p-8 rounded-2xl shadow-lg w-[380px] relative">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <textarea
            name="address"
            placeholder="Enter Address"
            value={formData.address}
            onChange={handleChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="3"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
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

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="USER">User</option>
            <option value="STOREOWNER">Store Owner</option>
          </select>

          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200 font-semibold" 
            disabled={loading}
          >
            {
              loading ? "Please Wait": "Register"
            }
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-indigo-600 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
