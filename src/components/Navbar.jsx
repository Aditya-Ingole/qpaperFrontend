import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleLogoClick = () => {
    if (role === "Admin") navigate("/admin");
    else if (role === "User") navigate("/user");
    else navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center border-b">
      
      {/* ✅ Logo */}
      <h1
        onClick={handleLogoClick}
        className="text-xl font-semibold text-indigo-600 cursor-pointer"
      >
        QPaper
      </h1>

      {/* ✅ Navigation Links */}
      {token && (
        <div className="flex items-center space-x-6 text-sm font-medium">
          
          {role === "Admin" && (
            <>
              <Link to="/admin" className="hover:text-indigo-600">
                Dashboard
              </Link>
              <Link to="/admin/categories" className="hover:text-indigo-600">
                Categories
              </Link>
              <Link to="/admin/upload" className="hover:text-indigo-600">
                Upload
              </Link>
              <Link to="/admin/users" className="hover:text-indigo-600">
                Users
              </Link>
            </>
          )}

          {role === "User" && (
            <>
              <Link to="/user" className="hover:text-indigo-600">
                Dashboard
              </Link>
              <Link to="/subscriptions" className="hover:text-indigo-600">
                Subscriptions
              </Link>
            </>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}

      {/* ✅ Public Navigation */}
      {!token && (
        <div className="flex items-center space-x-4 text-sm">
          <Link to="/login" className="hover:text-indigo-600">
            Login
          </Link>
          <Link to="/register" className="hover:text-indigo-600">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;