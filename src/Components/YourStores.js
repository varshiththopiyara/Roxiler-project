import React, { useEffect, useState } from "react";
import axiosInstance from "../lib/instance";

function YourStores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);

  //  Modal state
  const [showModal, setShowModal] = useState(false);
  const [newStore, setNewStore] = useState({
    name: "",
    address: "",
  });

  //  Fetch stores
  const fetchMyStores = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/stores");

      if (res?.data?.data) {
        setStores(res.data.data);
      }
    } catch (error) {
      console.error("Fetch my stores error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyStores();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setNewStore({
      ...newStore,
      [e.target.name]: e.target.value,
    });
  };

  // Create store
  const handleCreateStore = async () => {
    try {
      if (!newStore.name || !newStore.address) {
        alert("All fields required");
        return;
      }

      const res = await axiosInstance.post("/stores/create", {
        name: newStore.name,
        address: newStore.address,
      });

      console.log("Store created:", res.data);

      if (res?.data?.success) {
        setShowModal(false);
        setNewStore({ name: "", address: "" });

        await fetchMyStores(); // 🔥 refresh
      }
    } catch (error) {
      console.error("Create store error:", error);

      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create store";

      alert(msg);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-700">
          Your Stores
        </h2>

        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700"
        >
          + Add Store
        </button>
      </div>

      {/* Stores */}
      {loading ? (
        <p>Loading...</p>
      ) : stores.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {store.name}
                </h3>

                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                  ⭐ {store.averageRating || 0}
                </span>
              </div>

              {/* Address */}
              <p className="text-gray-500 mb-3">
                📍 {store.address}
              </p>

              {/* Stats */}
              <div className="flex gap-4 mb-4">
                <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg text-sm">
                  Ratings: {store.totalRatings || 0}
                </div>
              </div>

              <div className="border-t my-3" />

              {/* Users */}
              <h4 className="text-sm font-semibold mb-2 text-gray-700">
                Users who rated
              </h4>

              {store.usersWhoRated?.length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {store.usersWhoRated.map((u, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium">
                          {u.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {u.email}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-yellow-500 font-semibold">
                          ⭐ {u.rating}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(u.ratedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">
                  No ratings yet
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No stores found</p>
      )}

      {/*  Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[350px] shadow-lg">
            <h3 className="text-lg font-bold mb-4">
              Add New Store
            </h3>

            <input
              name="name"
              placeholder="Store Name"
              value={newStore.name}
              onChange={handleChange}
              className="w-full mb-3 px-3 py-2 border rounded"
            />

            <input
              name="address"
              placeholder="Address"
              value={newStore.address}
              onChange={handleChange}
              className="w-full mb-4 px-3 py-2 border rounded"
            />

            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-3 py-1 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateStore}
                className="bg-indigo-600 text-white px-3 py-1 rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default YourStores;