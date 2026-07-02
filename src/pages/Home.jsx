import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">

      {/* NAV SPACE */}
      <div className="pt-20"></div>

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 text-center">

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900"
        >
          Smarter Way to Access
          <span className="text-indigo-600 block mt-2">
            Previous Question Papers
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto"
        >
          A modern platform built for students and administrators.
          Secure, fast and beautifully designed for seamless academic access.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex justify-center space-x-4"
        >
          <Link
            to="/register"
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg hover:bg-indigo-700 transition"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Login
          </Link>
        </motion.div>

      </section>

      {/* FEATURES SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-24">

        <div className="grid md:grid-cols-3 gap-10">

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
              <span className="text-indigo-600 text-xl font-bold">🔒</span>
            </div>

            <h3 className="text-xl font-semibold mb-3">
              Secure Authentication
            </h3>

            <p className="text-gray-600">
              JWT-based authentication ensures role-based secure access for both students and administrators.
            </p>
          </motion.div>


          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
              <span className="text-indigo-600 text-xl font-bold">📂</span>
            </div>

            <h3 className="text-xl font-semibold mb-3">
              Easy Paper Management
            </h3>

            <p className="text-gray-600">
              Admins can upload, organize and manage question papers with a modern dashboard interface.
            </p>
          </motion.div>


          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
              <span className="text-indigo-600 text-xl font-bold">⚡</span>
            </div>

            <h3 className="text-xl font-semibold mb-3">
              Fast & Responsive
            </h3>

            <p className="text-gray-600">
              Built with modern technologies for smooth performance and fully responsive experience.
            </p>
          </motion.div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="text-center py-8 text-gray-500 text-sm">
        © {new Date().getFullYear()} QPaper Portal — Built with React & .NET
      </footer>

    </div>
  );
}

export default Home;