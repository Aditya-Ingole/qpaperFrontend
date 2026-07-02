import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function UploadPaper() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subject", subject);
    formData.append("year", year);
    formData.append("file", file);

    try {
      await api.post("/questionpaper/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Paper uploaded successfully ✅");
      navigate("/admin");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] p-4">
      <form
        onSubmit={handleUpload}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600">
          Upload Question Paper
        </h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full p-3 border rounded-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Subject"
          className="w-full p-3 border rounded-lg"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Year"
          className="w-full p-3 border rounded-lg"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />

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

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadPaper;
