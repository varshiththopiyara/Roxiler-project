import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.name || "Admin";

  // Dummy data
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@mail.com", address: "Delhi", role: "user" },
    { id: 2, name: "Admin User", email: "admin@mail.com", address: "Mumbai", role: "admin" },
  ]);

  const [stores] = useState([
    { id: 1, name: "ABC Store", email: "abc@mail.com", address: "Hyderabad", rating: 4.2 },
  ]);

  const [search, setSearch] = useState("");

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "user",
  });

  //  dummy values[ratings]
  const totalUsers = users.length;
  const totalStores = stores.length;
  const totalRatings = 10; 

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddUser = () => {
    const newEntry = {
      ...newUser,
      id: Date.now(),
    };

    setUsers([...users, newEntry]);

    setNewUser({
      name: "",
      email: "",
      password: "",
      address: "",
      role: "user",
    });
  };

  //  Filter
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.address.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">

     
      <div className="flex justify-between items-center bg-indigo-600 text-white px-6 py-4">
        <h1 className="text-xl font-bold">Roxiler Admin</h1>
        <div className="flex gap-4">
          <span>Welcome, {username}</span>
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
            Logout
          </button>
        </div>
      </div>

      <div className="p-6">

        {/*  Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">Users: {totalUsers}</div>
          <div className="bg-white p-4 rounded shadow">Stores: {totalStores}</div>
          <div className="bg-white p-4 rounded shadow">Ratings: {totalRatings}</div>
        </div>

        {/*  Add User */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="font-semibold mb-3">Add User</h2>

          <div className="grid grid-cols-2 gap-3">
            <input name="name" placeholder="Name" value={newUser.name} onChange={handleChange} className="border p-2 rounded" />
            <input name="email" placeholder="Email" value={newUser.email} onChange={handleChange} className="border p-2 rounded" />
            <input name="password" placeholder="Password" value={newUser.password} onChange={handleChange} className="border p-2 rounded" />
            <input name="address" placeholder="Address" value={newUser.address} onChange={handleChange} className="border p-2 rounded" />

            <select name="role" value={newUser.role} onChange={handleChange} className="border p-2 rounded">
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="store_owner">Store Owner</option>
            </select>

            <button
              onClick={handleAddUser}
              className="bg-indigo-600 text-white p-2 rounded"
            >
              Add User
            </button>
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 px-4 py-2 border rounded w-full md:w-1/3"
        />

        {/*  Users Table */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="font-semibold mb-3">Users</h2>

          <table className="w-full text-center">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Role</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id} className="border-b">
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.address}</td>
                  <td>{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Stores Table */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-3">Stores</h2>

          <table className="w-full text-center">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Rating</th>
              </tr>
            </thead>

            <tbody>
              {stores.map((s) => (
                <tr key={s.id} className="border-b">
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.address}</td>
                  <td>{s.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;