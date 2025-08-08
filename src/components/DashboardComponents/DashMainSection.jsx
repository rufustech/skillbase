import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { womanengineerfrnt } from "../../assets";
import { useNavigate, Link } from "react-router-dom";

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

  return (
    <div className=" bg-gray-50">
      <div className="p-2 sm:ml-64 container mx-auto">
        <div className="px-12 shadow-lg rounded-lg">
          <section className="relative w-full h-[calc(100vh-200px)] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              {/* Left Content Section */}
              <div className="flex flex-col justify-center px-4 lg:px-2">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-4xl lg:text-6xl text-[#432010] font-semibold uppercase mb-4">
                    <span className="text-orange-800 italic block mb-2">
                      {username}
                    </span>
                    Welcome to Skillbase
                  </h1>

                  <p className="text-gray-700 text-lg lg:text-xl mb-8 max-w-lg">
                    Skillbase your knowledge portal to keep you safe and have a
                    healthy workspace
                  </p>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/courses"
                      className="inline-block px-12 py-4 text-xl lg:text-2xl 
                        bg-white text-[#432010] rounded-full font-bold 
                        shadow-lg hover:bg-[#432010] hover:text-white 
                        transition-all duration-300 ease-in-out"
                    >
                      Start Training
                    </Link>
                  </motion.div>
                </motion.div>
              </div>

              {/* Right Image Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative h-full"
              >
                <div className="absolute inset-0 flex items-start justify-center lg:justify-end">
                  <img
                    src={womanengineerfrnt}
                    alt="Engineer"
                    className=" h-full max-h-[95vh] w-full object-cover"
                    style={{
                      marginTop: "-5%", // Adjust this value to move image up/down
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default DashMainSection;
