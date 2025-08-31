// components/SurveyDashboard.js
import { useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";
import SideBar from "./SideBar";

function SurveyDashboard() {
  // Dummy data for surveys
  const [surveys, setSurveys] = useState([
    {
      id: 1,
      title: "Safety Culture Assessment",
      description: "Evaluate current safety practices and awareness",
      questions: [
        {
          id: 1,
          text: "How satisfied are you with safety protocols?",
          type: "rating",
          options: [1, 2, 3, 4, 5],
        },
        {
          id: 2,
          text: "Do you feel adequately trained for emergency situations?",
          type: "yesNo",
        },
      ],
      responses: 45,
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      title: "Workplace Wellness Survey",
      description: "Assess employee wellbeing and satisfaction",
      questions: [
        {
          id: 1,
          text: "Rate your work-life balance",
          type: "rating",
          options: [1, 2, 3, 4, 5],
        },
      ],
      responses: 32,
      status: "draft",
      createdAt: "2024-01-20",
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newSurvey, setNewSurvey] = useState({
    title: "",
    description: "",
    questions: [],
  });

  // Modal for creating/editing surveys
  const CreateSurveyModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-lg p-6 w-full max-w-2xl"
      >
        <h2 className="text-2xl font-bold mb-4">Create New Survey</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={newSurvey.title}
              onChange={(e) =>
                setNewSurvey({ ...newSurvey, title: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className="w-full p-2 border rounded"
              value={newSurvey.description}
              onChange={(e) =>
                setNewSurvey({ ...newSurvey, description: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create Survey
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
            <h1 className="text-2xl font-bold text-gray-800">Surveys</h1>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaPlus className="mr-2" />
              Create Survey
            </button>
          </div>

          {/* Survey List */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {surveys.map((survey) => (
              <motion.div
                key={survey.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {survey.title}
                    </h3>
                    <p className="text-sm text-gray-500">{survey.description}</p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      survey.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {survey.status}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-4">
                      Questions: {survey.questions.length}
                    </span>
                    <span>Responses: {survey.responses}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Created: {new Date(survey.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <button className="text-blue-600 hover:text-blue-800">
                    <FaEye className="inline mr-1" /> View Results
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

      {/* Create Survey Modal */}
      {showCreateModal && <CreateSurveyModal />}
    </div>
  );
}

export default SurveyDashboard;
