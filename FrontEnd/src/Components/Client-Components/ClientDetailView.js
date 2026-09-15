// ClientDetailView.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './styles/ClientDetailView.css';

const ClientDetailView = () => {
  const { clientId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:5228/api/Admin/${clientId}`);
      setUserData(response.data);
    } catch (error) {
      setErrorMessage('Error fetching user data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line
  }, [clientId]);

  const deactivateUser = async () => {
    if (!window.confirm('Are you sure you want to deactivate the user?')) return;
    try {
      await axios.post('http://localhost:5228/api/Admin/Deactivate-Client', { clientId });
      alert('User deactivated successfully.');
      setErrorMessage(null);
      fetchUserData();
    } catch (error) {
      handleErrorResponse(error, 'deactivating');
    }
  };

  const reactivateUser = async () => {
    if (!window.confirm('Are you sure you want to reactivate the user?')) return;
    try {
      await axios.post('http://localhost:5228/api/Admin/Reactivate-Client', { clientId });
      alert('User reactivated successfully.');
      setErrorMessage(null);
      fetchUserData();
    } catch (error) {
      handleErrorResponse(error, 'reactivating');
    }
  };

  const handleErrorResponse = (error, action) => {
    if (error.response?.data?.message) {
      setErrorMessage(error.response.data.message);
      window.alert(error.response.data.message);
    } else {
      setErrorMessage(`Error ${action} user.`);
      window.alert(`Error ${action} user.`);
    }
  };

  if (loading) {
    return (
      <div className="detail-loading-container">
        <div className="detail-loading-spinner"></div>
        <div className="detail-loading-text">Loading client details…</div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="client-detail-card error">
        <div className="client-detail-header">
          <Link to="/clientlist" className="back-link">
            <FontAwesomeIcon icon={faChevronLeft} /> Back to Client List
          </Link>
          <h2>Client Details</h2>
        </div>
        <div className="detail-alert">{errorMessage}</div>
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  return (
    <div className="client-detail-card">
      <div className="client-detail-header">
        <Link to="/clientlist" className="back-link">
          <FontAwesomeIcon icon={faChevronLeft} /> Back to Client List
        </Link>
        <h2>
          <FontAwesomeIcon icon={faUser} className="client-profile-icon" />
          Client Details
        </h2>
      </div>
      <div className="client-detail-main-info">
        <div className="client-photo-wrap">
          <div className="client-photo-placeholder">
            {userData.clientName ? userData.clientName[0].toUpperCase() : userData.userName.toUpperCase()}
          </div>
        </div>
        <div className="client-main-names">
          <div className="client-title">{userData.clientName} {userData.lastName}</div>
          <div className="client-username">@{userData.userName}</div>
        </div>
      </div>
      <table className="client-detail-table">
        <tbody>
          <tr>
            <td className="label">Client ID</td>
            <td className="value">#{userData.clientId}</td>
          </tr>
          <tr>
            <td className="label">Email</td>
            <td className="value">{userData.email}</td>
          </tr>
          <tr>
            <td className="label">Mobile Number</td>
            <td className="value">{userData.contactNumber}</td>
          </tr>
          <tr>
            <td className="label">Address</td>
            <td className="value">{userData.address}</td>
          </tr>
          <tr>
            <td className="label">NIC</td>
            <td className="value">{userData.nic}</td>
          </tr>
          <tr>
            <td className="label">Client Description</td>
            <td className="value">{userData.clientDescription}</td>
          </tr>
          <tr>
            <td className="label">Total Payment</td>
            <td className="value">₹{userData.totalPayment}</td>
          </tr>
          <tr>
            <td className="label">Is Active</td>
            <td className="value">
              {userData.isActive ? (
                <span className="badge badge-active">Active</span>
              ) : (
                <span className="badge badge-inactive">Inactive</span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="client-detail-btn-row">
        {userData.isActive ? (
          <button className="detail-btn btn-danger" onClick={deactivateUser}>
            Deactivate
          </button>
        ) : (
          <button className="detail-btn btn-success" onClick={reactivateUser}>
            Reactivate
          </button>
        )}
        <Link to="/clientlist" className="detail-btn btn-secondary">
          Close
        </Link>
      </div>
    </div>
  );
};

export default ClientDetailView;
