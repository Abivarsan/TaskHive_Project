import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getLoggedUserId } from '../../Auth/ApiService';
import './Styles/Projectlist.css'; // Import the CSS file

function Projectlist() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userid = getLoggedUserId();
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5228/api/DeveloperProject/${userid}`);
        setProjects(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error.message);
        console.log("Error occurred: " + error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const ProjectSelection = (id) => {
    navigate('/ProjectDescriptionDeveloper', {
      state: { selectedId: id }
    });
  };

  // Helper function to get status class
  const getStatusClass = (status) => {
    const statusLower = status?.toLowerCase() || '';
    if (statusLower.includes('active') || statusLower.includes('in progress')) return 'active';
    if (statusLower.includes('completed') || statusLower.includes('done')) return 'completed';
    if (statusLower.includes('pending') || statusLower.includes('waiting')) return 'pending';
    if (statusLower.includes('cancelled') || statusLower.includes('terminated')) return 'cancelled';
    if (statusLower.includes('hold') || statusLower.includes('paused')) return 'on-hold';
    return 'pending'; // default
  };

  // Loading State
  if (loading) {
    return (
      <div className="projectlist-container">
        <div className="projectlist-content-wrapper">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <div className="loading-text">Loading Projects...</div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="projectlist-container">
        <div className="projectlist-content-wrapper">
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

  return (
    <div className="projectlist-container">
      <div className="projectlist-content-wrapper">
        {/* Header Section */}
        <div className="projectlist-header">
          <h1 className="projectlist-title">My Projects</h1>
          <p className="projectlist-subtitle">
            View and manage your assigned projects
          </p>
        </div>

        {/* Projects Content */}
        <div className="projects-content">
          {/* Stats Section */}
          <div className="projects-stats">
            <div className="projects-count">
              <span className="projects-count-text">Total Projects</span>
              <span className="projects-count-badge">{projects.length}</span>
            </div>
          </div>

          {/* Projects Table */}
          {projects.length > 0 ? (
            <div className="projects-table-container">
              <table className="projects-table">
                <thead>
                  <tr>
                    <th>Project ID</th>
                    <th>Project Name</th>
                    <th>Project Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, index) => (
                    <tr 
                      key={project.projectId || index}
                      onClick={() => ProjectSelection(project.projectId)}
                    >
                      <td>#{project.projectId}</td>
                      <td>
                        <strong>{project.projectName}</strong>
                      </td>
                      <td>
                        <span className={`project-status ${getStatusClass(project.projectStatus)}`}>
                          {project.projectStatus}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn-view"
                          onClick={(e) => {
                            e.stopPropagation();
                            ProjectSelection(project.projectId);
                          }}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">📋</div>
              <h3 className="empty-state-title">No Projects Found</h3>
              <p className="empty-state-message">
                You don't have any projects assigned yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Projectlist;
