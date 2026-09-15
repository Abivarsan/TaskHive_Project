import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Styles/TeamDescription.css'; // Your new CSS file

export default function TeamDescription() {
  const [teamDetails, setTeamDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const selectedId = location.state?.selectedId;
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:5228/api/DeveloperTeam/TeamDescription/${selectedId}`);
      setTeamDetails(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedId) {
      getData();
    } else {
      setError("No team selected");
      setIsLoading(false);
    }
  }, [selectedId]);

  // Loading State
  if (isLoading) {
    return (
      <div className="team-description-container">
        <div className="team-content-wrapper">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <div className="loading-text">Loading Team Details...</div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="team-description-container">
        <div className="team-content-wrapper">
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <div className="error-message">
              <strong>Error:</strong> {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Content
  return (
    <div className="team-description-container">
      <div className="team-content-wrapper">
        {/* Header Section */}
        <div className="team-header">
          <h1 className="team-title">
            {teamDetails?.teamName || 'Team Details'}
          </h1>
          <p className="team-subtitle">
            Comprehensive team information and member details
          </p>
        </div>

        {/* Team Information Section */}
        {teamDetails && (
          <div className="team-info-section">
            <div className="team-info-grid">
              {teamDetails.projectName && (
                <div className="info-card">
                  <div className="info-label">Project Name</div>
                  <div className="info-value">{teamDetails.projectName}</div>
                </div>
              )}
              {teamDetails.projectStatus && (
                <div className="info-card">
                  <div className="info-label">Project Status</div>
                  <div className="info-value">{teamDetails.projectStatus}</div>
                </div>
              )}
              {teamDetails.teamId && (
                <div className="info-card">
                  <div className="info-label">Team ID</div>
                  <div className="info-value">{teamDetails.teamId}</div>
                </div>
              )}
              {teamDetails.createdDate && (
                <div className="info-card">
                  <div className="info-label">Created Date</div>
                  <div className="info-value">
                    {new Date(teamDetails.createdDate).toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Developers Section */}
        <div className="developers-section">
          <div className="developers-header">
            <h2 className="developers-title">Team Members</h2>
            <span className="developers-count">
              {teamDetails?.developers?.length || 0} members
            </span>
          </div>

          {teamDetails?.developers?.length > 0 ? (
            <div className="developers-grid">
              {teamDetails.developers.map((developer, index) => (
                <div key={developer.userId || index} className="developer-card">
                  <div className="developer-avatar">
                    {developer.imageSrc && (
                    <img src={developer.imageSrc} alt="Profile" />
                  )}
                  </div>
                  <h3 className="developer-name">
                    {developer.developerName || 'Unknown Developer'}
                  </h3>
                  <div className="developer-info">
                    <div className="developer-detail">
                      <div className="developer-detail-icon">🆔</div>
                      <span className="developer-detail-label">ID:</span>
                      <span className="developer-detail-value">
                        {developer.userId || 'N/A'}
                      </span>
                    </div>
                    <div className="developer-detail">
                      <div className="developer-detail-icon">📧</div>
                      <span className="developer-detail-label">Email:</span>
                      <span className="developer-detail-value">
                        {developer.email || 'N/A'}
                      </span>
                    </div>
                    <div className="developer-detail">
                      <div className="developer-detail-icon">📱</div>
                      <span className="developer-detail-label">Phone:</span>
                      <span className="developer-detail-value">
                        {developer.contactNumber || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">👥</div>
              <h3 className="empty-state-title">No Team Members</h3>
              <p className="empty-state-message">
                This team doesn't have any members assigned yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
