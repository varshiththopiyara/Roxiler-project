import React, { useEffect, useState } from "react";
import axiosInstance from "../../lib/instance";
import { useAuth } from "../AuthContext";

function Dashboard() {
  const { user } = useAuth();
  const role = user?.role;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch stats (same endpoint for all roles)
  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/stats/all");

      console.log("Stats:", res.data);

      if (res?.data?.data) {
        setData(res.data.data);
      }
    } catch (error) {
      console.error("Stats error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // 🔹 Card Component
  const Card = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
      <div className="flex justify-between items-center">
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-3xl font-bold text-indigo-600 mt-3">
        {value ?? 0}
      </p>
    </div>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">
        Dashboard
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* ================= ADMIN ================= */}
          {role === "ADMIN" && data && (
            <div className="grid md:grid-cols-4 gap-6">
              <Card title="Total Users" value={data.usersCount} icon="👤" />
              <Card title="Store Owners" value={data.storesownerCount} icon="🏪" />
              <Card title="Total Stores" value={data.storesCount} icon="🏬" />
              <Card title="Total Ratings" value={data.allRatingsCount} icon="⭐" />
            </div>
          )}

          {/* ================= STORE OWNER ================= */}
          {role === "STOREOWNER" && data && (
            <div className="grid md:grid-cols-3 gap-6">
              <Card title="Your Stores" value={data.storesCount} icon="🏪" />
              <Card
                title="Avg Rating"
                value={data.avgRatingForAllStores?.toFixed(1)}
                icon="⭐"
              />
              <Card
                title="Total Ratings"
                value={data.totalRatingCountForAllStores}
                icon="📊"
              />
            </div>
          )}

          {/* ================= USER ================= */}
          {role === "USER" && data && (
            <div className="grid md:grid-cols-2 gap-6">
              <Card
                title="Ratings Given"
                value={data.overallRatingsCount}
                icon="⭐"
              />
              <Card
                title="Total Stores"
                value={data.allStoresCount}
                icon="🏬"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;