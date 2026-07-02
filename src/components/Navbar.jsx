import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1
        onClick={() => {
          const role = localStorage.getItem("role");

          if (role === "Admin") {
            navigate("/admin");
          } else if (role === "User") {
            navigate("/user");
          } else {
            navigate("/");
          }
        }}
        className="text-xl font-bold text-indigo-600 cursor-pointer hover:opacity-80 transition"
      >
        QPaper
      </h1>

      <div className="space-x-4">
        {!token ? (
          <>
            <Link to="/login" className="text-gray-700 hover:text-indigo-600">
              Login
            </Link>
            <Link
              to="/register"
              className="text-gray-700 hover:text-indigo-600"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            {role === "Admin" && (
              <Link to="/admin" className="text-gray-700 hover:text-indigo-600">
                Admin
              </Link>
            )}

            {role === "User" && (
              <Link to="/user" className="text-gray-700 hover:text-indigo-600">
                User
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
