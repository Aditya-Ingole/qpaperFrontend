import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">

      {/* ✅ HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 pt-32 pb-24 text-center">

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
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
          A modern SaaS platform designed for students and administrators.
          Secure authentication, smart filtering and seamless academic access.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex justify-center gap-4"
        >
          <Link
            to="/register"
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
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

      {/* ✅ FEATURES SECTION */}
      <section className="max-w-6xl mx-auto px-6 pb-24">

        <div className="grid md:grid-cols-3 gap-10">

          <FeatureCard
            icon="🔐"
            title="Secure Authentication"
            text="JWT-based authentication ensures safe, role-based access control."
          />

          <FeatureCard
            icon="📂"
            title="Category Subscriptions"
            text="Subscribe to multiple categories and see only relevant papers."
          />

          <FeatureCard
            icon="⚡"
            title="Fast & Responsive"
            text="Optimized frontend and backend for smooth performance."
          />

        </div>

      </section>

      {/* ✅ CTA SECTION */}
      <section className="bg-white py-20 text-center border-t">
        <h2 className="text-3xl font-bold text-gray-800">
          Ready to simplify your exam preparation?
        </h2>

        <Link
          to="/register"
          className="inline-block mt-6 bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Create Your Account
        </Link>
      </section>

      {/* ✅ FOOTER */}
      <footer className="text-center py-8 text-gray-500 text-sm">
        © {new Date().getFullYear()} QPaper Portal — Built with React & .NET
      </footer>

    </div>
  );
}

/* ✅ Reusable Feature Card */
function FeatureCard({ icon, title, text }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition"
    >
      <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 text-xl">
        {icon}
      </div>

      <h3 className="text-xl font-semibold mb-3">
        {title}
      </h3>

      <p className="text-gray-600">
        {text}
      </p>
    </motion.div>
  );
}

export default Home;