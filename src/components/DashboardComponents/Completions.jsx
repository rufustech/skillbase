import { useEffect, useState } from "react";
import { ppe } from "../../assets";
import SideBar from "../SideBar";
import { urls } from "../constants";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTrophy,
  FaGraduationCap,
  FaSync,
  FaCheckCircle,
} from "react-icons/fa";

function Completions() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseTitles, setCourseTitles] = useState([]);

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) setUsername(storedName);
    fetchCompletions();
  }, []);

  const fetchCompletions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!urls?.url) throw new Error("Config error: urls.url is undefined.");
      if (!token)
        throw new Error("You are not logged in. Please log in again.");

      const endpoint = `${urls.url}/api/certificates/user-certificates`;
      const res = await fetch(endpoint, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = null;
      }

      if (res.status === 401) {
        throw new Error(
          data?.message || "Session expired. Please log in again."
        );
      }
      if (!res.ok || !data?.success) {
        throw new Error(
          data?.message || `Failed to fetch completions (${res.status})`
        );
      }

      // Extract and dedupe course titles
      const titles = (data.data || [])
        .map((c) => c?.course?.title)
        .filter(Boolean);

      const uniqueTitles = Array.from(new Set(titles));
      setCourseTitles(uniqueTitles);
    } catch (err) {
      console.error("[COMPLETIONS] error:", err);
      setError(err.message || "Unexpected error fetching completions");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>

      <SideBar />

      <div className="p-4 sm:ml-64">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <FaTrophy className="text-4xl text-[#432010] mr-3" />
              <h1 className="text-3xl md:text-4xl font-bold text-[#432010]">
                Your Achievements
              </h1>
            </div>
            <p className="text-gray-600 text-lg">
              Track your learning progress,{" "}
              <span className="capitalize">{username}</span>
            </p>
          </motion.div>

          {/* Content Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="flex justify-center py-12"
              >
                <FaSync className="text-4xl text-[#432010]" />
              </motion.div>
            ) : error ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <p className="text-red-500 mb-4">{error}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={fetchCompletions}
                  className="px-6 py-3 bg-[#432010] text-white rounded-full hover:bg-opacity-90 transition-all duration-300"
                >
                  Try Again
                </motion.button>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Completions List */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="order-2 md:order-1"
                >
                  <h2 className="text-2xl font-bold text-[#432010] mb-6 flex items-center">
                    <FaGraduationCap className="mr-2" />
                    Completions
                  </h2>

                  <AnimatePresence>
                    {courseTitles.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-gray-500 text-center py-8 bg-gray-50 rounded-xl"
                      >
                        No completions yet — complete a course to see it here.
                      </motion.div>
                    ) : (
                      <div className="space-y-4">
                        {courseTitles.map((title, i) => (
                          <motion.div
                            key={`${title}-${i}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300"
                          >
                            <div className="flex items-center">
                              <FaCheckCircle className="text-2xl mr-3 text-white" />
                              <h4 className="text-lg font-medium">{title}</h4>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Image Section */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="order-1 md:order-2"
                >
                  <div className="relative rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={ppe}
                      alt="Completions"
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Completions;
