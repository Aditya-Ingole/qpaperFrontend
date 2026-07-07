import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function UserDashboard() {
  const navigate = useNavigate();

  const [papers, setPapers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");

  const fetchPapers = async () => {
    try {
      setLoading(true);

      let url = `/questionpaper?pageNumber=${page}&pageSize=6`;

      if (subject) url += `&subject=${subject}`;
      if (year) url += `&year=${year}`;

      const response = await api.get(url);
      setPapers(response.data.data);
    } catch (error) {
      console.error("Error fetching papers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, [page, subject, year]);

  const handleDownload = async (id) => {
    try {
      const response = await api.get(`/questionpaper/download/${id}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "QuestionPaper.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div>

      {/* ✅ HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome Back 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Browse papers from your subscribed categories.
        </p>
      </div>

      {/* ✅ FILTER BAR */}
      <div className="flex flex-wrap items-center gap-3 mb-6 bg-white p-4 rounded-xl shadow-sm">

        <input
          type="text"
          placeholder="Subject"
          className="px-3 py-2 text-sm border rounded-md focus:ring-1 focus:ring-indigo-500"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <input
          type="number"
          placeholder="Year"
          className="px-3 py-2 text-sm border rounded-md focus:ring-1 focus:ring-indigo-500"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <button
          onClick={() => setPage(1)}
          className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          Apply
        </button>

        {(subject || year) && (
          <button
            onClick={() => {
              setSubject("");
              setYear("");
              setPage(1);
            }}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Reset
          </button>
        )}

        <button
          onClick={() => navigate("/subscriptions")}
          className="ml-auto bg-gray-100 px-4 py-2 text-sm rounded-md hover:bg-gray-200 transition"
        >
          Manage Subscriptions
        </button>
      </div>

      {/* ✅ CONTENT */}
      {loading ? (
        <div className="flex justify-center mt-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
        </div>
      ) : papers.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            No Papers Found
          </h2>
          <p className="text-gray-500 mt-2">
            Subscribe to categories or adjust filters.
          </p>
          <button
            onClick={() => navigate("/subscriptions")}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Manage Subscriptions
          </button>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-6">
            {papers.map((paper) => (
              <div
                key={paper.id}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h2 className="text-xl font-semibold">{paper.title}</h2>
                <p className="text-gray-600 mt-2">
                  Subject: {paper.subject}
                </p>
                <p className="text-gray-500">
                  Year: {paper.year}
                </p>

                <button
                  onClick={() => handleDownload(paper.id)}
                  className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Download
                </button>
              </div>
            ))}
          </div>

          {/* ✅ PAGINATION */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="px-4 py-2 font-medium">{page}</span>

            <button
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default UserDashboard;