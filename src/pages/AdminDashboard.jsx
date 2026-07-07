import { useEffect, useState } from "react";
import api from "../api/axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/dashboard");
      setStats(response.data.data);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const cards = [
    { title: "Total Users", value: stats.totalUsers },
    { title: "Total Admins", value: stats.totalAdmins },
    { title: "Total Papers", value: stats.totalPapers },
    { title: "Today's Uploads", value: stats.papersUploadedToday },
  ];

  return (
    <div>
      {/* ✅ HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Manage system data and monitor platform activity.
        </p>
      </div>

      {/* ✅ ACTION BUTTONS */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => navigate("/admin/upload")}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Upload Paper
        </button>

        <button
          onClick={() => navigate("/admin/categories")}
          className="bg-gray-100 px-5 py-2 rounded-lg hover:bg-gray-200 transition"
        >
          Manage Categories
        </button>

        <button
          onClick={() => navigate("/admin/users")}
          className="bg-gray-100 px-5 py-2 rounded-lg hover:bg-gray-200 transition"
        >
          Manage Users
        </button>
      </div>

      {/* ✅ STAT CARDS */}
      <div className="grid md:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <p className="text-gray-500 text-sm">{card.title}</p>
            <h2 className="text-3xl font-bold mt-2 text-indigo-600">
              {card.value}
            </h2>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
