// UserManagement.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../Common-Components/Searchbar.jsx";
import LogoutButton from "../Common-Components/Logout.jsx";
import apiRequest from "../../Auth/ApiService.js";
import "./styles/UserMangement.css";

export default function UserManagement() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await apiRequest("http://localhost:5228/api/Admin/UserList");
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      fetchData();
    } else {
      try {
        const result = await apiRequest(
          `http://localhost:5228/api/Admin/UserSearch/${encodeURIComponent(searchTerm)}`
        );
        setData(result);
      } catch (error) {
        console.error("Error searching data:", error);
      }
    }
  };

  const handleAddUser = () => {
    navigate("/userCreation");
  };

  const handleUserClick = (id) => {
    navigate(`/userProfilePage/${id}`);
  };

  if (loading) {
    return <div className="user-management-container">Loading...</div>;
  }

  return (
    <div className="user-management-container">
      <div className="controls-row">
        <div className="search-wrapper">
          <SearchBar onSearch={handleSearch} />
        </div>
        <button className="add-user-btn" onClick={handleAddUser}>
          Add New User
        </button>
      </div>

      {data.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">👥</div>
          <div className="empty-state-title">No Users Found</div>
          <div className="empty-state-message">
            Try adding a new user or adjust your search.
          </div>
          <button className="add-user-btn" onClick={handleAddUser}>
            Add First User
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="UserList">
            <thead>
              <tr>
                <th>Photo</th>
                <th>User ID</th>
                <th>User Name</th>
                <th>First Name</th>
                <th>Email</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr
                  key={user.userId}
                  onClick={() => handleUserClick(user.userId)}
                >
                  <td className="profile-photo-cell">
                    {user.profileImageUrl ? (
                      <img
                        src={user.profileImageUrl}
                        alt="avatar"
                        className="profile-photo"
                      />
                    ) : (
                      <div className="profile-photo-placeholder">
                        {user.firstName?.[0]?.toUpperCase() || "U"}
                      </div>
                    )}
                  </td>
                  <td>#{user.userId}</td>
                  <td>{user.userName || "N/A"}</td>
                  <td>{user.firstName || "N/A"}</td>
                  <td>{user.email || "N/A"}</td>
                  <td>
                    <span
                      className={`category-badge ${
                        user.userCategoryType?.toLowerCase() || "user"
                      }`}
                    >
                      {user.userCategoryType}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
