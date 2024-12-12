import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { safetyImage } from "../../assets";
import { useNavigate } from "react-router-dom";
import { urls } from "../constants";

export default function LogIn() {
  const navigate = useNavigate();
  
  // State variables for form inputs
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [isCreateAcc, setIsCreateAcc] = useState(false); // Determines if user is creating an account
  
  // Validation conditions for the form
  const [isNameValid, setIsNameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPassConfirmValid, setIsPassConfirmValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  
  const [isFormValid, setIsFormValid] = useState(false);
  const [formDataToShow, setFormDataToShow] = useState(null); // Used to show error messages or success
  
  // Error messages for validation
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [passwordConfirmErr, setPasswordConfirmErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  // Regex for validating email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // API URLs
  const url = `${urls.url}/api/user`;
  const authUrl = `${urls.url}/api/auth/login`;

  // Checking conditions for form validity
  const conditions = [isNameValid, isEmailValid, isPasswordValid, isPassConfirmValid];

  // Validation functions for each field
  const usernameCondition = (currentName) => {
    if (currentName.length <= 3 || currentName.length === 0) {
      setUsernameErr("Please make name longer than 3 characters.");
      setIsNameValid(false);
    } else {
      setUsernameErr("");
      setIsNameValid(true);
    }
  };

  const emailConditions = (currentEmail) => {
    if (currentEmail.match(emailRegex) && currentEmail.length !== 0) {
      setEmail(currentEmail);
      setIsEmailValid(true);
      setEmailErr("");
    } else {
      setIsEmailValid(false);
      setEmailErr("Please input a valid email.");
    }
  };

  const passwordConditions = (currentPw) => {
    if (currentPw.length <= 8 || currentPw.length === 0) {
      setIsPasswordValid(false);
      setPasswordErr("Please make password longer than 8 characters.");
    } else {
      setIsPasswordValid(true);
      setPasswordErr("");
    }
  };

  const passwordConfirmConditions = (currentPwConfirm) => {
    if (currentPwConfirm !== password) {
      setIsPassConfirmValid(false);
      setPasswordConfirmErr("Confirm password does not match password.");
    } else {
      setIsPassConfirmValid(true);
      setPasswordConfirmErr("");
    }
  };

  // Check if the form is valid or not
  const isFormValidCheck = () => {
    if (isCreateAcc) {
      if (isNameValid && isEmailValid && isPasswordValid && isPassConfirmValid) {
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
  };

  useEffect(() => {
    isFormValidCheck();
  }, [conditions]);

  // Switch between login and registration
  const userHasNoAcc = () => {
    setIsCreateAcc(!isCreateAcc);
  };

  // Handle Sign In
  const handleSignIn = async () => {
    try {
      const res = await fetch(authUrl, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (data.message === "Login successful") {
        // Store user token, email and login status
        Cookies.set("userToken", data.token, { expires: 7 });
        Cookies.set("email", email, { expires: 7 });
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("email", email); // Save email in localStorage for persistence
        setFormDataToShow(data.message);
        navigate("/dashboard");
      } else {
        setFormDataToShow(data.message);
      }
    } catch (error) {
      console.log("Error logging in:", error);
    }
  };

  // Handle account creation
  const handleCreateAcc = async () => {
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (data.message === "User created successfully") {
        // Store user token, email and login status
        Cookies.set("userToken", data.token, { expires: 7 });
        Cookies.set("email", email, { expires: 7 });
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("email", email); // Save email in localStorage for persistence
        setFormDataToShow(data.message);
        navigate("/dashboard");
      } else {
        setFormDataToShow(data.message);
      }
    } catch (error) {
      console.log("Error creating account:", error);
    }
  };

  return (
    <div className="container h-screen mx-auto flex mt-10 md:mt-20">
      <div className="grid md:grid-cols-2">
        <form className="w-full p-4">
          {/* Username Field (Only for registration) */}
          {isCreateAcc && (
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                User Name
              </label>
              <input
                className="appearance-none bg-white border-double border-2 border-[#432010] block w-full text-gray-700 border rounded py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Enter your Name"
                onChange={(e) => {
                  const value = e.target.value;
                  setUserName(value);
                  usernameCondition(value);
                }}
              />
              <p className="text-red-500 text-xs italic min-h-[20px]">{usernameErr && usernameErr}</p>
            </div>
          )}
          {/* Email Field */}
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2" htmlFor="grid-last-name">
              Email
            </label>
            <input
              className="appearance-none bg-white border-double border-2 border-[#432010] block w-full text-gray-700 border rounded py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="example@email.com"
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);
                emailConditions(value);
              }}
            />
          </div>
          <p className="text-red-600 text-xs">{emailErr && emailErr}</p>

          {/* Password Field */}
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2" htmlFor="grid-password">
              Password
            </label>
            <input
              className="appearance-none bg-white border-double border-2 border-[#432010] block w-full text-gray-700 border rounded py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="password"
              placeholder="******************"
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);
                passwordConditions(value);
              }}
            />
            <p className="text-red-500 text-xs italic">{passwordErr && passwordErr}</p>
          </div>

          {/* Confirm Password Field (Only for registration) */}
          {isCreateAcc && (
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password-confirm">
                Confirm Password
              </label>
              <input
                className="appearance-none bg-white border-double border-2 border-[#432010] block w-full text-gray-700 border rounded py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password-confirm"
                type="password"
                placeholder="******************"
                onChange={(e) => {
                  const value = e.target.value;
                  setPasswordConfirm(value);
                  passwordConfirmConditions(value);
                }}
              />
              <p className="text-red-500 text-xs italic">{passwordConfirmErr && passwordConfirmErr}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            className="px-12 py-3 m-2 bg-transparent hover:border-white border-double border-4 border-yellow-700 text-lg border-[#954535] hover:text-white rounded-full hover:grow hover:bg-[#954535] disabled:bg-slate-600 disabled:text-gray-300 bg-[#432010]"
            id="SubmitBtn"
            disabled={!isFormValid}
            onClick={(e) => {
              e.preventDefault();
              isCreateAcc ? handleCreateAcc() : handleSignIn();
            }}
          >
            Submit
          </button>

          {/* Switch Between Login and Registration */}
          {!isCreateAcc ? (
            <>
              <p className="text-center">Register and start Training!</p>
              <button className="text-blue-800 text-lg text-center w-full" onClick={(e) => {
                e.preventDefault();
                userHasNoAcc();
              }}>
                Create Here!
              </button>
              {formDataToShow && <p>{formDataToShow}</p>}
            </>
          ) : (
            <p className="text-center" onClick={(e) => {
              e.preventDefault();
              userHasNoAcc();
            }}>
              Ready to Train? Sign in here!
              <br />
              <button className="text-blue-800 text-lg">Click Here!</button>
            </p>
          )}
        </form>
        <div className="hidden sm:block md:w-full">
          <img className="object-contain" src={safetyImage} alt="Safety" />
        </div>
      </div>
    </div>
  );
}
