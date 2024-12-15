import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { safetyhelmets } from "../assets";

function SubHeader() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for managing the mobile menu

  // Check login status on component mount
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  // Toggle menu visibility
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="sticky bg-[#f9fafb] top-0 w-full shadow-sm flex justify-between relative h-16 items-center border-b px-3 md:px-10 lg:px-20 z-50">
      <div className="flex items-center gap-2">
        <a href="/">
          <img
            src={safetyhelmets}
            alt="Logo"
            className="h-16 w-auto object-contain shadow-[#fff] shadow-lg rounded"
          />
        </a>
        <span className="sr-only">Shop Logo</span>
        <p className="text-[#432010]">Skillbase</p>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden font-semibold text-[#432010] dark:text-white lg:absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 lg:flex flex-row items-center justify-center gap-5">
        <li>
          <a
            className="hover:bg-gray-100 text-[#432010] px-2 py-1.5 rounded-md"
            href="/"
          >
            Home
          </a>
        </li>
        <li>
          <a
            className="hover:bg-gray-100 text-[#432010] px-2 py-1.5 rounded-md"
            href="/certs"
          >
            Certifications
          </a>
        </li>
        <li>
          <a
            className="hover:bg-gray-100 text-[#432010] px-2 py-1.5 rounded-md"
            href="/about"
          >
            About
          </a>
        </li>
        <li>
          <a
            className="hover:bg-gray-100 text-[#432010] px-2 py-1.5 rounded-md"
            href="/contact"
          >
            Contact
          </a>
        </li>
      </ul>

      {/* Mobile Menu */}
      <div
        className={`absolute top-16 left-0 w-full bg-[#f9fafb] shadow-lg p-5 transition-transform transform ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        } lg:hidden`}
      >
        <ul className="font-semibold text-[#432010] flex flex-col gap-4">
          <li>
            <a
              className="hover:bg-gray-100 text-[#432010] px-2 py-1.5 rounded-md"
              href="/"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </a>
          </li>
          <li>
            <a
              className="hover:bg-gray-100 text-[#432010] px-2 py-1.5 rounded-md"
              href="/certs"
              onClick={() => setMenuOpen(false)}
            >
              Certifications
            </a>
          </li>
          <li>
            <a
              className="hover:bg-gray-100 text-[#432010] px-2 py-1.5 rounded-md"
              href="/about"
              onClick={() => setMenuOpen(false)}
            >
              About
            </a>
          </li>
          <li>
            <a
              className="hover:bg-gray-100 text-[#432010] px-2 py-1.5 rounded-md"
              href="/contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
          </li>
          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="text-left text-[#432010] px-2 py-1.5 rounded-md"
            >
              Logout
            </button>
          ) : (
            <a
              href="/login"
              className="hover:bg-gray-100 text-[#432010] px-2 py-1.5 rounded-md"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </a>
          )}
        </ul>
      </div>

      {/* Hamburger Icon */}
      <button
        className="block lg:hidden text-[#432010] hover:opacity-80 transition"
        onClick={toggleMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide-icon AlignJustify 24"
        >
          <line x1={3} x2={21} y1={6} y2={6}></line>
          <line x1={3} x2={21} y1={12} y2={12}></line>
          <line x1={3} x2={21} y1={18} y2={18}></line>
        </svg>
      </button>
    </nav>
  );
}

export default SubHeader;
