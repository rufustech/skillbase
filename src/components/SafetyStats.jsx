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
  const currentYear = new Date().getFullYear();

  const [safetyData, setSafetyData] = useState({
    daysWithoutIncident: 156,
    totalIncidents: 3,
    nearMisses: 8,
    safetyTrainingCompletion: 94,
    lostTimeInjuries: 0,
    safetyMeetingAttendance: 98,
    lastIncidentDate: "2024-01-15",
    currentYear: currentYear,
  });

  const stats = [
    {
      title: "Days Without Incident",
      value: safetyData.daysWithoutIncident,
      icon: <FaClock />,
      trend: "+1 today",
    },
    {
      title: "Total Incidents (YTD)",
      value: safetyData.totalIncidents,
      icon: <FaExclamationTriangle />,
      trend: "-2 vs last year",
    },
    {
      title: "Near Misses Reported",
      value: safetyData.nearMisses,
      icon: <FaUserInjured />,
      trend: "+1 this month",
    },
    {
      title: "Training Completion",
      value: `${safetyData.safetyTrainingCompletion}%`,
      icon: <FaCheckCircle />,
      trend: "+2% this month",
    },
    {
      title: "Lost Time Injuries",
      value: safetyData.lostTimeInjuries,
      icon: <FaChartLine />,
      trend: "No change",
    },
    {
      title: "Meeting Attendance",
      value: `${safetyData.safetyMeetingAttendance}%`,
      icon: <FaCalendarCheck />,
      trend: "+3% vs last month",
    },
  ];

  return (
    <div className="p-4 sm:ml-64">
      <SideBar />
      <div className="max-w-7xl mx-auto">
        <section className="relative w-full overflow-hidden">
          {/* Background shapes/decorations */}
          <svg
            className="absolute -bottom-[20%] left-0 -z-[1]"
            width={405}
            height={626}
            viewBox="0 0 405 626"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="-302.65"
              y="296.986"
              width="433.92"
              height={140}
              rx="73.8464"
              transform="rotate(-33.796 -302.65 296.986)"
              fill="#7434F8"
              fillOpacity="0.5"
            />
            <rect
              x={-315}
              y="502.403"
              width="666.584"
              height={140}
              rx="73.8464"
              transform="rotate(-33.796 -315 502.403)"
              fill="#FAA515"
              fillOpacity="0.5"
            />
          </svg>

          <svg
            className="absolute -top-[20%] right-0 -z-[1]"
            width={340}
            height={658}
            viewBox="0 0 495 778"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx={389}
              cy={389}
              r={389}
              fill="#0d6efd"
              fillOpacity="0.19"
            />
          </svg>

          <div className="container mx-auto px-4 py-12">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h1 className="text-4xl md:text-[40px] text-[#432010] font-bold mb-4">
                Safety Performance Dashboard
              </h1>
              <p className="text-lg text-gray-700 bg-white/85 backdrop-blur-md p-4 rounded-lg shadow-sm">
                Year to Date Safety Performance Metrics for{" "}
                {safetyData.currentYear}
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
                  className="bg-white shadow-lg border-double border-1 border-[#432010] rounded-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl text-[#432010]">{stat.icon}</div>
                      <div className="text-3xl font-bold text-[#432010]">
                        {stat.value}
                      </div>
                    </div>
                    <h3 className="text-[#432010] font-semibold">
                      {stat.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{stat.trend}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8 bg-white shadow-lg border-double border-1 border-[#432010] rounded-lg p-6"
            >
              <h2 className="text-2xl font-bold text-[#432010] mb-4">
                Safety Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-l-4 border-[#432010] pl-4">
                  <p className="text-gray-600">Last Incident Date</p>
                  <p className="font-semibold text-[#432010]">
                    {safetyData.lastIncidentDate}
                  </p>
                </div>
                <div className="border-l-4 border-[#432010] pl-4">
                  <p className="text-gray-600">Current Goal</p>
                  <p className="font-semibold text-[#432010]">
                    200 Days Without Incident
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SafetyStats;
