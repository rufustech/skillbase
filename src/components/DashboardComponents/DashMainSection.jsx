import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import {
  FaGraduationCap,
  FaCertificate,
  FaBookOpen,
  FaClipboardList,
  FaUserCheck,
  FaUserPlus,
  FaChartBar,
  FaExclamationTriangle,
  FaUsers,
  FaDatabase,
  FaBalanceScale,
  FaPoll,
  FaBullhorn,
  FaSearchPlus,
  FaTasks, // Changed from FaTasksAlt
  FaClipboard, // New - for Bulletin
} from "react-icons/fa";

function DashMainSection() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!token || !isLoggedIn) {
      navigate("/login");
      return;
    }

    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUsername(storedName);
    }
  }, [navigate]);

  const dashboardItems = [
    {
      title: "Online Training",
      icon: <FaGraduationCap className="text-4xl" />,
      link: "/courses",
      color: "from-blue-500 to-blue-600",
      description: "Access your training modules",
    },
    {
      title: "Certificates",
      icon: <FaCertificate className="text-4xl" />,
      link: "/certs",
      color: "from-green-500 to-green-600",
      description: "View your certifications",
    },
    {
      title: "Policies",
      icon: <FaBookOpen className="text-4xl" />,
      link: "/policies",
      color: "from-purple-500 to-purple-600",
      description: "Company policies and guidelines",
    },
    {
      title: "Procedures",
      icon: <FaClipboardList className="text-4xl" />,
      link: "/procedures",
      color: "from-yellow-500 to-yellow-600",
      description: "Standard operating procedures",
    },
    {
      title: "Competencies",
      icon: <FaUserCheck className="text-4xl" />,
      link: "/competencies",
      color: "from-red-500 to-red-600",
      description: "Skill assessments and tracking",
    },
    {
      title: "Orientations",
      icon: <FaUserPlus className="text-4xl" />,
      link: "/orientations",
      color: "from-indigo-500 to-indigo-600",
      description: "New employee onboarding",
    },
    {
      title: "Safety Stats",
      icon: <FaChartBar className="text-4xl" />,
      link: "/safety-stats",
      color: "from-teal-500 to-teal-600",
      description: "Safety performance metrics",
    },
    {
      title: "Incident Reporting",
      icon: <FaExclamationTriangle className="text-4xl" />,
      link: "/incident-reporting",
      color: "from-orange-500 to-orange-600",
      description: "Report safety incidents",
    },
    {
      title: "Safety Meetings",
      icon: <FaUsers className="text-4xl" />,
      link: "/safety-meetings",
      color: "from-pink-500 to-pink-600",
      description: "Meeting schedules and minutes",
    },
    {
      title: "SDS",
      icon: <FaDatabase className="text-4xl" />,
      link: "/sds",
      color: "from-cyan-500 to-cyan-600",
      description: "Safety Data Sheets",
    },
    {
      title: "Legislation",
      icon: <FaBalanceScale className="text-4xl" />,
      link: "/legislation",
      color: "from-gray-600 to-gray-700",
      description: "Safety laws and regulations",
    },
    {
      title: "Surveys",
      icon: <FaPoll className="text-4xl" />,
      link: "/surveys",
      color: "from-emerald-500 to-emerald-600",
      description: "Participate in safety surveys",
    },
    {
      title: "Whistleblower",
      icon: <FaBullhorn className="text-4xl" />,
      link: "/whistleblower",
      color: "from-rose-500 to-rose-600",
      description: "Confidential reporting system",
    },
    {
      title: "Inspections",
      icon: <FaSearchPlus className="text-4xl" />,
      link: "/inspections",
      color: "from-amber-500 to-amber-600",
      description: "Safety inspection reports",
    },
    {
      title: "Action Items",
      icon: <FaTasks className="text-4xl" />, // Changed icon
      link: "/action-items",
      color: "from-lime-500 to-lime-600",
      description: "Track safety action items",
    },
    {
      title: "Bulletin",
      icon: <FaClipboard className="text-4xl" />,
      link: "/bulletin",
      color: "from-fuchsia-500 to-fuchsia-600", // New unique color
      description: "Company announcements and updates",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-4 sm:ml-64">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome back, {username}!
            </h1>
            <p className="text-gray-600 mt-2">
              Access your safety and training resources below
            </p>
          </motion.div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dashboardItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to={item.link}>
                  <div
                    className={`
                    h-full p-6 rounded-xl shadow-lg
                    bg-gradient-to-br ${item.color}
                    transform transition-all duration-300
                    hover:shadow-xl
                    flex flex-col items-center justify-center
                    text-white
                  `}
                  >
                    <div className="mb-4">{item.icon}</div>
                    <h3 className="text-xl font-semibold text-center mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-center opacity-90">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default DashMainSection;
