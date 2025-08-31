// components/SafetyMeetings.js
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarPlus,
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
  FaFileAlt,
} from "react-icons/fa";
import SideBar from "./SideBar";

function SafetyMeetings() {
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: "Monthly Safety Review",
      date: "2024-02-01",
      time: "09:00",
      location: "Conference Room A",
      attendees: 15,
      status: "upcoming",
      agenda: [
        "Review of recent incidents",
        "Safety protocol updates",
        "Training schedule",
      ],
      minutes: null,
    },
    // Add more meetings...
  ]);

  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const ScheduleMeetingModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-lg p-6 w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">Schedule Safety Meeting</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter meeting title"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input type="date" className="w-full p-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Time</label>
              <input type="time" className="w-full p-2 border rounded-lg" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="Enter location"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Agenda Items</label>
            <textarea
              className="w-full p-2 border rounded-lg"
              rows="4"
              placeholder="Enter agenda items (one per line)"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowScheduleModal(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Schedule Meeting
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
            <h1 className="text-2xl font-bold text-gray-800">Safety Meetings</h1>
            <button
              onClick={() => setShowScheduleModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <FaCalendarPlus className="mr-2" />
              Schedule Meeting
            </button>
          </div>

          {/* Meetings Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {meetings.map((meeting) => (
              <motion.div
                key={meeting.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {meeting.title}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      meeting.status === "upcoming"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {meeting.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaClock className="mr-2" />
                    <span>
                      {new Date(meeting.date).toLocaleDateString()} at{" "}
                      {meeting.time}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{meeting.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaUsers className="mr-2" />
                    <span>{meeting.attendees} attendees</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Agenda
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {meeting.agenda.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <FaCheckCircle className="mr-2 mt-1 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center">
                  <button className="text-blue-600 hover:text-blue-800">
                    <FaUsers className="inline mr-1" /> Manage Attendees
                  </button>
                  {meeting.minutes ? (
                    <button className="text-gray-600 hover:text-gray-800">
                      <FaFileAlt className="inline mr-1" /> View Minutes
                    </button>
                  ) : (
                    <button className="text-gray-400 cursor-not-allowed">
                      <FaFileAlt className="inline mr-1" /> No Minutes
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {showScheduleModal && <ScheduleMeetingModal />}
    </div>
  );
}

export default SafetyMeetings;
