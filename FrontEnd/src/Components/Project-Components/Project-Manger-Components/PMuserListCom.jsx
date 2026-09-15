import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import apiRequest from '../../../Auth/ApiService.js';
import {jwtDecode} from 'jwt-decode';
import '../Styles/PMuserList.css'

export default function PMuserListCom() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    fetchUserRoleFromToken();
  }, []);

  const fetchUserRoleFromToken = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.UserCategory);
    }
  };

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

  const handleAddUser = () => {
    navigate('/userCreation');
  };

  const handleSearch = async (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm.trim() === "") {
      fetchData();
    } else {
      try {
        const result = await apiRequest(`http://localhost:5228/api/User/search?term=${searchTerm}`);
        setData(result);
      } catch (error) {
        console.error("Error searching data:", error);
      }
    }
  };

  const getCategoryClass = (category) => {
    const categoryLower = category?.toLowerCase() || '';
    if (categoryLower.includes('admin')) return 'admin';
    if (categoryLower.includes('manager') || categoryLower.includes('pm')) return 'manager';
    if (categoryLower.includes('developer') || categoryLower.includes('dev')) return 'developer';
    return 'user';
  };

  const getInitials = (firstName, userName) => {
    if (firstName) {
      return firstName.charAt(0).toUpperCase();
    }
    if (userName) {
      return userName.charAt(0).toUpperCase();
    }
    return 'U';
  };

  if (loading) {
    return (
      <div className="user-list-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading users...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      {/* Header */}
      <div className="user-list-header">
        <h2 className="user-list-title">User Management</h2>
        <p className="user-list-subtitle">
          Manage and view all system users
        </p>
      </div>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="total-users">
          Total Users: {data.length}
        </div>
        <div className="filter-chips">
          <span className="filter-chip active">All Users</span>
          <span className="filter-chip">Active</span>
          <span className="filter-chip">Recent</span>
        </div>
      </div>

      {/* Controls */}
      <div className="user-list-controls">
        <div className="search-section">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search users by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        
        {/* <button className="add-user-button" onClick={handleAddUser}>
          Add New User
        </button> */}
      </div>

      {/* Table */}
      {data.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">👥</div>
          <h3 className="empty-state-title">No Users Found</h3>
          <p className="empty-state-message">
            {searchTerm ? 'No users match your search criteria.' : 'Get started by adding your first user.'}
          </p>
          {!searchTerm && (
            <button className="empty-state-button" onClick={handleAddUser}>
              Add First User
            </button>
          )}
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
                <th>User Category</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, index) => (
                <tr key={user.userId || index}>
                  <td className="profile-photo-cell">
                    {user.profileImageUrl ? (
                      <img
                        src={user.profileImageUrl}
                        alt={user.userName || 'User'}
                        className="profile-dropdown-photo1"
                      />
                    ) : (
                      <div className="profile-photo-placeholder">
                        {getInitials(user.firstName, user.userName)}
                      </div>
                    )}
                  </td>
                  <td className="user-id-cell">#{user.userId}</td>
                  <td className="user-name-cell">{user.userName || 'N/A'}</td>
                  <td className="first-name-cell">{user.firstName || 'N/A'}</td>
                  <td className="email-cell">{user.email || 'N/A'}</td>
                  <td className="user-category-cell">
                    <span className={`category-badge ${getCategoryClass(user.userCategoryType)}`}>
                      {user.userCategoryType || 'User'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {data.length > 0 && (
        <div className="pagination-container">
          <div className="pagination-info">
            Showing {data.length} users
          </div>
          <div className="pagination-controls">
            <button className="pagination-btn" disabled>Previous</button>
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn" disabled>Next</button>
          </div>
        </div>
      )}
    </div>
  );
}
