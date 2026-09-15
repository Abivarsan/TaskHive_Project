import './Styles/TaskDescription.css'
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { format } from 'date-fns';

export default function TaskDescription() {
  const [taskDetails, setTaskDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const selectedId = location.state?.selectedId;
  const navigate = useNavigate();

  console.log('Selected Task ID:', selectedId);

  const getData = async () => {
    if (!selectedId) {
      setError('No task ID provided');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5228/api/DeveloperTask/TaskDescription/${selectedId}`);
      setTaskDetails(response.data);
      console.log('Task Details:', response.data);
    } catch (error) {
      console.error('Error fetching task details:', error);
      setError(error.message || 'Failed to load task details');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedId]);

  // Helper function to get status class
  // const getStatusClass = (status) => {
  //   const statusLower = status?.toLowerCase() || '';
  //   if (statusLower.includes('pending') || statusLower.includes('waiting')) return 'pending';
  //   if (statusLower.includes('progress') || statusLower.includes('working')) return 'in-progress';
  //   if (statusLower.includes('completed') || statusLower.includes('done')) return 'completed';
  //   if (statusLower.includes('overdue') || statusLower.includes('late')) return 'overdue';
  //   if (statusLower.includes('hold') || statusLower.includes('paused')) return 'on-hold';
  //   return 'pending'; // default
  // };

  // Helper function to get priority class
  // const getPriorityClass = (priority) => {
  //   const priorityLower = priority?.toLowerCase() || '';
  //   if (priorityLower.includes('high') || priorityLower.includes('urgent')) return 'high';
  //   if (priorityLower.includes('medium') || priorityLower.includes('normal')) return 'medium';
  //   if (priorityLower.includes('low')) return 'low';
  //   return 'medium'; // default
  // };

  // Helper function to split comma-separated values into tags
  const renderTags = (value, className) => {
    if (!value) return <span className="detail-value">Not specified</span>;
    
    const tags = value.split(',').map(item => item.trim()).filter(item => item);
    if (tags.length === 0) return <span className="detail-value">Not specified</span>;
    
    return (
      <div className={className}>
        {tags.map((tag, index) => (
          <span key={index} className={className.replace('-tags', '-tag')}>
            {tag}
          </span>
        ))}
      </div>
    );
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="task-description-container">
        <div className="task-description-wrapper">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <div className="loading-text">Loading Task Details...</div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="task-description-container">
        <div className="task-description-wrapper">
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

  // No task details
  if (!taskDetails) {
    return (
      <div className="task-description-container">
        <div className="task-description-wrapper">
          <div className="error-container">
            <div className="error-icon">📋</div>
            <div className="error-message">
              No task details found
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="task-description-container">
      <div className="task-description-wrapper">
        {/* Header */}
        <div className="task-header">
          <h1 className="task-title">Task Details</h1>
          <p className="task-subtitle">
            Complete task information and specifications
          </p>
        </div>

        {/* Content */}
        <div className="task-content">
          <div className="task-details-grid">
            {/* Task Overview Card */}
            <div className="detail-card task-overview-card">
              <div className="task-overview-header">
                <span className="task-overview-icon">📋</span>
                <h2 className="task-overview-title">Task Overview</h2>
              </div>
              
              <h3 className="task-name">
                {taskDetails[0].taskName || 'Task Name Not Available'}
              </h3>
              <span className="task-id">
                ID: {taskDetails[0].taskId || selectedId || 'N/A'}
              </span>
              
              <div className="detail-item">
                <span className="detail-label">Description</span>
                <p className="detail-value">
                  {taskDetails[0].taskDescription || 'No description provided'}
                </p>
              </div>

              <div className="detail-item">
                <span className="detail-label">Status</span>
                <span className="task-status">
                  {taskDetails[0].taskStatus || 'Pending'}
                </span>
              </div>

              <div className="detail-item">
                <span className="detail-label">Priority</span>
                <span className="priority-badge ">
                  {taskDetails[0].priority || 'Medium'}
                </span>
              </div>
            </div>

            {/* Project Info Card */}
            <div className="detail-card project-info-card">
              <div className="detail-item">
                <span className="detail-label">🚀 Project Information</span>
                <div className="detail-value">
                  <strong>{taskDetails[0].projectName || 'Project Name Not Available'}</strong>
                  <br />
                  <small>Project ID: {taskDetails[0].projectId || 'N/A'}</small>
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
                      {taskDetails[0].createdDate 
                        ? format(new Date(taskDetails[0].createdDate), 'MMM dd, yyyy')
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
                      {taskDetails[0].timeDuration || 'Not specified'}
                    </div>
                    <div className="timeline-label">Time Estimation</div>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-icon">🏁</div>
                  <div className="timeline-content">
                    <div className="timeline-date">
                      {taskDetails[0].dueDate 
                        ? format(new Date(taskDetails[0].dueDate), 'MMM dd, yyyy')
                        : 'Not set'
                      }
                    </div>
                    <div className="timeline-label">Due Date</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Info Card */}
            <div className="detail-card technical-card">
              <div className="detail-item">
                <span className="detail-label">🔧 Technical Details</span>
                
                <div style={{ marginBottom: '16px' }}>
                  <strong>Technology Stack:</strong>
                  {renderTags(taskDetails[0].technology, 'tech-tags')}
                </div>

                <div>
                  <strong>Dependencies:</strong>
                  {renderTags(taskDetails[0].dependancy, 'dependency-tags')}
                </div>
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="actions-section">
            <div className="actions-header">
              <span className="task-overview-icon">⚡</span>
              <h3 className="actions-title">Quick Actions</h3>
            </div>
            
            <div className="actions-grid">
              <button 
                className="action-button"
                onClick={() => navigate('/TaskRecord', { state: { selectedTaskId: taskDetails[0].taskId || selectedId } })}
              >
                <span className="action-icon">⏱️</span>
                Record Time
              </button>

              <button 
                className="action-button secondary"
                onClick={() => navigate('/TaskEdit', { state: { selectedId: taskDetails[0].taskId || selectedId } })}
              >
                <span className="action-icon">✏️</span>
                Edit Task
              </button>

              <button 
                className="action-button tertiary"
                onClick={() => navigate('/TaskComments', { state: { selectedId: taskDetails[0].taskId || selectedId } })}
              >
                <span className="action-icon">💬</span>
                Comments
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
