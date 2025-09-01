// components/Competencies.js
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStar,
  FaPlus,
  FaUserGraduate,
  FaChartLine,
  FaCertificate,
  FaCalendarCheck,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import SideBar from "./SideBar";

function Competencies() {
  const [competencies, setCompetencies] = useState([
    {
      id: 1,
      title: "Heavy Equipment Operation",
      category: "Operations",
      level: "advanced",
      status: "active",
      validUntil: "2024-12-31",
      requiredCertifications: ["Equipment Safety", "Operator License"],
      skills: [
        { name: "Equipment Inspection", proficiency: 90 },
        { name: "Safety Protocols", proficiency: 85 },
        { name: "Maintenance", proficiency: 75 },
      ],
      assessments: [
        {
          date: "2024-01-15",
          score: 92,
          assessor: "John Smith",
          notes: "Excellent performance in practical test",
        },
      ],
      trainingHours: 40,
      lastAssessed: "2024-01-15",
      nextAssessment: "2024-07-15",
    },
    // Add more competencies...
  ]);

  const [showNewCompetency, setShowNewCompetency] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [selectedCompetency, setSelectedCompetency] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "all",
    "Operations",
    "Safety",
    "Technical",
    "Maintenance",
    "Quality",
  ];

  const levels = ["basic", "intermediate", "advanced", "expert"];

  const NewCompetencyModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-xl font-bold mb-4">Create New Competency</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter competency title"
            />
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
              <label className="block text-sm font-medium mb-1">Level</label>
              <select className="w-full p-2 border rounded-lg">
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Required Skills
            </label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  className="flex-1 p-2 border rounded-lg"
                  placeholder="Add skill"
                />
                <select className="w-32 p-2 border rounded-lg">
                  <option value="basic">Basic</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Required Certifications
            </label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  className="flex-1 p-2 border rounded-lg"
                  placeholder="Add certification"
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Training Requirements
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Required Hours
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter hours"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Validity Period (months)
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter months"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowNewCompetency(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Competency
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );

  const AssessmentModal = () => (
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
        <h2 className="text-xl font-bold mb-4">Conduct Assessment</h2>
        <form className="space-y-4">
          <div className="mb-4">
            <h3 className="font-medium text-gray-800">
              {selectedCompetency?.title}
            </h3>
            <p className="text-sm text-gray-500">
              Level: {selectedCompetency?.level}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Skill Assessment
            </label>
            {selectedCompetency?.skills.map((skill, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-sm text-gray-500">
                    Current: {skill.proficiency}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue={skill.proficiency}
                  className="w-full"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              className="w-full p-2 border rounded-lg"
              rows="3"
              placeholder="Enter assessment notes..."
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowAssessment(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Complete Assessment
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
            <h1 className="text-2xl font-bold text-gray-800">Competencies</h1>
            <button
              onClick={() => setShowNewCompetency(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <FaPlus className="mr-2" />
              New Competency
            </button>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search competencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Competencies Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {competencies
              .filter(
                (comp) =>
                  (filter === "all" || comp.category === filter) &&
                  comp.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((competency) => (
                <motion.div
                  key={competency.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {competency.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {competency.category} • {competency.level}
                      </p>
                    </div>
                    <div
                      className={`px-2 py-1 text-xs rounded-full ${
                        competency.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {competency.status}
                    </div>
                  </div>

                  <div className="space-y-4 mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Skills Assessment
                      </h4>
                      {competency.skills.map((skill, index) => (
                        <div key={index} className="mb-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span>{skill.name}</span>
                            <span>{skill.proficiency}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div
                              className={`h-2 rounded-full ${
                                skill.proficiency >= 80
                                  ? "bg-green-500"
                                  : skill.proficiency >= 60
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                              style={{ width: `${skill.proficiency}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Required Certifications
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {competency.requiredCertifications.map(
                          (cert, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                            >
                              {cert}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <FaClock className="mr-2" />
                      <span>{competency.trainingHours} training hours</span>
                    </div>
                    <div className="flex items-center">
                      <FaCalendarCheck className="mr-2" />
                      <span>
                        Valid until:{" "}
                        {new Date(competency.validUntil).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => {
                        setSelectedCompetency(competency);
                        setShowAssessment(true);
                      }}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <FaChartLine className="mr-1" /> Assess
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
        {showNewCompetency && <NewCompetencyModal />}
        {showAssessment && <AssessmentModal />}
      </AnimatePresence>
    </div>
  );
}

export default Competencies;
