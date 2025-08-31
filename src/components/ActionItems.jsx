// components/ActionItems.js
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaTasks,
  FaPlus,
  FaUserCircle,
  FaClock,
  FaExclamationCircle,
  FaCheckCircle,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import SideBar from "./SideBar";

function ActionItems() {
  const [actions, setActions] = useState([
    {
      id: 1,
      title: "Install Emergency Lighting",
      description: "Install backup lighting in stairwell B",
      priority: "high",
      status: "in-progress",
      assignee: "Mike Johnson",
      dueDate: "2024-02-01",
      source: "Safety Inspection",
      progress: 60,
      comments: [
        {
          user: "John Doe",
          text: "Materials ordered",
          date: "2024-01-15",
        },
      ],
    },
    // Add more action items...
  ]);

  const [showNewAction, setShowNewAction] = useState(false);
  const [filter, setFilter] = useState("all");

  const priorities = {
    low: "bg-gray-100 text-gray-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  const statuses = {
    "not-started": "bg-gray-100 text-gray-800",
    "in-progress": "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    overdue: "bg-red-100 text-red-800",
  };

  const NewActionModal = () => (
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
        <h2 className="text-xl font-bold mb-4">Create New Action Item</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter action item title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className="w-full p-2 border rounded-lg"
              rows="3"
              placeholder="Describe the action item..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <select className="w-full p-2 border rounded-lg">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <input type="date" className="w-full p-2 border rounded-lg" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Assignee</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="Assign to..."
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowNewAction(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Action Item
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
            <h1 className="text-2xl font-bold text-gray-800">Action Items</h1>
            <button
              onClick={() => setShowNewAction(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <FaPlus className="mr-2" />
              New Action Item
            </button>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-2">
            {["all", "not-started", "in-progress", "completed", "overdue"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filter === status
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
                </button>
              )
            )}
          </div>

          {/* Action Items List */}
          <div className="space-y-4">
            {actions
              .filter(
                (action) => filter === "all" || action.status === filter
              )
              .map((action) => (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {action.description}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          priorities[action.priority]
                        }`}
                      >
                        {action.priority}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          statuses[action.status]
                        }`}
                      >
                        {action.status.replace("-", " ")}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-blue-600 rounded-full"
                        style={{ width: `${action.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>{action.progress}% complete</span>
                      <span>Due: {new Date(action.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <FaUserCircle className="mr-1" />
                        {action.assignee}
                      </div>
                      <div className="text-sm text-gray-500">
                        Source: {action.source}
                      </div>
                    </div>
                    <div className="space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
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

      {showNewAction && <NewActionModal />}
    </div>
  );
}

export default ActionItems;
