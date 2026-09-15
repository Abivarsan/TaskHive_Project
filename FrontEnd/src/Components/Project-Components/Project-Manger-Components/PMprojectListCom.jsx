// PMprojectListCom.jsx - Modern Material UI Design
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/PMprojectListCom.css";

export default function PMprojectListCom() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  
  const navigate = useNavigate();

  // ✅ Get user from localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const ProjectManagerId = user?.userId; // "2" (string) → number if needed
  const url = `http://localhost:5228/api/PManager/ProjectList/${ProjectManagerId}`;

    useEffect(() => {
    if (ProjectManagerId) {
      fetchProjects();
    }
  }, [ProjectManagerId]);

  useEffect(() => {
    // Filter data based on search term
    const filtered = data.filter(project =>
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.projectStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.proId.toString().includes(searchTerm)
    );
    setFilteredData(filtered);
  }, [data, searchTerm]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleProjectSelection = (id) => {
    navigate("/PMprojectDetailsPage", { state: { selectedId: id } });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const getStatusBadge = (status) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('active') || statusLower.includes('progress')) return 'status-active';
    if (statusLower.includes('completed') || statusLower.includes('done')) return 'status-completed';
    if (statusLower.includes('pending') || statusLower.includes('waiting')) return 'status-pending';
    if (statusLower.includes('cancelled') || statusLower.includes('stopped')) return 'status-cancelled';
    return 'status-default';
  };

  const getInitials = (projectName) => {
    return projectName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="pm-project-list-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading projects...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pm-project-list-container">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <div className="error-message">{error}</div>
          <button className="retry-btn" onClick={fetchProjects}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pm-project-list-container">
      {/* Header Section */}
      <div className="pm-project-list-header">
        <h1 className="pm-project-list-title">Project Manager Dashboard</h1>
        <p className="pm-project-list-subtitle">Manage and monitor all your assigned projects</p>
      </div>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="total-projects">
          <span className="stats-number">{data.length}</span>
          <span className="stats-label">Total Projects</span>
        </div>
        <div className="project-stats">
          <div className="stat-chip active">
            {data.filter(p => p.projectStatus.toLowerCase().includes('active') || p.projectStatus.toLowerCase().includes('progress')).length} Active
          </div>
          <div className="stat-chip completed">
            {data.filter(p => p.projectStatus.toLowerCase().includes('completed')).length} Completed
          </div>
          <div className="stat-chip pending">
            {data.filter(p => p.projectStatus.toLowerCase().includes('pending')).length} Pending
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="pm-project-controls">
        <div className="search-section">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search projects by name, status, or ID..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="controls-actions">
          <button className="refresh-btn" onClick={fetchProjects}>
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Projects Content */}
      {filteredData.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📁</div>
          <h3 className="empty-title">
            {searchTerm ? 'No matching projects found' : 'No projects assigned'}
          </h3>
          <p className="empty-message">
            {searchTerm 
              ? `No projects match "${searchTerm}". Try a different search term.`
              : 'No projects have been assigned to you yet.'
            }
          </p>
          {searchTerm && (
            <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <div className="table-container">
          <table className="PMProjectTable">
            <thead>
              <tr>
                
                <th>ID</th>
                <th>Project Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((project, index) => (
                <tr 
                  key={project.proId} 
                  className="project-row"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  
                  <td className="project-id-cell">
                    #{project.proId}
                  </td>
                  <td className="project-name-cell">
                    <div className="project-name-wrapper">
                      <span className="project-name">{project.projectName}</span>
                    </div>
                  </td>
                  <td className="project-status-cell">
                    <span className={`status-badge ${getStatusBadge(project.projectStatus)}`}>
                      {project.projectStatus}
                    </span>
                  </td>
                  <td className="project-actions-cell">
                    <button
                      className="view-project-btn"
                      onClick={() => handleProjectSelection(project.proId)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Results Info */}
      {filteredData.length > 0 && (
        <div className="results-info">
          Showing {filteredData.length} of {data.length} projects
          {searchTerm && ` matching "${searchTerm}"`}
        </div>
      )}
    </div>
  );
}