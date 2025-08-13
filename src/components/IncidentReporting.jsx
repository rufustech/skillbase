import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
  FaCamera,
  FaArrowRight,
} from "react-icons/fa";
import SideBar from "./SideBar";

function IncidentReporting() {
  // Generate time options in 30-minute intervals
  const generateTimeOptions = () => {
    const times = [];
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j += 30) {
        const hour = i.toString().padStart(2, "0");
        const minute = j.toString().padStart(2, "0");
        const timeString = `${hour}:${minute}`;
        const displayTime = `${hour}:${minute}`;
        times.push({ value: timeString, label: displayTime });
      }
    }
    return times;
  };

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    reporterName: "",
    date: "",
    time: "",
    location: "",
    incidentType: "",
    severity: "low",
    description: "",
    photos: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const incidentTypes = [
    { value: "nearMiss", label: "Near Miss", color: "yellow" },
    { value: "firstAid", label: "First Aid", color: "blue" },
    { value: "injury", label: "Injury", color: "red" },
    { value: "property", label: "Property Damage", color: "orange" },
    { value: "environmental", label: "Environmental", color: "green" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...files],
    }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
      setFormData({
        reporterName: "",
        date: "",
        time: "",
        location: "",
        incidentType: "",
        severity: "low",
        description: "",
        photos: [],
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const StepHeader = ({ title }) => (
    <h3 className="text-xl font-semibold text-gray-800 mb-6 bg-white p-4 rounded-lg shadow-sm">
      {title}
    </h3>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <StepHeader title="Step 1: Select Incident Type" />
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {incidentTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        incidentType: type.value,
                      }));
                      nextStep();
                    }}
                    className={`p-4 rounded-lg border-2 transition-all flex items-center justify-center
                      ${
                        formData.incidentType === type.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <span className="text-lg">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <StepHeader title="Step 2: When and Where" />
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FaClock className="text-gray-400" />
                    <label className="block text-sm font-medium text-gray-700">
                      Date
                    </label>
                  </div>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FaClock className="text-gray-400" />
                    <label className="block text-sm font-medium text-gray-700">
                      Time
                    </label>
                  </div>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select time</option>
                    {generateTimeOptions().map((time) => (
                      <option key={time.value} value={time.value}>
                        {time.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <label className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Building/Room/Area"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Next <FaArrowRight className="inline ml-2" />
              </button>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <StepHeader title="Step 3: Incident Details" />
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What happened?
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe what happened in detail..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add Photos (optional)
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="cursor-pointer px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center">
                      <FaCamera className="mr-2" />
                      Add Photos
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                    <span className="text-sm text-gray-500">
                      {formData.photos.length} photos selected
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Back
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-md text-white font-medium
                  ${
                    isSubmitting
                      ? "bg-gray-400"
                      : "bg-green-600 hover:bg-green-700"
                  }
                  transition-colors duration-200`}
              >
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SideBar />
      <div className="p-4 sm:ml-64">
        <div className="max-w-2xl mx-auto py-8">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-green-50 p-6 rounded-lg text-center"
            >
              <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-green-800">
                Report Submitted Successfully
              </h2>
              <p className="text-green-600 mt-2">
                Thank you for reporting this incident.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                }}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Submit Another Report
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-between mb-8">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-1/3 h-2 rounded-full mx-1 ${
                      i <= step ? "bg-blue-500" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default IncidentReporting;
