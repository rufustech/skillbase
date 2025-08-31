// components/Orientations.js
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGraduationCap,
  FaPlus,
  FaPlay,
  FaClock,
  FaCheckCircle,
  FaUserCircle,
  FaChartBar,
  FaCalendar,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import SideBar from "./SideBar";

function Orientations() {
  const [orientations, setOrientations] = useState([
    {
      id: 1,
      title: "New Employee Safety Orientation",
      description: "Comprehensive safety training for new employees",
      duration: "120",
      modules: [
        "Company Safety Policies",
        "Emergency Procedures",
        "PPE Requirements",
      ],
      completions: 45,
      averageScore: 92,
      required: true,
      dueDate: "2024-02-01",
      status: "active",
      lastUpdated: "2024-01-15",
    },
    // Add more orientations...
  ]);

  const [showNewOrientation, setShowNewOrientation] = useState(false);
  const [selectedOrientation, setSelectedOrientation] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const NewOrientationModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-lg p-6 w-full max-w-2xl"
      >
        <h2 className="text-xl font-bold mb-4">Create New Orientation</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter orientation title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              className="w-full p-2 border rounded-lg"
              rows="3"
              placeholder="Enter orientation description..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Duration (minutes)
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg"
                placeholder="Enter duration"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <input type="date" className="w-full p-2 border rounded-lg" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Modules</label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  className="flex-1 p-2 border rounded-lg"
                  placeholder="Add module"
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Add
                </button>
              </div>
              {/* Module list would go here */}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                multiple
                className="hidden"
                id="orientation-files"
              />
              <label
                htmlFor="orientation-files"
                className="cursor-pointer text-blue-600 hover:text-blue-800"
              >
                Upload materials
              </label>
              <p className="text-sm text-gray-500 mt-1">
                PDF, Video, or Presentation files
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="required" className="mr-2" />
            <label htmlFor="required" className="text-sm text-gray-700">
              Mark as required orientation
            </label>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowNewOrientation(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Orientation
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
              Safety Orientations
            </h1>
            <button
              onClick={() => setShowNewOrientation(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <FaPlus className="mr-2" />
              New Orientation
            </button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Completions</p>
                  <p className="text-2xl font-bold text-gray-800">247</p>
                </div>
                <FaCheckCircle className="text-green-500 text-3xl" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Average Completion Rate
                  </p>
                  <p className="text-2xl font-bold text-gray-800">85%</p>
                </div>
                <FaChartBar className="text-blue-500 text-3xl" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Orientations</p>
                  <p className="text-2xl font-bold text-gray-800">12</p>
                </div>
                <FaGraduationCap className="text-purple-500 text-3xl" />
              </div>
            </div>
          </div>

          {/* Orientations Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {orientations.map((orientation) => (
              <motion.div
                key={orientation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {orientation.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {orientation.description}
                    </p>
                  </div>
                  {orientation.required && (
                    <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                      Required
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaClock className="mr-2" />
                    <span>{orientation.duration} minutes</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaCalendar className="mr-2" />
                    <span>
                      Due: {new Date(orientation.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Modules:
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {orientation.modules.map((module, index) => (
                      <li key={index} className="flex items-center">
                        <FaCheckCircle className="mr-2 text-green-500" />
                        {module}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                  <span>{orientation.completions} completions</span>
                  <span>{orientation.averageScore}% avg. score</span>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => {
                      setSelectedOrientation(orientation);
                      setShowPreview(true);
                    }}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <FaPlay className="mr-1" /> Start
                  </button>
                  <div className="space-x-2">
                    <button className="text-gray-600 hover:text-gray-800">
                      <FaEdit />
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

      <AnimatePresence>
        {showNewOrientation && <NewOrientationModal />}
      </AnimatePresence>
    </div>
  );
}

export default Orientations;
