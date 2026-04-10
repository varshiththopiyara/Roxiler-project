import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function StoreDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.name || "Store Owner";

  const [showModal, setShowModal] = useState(false);

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });
 // Dummmy data
  const [ratings] = useState([
    { id: 1, user: "john", rating: 4 },
    { id: 2, user: "alice", rating: 5 },
    { id: 3, user: "rahul", rating: 3 },
  ]);

  //  Calculate average
  const averageRating =
    ratings.length > 0
    ? ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length
    : 0;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdatePassword = () => {
    console.log(passwordData);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      
      <div className="flex justify-between items-center bg-indigo-600 text-white px-6 py-4 shadow-md">
        <h1 className="text-xl font-bold">Roxiler</h1>

        <div className="flex items-center gap-4">
          <span>Welcome, {username}</span>

          <button
            onClick={() => setShowModal(true)}
            className="bg-white text-indigo-600 px-3 py-1 rounded-lg font-semibold"
          >
            Update Password
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6">

        {/*  Average Rating */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-2">Average Rating</h2>
          <p className="text-2xl font-bold text-yellow-500">
            {averageRating.toFixed(1)} ⭐
          </p>
        </div>

        {/* Users who rated */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">
            Users who rated your store
          </h2>

          <table className="w-full text-center border">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-2">User</th>
                <th className="py-2">Rating</th>
              </tr>
            </thead>

            <tbody>
              {ratings.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-2">{item.user}</td>
                  <td className="py-2 text-yellow-500">
                    {"★".repeat(item.rating)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

   
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[300px]">

            <h3 className="text-lg font-bold mb-4">Update Password</h3>

            <input
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              value={passwordData.oldPassword}
              onChange={handlePasswordChange}
              className="w-full mb-3 px-3 py-2 border rounded"
            />

            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="w-full mb-3 px-3 py-2 border rounded"
            />

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
    </div>
  );
}

export default StoreDashboard;