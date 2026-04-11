import React, { useEffect, useState } from "react";
import axiosInstance from "../lib/instance";

function Store() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ratings, setRatings] = useState({});
  const [hover, setHover] = useState({});

  //  Fetch stores
  const fetchStores = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/stores/all");

      if (res?.data?.data) {
        setStores(res.data.data);
      }
    } catch (error) {
      console.error("Fetch stores error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  //  Set rating
  const handleRatingClick = (storeId, value) => {
    setRatings((prev) => ({
      ...prev,
      [storeId]: value,
    }));
  };

  // Submit rating
  const handleSubmitRating = async (storeId) => {
    try {
      const value = ratings[storeId];

      if (!value) {
        alert("Please select a rating");
        return;
      }

      const res = await axiosInstance.post(
        `/stores/${storeId}/rating`,
        { value }
      );

      if (res?.data?.success) {
        await fetchStores();

        // reset stars
        setRatings((prev) => ({
          ...prev,
          [storeId]: 0,
        }));
      }
    } catch (error) {
      console.error("Rating error:", error);

      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to submit rating";

      alert(msg);
    }
  };

  const totalStores = stores.length;

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          Stores: {totalStores}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-3">Stores</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full text-center">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th>Name</th>
                <th>Owner</th>
                <th>Address</th>
                <th>Avg Rating</th>
                <th>Your Rating</th>
                <th>Give Rating</th>
              </tr>
            </thead>

            <tbody>
              {stores.length > 0 ? (
                stores.map((s) => (
                  <tr key={s.id} className="border-b">
                    <td>{s.name}</td>
                    <td>{s.user?.name || "-"}</td>
                    <td>{s.address}</td>

                    {/* Avg rating */}
                    <td>
                      {s.averageRating !== undefined
                        ? s.averageRating.toFixed(1)
                        : 0}
                    </td>

                    {/* Your rating */}
                    <td>{s.yourRating || "-"}</td>

                    {/*  Star Rating UI */}
                    <td>
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={`cursor-pointer text-xl ${
                                star <=
                                (hover[s.id] || ratings[s.id] || 0)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              onClick={() =>
                                handleRatingClick(s.id, star)
                              }
                              onMouseEnter={() =>
                                setHover((prev) => ({
                                  ...prev,
                                  [s.id]: star,
                                }))
                              }
                              onMouseLeave={() =>
                                setHover((prev) => ({
                                  ...prev,
                                  [s.id]: 0,
                                }))
                              }
                            >
                              ★
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => handleSubmitRating(s.id)}
                          className="bg-indigo-600 text-white px-2 py-1 rounded text-sm"
                        >
                          Submit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No stores found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Store;