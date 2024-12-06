"use client";

import { useState, useNavigate } from "react";

function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup forms

  const toggleForm = () => {
    setIsLogin(!isLogin); // Switch between login and signup
  };

  return (
    <div>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>

      {isLogin ? (
        <form>
          <div>
            <label>Email:</label>
            <input type="email" placeholder="Enter email" />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" placeholder="Enter password" />
          </div>
          <button type="submit">Login</button>
        </form>
      ) : (
        <form>
          <div>
            <label>Email:</label>
            <input type="email" placeholder="Enter email" />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" placeholder="Enter password" />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input type="password" placeholder="Confirm password" />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      )}

      <button onClick={toggleForm}>
        {isLogin
          ? "Need an account? Sign Up"
          : "Already have an account? Login"}
      </button>
    </div>
  );
}

export default LoginSignup;
