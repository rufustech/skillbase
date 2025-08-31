// components/Inspections.js
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaClipboardCheck,
  FaPlus,
  FaCheck,
  FaTimes,
  FaExclamationTriangle,
  FaCamera,
  FaCalendar,
  FaUser,
  FaDownload,
} from "react-icons/fa";
import SideBar from "./SideBar";

function Inspections() {
  const [inspections, setInspections] = useState([
    {
      id: 1,
      area: "Production Floor",
      type: "Monthly Safety Inspection",
      inspector: "John Doe",
      date: "2024-01-15",
      status: "completed",
      findings: 3,
      criticalIssues: 1,
      compliance: 85,
      photos: ["url1", "url2"],
      nextInspection: "2024-02-15",
    },
    // Add more inspections...
  ]);

  const [showNewInspection, setShowNewInspection] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming");

  const inspectionTypes = [
    "Monthly Safety Inspection",
    "Equipment Check",
    "Fire Safety Inspection",
    "Environmental Audit",
    "Workplace Hazard Assessment",
  ];

  const areas = [
    "Production Floor",
    "Warehouse",
    "Office Space",
    "Loading Dock",
    "Chemical Storage",
    "Break Room",
  ];

  const NewInspectionModal = () => (
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
        <h2 className="text-xl font-bold mb-4">Schedule New Inspection</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Inspection Type
            </label>
            <select className="w-full p-2 border rounded-lg">
              {inspectionTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Area</label>
            <select className="w-full p-2 border rounded-lg">
              {areas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Inspection Date
              </label>
              <input type="date" className="w-full p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Inspector</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                placeholder="Assign inspector"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowNewInspection(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Schedule Inspection
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
              Safety Inspections
            </h1>
            <button
              onClick={() => setShowNewInspection(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <FaPlus className="mr-2" />
              New Inspection
            </button>
          </div>

          {/* Tabs */}
          <div className="mb-6 border-b">
            <div className="flex space-x-4">
              {["upcoming", "completed", "overdue"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 -mb-px ${
                    activeTab === tab
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Inspection Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {inspections.map((inspection) => (
              <motion.div
                key={inspection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {inspection.area}
                    </h3>
                    <p className="text-sm text-gray-500">{inspection.type}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      inspection.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {inspection.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaCalendar className="mr-2" />
                    <span>
                      {new Date(inspection.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaUser className="mr-2" />
                    <span>{inspection.inspector}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div>
                      <div className="font-semibold text-gray-800">
                        {inspection.findings}
                      </div>
                      <div className="text-gray-500">Findings</div>
                    </div>
                    <div>
                      <div className="font-semibold text-red-600">
                        {inspection.criticalIssues}
                      </div>
                      <div className="text-gray-500">Critical</div>
                    </div>
                    <div>
                      <div className="font-semibold text-green-600">
                        {inspection.compliance}%
                      </div>
                      <div className="text-gray-500">Compliance</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <button className="text-blue-600 hover:text-blue-800">
                    View Details
                  </button>
                  <button className="text-gray-600 hover:text-gray-800">
                    <FaDownload /> Report
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showNewInspection && <NewInspectionModal />}
      </AnimatePresence>
    </div>
  );
}

export default Inspections;
