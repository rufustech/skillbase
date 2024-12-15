import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { safetyImage } from "../../assets";
import { useNavigate } from "react-router-dom";
import { urls } from "../constants";

export default function LogIn() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [isCreateAcc, setIsCreateAcc] = useState(false);

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

  let jwtToken = "";
  const url = `${urls.url}/api/user`;
  const authUrl = `${urls.url}/api/auth/login`;

  const conditions = [
    isNameValid,
    isEmailValid,
    isPasswordValid,
    isPassConfirmValid,
  ];

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
    if (currentPw.length <= 8 || currentPw.length === 0) {
      setIsPasswordValid(false);
      setPasswordErr("Please make password longer than 8 characters.");
    } else {
      setIsPasswordValid(true);
      setPasswordErr("");
    }
  }

  function passwordConfirmConditions(currentPwConfirm) {
    if (currentPwConfirm !== password) {
      setIsPassConfirmValid(false);
      setPasswordConfirmErr("Confirm password does not match password.");
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

  function userHasNoAcc() {
    if (!isCreateAcc) {
      setIsCreateAcc(true);
    } else {
      setIsCreateAcc(false);
    }
  }

  async function handleSignIn() {
    try {
      const res = await fetch(authUrl, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        Cookies.set("userToken", data.token, { expires: 7 });
        Cookies.set("name", data.name, { expires: 7 });
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("token", data?.token);

        data?.token ? navigate("/dashboard") : navigate("/");
      } else {
        setFormDataToShow(data.message || "Login failed. Try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setFormDataToShow("Network error. Please try again.");
    }
  }

  async function handleCreateAcc() {
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          name: username,
          createdAt: Date.UTC,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data.message);

      if (data.message === "User created successfully") {
        Cookies.set("userToken", data.token, { expires: 7 });
        Cookies.set("name", username, { expires: 7 });
        localStorage.setItem("isLoggedIn", true);
        setFormDataToShow(data.message);
        navigate("/dashboard");
      } else {
        setFormDataToShow(data.message);
      }
    } catch (error) {
      console.log("error fetching data", error);
    }
  }

  return (
    <>
      <div className="container h-screen mx-auto flex mt-10 md:mt-20">
        <div className="grid md:grid-cols-2">
          <form className={`w-full p-4`}>
            <div className="flex flex-wrap mb-6">
              {isCreateAcc && (
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-first-name"
                  >
                    User Name
                  </label>
                  <input
                    className="appearance-none h-16 bg-white border-double border-1 border-[#432010] block w-full text-gray-700 border rounded py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder="Enter your Name"
                    onChange={(e) => {
                      const value = e.target.value;
                      setUserName(value);
                      usernameCondition(value);
                    }}
                  />
                  <p className="text-red-500 text-xs italic min-h-[20px]">
                    {usernameErr}
                  </p>
                </div>
              )}
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Email
                </label>
                <input
                  className="appearance-none h-16 bg-white border-double border-1 border-[#432010] block w-full text-gray-700 border rounded py-4 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
              <br />
              <p className="text-red-600 text-xs italic">
                {emailErr && emailErr}
              </p>
            </div>
            <div className="flex flex-wrap mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input
                  className="appearance-none h-16 bg-white border-double border-1 border-[#432010] block w-full text-gray-700 border rounded py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="password"
                  placeholder=""
                  onChange={(e) => {
                    const value = e.target.value;
                    setPassword(value);
                    passwordConditions(value);
                  }}
                />
                <p className="text-red-500 text-xs italic">
                  {passwordErr && passwordErr}
                </p>
              </div>
            </div>
            {isCreateAcc && (
              <div className="flex flex-wrap mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Confirm Password
                  </label>
                  <input
                    className="appearance-none h-16 bg-white border-double border-1 border-[#432010] block w-full text-gray-700 border rounded py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-password-confirm"
                    type="password"
                    placeholder=""
                    onChange={(e) => {
                      const value = e.target.value;
                      setPasswordConfirm(value);
                      passwordConfirmConditions(value);
                    }}
                  />
                  <p className="text-red-500 text-xs italic">
                    {passwordConfirmErr && passwordConfirmErr}
                  </p>
                </div>
              </div>
            )}

            <button
              className="px-12 py-3 m-2 bg-transparent hover:border-white border-double border-4 border-yellow-700 text-lg border-[#954535] hover:text-white rounded-full hover:grow hover:bg-[#954535] disabled:bg-slate-600 disabled:text-gray-300 bg-[#432010]"
              id="SubmitBtn"
              disabled={!isFormValid}
              onClick={(e) => {
                e.preventDefault();
                isCreateAcc ? handleCreateAcc() : handleSignIn(username);
              }}
            >
              Submit
            </button>

            {!isCreateAcc ? (
              <>
                <p className="text-center">Register and start Training!</p>
                <button
                  className="text-blue-800 text-lg text-center w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    userHasNoAcc();
                  }}
                >
                  Create Here!
                </button>

                {formDataToShow && (
                  <p>
                    username or password does not match our records, please try
                    again.
                  </p>
                )}
              </>
            ) : (
              <p
                className="text-center"
                onClick={(e) => {
                  e.preventDefault();
                  userHasNoAcc();
                }}
              >
                Ready to Train Sign in here!
                <br />
                <button className="text-blue-800 text-lg"> Click Here!</button>
              </p>
            )}
          </form>
          <div className="hidden sm:block md:w-full">
            <img
              className="object-contain"
              src={safetyImage}
              alt="safety image"
            />
          </div>
        </div>
      </div>
    </>
  );
}
