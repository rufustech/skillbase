import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { safetyhelmets } from "../assets";

function SubHeader() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // login state
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(Boolean(token) && loggedInStatus);
    };
    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  // close on Esc & lock scroll
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setIsMenuOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    ["auth_token", "user", "isLoggedIn", "token", "username"].forEach((k) =>
      localStorage.removeItem(k)
    );
    setIsLoggedIn(false);
    setIsMenuOpen(false);
    navigate("/");
  };

  const navItems = [
    { title: "Home", path: "/" },
    { title: "Certifications", path: "/certs" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
    { title: "News", path: "/news" },
  ];

  // hamburger line variants
  const topLine = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 6 },
  };
  const midLine = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
  };
  const botLine = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -6 },
  };

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
      <motion.ul className="hidden font-semibold text-[#432010] lg:absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:flex flex-row items-center justify-center gap-5">
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

      {/* HAMBURGER (mobile only) */}
      <button
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="lg:hidden p-2 rounded-md hover:bg-white/70 transition relative"
        onClick={() => setIsMenuOpen((v) => !v)}
      >
        <div className="w-7 h-6 relative">
          <motion.span
            variants={topLine}
            animate={isMenuOpen ? "open" : "closed"}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute left-0 top-0 block h-[3px] w-full bg-[#432010] rounded"
          />
          <motion.span
            variants={midLine}
            animate={isMenuOpen ? "open" : "closed"}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 block h-[3px] w-full bg-[#432010] rounded"
          />
          <motion.span
            variants={botLine}
            animate={isMenuOpen ? "open" : "closed"}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute left-0 bottom-0 block h-[3px] w-full bg-[#432010] rounded"
          />
        </div>
      </button>

      {/* MOBILE OVERLAY + DRAWER */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            {/* drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="fixed right-0 top-0 h-screen w-[78%] xs:w-[70%] sm:w-[60%] bg-white z-50 shadow-2xl p-6 flex flex-col"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <img
                    src={safetyhelmets}
                    alt="Logo"
                    className="h-10 w-10 object-contain rounded"
                  />
                  <span className="text-lg font-bold text-[#432010]">
                    Skillbase
                  </span>
                </div>
                <button
                  className="p-2 rounded-md hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <ul className="space-y-2 text-[#432010] font-semibold">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.title}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      to={item.path}
                      className="block px-4 py-3 rounded-xl hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="w-full bg-gradient-to-r from-[#432010] to-yellow-700 text-white font-bold py-3 rounded-full shadow hover:shadow-lg transition"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-center w-full bg-gradient-to-r from-[#432010] to-yellow-700 text-white font-bold py-3 rounded-full shadow hover:shadow-lg transition"
                  >
                    Login
                  </Link>
                )}
              </div>

              <p className="mt-4 text-xs text-gray-400 text-center">
                © {new Date().getFullYear()} Skillbase
              </p>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default SubHeader;
