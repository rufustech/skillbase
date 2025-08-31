// components/Procedures.js
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFileAlt,
  FaPlus,
  FaDownload,
  FaEye,
  FaEdit,
  FaTrash,
  FaClock,
  FaChartLine,
  FaUserCheck,
  FaHistory,
} from "react-icons/fa";
import SideBar from "./SideBar";

function Procedures() {
  const [procedures, setProcedures] = useState([
    {
      id: 1,
      title: "Emergency Evacuation Procedure",
      department: "Safety",
      version: "2.1",
      lastUpdated: "2024-01-15",
      nextReview: "2024-07-15",
      status: "active",
      approvedBy: "John Smith",
      completionRate: 89,
      description:
        "Standard procedure for emergency evacuation of all facilities",
      attachments: ["evacuation-map.pdf", "emergency-contacts.pdf"],
      revisionHistory: [
        {
          date: "2024-01-15",
          changes: "Updated assembly points and emergency contacts",
          author: "Sarah Johnson",
        },
      ],
    },
    // Add more procedures...
  ]);

  const [showNewProcedure, setShowNewProcedure] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [showRevisionHistory, setShowRevisionHistory] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState(null);

  const departments = [
    "all",
    "Safety",
    "Operations",
    "Maintenance",
    "Quality",
    "Production",
  ];

  const NewProcedureModal = () => (
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
        <h2 className="text-xl font-bold mb-4">Create New Procedure</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter procedure title"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Department</label>
              <select className="w-full p-2 border rounded-lg">
                {departments.slice(1).map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Version</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                placeholder="e.g., 1.0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className="w-full p-2 border rounded-lg"
              rows="4"
              placeholder="Enter procedure description..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Next Review Date
              </label>
              <input type="date" className="w-full p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium um mb-1">
                Approved By
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg-lg"
                placeholder="Enter approver's name"
              />
            </div>
          </div>

          <div>
            <labeabel className="block text-sm font-medium mb-1">Attachments</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                multiple
                className="hidden"
                id="procedure-files"
              />
              <label
                htmlFor="procedure-files"
                className="cursor-pointer text-blue-600 hover:text-blue-800"
              >
                Click to upload files
              </label>
              <p className="text-sm text-gray-500 mt-1">
                PDF, Word, or Excel files
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowNewProcedure(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Procedure
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );

  const RevisionHistoryModal = () => (
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
        <h2 className="text-xl font-bold mb-4">Revision History</h2>
        <div className="space-y-4">
          {selectedProcedure?.revisionHistory.map((revision, index) => (
            <div
              key={index}
              className="border-b pb-4 last:border-b-0 last:pb-0"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-gray-500">
                    {new Date(revision.date).toLocaleDateString()}
                  </div>
                  <div className="font-medium">{revision.author}</div>
                </div>
                <div className="text-sm">{revision.changes}</div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setShowRevisionHistory(false)}
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
              Standard Operating Procedures
            </h1>
            <button
              onClick={() => setShowNewProcedure(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <FaPlus className="mr-2" />
              New Procedure
            </button>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search procedures..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-10 border rounded-lg"
              />
              <FaFileAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept.charAt(0).toUpperCase() + dept.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Procedures Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {procedures
              .filter(
                (procedure) =>
                  (selectedDepartment === "all" ||
                    procedure.department === selectedDepartment) &&
                  procedure.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
              )
              .map((procedure) => (
                <motion.div
                  key={procedure.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {procedure.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {procedure.department} • v{procedure.version}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        procedure.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {procedure.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    {procedure.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <FaClock className="mr-2" />
                      <span>
                        Updated: {new Date(procedure.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FaUserCheck className="mr-2" />
                      <span>Approved by: {procedure.approvedBy}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Completion Rate</span>
                      <span>{procedure.completionRate}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-blue-600 rounded-full"
                        style={{ width: `${procedure.completionRate}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <FaEye />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <FaDownload />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <FaEdit />
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedProcedure(procedure);
                        setShowRevisionHistory(true);
                      }}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <FaHistory />
                    </button>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showNewProcedure && <NewProcedureModal />}
        {showRevisionHistory && <RevisionHistoryModal />}
      </AnimatePresence>
    </div>
  );
}

export default Procedures;
