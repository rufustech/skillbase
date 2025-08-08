import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import { useUser } from "../components/userContext/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCertificate,
  faChartPie,
  faFileCircleQuestion,
  faIndent,
  faPersonChalkboard,
  faToolbox,
  faUnlockKeyhole,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function SideBar() {
  const [username, setUsername] = useState("");
  const { user, isAdmin } = useUser();

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  // Common CSS classes for links
  const linkClasses =
    "flex items-center p-2 text-gray-900 rounded-lg text-md font-semibold hover:bg-gray-100 transition-colors duration-200";

  const menuItems = [
    {
      path: "",
      icon: faUser,
      text: (
        <>
          <span className="capitalize">{username}</span>
        </>
      ),
    },
    {
      path: "/completions",
      icon: faCertificate,
      text: "Certificates",
    },
    {
      path: "/courses",
      icon: faPersonChalkboard,
      text: "Courses",
      badge: "3",
    },
    {
      path: "/safety-stats",
      icon: faChartPie,
      text: "Safety Stats",
    },
    {
      path: "/incident-reporting",
      icon: faIndent,
      text: "Incident Reporting",
    },
    {
      path: "/certs",
      icon: faToolbox,
      text: "Completions",
    },
    {
      path: "/quiz",
      icon: faFileCircleQuestion,
      text: "QUIZ",
    },
  ];

  // Add admin menu item if user is admin
  if (isAdmin) {
    menuItems.splice(4, 0, {
      path: "/admin",
      icon: faUnlockKeyhole,
      text: "Admin",
    });
  }

  return (
    <aside
      id="default-sidebar"
      className="fixed top-[64px] bottom-[250px] left-0 z-40 w-64 transition-transform -translate-x-full sm:translate-x-0 bg-gray-200"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
        <ul className="space-y-2 font-medium">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.path} className={linkClasses}>
                <FontAwesomeIcon icon={item.icon} className="text-[#432010]" />
                <span className="flex-1 ms-3 whitespace-nowrap text-[#432010]">
                  {item.text}
                </span>
                {item.badge && (
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default SideBar;
