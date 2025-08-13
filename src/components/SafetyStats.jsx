import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaClock,
  FaExclamationTriangle,
  FaUserInjured,
  FaCheckCircle,
  FaChartLine,
  FaCalendarCheck,
} from "react-icons/fa";
import SideBar from "./SideBar";

function SafetyStats() {
  // In a real applicatiation, you'd fetch this data from your API
  const [safetyData, setSafetyData] = useState({
    daysWithoutIncident: 156,
    totalIncidents: 3,
    nearMisses: 8,
    safetyTrainingCompletion: 94,
    lostTimeInjuries: 0,
    safetyMeetingAttendance: 98,
    lastIncidentDate: "2024-01-15",
    currentYear: 2024,
  });

  const stats = [
    {
      title: "Days Without Incident",
      value: safetyData.daysWithoutIncident,
      icon: <FaClock />,
      color: "bg-green-500",
      trend: "+1 today",
    },
    {
      title: "Total Incidents (YTD)",
      value: safetyData.totalIncidents,
      icon: <FaExclamationTriangle />,
      color: "bg-red-500",
      trend: "-2 vs last year",
    },
    {
      title: "Near Misses Reported",
      value: safetyData.nearMisses,
      icon: <FaUserInjured />,
      color: "bg-yellow-500",
      trend: "+1 this month",
    },
    {
      title: "Training Completion",
      value: `${safetyData.safetyTrainingCompletion}%`,
      icon: <FaCheckCircle />,
      color: "bg-blue-500",
      trend: "+2% this month",
    },
    {
      title: "Lost Time Injuries",
      value: safetyData.lostTimeInjuries,
      icon: <FaChartLine />,
      color: "bg-purple-500",
      trend: "No change",
    },
    {
      title: "Meeting Attendance",
      value: `${safetyData.safetyMeetingAttendance}%`,
      icon: <FaCalendarCheck />,
      color: "bg-indigo-500",
      trend: "+3% vs last month",
    },
  ];

  return (
    <div className="p-4 sm:ml-64">
      <SideBar />
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800">
            Safety Statistics
          </h1>
          <p className="text-gray-600 mt-2">
            Year to Date Safety Performance Metrics for {safetyData.currentYear}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div
                className={`${stat.color} p-4 flex items-center justify-between`}
              >
                <div className="text-white text-2xl">{stat.icon}</div>
                <div className="text-white text-3xl font-bold">
                  {stat.value}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-gray-700 font-semibold">{stat.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{stat.trend}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Safety Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-gray-600">Last Incident Date</p>
              <p className="font-semibold">{safetyData.lastIncidentDate}</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-gray-600">Current Goal</p>
              <p className="font-semibold">200 Days Without Incident</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SafetyStats;
