import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FaUser, FaLock } from "react-icons/fa";
import { useAuth } from "../../Auth/AuthContext";
import "../Admin/Styles/LoginForm.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { UserName: username, Password: password };

    try {
      const response = await axios.post("http://localhost:5228/api/Auth/login", data);
      const { accessToken, refreshToken } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      const decodedToken = jwtDecode(accessToken);
      const userCategoryId = decodedToken["UserCategoryId"];
      const userId = decodedToken["UserID"];

      login({
        userId: decodedToken["UserID"],
        userName: decodedToken["UserName"],
        userCategoryId: userCategoryId,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });

      switch (userCategoryId) {
        case "1":
          navigate("/adminDashboard", { state: { userId } });
          break;
        case "2":
          navigate("/ProjectManagerDashboard", { state: { userId } });
          break;
        case "3":
          navigate("/developerDashboard", { state: { userId } });
          break;
        case "4":
          navigate("/clientDashboard", { state: { userId } });
          break;
        default:
          navigate("/");
          break;
      }
    } catch (error) {
      alert("Login failed, please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

          <div className="remember-forgot">
            <a href="/forgotPassword">Forgot password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
