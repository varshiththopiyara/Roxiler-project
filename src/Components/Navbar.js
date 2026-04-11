import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import axiosInstance from "../lib/instance";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const currentRole = user?.role;

  const [showModal, setShowModal] = useState(false);

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

 
  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };


  const handleUpdatePassword = async () => {
    try {
      if (!passwordData.oldPassword || !passwordData.newPassword) {
        alert("All fields required");
        return;
      }

      const res = await axiosInstance.put("/auth/update", {
        oldPassword: passwordData.oldPassword,
        password: passwordData.newPassword,
      });

      console.log("Password updated:", res.data);

      if (res?.data?.success) {
        alert("Password updated successfully ✅");

        setShowModal(false);
        setPasswordData({
          oldPassword: "",
          newPassword: "",
        });
      }
    } catch (error) {
      console.error(error);

      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update password";

      alert(msg);
    }
  };

  //  Navigation links
  const navlinks = [
    {
      title: "Home",
      redirect: "/dashboard",
      allowRoles: ["USER", "STOREOWNER", "ADMIN"],
    },
    {
      title: "Users",
      redirect: "/users",
      allowRoles: ["ADMIN"],
    },
    {
      title: "Stores",
      redirect: "/stores/all",
      allowRoles: ["ADMIN", "USER"],
    },
    {
      title: "Your Stores",
      redirect: "/your-stores",
      allowRoles: ["STOREOWNER"],
    },
  ];

  const viewLinks = navlinks.filter((link) =>
    link.allowRoles.includes(currentRole)
  );

  return (
    <>
      {/* Navbar */}
      <div className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">Roxiler</h1>

        <div className="flex items-center gap-6 text-sm font-medium">
          {viewLinks.map((link, index) => (
            <Link key={index} to={link.redirect}>
              {link.title}
            </Link>
          ))}

          {(currentRole === "STOREOWNER" || currentRole === "USER") && (
            <button onClick={() => setShowModal(true)}>
              Update Password
            </button>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[320px] shadow-lg">
            <h3 className="text-lg font-bold mb-4 text-center">
              Update Password
            </h3>

            {/* Old Password */}
            <div className="relative mb-3">
              <input
                type={showOld ? "text" : "password"}
                name="oldPassword"
                placeholder="Old Password"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border rounded pr-10"
              />

              <span
                onClick={() => setShowOld(!showOld)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showOld ? "🙈" : "👁️"}
              </span>
            </div>

            {/* New Password */}
            <div className="relative mb-4">
              <input
                type={showNew ? "text" : "password"}
                name="newPassword"
                placeholder="New Password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border rounded pr-10"
              />

              <span
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showNew ? "🙈" : "👁️"}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-3 py-1 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdatePassword}
                className="bg-indigo-600 text-white px-3 py-1 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;