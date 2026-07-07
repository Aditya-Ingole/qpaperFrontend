import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

function Subscriptions() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [mySubscriptions, setMySubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    const res = await api.get("/category");
    setCategories(res.data);
  };

  const fetchMySubscriptions = async () => {
    const res = await api.get("/subscription/my");
    setMySubscriptions(res.data);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await fetchCategories();
        await fetchMySubscriptions();
      } catch (error) {
        toast.error("Failed to load subscriptions ❌");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const subscribe = async (categoryId) => {
    try {
      await api.post(`/subscription/${categoryId}`);
      toast.success("Subscribed ✅");
      fetchMySubscriptions();
    } catch {
      toast.error("Subscription failed ❌");
    }
  };

  const unsubscribe = async (categoryId) => {
    try {
      await api.delete(`/subscription/${categoryId}`);
      toast.success("Unsubscribed ✅");
      fetchMySubscriptions();
    } catch {
      toast.error("Unsubscribe failed ❌");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* ✅ HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Manage Subscriptions
        </h1>
        <p className="text-gray-500 mt-1">
          Choose categories you want to receive question papers from.
        </p>
      </div>

      {/* ✅ CATEGORY GRID */}
      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const subscribed = mySubscriptions.includes(cat.id);

          return (
            <div
              key={cat.id}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold mb-3">{cat.name}</h2>

              <button
                onClick={() =>
                  subscribed ? unsubscribe(cat.id) : subscribe(cat.id)
                }
                className={`px-4 py-2 rounded-lg text-white transition ${
                  subscribed
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {subscribed ? "Unsubscribe" : "Subscribe"}
              </button>
            </div>
          );
        })}
      </div>

      {/* ✅ BACK BUTTON */}
      <div className="mt-8">
        <button
          onClick={() => navigate("/user")}
          className="text-indigo-600 hover:underline"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Subscriptions;
