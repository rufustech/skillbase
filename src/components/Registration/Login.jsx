import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { urls } from "../constants";
import { useUser } from "../userContext/UserContext";

export default function LogIn() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [isCreateAcc, setIsCreateAcc] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [isNameValid, setIsNameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPassConfirmValid, setIsPassConfirmValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [formDataToShow, setFormDataToShow] = useState(null);

  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [passwordConfirmErr, setPasswordConfirmErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const userurl = `${urls.url}/api/auth/register`;
  const authUrl = `${urls.url}/api/auth/login`;

  function usernameCondition(currentName) {
    if (currentName.length <= 3 || currentName.length === 0) {
      setUsernameErr("Please make name longer than 3 characters.");
      setIsNameValid(false);
    } else {
      setUsernameErr("");
      setIsNameValid(true);
    }
  }

  function emailConditions(currentEmail) {
    setEmail(currentEmail);
    if (currentEmail.match(emailRegex)) {
      setIsEmailValid(true);
      setEmailErr("");
    } else {
      setIsEmailValid(false);
      setEmailErr("Please input a valid email.");
    }
  }

  function passwordConditions(currentPw) {
    setPassword(currentPw); // Add this line
    if (currentPw.length <= 8 || currentPw.length === 0) {
      setIsPasswordValid(false);
      setPasswordErr("Please make password longer than 8 characters.");
    } else {
      setIsPasswordValid(true);
      setPasswordErr("");
    }
    // If there's a confirm password, check it again
    if (passwordConfirm) {
      passwordConfirmConditions(passwordConfirm);
    }
  }

  function passwordConfirmConditions(currentPwConfirm) {
    setPasswordConfirm(currentPwConfirm); // Add this line
    if (currentPwConfirm !== password) {
      setIsPassConfirmValid(false);
      setPasswordConfirmErr("Confirm password does not match password");
    } else {
      setIsPassConfirmValid(true);
      setPasswordConfirmErr("");
    }
  }

  function isFormValidCheck() {
    if (isCreateAcc) {
      if (
        isNameValid &&
        isEmailValid &&
        isPasswordValid &&
        isPassConfirmValid
      ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    } else {
      if (isEmailValid && isPasswordValid) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    }
  }

  useEffect(() => {
    isFormValidCheck();
  }, [isNameValid, isEmailValid, isPasswordValid, isPassConfirmValid]);

  const userHasNoAcc = (e) => {
    if (e) e.preventDefault(); // Prevent default only if event exists
    setIsCreateAcc(!isCreateAcc);
    // Reset form data and errors when switching
    setFormDataToShow(null);
    setUserName("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setUsernameErr("");
    setEmailErr("");
    setPasswordErr("");
    setPasswordConfirmErr("");
    // Reset validation states
    setIsNameValid(false);
    setIsEmailValid(false);
    setIsPasswordValid(false);
    setIsPassConfirmValid(false);
    setIsFormValid(false);
  };

  async function handleSignIn(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      console.log("Login attempt with:", { email });

      const res = await fetch(authUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (res.ok) {
        // Set all storage items
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", data.token);

        if (data.user?.username) {
          localStorage.setItem("username", data.user.username);
          Cookies.set("name", data.user.username, { expires: 7 });
        }

        // Set cookie
        Cookies.set("userToken", data.token, { expires: 7 });

        // Use context login
        login(data.token);

        // Navigate
        navigate("/dashboard");
      } else {
        setFormDataToShow(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setFormDataToShow("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateAcc(e) {
    e.preventDefault();
    try {
      setIsLoading(true);

      const res = await fetch(userurl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email: email.trim(), password }),
      });

      const data = await res.json();

      if (res.ok) {
        // <-- use res.ok or res.status === 201
        // Clear form
        setUserName("");
        setEmail("");
        setPassword("");
        setPasswordConfirm("");

        // Switch to login form
        setIsCreateAcc(false);

        // Show a friendly success message on the login screen
        setFormDataToShow({
          type: "success",
          message: data.message || "Account created. Please sign in.",
        });
      } else {
        setFormDataToShow({
          type: "error",
          message: data.message || "Could not create account.",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setFormDataToShow({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className=" bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto flex md:fl:flex-row items-center py- justify-center gap-8">
        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-xl"
        >
          <div className="text-center">
            <motion.h2
              className="text-3xl font-bold bg-gradient-to-r from-[#432010] to-yellow-700 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {isCreateAcc ? "Create Account" : "Welcome Back"}
            </motion.h2>
            <p className="mt-2 text-gray-600">
              {isCreateAcc
                ? "Start your training journey"
                : "Continue your training"}
            </p>
          </div>

          <form className="mt-8 space-y-6">
            <AnimatePresence mode="wait">
              {isCreateAcc && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#432010] focus:border-transparent transition-all duration-200"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => {
                      const value = e.target.value;
                      setUserName(value);
                      usernameCondition(value);
                    }}
                  />
                  {usernameErr && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {usernameErr}
                    </motion.p>
                  )}
                </motion.div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#432010] focus:border-transparent transition-all duration-200"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => emailConditions(e.target.value)}
                />
                {emailErr && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm"
                  >
                    {emailErr}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#432010] focus:border-transparent transition-all duration-200"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPassword(value);
                    passwordConditions(value);
                  }}
                />
                {passwordErr && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm"
                  >
                    {passwordErr}
                  </motion.p>
                )}
              </div>

              {/* Confirm Password field - only show when creating account */}
              {isCreateAcc && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#432010] focus:border-transparent transition-all duration-200"
                    type="password"
                    placeholder="Confirm your password"
                    value={passwordConfirm}
                    onChange={(e) => {
                      const value = e.target.value;
                      setPasswordConfirm(value);
                      passwordConfirmConditions(value);
                    }}
                  />
                  {passwordConfirmErr && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-500 text-sm"
                    >
                      {passwordConfirmErr}
                    </motion.p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!isFormValid || isLoading}
              onClick={isCreateAcc ? handleCreateAcc : handleSignIn}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-200
                ${
                  isFormValid
                    ? "bg-gradient-to-r from-[#432010] to-yellow-700 hover:shadow-lg"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto"
                />
              ) : isCreateAcc ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
            </motion.button>

            <div className="flex flex-col items-center space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={(e) => userHasNoAcc(e)}
                type="button" // Add this to prevent form submission
                className="text-blue-600 font-semibold text-lg hover:underline"
              >
                {isCreateAcc
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </motion.button>

              {!isCreateAcc && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href="/reset-password"
                  className="text-red-600 hover:underline"
                >
                  Forgot Password?
                </motion.a>
              )}
            </div>

            <AnimatePresence>
              {formDataToShow && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`text-center text-sm p-3 rounded-lg ${
                    formDataToShow.type === "success"
                      ? "text-green-600 bg-green-50"
                      : "text-red-600 bg-red-50"
                  }`}
                >
                  {typeof formDataToShow === "string"
                    ? formDataToShow
                    : formDataToShow.message}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

        {/* Image Section */}
        {/* <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:block w-full max-w-md"
        >
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            src={safetyImage}
            alt="Safety Illustration"
            className="w-full h-auto object-cover rounded-2xl shadow-2xl"
          />
        </motion.div> */}
      </div>
    </motion.div>
  );
}
