import { useState } from "react";
import { motion } from "framer-motion";
import { urls } from "../constants";

function Reset() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (currentEmail) => {
    const isValid = emailRegex.test(currentEmail);
    setIsEmailValid(isValid);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${urls.url}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset link has been sent to your email");
        setEmail("");
      } else {
        setMessage(data.message || "Failed to send reset link");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-28 bg-gradient-to-b from-gray-50 to-gray-100 px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6"
      >
        <div className="text-center">
          <motion.h2
            className="text-3xl font-bold bg-gradient-to-r from-[#432010] to-yellow-700 bg-clip-text text-transparent mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Reset Password
          </motion.h2>
          <p className="text-gray-600">
            Enter your email to receive a password reset link
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email Address
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#432010] focus:border-transparent transition-all duration-200"
              placeholder="you@example.com"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!isEmailValid || isLoading}
            type="submit"
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-200
              ${
                isEmailValid
                  ? "bg-gradient-to-r from-[#432010] to-yellow-700 hover:shadow-lg"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto"
              />
            ) : (
              "Send Reset Link"
            )}
          </motion.button>

          {message && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center text-sm ${
                message.includes("sent") ? "text-green-500" : "text-red-500"
              }`}
            >
              {message}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <a
              href="/login"
              className="text-[#432010] hover:underline font-medium"
            >
              Back to Login
            </a>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default Reset;
