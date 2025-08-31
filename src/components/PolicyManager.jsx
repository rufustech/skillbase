// components/PolicyManager.js
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFileUpload,
  FaFilePdf,
  FaSearch,
  FaEye,
  FaDownload,
  FaTrash,
  FaClock,
} from "react-icons/fa";
import SideBar from "./SideBar";

function PolicyManager() {
  const [policies, setPolicies] = useState([
    {
      id: 1,
      title: "Workplace Safety Policy 2024",
      category: "Safety",
      uploadDate: "2024-01-15",
      lastReviewed: "2024-01-15",
      nextReview: "2025-01-15",
      status: "active",
      fileUrl: "/policies/safety-policy.pdf",
    },
    // Add more dummy policies
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showUploadModal, setShowUploadModal] = useState(false);

  const categories = [
    "all",
    "Safety",
    "Health",
    "Environment",
    "Quality",
    "Security",
  ];

  const UploadModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-lg p-6 w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">Upload New Policy</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter policy title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select className="w-full p-2 border rounded-lg">
              {categories.slice(1).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Next Review Date
            </label>
            <input type="date" className="w-full p-2 border rounded-lg" />
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <FaFileUpload className="mx-auto text-3xl text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">
              Drag and drop your PDF file here, or click to select
            </p>
            <input type="file" accept=".pdf" className="hidden" />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowUploadModal(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Upload
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <SideBar />
      <div className="p-4 sm:ml-64">
        <div className="container mx-auto py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Policy Manager</h1>
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <FaFileUpload className="mr-2" />
              Upload Policy
            </button>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search policies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Policy Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {policies
              .filter(
                (policy) =>
                  (selectedCategory === "all" ||
                    policy.category === selectedCategory) &&
                  policy.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((policy) => (
                <motion.div
                  key={policy.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {policy.title}
                      </h3>
                      <p className="text-sm text-gray-500">{policy.category}</p>
                    </div>
                    <FaFilePdf className="text-red-500 text-xl" />
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <FaClock className="mr-2" />
                      <span>
                        Last reviewed:{" "}
                        {new Date(policy.lastReviewed).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FaClock className="mr-2" />
                      <span>
                        Next review:{" "}
                        {new Date(policy.nextReview).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <button className="text-blue-600 hover:text-blue-800">
                      <FaEye className="inline mr-1" /> View
                    </button>
                    <div className="space-x-2">
                      <button className="text-gray-600 hover:text-gray-800">
                        <FaDownload />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>

      <AnimatePresence>{showUploadModal && <UploadModal />}</AnimatePresence>
    </div>
  );
}

export default PolicyManager;
