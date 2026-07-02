import { useEffect, useState } from "react";
import api from "../api/axios";
import { motion } from "framer-motion";

function AdminDashboard() {
  const [stats, setStats] = useState(null);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/admin/dashboard");
      setStats(response.data.data);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (!stats) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-xl">Loading...</p>
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
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-indigo-600">
        Admin Dashboard
      </h1>

      <button
        onClick={() => (window.location.href = "/admin/upload")}
        className="mb-6 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        Upload New Paper
      </button>

      <button
        onClick={() => (window.location.href = "/admin/users")}
        className="mb-4 mr-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition mx-4"
      >
        Manage Users
      </button>

      <div className="grid md:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
          >
            <h2 className="text-gray-600">{card.title}</h2>
            <p className="text-3xl font-bold mt-2 text-indigo-600">
              {card.value}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
