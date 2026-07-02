import { useEffect, useState } from "react";
import api from "../api/axios";

function UserDashboard() {
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
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">
        Question Papers
      </h1>

      {/* ✅ FILTER SECTION */}
      {/* ✅ MINIMAL FILTER TOOLBAR */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-gray-500 text-sm font-medium">Filter:</span>

        <input
          type="text"
          placeholder="Subject"
          className="px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <input
          type="number"
          placeholder="Year"
          className="px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <button
          onClick={() => {
            setPage(1);
            fetchPapers();
          }}
          className="px-4 py-1.5 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          Apply
        </button>

        {(subject || year) && (
          <button
            onClick={() => {
              setSubject("");
              setYear("");
              setPage(1);

              // ✅ Important: fetch without filters
              setTimeout(() => {
                fetchPapers();
              }, 0);
            }}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Reset
          </button>
        )}
      </div>

      {/* ✅ PAPERS SECTION */}
      {loading ? (
        <div className="flex justify-center mt-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-6">
            {papers.map((paper) => (
              <div
                key={paper.id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
              >
                <h2 className="text-xl font-semibold">{paper.title}</h2>
                <p className="text-gray-600 mt-2">Subject: {paper.subject}</p>
                <p className="text-gray-500">Year: {paper.year}</p>

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
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="px-4 py-2">{page}</span>

            <button
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-gray-300 rounded"
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
