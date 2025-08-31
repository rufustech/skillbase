// components/Whistleblower.js
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaLock,
  FaUser,
  FaEnvelope,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";
import SideBar from "./SideBar";

function Whistleblower() {
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    date: "",
    location: "",
    involvedParties: "",
    evidence: null,
    anonymous: true,
    name: "",
    email: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reportTypes = [
    "Health & Safety Violation",
    "Environmental Concern",
    "Ethics Violation",
    "Discrimination/Harassment",
    "Other",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      setSubmitted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SideBar />
        <div className="p-4 sm:ml-64">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto mt-20 bg-white rounded-lg shadow-md p-8 text-center"
          >
            <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Report Submitted Successfully
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for bringing this matter to our attention. Your report has
              been submitted securely and will be investigated promptly.
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Reference Number: {Math.random().toString(36).substr(2, 9)}
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  type: "",
                  description: "",
                  date: "",
                  location: "",
                  involvedParties: "",
                  evidence: null,
                  anonymous: true,
                  name: "",
                  email: "",
                });
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit Another Report
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SideBar />
      <div className="p-4 sm:ml-64">
        <div className="max-w-2xl mx-auto py-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-8">
              <FaShieldAlt className="text-4xl text-blue-600 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-800">
                Confidential Reporting System
              </h1>
              <p className="text-gray-600 mt-2">
                Your report will be handled with strict confidentiality
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type of Report
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value="">Select type</option>
                  {reportTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows="6"
                  className="w-full p-2 border rounded-lg"
                  placeholder="Please provide detailed information about the incident..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Incident
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg"
                    placeholder="Where did this occur?"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Involved Parties
                </label>
                <textarea
                  value={formData.involvedParties}
                  onChange={(e) =>
                    setFormData({ ...formData, involvedParties: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                  placeholder="List any individuals or departments involved..."
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Supporting Evidence
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    onChange={(e) =>
                      setFormData({ ...formData, evidence: e.target.files[0] })
                    }
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload any relevant documents, photos, or evidence
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <label className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    checked={formData.anonymous}
                    onChange={(e) =>
                      setFormData({ ...formData, anonymous: e.target.checked })
                    }
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-600">
                    Submit anonymously
                  </span>
                </label>

                {!formData.anonymous && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <FaLock className="mr-1" />
                  <span>Your report is encrypted and secure</span>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 bg-blue-600 text-white rounded-lg
                    ${
                      isSubmitting
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-blue-700"
                    }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Whistleblower;
