// UserDetailView.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import './styles/UserDetailView.css';
import UpdateUserRoleComponent from './UpdateUserRole';
import { getLoggedUserId } from '../../Auth/ApiService';

const UserDetailView = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isActive, setIsActive] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5228/api/Admin/${userId}`);
        setUserData(response.data);
        setIsActive(response.data.isActive);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const fetchLoggedUserId = () => {
      try {
        const id = getLoggedUserId();
        setLoggedInUserId(id);
      } catch (error) {
        console.error('Error fetching logged-in user ID:', error);
      }
    };

    fetchLoggedUserId();
  }, []);

  const deactivateUser = async () => {
    const confirmDeactivation = window.confirm("Are you sure you want to deactivate the user?");
    if (!confirmDeactivation) {
      return;
    }

    try {
      await axios.post('http://localhost:5228/api/Admin/Deactivate-User', { userId });
      alert("User deactivated successfully.");
      window.location.reload();
      setErrorMessage(null);
    } catch (error) {
      handleError(error, 'Error deactivating user.');
    }
  };

  const reactivateUser = async () => {
    const confirmReactivation = window.confirm("Are you sure you want to reactivate the user?");
    if (!confirmReactivation) {
      return;
    }

    try {
      await axios.post('http://localhost:5228/api/Admin/Reactivate-User', { userId });
      alert("User reactivated successfully.");
      window.location.reload();
      setErrorMessage(null);
    } catch (error) {
      handleError(error, 'Error reactivating user.');
    }
  };

  const handleError = (error, genericErrorMessage) => {
    if (error.response && error.response.data && error.response.data.message) {
      setErrorMessage(error.response.data.message);
      window.alert(error.response.data.message);
    } else {
      setErrorMessage(genericErrorMessage);
      window.alert(genericErrorMessage);
    }
    console.error(genericErrorMessage, error);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || 'U';
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-state">Loading user details...</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="profile-container">
        <div className="error-state">User not found or error loading data.</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* Header Section */}
      <div className="profile-header">
        {userData.profileImageUrl ? (
          <img
            src={userData.profileImageUrl}
            alt="Profile"
            className="profile-image"
          />
        ) : (
          <div className="profile-image-placeholder">
            {getInitials(userData.firstName, userData.lastName)}
          </div>
        )}
        
        <div className="profile-info">
          <h2>{userData.firstName} {userData.lastName}</h2>
          <span className={`status-badge ${isActive ? 'active' : 'inactive'}`}>
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      {/* Details Table */}
      <table className="user-details-table">
        <tbody>
          <tr>
            <td className="label">User ID:</td>
            <td className="value">#{userData.userId}</td>
          </tr>
          <tr>
            <td className="label">Username:</td>
            <td className="value">{userData.userName || 'N/A'}</td>
          </tr>
          <tr>
            <td className="label">Name:</td>
            <td className="value">{userData.firstName} {userData.lastName}</td>
          </tr>
          <tr>
            <td className="label">Email:</td>
            <td className="value">{userData.email || 'N/A'}</td>
          </tr>
          <tr>
            <td className="label">Mobile Number:</td>
            <td className="value">{userData.contactNumber || 'N/A'}</td>
          </tr>
          <tr>
            <td className="label">Address:</td>
            <td className="value">{userData.address || 'N/A'}</td>
          </tr>
          <tr>
            <td className="label">Gender:</td>
            <td className="value">{userData.gender || 'N/A'}</td>
          </tr>
          <tr>
            <td className="label">NIC:</td>
            <td className="value">{userData.nic || 'N/A'}</td>
          </tr>
          <tr>
            <td className="label">Date of Birth:</td>
            <td className="value">
              {userData.dob ? new Date(userData.dob).toLocaleDateString() : 'N/A'}
            </td>
          </tr>
          <tr>
            <td className="label">User Category:</td>
            <td className="value">{userData.userCategoryType || 'N/A'}</td>
          </tr>
          <tr>
            <td className="label">Job Role:</td>
            <td className="value">{userData.jobRoleType || 'N/A'}</td>
          </tr>
        </tbody>
      </table>

      {/* Action Buttons */}
      <div className="bottom-buttons">
        <Link to="/userManagement">
          <button className="btn back">Back to List</button>
        </Link>
        
        {loggedInUserId && parseInt(loggedInUserId) !== parseInt(userId) && (
          <>
            <button className="btn update-role" onClick={handleShowModal}>
              Update Role
            </button>
            
            {isActive ? (
              <button className="btn deactivate" onClick={deactivateUser}>
                Deactivate User
              </button>
            ) : (
              <button className="btn reactivate" onClick={reactivateUser}>
                Reactivate User
              </button>
            )}
          </>
        )}
      </div>

      {/* Modal for Role Update */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update User Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateUserRoleComponent
            userId={userId}
            currentRole={userData.userCategoryType}
            onClose={handleCloseModal}
          />
        </Modal.Body>
      </Modal>

      {/* Error Message Display */}
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default UserDetailView;
