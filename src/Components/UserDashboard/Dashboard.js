import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.name || "User";

  const [showModal, setShowModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

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
  const [search, setSearch] = useState("");

const [stores, setStores] = useState([
  {
    id: 1,
    name: "ABC Store",
    address: "Hyderabad",
    rating: 4.2,
    userRating: 0,
  },
  {
    id: 2,
    name: "XYZ Mart",
    address: "Bangalore",
    rating: 3.8,
    userRating: 0,
  },
]);

const filteredStores = stores.filter(
  (store) =>
    store.name.toLowerCase().includes(search.toLowerCase()) ||
    store.address.toLowerCase().includes(search.toLowerCase())
);
const handleRating = (id, value) => {
  const updatedStores = stores.map((store) =>
    store.id === id ? { ...store, userRating: value } : store
  );
  setStores(updatedStores);
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

      {/* Content */}
      <div className="p-6">
          <input
            type="text"
            placeholder="Search by store name or address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4 px-4 py-2 border rounded-lg w-full md:w-1/3"
          />
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">

      <thead className="bg-indigo-600 text-white">
        <tr>
          <th className="px-4 py-2">Store Name</th>
          <th className="px-4 py-2">Address</th>
          <th className="px-4 py-2">Overall Rating</th>
          <th className="px-4 py-2">Your Rating</th>
          <th className="px-4 py-2">Action</th>
        </tr>
      </thead>

      <tbody>
        {filteredStores.map((store) => (
          <tr key={store.id} className="text-center border-b">

            <td className="px-4 py-2">{store.name}</td>
            <td className="px-4 py-2">{store.address}</td>
            <td className="px-4 py-2">{store.rating}</td>

          
            <td className="px-4 py-2">
              {store.userRating ? store.userRating : "Not Rated"}
            </td>

            {/* User Rating  */}
            <td className="px-4 py-2 flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleRating(store.id, star)}
                  className={`cursor-pointer text-xl ${
                    store.userRating >= star ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </td>

          </tr>
        ))}
      </tbody>

    </table>
  </div>
</div>

      {/* Password Updation  */}
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

export default Dashboard;
