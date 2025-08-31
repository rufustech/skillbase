// components/Legislation.js
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBook,
  FaSearch,
  FaDownload,
  FaBell,
  FaExternalLinkAlt,
  FaRegBookmark,
  FaBookmark,
  FaClock,
  FaInfoCircle,
} from "react-icons/fa";
import SideBar from "./SideBar";

function Legislation() {
  const [legislations, setLegislations] = useState([
    {
      id: 1,
      title: "Occupational Health and Safety Act",
      category: "Health & Safety",
      lastUpdated: "2024-01-15",
      description:
        "Comprehensive legislation governing workplace health and safety standards",
      relevantSections: ["Section 25: Employer Duties", "Section 28: Worker Duties"],
      compliance: 92,
      bookmarked: true,
      updates: [
        {
          date: "2024-01-15",
          changes: "Updated regulations regarding PPE requirements",
        },
      ],
    },
    // Add more legislation items...
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const categories = [
    "all",
    "Health & Safety",
    "Environmental",
    "Labor",
    "Industry-Specific",
  ];

  const UpdateModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-lg p-6 w-full max-w-lg"
      >
        <h2 className="text-xl font-bold mb-4">Recent Legislative Updates</h2>
        <div className="space-y-4">
          {legislations
            .filter((leg) => leg.updates.length > 0)
            .map((leg) => (
              <div key={leg.id} className="border-b pb-4">
                <h3 className="font-semibold text-gray-800">{leg.title}</h3>
                {leg.updates.map((update, index) => (
                  <div key={index} className="mt-2">
                    <div className="text-sm text-gray-500">
                      {new Date(update.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm">{update.changes}</div>
                  </div>
                ))}
              </div>
            ))}
        </div>
        <button
          onClick={() => setShowUpdateModal(false)}
          className="mt-4 px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Close
        </button>
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
            <h1 className="text-2xl font-bold text-gray-800">
              Legislative Requirements
            </h1>
            <button
              onClick={() => setShowUpdateModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <FaBell className="mr-2" />
              Updates
            </button>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search legislation..."
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

          {/* Legislation Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {legislations
              .filter(
                (leg) =>
                  (selectedCategory === "all" ||
                    leg.category === selectedCategory) &&
                  leg.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((legislation) => (
                <motion.div
                  key={legislation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {legislation.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {legislation.category}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setLegislations((prev) =>
                          prev.map((item) =>
                            item.id === legislation.id
                              ? { ...item, bookmarked: !item.bookmarked }
                              : item
                          )
                        )
                      }
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {legislation.bookmarked ? <FaBookmark /> : <FaRegBookmark />}
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    {legislation.description}
                  </p>

                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Relevant Sections:
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {legislation.relevantSections.map((section, index) => (
                        <li key={index}>{section}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Compliance Rate</span>
                      <span>{legislation.compliance}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full mt-1">
                      <div
                        className={`h-2 rounded-full ${
                          legislation.compliance >= 90
                            ? "bg-green-500"
                            : legislation.compliance >= 70
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${legislation.compliance}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center text-gray-500">
                      <FaClock className="mr-1" />
                      Updated:{" "}
                      {new Date(legislation.lastUpdated).toLocaleDateString()}
                    </div>
                    <div className="space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <FaExternalLinkAlt />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <FaDownload />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>

      {showUpdateModal && <UpdateModal />}
    </div>
  );
}

export default Legislation;
