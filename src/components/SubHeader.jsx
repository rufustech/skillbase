import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { safetyhelmets } from "../assets";

function SubHeader() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // Toggle menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="sticky bg-[#f9fafb] top-0 w-full shadow-sm flex justify-between relative h-16 items-center border-b px-3 md:px-10 lg:px-20 z-50">
      {/* Logo */}
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

      {/* Desktop Login/Logout */}
      <div className="hidden lg:flex items-center justify-center gap-5 text-[#432010] text-sm">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="border-gray-900 border text-lg rounded-full text-white font-bold bg-[#432010] px-12 py-2 hover:scale-95 hover:text-[#432010] hover:bg-[white] hover:border-4 hover:border-double cursor-pointer hover:opacity-80 transition"
          >
            Logout
          </button>
        ) : (
          <a
            href="/login"
            className="border-gray-900 border text-lg rounded-full text-white font-bold bg-[#432010] px-12 py-2 hover:scale-95 hover:text-[#432010] hover:bg-[white] hover:border-4 hover:border-double cursor-pointer hover:opacity-80 transition"
          >
            Login
          </a>
        )}
      </div>

      {/* Hamburger Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide-icon AlignJustify 24 block lg:hidden hover:opacity-80 transition text-gray-500"
        role="button"
        onClick={toggleMenu}
      >
        <line x1={3} x2={21} y1={6} y2={6}></line>
        <line x1={3} x2={21} y1={12} y2={12}></line>
        <line x1={3} x2={21} y1={18} y2={18}></line>
      </svg>
      <span className="sr-only">Mobile Menu Icon</span>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg z-40 p-5 flex flex-col gap-5">
          <ul className="flex flex-col items-center text-[#432010] font-semibold gap-4">
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
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full border-gray-900 border text-lg rounded-full text-white font-bold bg-[#432010] px-12 py-2 hover:scale-95 hover:text-[#432010] hover:bg-[white] hover:border-4 hover:border-double cursor-pointer hover:opacity-80 transition"
            >
              Logout
            </button>
          ) : (
            <a
              href="/login"
              className="w-full border-gray-900 border text-lg rounded-full text-white font-bold bg-[#432010] px-12 py-2 hover:scale-95 hover:text-[#432010] hover:bg-[white] hover:border-4 hover:border-double cursor-pointer hover:opacity-80 transition"
            >
              Login
            </a>
          )}
        </div>
      )}
    </nav>
  );
}

export default SubHeader;
