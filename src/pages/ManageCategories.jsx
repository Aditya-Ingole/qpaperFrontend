import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import toast from "react-hot-toast";

function ManageCategories() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/category");
      setCategories(res.data);
    } catch {
      toast.error("Failed to load categories ❌");
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchCategories();
      setLoading(false);
    };

    load();
  }, []);

  const createCategory = async () => {
    if (!newCategory.trim()) {
      toast.error("Category name is required ❌");
      return;
    }

    try {
      await api.post("/category", { name: newCategory });
      toast.success("Category created ✅");
      setNewCategory("");
      fetchCategories();
    } catch {
      toast.error("Category creation failed ❌");
    }
  };

  const deleteCategory = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/category/${id}`);
      toast.success("Category deleted ✅");
      fetchCategories();
    } catch {
      toast.error("Delete failed ❌");
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
        <h1 className="text-3xl font-bold text-gray-800">Manage Categories</h1>
        <p className="text-gray-500 mt-1">
          Create and manage paper categories.
        </p>
      </div>

      {/* ✅ CREATE CATEGORY */}
      <div className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="New category name"
          className="p-3 border rounded-lg flex-1 focus:ring-1 focus:ring-indigo-500"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />

        <button
          onClick={createCategory}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Add
        </button>
      </div>

      {/* ✅ CATEGORY LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition flex justify-between items-center"
          >
            <span className="font-medium">{cat.name}</span>

            <button
              onClick={() => deleteCategory(cat.id)}
              className="text-red-500 hover:text-red-600 text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* ✅ BACK BUTTON */}
      <div className="mt-8">
        <button
          onClick={() => navigate("/admin")}
          className="text-indigo-600 hover:underline"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default ManageCategories;
