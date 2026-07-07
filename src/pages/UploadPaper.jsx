import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function UploadPaper() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch categories for dropdown
  useEffect(() => {
    api
      .get("/category")
      .then((res) => setCategories(res.data))
      .catch(() => toast.error("Failed to load categories ❌"));
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!categoryId) {
      toast.error("Please select a category ❌");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subject", subject);
    formData.append("year", year);
    formData.append("categoryId", categoryId);
    formData.append("file", file);

    try {
      setLoading(true);

      await api.post("/questionpaper/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Paper uploaded successfully ✅");
      navigate("/admin");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* ✅ HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Upload Question Paper
        </h1>
        <p className="text-gray-500 mt-1">
          Add a new paper under a selected category.
        </p>
      </div>

      <form
        onSubmit={handleUpload}
        className="bg-white p-8 rounded-xl shadow-sm max-w-md space-y-5"
      >
        {/* ✅ Title */}
        <input
          type="text"
          placeholder="Title"
          className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-indigo-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* ✅ Subject */}
        <input
          type="text"
          placeholder="Subject"
          className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-indigo-500"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />

        {/* ✅ Year */}
        <input
          type="number"
          placeholder="Year"
          className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-indigo-500"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />

        {/* ✅ Category Dropdown */}
        <select
          className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-indigo-500"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* ✅ File Upload */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="fileUpload"
            className="cursor-pointer bg-gray-100 border-2 border-dashed border-gray-300 p-6 text-center rounded-lg hover:bg-gray-200 transition"
          >
            {file ? (
              <span className="text-green-600 font-medium">✅ {file.name}</span>
            ) : (
              <span className="text-gray-500">Click to upload PDF</span>
            )}
          </label>

          <input
            id="fileUpload"
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>

        {/* ✅ Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}

export default UploadPaper;
