// components/SafetyDataSheets.js
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaUpload,
  FaDownload,
  FaEye,
  FaTrash,
  FaExclamationTriangle,
  FaHistory,
  FaBarcode,
} from "react-icons/fa";
import SideBar from "./SideBar";

function SafetyDataSheets() {
  const [sds, setSds] = useState([
    {
      id: 1,
      productName: "Industrial Cleaner X-100",
      manufacturer: "ChemCorp Inc.",
      hazardLevel: "moderate",
      lastUpdated: "2024-01-15",
      expiryDate: "2025-01-15",
      location: "Building A, Storage Room 2",
      category: "Cleaning",
      barcode: "SDS-2024-001",
    },
    // Add more SDS entries...
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    "all",
    "Cleaning",
    "Solvents",
    "Paints",
    "Adhesives",
    "Oils",
    "Other",
  ];

  const hazardColors = {
    low: "bg-green-100 text-green-800",
    moderate: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

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
        className="bg-white rounded-lg p-6 w-full max-w-lg"
      >
        <h2 className="text-xl font-bold mb-4">Upload New SDS</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Product Name
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                placeholder="Enter product name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Manufacturer
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                placeholder="Enter manufacturer"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
                Hazard Level
              </label>
              <select className="w-full p-2 border rounded-lg">
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Storage Location
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter storage location"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Issue Date</label>
              <input type="date" className="w-full p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Expiry Date
              </label>
              <input type="date" className="w-full p-2 border rounded-lg" />
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <FaUpload className="mx-auto text-3xl text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">
              Drag and drop SDS file here, or click to select
            </p>
            <input type="file" className="hidden" />
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
            <h1 className="text-2xl font-bold text-gray-800">
              Safety Data Sheets
            </h1>
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <FaUpload className="mr-2" />
              Upload SDS
            </button>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by product name or manufacturer..."
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

          {/* SDS Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sds
              .filter(
                (sheet) =>
                  (selectedCategory === "all" ||
                    sheet.category === selectedCategory) &&
                  (sheet.productName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                    sheet.manufacturer
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()))
              )
              .map((sheet) => (
                <motion.div
                  key={sheet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {sheet.productName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {sheet.manufacturer}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        hazardColors[sheet.hazardLevel]
                      }`}
                    >
                      {sheet.hazardLevel}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <FaBarcode className="mr-2" />
                      <span>{sheet.barcode}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FaHistory className="mr-2" />
                      <span>
                        Updated: {new Date(sheet.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FaExclamationTriangle className="mr-2" />
                      <span>
                        Expires: {new Date(sheet.expiryDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <FaEye className="inline mr-1" /> View
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <FaDownload className="inline mr-1" /> Download
                      </button>
                    </div>
                    <button className="text-red-600 hover:text-red-800">
                      <FaTrash />
                    </button>
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

export default SafetyDataSheets;
