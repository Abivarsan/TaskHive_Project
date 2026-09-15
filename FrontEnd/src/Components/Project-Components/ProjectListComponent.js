// ProjectListComponent.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./Styles/ProjectListCSS.css";
import SearchBar from "../Common-Components/Searchbar.jsx";

export default function ProjectListComponent() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const url = "http://localhost:5228/api/PManager/ProjectList";

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const result = await axios.get(url);
      setData(result.data);
      setFilteredData(result.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching project list:", error);
      setError("Failed to load projects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredData(data);
    } else {
      const filtered = data.filter(project =>
        project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.projectStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.proId.toString().includes(searchTerm)
      );
      setFilteredData(filtered);
    }
  };

  const handleProjectSelection = (id) => {
    navigate('/AdminProjectViewPage', { state: { selectedId: id } });
  };

  const handleAddProject = () => {
    navigate('/ProjectCreation');
  };

  const getStatusClass = (status) => {
    const statusLower = status?.toLowerCase();
    if (statusLower === 'completed') return 'status-completed';
    if (statusLower === 'in progress' || statusLower === 'active') return 'status-active';
    if (statusLower === 'pending') return 'status-pending';
    if (statusLower === 'cancelled') return 'status-cancelled';
    return 'status-default';
  };

  if (loading) {
    return (
      <div className="project-list-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="project-list-container">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h3>Error Loading Projects</h3>
          <p>{error}</p>
          <button className="retry-btn" onClick={fetchProjects}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="project-list-container">
      {/* Controls Row */}
      <div className="controls-row">
        <div className="search-wrapper">
          <SearchBar onSearch={handleSearch} placeholder="Search projects..." />
        </div>
        <button className="add-project-btn" onClick={handleAddProject}>
          Add New Project
        </button>
      </div>

      {/* Results Info */}
      <div className="results-info">
        <span>Showing {filteredData.length} of {data.length} projects</span>
      </div>

      {/* Projects Content */}
      {filteredData.length === 0 && data.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <div className="empty-state-title">No Projects Found</div>
          <div className="empty-state-message">
            Create your first project to get started.
          </div>
          <button className="add-project-btn" onClick={handleAddProject}>
            Create First Project
          </button>
        </div>
      ) : filteredData.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <div className="empty-state-title">No Results Found</div>
          <div className="empty-state-message">
            Try adjusting your search criteria.
          </div>
        </div>
      ) : (
        <div className="table-container">
          <table className="ProjectList">
            <thead>
              <tr>
                <th>Project ID</th>
                <th>Project Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((project) => (
                <tr 
                  key={project.proId} 
                  className="project-row"
                  onClick={() => handleProjectSelection(project.proId)}
                >
                  <td>#{project.proId}</td>
                  <td className="project-name">
                    <div className="project-info">
                      <span className="name">{project.projectName}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusClass(project.projectStatus)}`}>
                      {project.projectStatus}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="view-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectSelection(project.proId);
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
      )}
    </div>
  );
}
