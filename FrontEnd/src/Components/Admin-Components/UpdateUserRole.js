import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/UpdateUserRole.css';

const UpdateUserRoleComponent = ({ userId, currentRole, onClose }) => {
  const [newRole, setNewRole] = useState(currentRole || '');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log('Current Role:', currentRole); // Debug log
    setNewRole(currentRole); // Update newRole when currentRole changes
  }, [currentRole]);

  const handleRoleChange = (e) => {
    setNewRole(e.target.value);
    console.log('Selected Role:', e.target.value); // Debug log
  };

  const saveRole = async () => {
    try {
      const response = await axios.put(`http://localhost:5228/api/User/${userId}/role`, { userCategoryType: newRole });
      alert("User role updated successfully.");
      onClose();
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Error updating user role.');
      }
    }
  };

  return (
    <div className="update-role-container">
      <h2>Update User Role</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <select value={newRole} onChange={handleRoleChange}>
        <option value="" >Select a role</option>
        {currentRole === 'DEVELOPER' && (
          <>
            <option value="MANAGER">Manager</option>
            <option value="ADMIN">Admin</option>
          </>
        )}
        {currentRole === 'MANAGER' && <option value="ADMIN">Admin
            </option>}
      </select>
      <button onClick={saveRole} className="btn btn-primary">Save</button>
      <button onClick={onClose} className="btn btn-secondary">Cancel</button>
    </div>
  );
};

export default UpdateUserRoleComponent;
