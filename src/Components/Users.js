import React, { useState, useEffect } from "react";
import axiosInstance from "../lib/instance";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER",
  });

  const totalUsers = users.length;
  const totalRatings = users.reduce(
    (acc, u) => acc + (u?._count?.ratings || 0),
    0
  );

  //  Fetch users from backend
  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/users"); // adjust if needed
      console.log("Fetched users:", res.data);

      if (res?.data?.users) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.error("Fetch users error:", error);
    }
  };

  //  Load users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  //  Handle input change
  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  // Create user API
  const handleAddUser = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/users/create", {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        address: newUser.address,
        role: newUser.role,
      });

      console.log("User created:", res.data);

      if (res?.data?.success) {
        await fetchUsers(); // 🔥 refresh table from backend

        setNewUser({
          name: "",
          email: "",
          password: "",
          address: "",
          role: "USER",
        });
      }
    } catch (error) {
      console.error("Create user error:", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create user";

      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  //  Filter users
  const filteredUsers = users.filter((u) =>
    [u.name, u.email, u.address, u.role]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Stats */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            Users: {totalUsers}
          </div>
          <div className="bg-white p-4 rounded shadow">
            Ratings: {totalRatings}
          </div>
        </div>

        {/* Add User */}
        <h2 className="font-semibold mb-3">Add User</h2>

        <div className="grid grid-cols-2 gap-3">
          <input
            name="name"
            placeholder="Name"
            value={newUser.name}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="email"
            placeholder="Email"
            value={newUser.email}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="password"
            placeholder="Password"
            value={newUser.password}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="address"
            placeholder="Address"
            value={newUser.address}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <select
            name="role"
            value={newUser.role}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="STOREOWNER">Store Owner</option>
          </select>

          <button
            onClick={handleAddUser}
            disabled={loading}
            className="bg-indigo-600 text-white p-2 rounded"
          >
            {loading ? "Adding..." : "Add User"}
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

      {/* Users Table */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-3">Users</h2>

        <table className="w-full text-center">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Role</th>
              <th>Stores</th>
              <th>Ratings</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id} className="border-b">
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.address}</td>
                <td>{u.role}</td>
                <td>{u?._count?.stores || 0}</td>
                <td>{u?._count?.ratings || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;