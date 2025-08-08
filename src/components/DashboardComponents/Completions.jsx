import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { safetycertificate } from "../../assets";
import SideBar from "../SideBar";
import SubHeader from "../SubHeader";

function Completions() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);

    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  const completedCourses = [
    { title: "Safety Measures in Mining" },
    { title: "Emergency Preparedness in Mining" },
    { title: "Environmental Impact and Sustainability" },
    { title: "Electrical Safety in Mining" },
    { title: "Mine Site Traffic Management" },
    { title: "Hazard Identification in Mining" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <span className="sr-only">Toggle sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-2 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        <SideBar />
      </aside>

      {/* Main Content */}
      <div className="p-4 sm:ml-64 container mx-auto mt-2">
        <div className="p-4 shadow-lg rounded-lg">
          <section className="py-4 md:py-12 bg-white relative overflow-hidden z-10">
            <div className="container px-4 mx-auto">
              <div className="grid grid-cols-12 mb-12 relative">
                <div className="col-span-12 md:col-span-8 lg:col-span-5 xl:col-span-4 text-start text-zinc-900">
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl leading-none text-[#432010] md:text-[45px] font-bold mb-6"
                  >
                    Completed Courses
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-lg opacity-80 leading-6 mb-6"
                  >
                    Hello {username}, your Completed Courses
                  </motion.p>
                </div>
              </div>

              <div className="grid grid-cols-12">
                <div className="col-span-12 lg:col-span-10 lg:col-start-2">
                  <div className="relative bg-white shadow-xl p-4 md:p-16">
                    <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 gap-6 text-center">
                      {completedCourses.map((course, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="col-span-2 md:col-span-1"
                        >
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-white text-[#432010] h-72 shadow-2xl relative rounded-xl p-2 lg:p-6"
                          >
                            <img
                              src={safetycertificate}
                              alt=""
                              className="max-w-full h-auto mx-auto rounded-xl max-h-[200px] object-cover mb-6"
                            />
                            <h4 className="text-xl font-semibold mb-4">
                              {course.title}
                            </h4>
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default Completions;
