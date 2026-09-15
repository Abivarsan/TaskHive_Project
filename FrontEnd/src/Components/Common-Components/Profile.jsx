// Profile.jsx
import React, { useState, useEffect, useRef } from "react";
import "./Styles/Profile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getLoggedUserId } from "../../Auth/ApiService.js";
import { handleLogout as logoutUser } from "./Logout.jsx";
import { useAuth } from "../../Auth/AuthContext.js";

export default function Profile() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileUrl, setProfileUrl] = useState("");        // Firebase URL
  const [userName, setUserName] = useState("");
  const [email, setUserEmail] = useState("");
  const navigate = useNavigate();
  const { logout } = useAuth();
  const userId = getLoggedUserId();
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5228/api/Admin/${userId}`);
        setUserName(response.data.userName);
        setUserEmail(response.data.email);
        // Use the Firebase‐stored URL (ProfileImageUrl) if present
        setProfileUrl(response.data.profileImageUrl || response.data.profilePhoto || "");
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen]);

  const toggleProfile = () => setIsProfileOpen((open) => !open);
  const handleProfileVisibility = () => {
    navigate(`/editProfile/${userId}`);
    setIsProfileOpen(false);
  };
  const handleChangePassword = () => {
    navigate("/resetpassword");
    setIsProfileOpen(false);
  };
  const handleLogout = () => {
    logoutUser(navigate, logout);
    setIsProfileOpen(false);
  };

  const getInitials = (name) =>
    name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <div className="profile-section" ref={dropdownRef}>
      <div className="profile" onClick={toggleProfile}>
        {profileUrl ? (
          <img src={profileUrl} alt="Profile" className="profile-photo" />
        ) : (
          <div className="profile-photo-placeholder">
            {getInitials(userName)}
          </div>
        )}
        <span className="profile-name">{userName}</span>
      </div>

      {isProfileOpen && (
        <div className="profile-dropdown">
          <div className="profile-dropdown-info">
            {profileUrl ? (
              <img
                src={profileUrl}
                alt="Profile"
                className="profile-dropdown-photo"
              />
            ) : (
              <div className="profile-dropdown-photo-placeholder">
                {getInitials(userName)}
              </div>
            )}
            <h4 className="profile-dropdown-name">{userName}</h4>
            <p className="profile-dropdown-email">{email}</p>
          </div>
          <button onClick={handleProfileVisibility}>
            <i className="fa fa-user"></i> My Profile
          </button>
          <button onClick={handleChangePassword}>
            <i className="fa fa-lock"></i> Change Password
          </button>
          <button className="logout" onClick={handleLogout}>
            <i className="fa fa-sign-out-alt"></i> Logout
          </button>
        </div>
      )}
    </div>
  );
}
