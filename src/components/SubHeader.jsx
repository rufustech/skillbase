import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie
import { safetyhelmets } from "../assets";

function SubHeader() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null); // To store the email of the logged-in user
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggling the mobile menu

  // Check login status on component mount
  useEffect(() => {
    const loggedInStatus = Cookies.get("isLoggedIn") === "true"; // Check if user is logged in using cookie
    const storedEmail = Cookies.get("email"); // Get the email from cookies

    // Update state based on cookie values
    setIsLoggedIn(loggedInStatus);
    setUserEmail(storedEmail || null); // Store email if available, else set null
  }, []); // Empty dependency array to run once when the component mounts

  // Handle logout
  const handleLogout = () => {
    Cookies.remove("auth_token"); // Remove auth_token from cookies
    Cookies.remove("email"); // Remove email from cookies
    Cookies.remove("isLoggedIn"); // Remove isLoggedIn flag from cookies

    setIsLoggedIn(false); // Immediately update state
    setUserEmail(null); // Reset email
    navigate("/"); // Redirect to the home page
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <nav className="sticky bg-[#f9fafb] top-0 w-full flex justify-between relative h-16 items-center border-b px-3 md:px-10 lg:px-20 z-50">
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

      {/* Desktop Navigation */}
      <ul className="hidden font-semibold text-[#432010] dark:text-white lg:absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 lg:flex flex-row items-center justify-center gap-5">
        <li>
          <a className="hover:bg-gray-100 text-[#432010] px-2 py-1.5 rounded-md" href="/">
            Home
          </a>
        </li>
        <li>
          <a className="hover:bg-gray-100 text-[#432010] px-2 py-1.5 rounded-md" href="#">
            Certifications
          </a>
        </li>
        <li>
          <a className="hover:bg-gray-100 text-[#432010] px-2 py-1.5 rounded-md" href="#">
            About
          </a>
        </li>
        <li>
          <a className="hover:bg-gray-100 text-[#432010] px-2 py-1.5 rounded-md" href="#">
            Contact
          </a>
        </li>
      </ul>

      {/* Desktop Login/Logout Button */}
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

      {/* Hamburger Icon (Mobile) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={28}
        height={28}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide-icon AlignJustify 28 block lg:hidden hover:opacity-80 transition text-yellow-800"
        role="button"
        onClick={toggleMenu} // Toggle mobile menu visibility
      >
        <line x1={3} x2={21} y1={6} y2={6}></line>
        <line x1={3} x2={21} y1={12} y2={12}></line>
        <line x1={3} x2={21} y1={18} y2={18}></line>
      </svg>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-16 left-0 w-full bg-white text-[#432010] transition-all duration-300 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col items-center gap-5 py-3">
          <li>
            <a className="text-[#432010] hover:bg-gray-100 px-2 py-1.5 rounded-md" href="/">
              Home
            </a>
          </li>
          <li>
            <a className="text-[#432010] hover:bg-gray-100 px-2 py-1.5 rounded-md" href="#">
              Certifications
            </a>
          </li>
          <li>
            <a className="text-[#432010] hover:bg-gray-100 px-2 py-1.5 rounded-md" href="#">
              About
            </a>
          </li>
          <li>
            <a className="text-[#432010] hover:bg-gray-100 px-2 py-1.5 rounded-md" href="#">
              Contact
            </a>
          </li>
        </ul>
      </div>

      <span className="sr-only">Mobile Menu Icon</span>
    </nav>
  );
}

export default SubHeader;
