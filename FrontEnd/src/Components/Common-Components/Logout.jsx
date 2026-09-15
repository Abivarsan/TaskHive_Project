// Logout.jsx
import React from "react";
import "./Styles/Logoutstyle.css";
import { useNavigate } from "react-router-dom";
import apiRequest from '../../Auth/ApiService';
import { useAuth } from '../../Auth/AuthContext';

export const handleLogout = async (navigate, logout) => {
  if (window.confirm("Are you sure you want to log out?")) {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      await apiRequest(`http://localhost:5228/api/Auth/logout`, "POST", { refreshToken });
      
      // Clear tokens
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      
      // Call logout from context
      logout();
      
      // Navigate to login
      navigate("/loginForm");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Logout failed: Access token expired or invalid");
        alert("Your session has expired. Please log in again.");
        navigate("/loginForm");
      } else {
        console.error("Logout failed:", error);
        alert("An error occurred during logout. Please try again.");
      }
    }
  }
};

export default function LogoutButton() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleClick = () => {
    handleLogout(navigate, logout);
  };

  return (
    <div className="logout">
      <button className="logoutbutton" onClick={handleClick}>
        Logout
      </button>
    </div>
  );
}
