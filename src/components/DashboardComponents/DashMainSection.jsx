import { useEffect, useState } from "react";
import {
  engwomanCreateCourse,
  safetyhelmets,
  womanengineer,
  womanengineerfrnt,
} from "../../assets";
import { useNavigate } from "react-router-dom";

function DashMainSection() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    setIsLoggedIn(false);
    navigate("/");
  };
  return (
    <div className="">
      <nav className="sticky bg-[#f9fafb] shadow-sm top-0 w-full flex justify-between relative h-16 items-center border-b px-3 md:px-10 lg:px-20 z-50">
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
          className="lucide-icon AlignJustify 24 block lg:hidden hover:opacity-80 transition text-gray-100"
          role="button"
        >
          <line x1={3} x2={21} y1={6} y2={6}></line>
          <line x1={3} x2={21} y1={12} y2={12}></line>
          <line x1={3} x2={21} y1={18} y2={18}></line>
        </svg>
        <span className="sr-only">Mobile Menu Icon</span>
      </nav>

      <div className="p-4 sm:ml-64 container mx-auto z-50">
        <div className="p-12 shadow shadow-lg rounded-lg dark:border-gray-700">
          <section className="relative mx-auto w-full h-full min-h-screen bg-grey-100 ">
            {/* <div className="hidden absolute z-20 left-0 top-12 w-full h-auto bg-white/90  px-4 py-2  flex-col md:flex-row">
              <button
                className="uppercase text-gray-800 text-xs lg:text-sm font-bold focus:bg-pink-300
           hover:bg-pink-300 px-2 h-full py-1 rounded transition-all duration-300"
              >
                Home
              </button>
              <button
                className="uppercase text-gray-800 text-xs lg:text-sm font-bold focus:bg-pink-300
           hover:bg-pink-300 px-2 h-full py-1 rounded transition-all duration-300"
              >
                Features
              </button>
              <button
                className="uppercase text-gray-800 text-xs lg:text-sm font-bold focus:bg-pink-300
           hover:bg-pink-300 px-2 h-full py-1 rounded transition-all duration-300"
              >
                Blog
              </button>
              <button
                className="uppercase text-gray-800 text-xs lg:text-sm font-bold focus:bg-pink-300
           hover:bg-pink-300 px-2 h-full py-1 rounded transition-all duration-300"
              >
                Contact us
              </button>
              <button
                className="uppercase text-gray-800 text-xs lg:text-sm font-bold focus:bg-pink-300
           hover:bg-pink-300 px-2 h-full py-1 rounded transition-all duration-300"
              >
                About
              </button>
            </div> */}
            <main className=" relative  ">
              <div className="flex flex-col lg:flex-row  ">
                <section className="flex md:pt-10 md:pl-20">
                  <div className="w-full h-auto  lg:pt-7  ">
                    <p className="pb-4">Hello Rufaro!</p>
                    <h1 className="__classNameName_8c8ae6  text-2xl lg:text-5xl lg:text-6xl text-[#432010] mb-10 font-extrabold uppercase ">
                      Welcome <br /> to Skillbase{" "}
                    </h1>
                    <h1 className="__classNameName_8c8ae6 text-3xl lg:text-5xl lg:text-6xl  font-extrabold  ">
                      {" "}
                    </h1>
                    <p className="max-w-sm py-5 text-gray-700  lg:text-lg mb-20">
                      Skillbase your knowledge portal to keep you safe and have
                      a healthy workspace
                    </p>
                    <div className="w-full flex items-center text-white justify-start gap-2">
                      <a
                        href="/courses"
                        className="p-4 px-12 shadow-lg text-center text-3xl hover:bg-[#432010] hover:scale-95 bg-white hover:shadow-lg text-[#432010] rounded-full hover:text-white font-bold  shadow-gray-400"
                      >
                        Start Training
                      </a>
                    </div>
                  </div>
                  <div className="overflow-hidden h-[80%] relative">
                    <img
                      src={womanengineerfrnt}
                      alt="Hero Image"
                      className="w-full  object-contain"
                    />
                  </div>
                </section>
              </div>
            </main>
          </section>
        </div>
      </div>
    </div>
  );
}

export default DashMainSection;
