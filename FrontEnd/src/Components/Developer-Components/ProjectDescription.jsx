import './Styles/ProjectDescriptionStyle.css'
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { format } from 'date-fns';

export default function ProjectDescription() {
  const [projectDetails, setProjectDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const selectedId = location.state?.selectedId;
  const navigate = useNavigate();

  const getData = async () => {
    if (!selectedId) {
      setError('No project ID provided');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5228/api/DeveloperProject/ProjectDescription/${selectedId}`);
      setProjectDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching project details:', error);
      setError(error.message || 'Failed to load project details');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedId]);

  const resourceInfo = (id) => {
    navigate('/ProjectFileViewPage', {
      state: { newSelectedId: id }
    });
  };

  const timeReportInfo = (id) => {
    navigate('/ProjectReport', {
      state: { newTimeSelectedId: id }
    });
  };

  const moduleReportInfo = (id) => {
    navigate('/ProjectModuleReport', {
      state: { newModuleSelectedId: id }
    });
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="project-description-container">
        <div className="project-description-wrapper">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <div className="loading-text">Loading Project Details...</div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="project-description-container">
        <div className="project-description-wrapper">
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

  // No project details
  if (!projectDetails) {
    return (
      <div className="project-description-container">
        <div className="project-description-wrapper">
          <div className="error-container">
            <div className="error-icon">📋</div>
            <div className="error-message">
              No project details found
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-description-container">
      <div className="project-description-wrapper">
        {/* Header */}
        <div className="project-header">
          <h1 className="project-title">Project Details</h1>
          <p className="project-subtitle">
            Comprehensive project information and resources
          </p>
        </div>

        {/* Content */}
        <div className="project-content">
          <div className="project-details-grid">
            {/* Basic Info Card */}
            <div className="detail-card basic-info-card">
              <div className="basic-info-header">
                <span className="basic-info-icon">🚀</span>
                <h2 className="basic-info-title">Project Overview</h2>
              </div>
              
              <h3 className="project-name">{projectDetails[0].projectName}</h3>
              <span className="project-id">ID: {projectDetails[0].projectId}</span>

              <div className="detail-item">
                <span className="detail-label">Description</span>
                <p className="detail-value">
                  {projectDetails[0].projectDescription || 'No description provided'}
                </p>
              </div>
            </div>

            {/* Objectives Card */}
            <div className="detail-card objectives-card">
              <div className="detail-item">
                <span className="detail-label">🎯 Project Objectives</span>
                <p className="detail-value">
                  {projectDetails[0].objectives || 'No objectives specified'}
                </p>
              </div>
            </div>

            {/* Manager Card */}
            <div className="detail-card manager-card">
              <div className="detail-item">
                <span className="detail-label">👨‍💼 Project Manager</span>
                <div className="manager-info">
                  <div className="manager-avatar">
                    {projectDetails[0].projectManagerName?.charAt(0)?.toUpperCase() || 'M'}
                  </div>
                  <div className="manager-details">
                    <h4>{projectDetails[0].projectManagerName || 'Not assigned'}</h4>
                    <p>Manager ID: {projectDetails[0].projectManagerId || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Card */}
            <div className="detail-card timeline-card">
              <div className="detail-item">
                <span className="detail-label">📅 Timeline & Duration</span>
                
                <div className="timeline-item">
                  <div className="timeline-icon">🚀</div>
                  <div className="timeline-content">
                    <div className="timeline-date">
                      {projectDetails[0].p_StartDate 
                        ? format(new Date(projectDetails[0].p_StartDate), 'MMM dd, yyyy')
                        : 'Not set'
                      }
                    </div>
                    <div className="timeline-label">Start Date</div>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-icon">⏱️</div>
                  <div className="timeline-content">
                    <div className="timeline-date">
                      {projectDetails[0].duration || 'Not specified'}
                    </div>
                    <div className="timeline-label">Duration</div>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-icon">🏁</div>
                  <div className="timeline-content">
                    <div className="timeline-date">
                      {projectDetails[0].p_DueDate
                        ? format(new Date(projectDetails[0].p_DueDate), 'MMM dd, yyyy')
                        : 'Not set'
                      }
                    </div>
                    <div className="timeline-label">Due Date</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="actions-section">
            <div className="actions-header">
              <span className="basic-info-icon">⚡</span>
              <h3 className="actions-title">Quick Actions</h3>
            </div>
            
            <div className="actions-grid">
              <button 
                className="action-button"
                onClick={() => resourceInfo(projectDetails[0].projectId)}
              >
                <span className="action-icon">📁</span>
                <div className="action-text">
                  <div className="action-title">Project Files</div>
                  <div className="action-subtitle">View resources & documents</div>
                </div>
              </button>

              <button 
                className="action-button secondary"
                onClick={() => timeReportInfo(projectDetails[0].projectId)}
              >
                <span className="action-icon">📊</span>
                <div className="action-text">
                  <div className="action-title">Time Report</div>
                  <div className="action-subtitle">View time tracking data</div>
                </div>
              </button>

              <button 
                className="action-button tertiary"
                onClick={() => moduleReportInfo(projectDetails[0].projectId)}
              >
                <span className="action-icon">📈</span>
                <div className="action-text">
                  <div className="action-title">Module Report</div>
                  <div className="action-subtitle">View module progress</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
