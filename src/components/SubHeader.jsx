import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { safetyhelmets } from "../assets";

function SubHeader() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check login status whenever component mounts or localStorage changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(token && loggedInStatus);
    };

    // Check initial status
    checkLoginStatus();

    // Add event listener for storage changes
    window.addEventListener("storage", checkLoginStatus);

    // Cleanup
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    // Clear all auth-related items
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    // Update state
    setIsLoggedIn(false);

    // Close mobile menu if open
    setIsMenuOpen(false);

    // Navigate to home
    navigate("/");
  };

  const navItems = [
    { title: "Home", path: "/" },
    { title: "Certifications", path: "/certs" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
    { title: "News", path: "/news" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky bg-gradient-to-r from-gray-50 to-gray-100 top-0 w-full shadow-md flex justify-between relative h-16 items-center border-b px-3 md:px-10 lg:px-20 z-50"
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Link to="/">
            <img
              src={safetyhelmets}
              alt="Logo"
              className="h-16 w-auto object-contain drop-shadow-lg rounded"
            />
          </Link>
        </motion.div>
        <motion.p
          className="text-[#432010] font-semibold text-xl"
          whileHover={{ scale: 1.05 }}
        >
          Skillbase
        </motion.p>
      </motion.div>

      {/* Desktop Menu */}
      <motion.ul className="hidden font-semibold text-[#432010] lg:absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 lg:flex flex-row items-center justify-center gap-5">
        {navItems.map((item, index) => (
          <motion.li
            key={item.title}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link
                to={item.path}
                className="hover:bg-white/80 text-[#432010] px-4 py-2 rounded-full transition-colors duration-300"
              >
                {item.title}
              </Link>
            </motion.div>
          </motion.li>
        ))}
      </motion.ul>

      {/* Desktop Login/Logout */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:flex items-center justify-center gap-5"
      >
        <AnimatePresence mode="wait">
          {isLoggedIn ? (
            <motion.button
              key="logout"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="bg-gradient-to-r from-[#432010] to-yellow-700 text-lg rounded-full text-white font-bold px-12 py-2 hover:shadow-lg transition duration-300"
            >
              Logout
            </motion.button>
          ) : (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/login"
                className="bg-gradient-to-r from-[#432010] to-yellow-700 text-lg rounded-full text-white font-bold px-12 py-2 hover:shadow-lg transition duration-300"
              >
                Login
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Hamburger Icon - remains the same */}

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 w-full bg-white shadow-xl z-40 p-5 flex flex-col gap-5"
          >
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center text-[#432010] font-semibold gap-4"
            >
              {navItems.map((item, index) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Link
                      to={item.path}
                      className="hover:bg-gray-100 px-4 py-2 rounded-full block"
                      onClick={() => setIsMenuOpen(false)} // Close menu when clicking a link
                    >
                      {item.title}
                    </Link>
                  </motion.div>
                </motion.li>
              ))}
            </motion.ul>
            <AnimatePresence mode="wait">
              {isLoggedIn ? (
                <motion.button
                  key="logout-mobile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-[#432010] to-yellow-700 text-lg rounded-full text-white font-bold px-12 py-2 hover:shadow-lg transition duration-300"
                >
                  Logout
                </motion.button>
              ) : (
                <motion.div
                  key="login-mobile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/login"
                    className="bg-gradient-to-r from-[#432010] to-yellow-700 text-lg rounded-full text-white font-bold px-12 py-2 hover:shadow-lg transition duration-300 block text-center"
                    onClick={() => setIsMenuOpen(false)} // Close menu when clicking login
                  >
                    Login
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default SubHeader;
