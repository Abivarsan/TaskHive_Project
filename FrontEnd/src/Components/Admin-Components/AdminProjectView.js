// AdminProjectView.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/AdminProjectViewCSS.css";

export default function AdminProjectView() {
  const [projectData, setProjectData] = useState([]);
  const [devData, setDevData] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // File upload states
  const [basicInfo, setBasicInfo] = useState("");
  const [budgetInfo, setBudgetInfo] = useState("");
  const [timeLineInfo, setTimeLineInfo] = useState("");
  const [clientInfo, setClientInfo] = useState("");
  
  // File names states
  const [basicNames, setBasicNames] = useState([]);
  const [budgetNames, setBudgetNames] = useState([]);
  const [timelineNames, setTimeLineNames] = useState([]);
  const [clientDocNames, setClientDocNames] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const selectedId = location.state?.selectedId;

  // Get project data
  const getData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5228/api/AdminProjectView/${selectedId}`
      );
      setProjectData(response.data);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  // Get assigned developers
  const getAssignedDev = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5228/api/GetAssignedDevelopers/${selectedId}`
      );
      setDevData(response.data);
    } catch (error) {
      console.error("Error fetching developers:", error);
    }
  };

  // Get client info
  const GetClientInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:5228/api/AdminGetClientInfo?CId=1`);
      setClientData(response.data);
    } catch (error) {
      console.error("Error fetching client info:", error);
    }
  };

  // File upload handlers
  const handleFileUpload = async (file, category) => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    
    const urls = {
      basic: `http://localhost:5228/api/ProjectFileUpload/BasicInfo?ProID=${selectedId}`,
      timeline: `http://localhost:5228/api/ProjectFileUpload/TimeLine?ProID=${selectedId}`,
      budget: `http://localhost:5228/api/ProjectFileUpload/BudgetInfo?ProID=${selectedId}`,
      client: `http://localhost:5228/api/ProjectFileUpload/ClientDoc?ProID=${selectedId}`
    };

    try {
      await axios.post(urls[category], formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("File uploaded successfully!");
      
      // Reset file state and reload file names
      switch(category) {
        case 'basic': setBasicInfo(""); GetBasicFileNames(); break;
        case 'timeline': setTimeLineInfo(""); GetTimeLineNames(); break;
        case 'budget': setBudgetInfo(""); GetBudgetNames(); break;
        case 'client': setClientInfo(""); GetClientDocNames(); break;
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    }
  };

  // Get file names functions
  const GetBasicFileNames = async () => {
    try {
      const response = await axios.get(`http://localhost:5228/api/ProjectFileView/Basic?id=${selectedId}`);
      setBasicNames(response.data);
    } catch (error) {
      console.error("Error fetching basic files:", error);
    }
  };

  const GetTimeLineNames = async () => {
    try {
      const response = await axios.get(`http://localhost:5228/api/ProjectFileView/TimeLine?id=${selectedId}`);
      setTimeLineNames(response.data);
    } catch (error) {
      console.error("Error fetching timeline files:", error);
    }
  };

  const GetBudgetNames = async () => {
    try {
      const response = await axios.get(`http://localhost:5228/api/ProjectFileView/BudgetInfo?id=${selectedId}`);
      setBudgetNames(response.data);
    } catch (error) {
      console.error("Error fetching budget files:", error);
    }
  };

  const GetClientDocNames = async () => {
    try {
      const response = await axios.get(`http://localhost:5228/api/ProjectFileView/ClientDoc?id=${selectedId}`);
      setClientDocNames(response.data);
    } catch (error) {
      console.error("Error fetching client docs:", error);
    }
  };

  // Download file
  const download = async (filePath, fileName) => {
    if (window.confirm("Do you want to download this file?")) {
      try {
        const response = await axios.get(
          `http://localhost:5228/api/ProjectFileDownload/DownloadProjectFile?FilePath=${filePath}&FileName=${fileName}`,
          { responseType: "blob" }
        );
        
        const blob = new Blob([response.data], { type: response.data.type });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        alert("Download completed!");
      } catch (error) {
        console.error("Download failed:", error);
        alert("Download failed. Please try again.");
      }
    }
  };

  // Delete file
  const DeleteFile = async (id) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      try {
        await axios.delete(`http://localhost:5228/api/TaskFileDelete/deleteFile?fileId=${id}`);
        alert("File deleted successfully!");
        // Reload file lists
        GetBasicFileNames();
        GetTimeLineNames();
        GetBudgetNames();
        GetClientDocNames();
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Delete failed. Please try again.");
      }
    }
  };

  // Navigation handlers
  const handleNavigate = () => {
    navigate("/AddDevelopersPage", { state: { selectedId: selectedId } });
  };

  const HandleAssign = (id) => {
    navigate("/taskcreation", { state: { selectedDevId: id, selectedId } });
  };

  const HandleTaskListButton = (id) => {
    navigate("/TaskList", { state: { selectedDevId: id, selectedId } });
  };

  const FullTaskList = () => {
    navigate("/FullTaskListPage", { state: { selectedId } });
  };

  const ClickUpdate = () => {
    if (window.confirm("Do you want to update project details?")) {
      navigate("/UpdateProjectPage", { state: { selectedId } });
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        getData(),
        getAssignedDev(),
        GetBasicFileNames(),
        GetTimeLineNames(),
        GetBudgetNames(),
        GetClientDocNames(),
        GetClientInfo()
      ]);
      setLoading(false);
    };

    if (selectedId) {
      loadData();
    }
  }, [selectedId]);

  if (loading) {
    return (
      <div className="admin-project-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading project details...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 0, label: "Project Info", icon: "📊" },
    { id: 1, label: "Team", icon: "👥" },
    { id: 2, label: "Client", icon: "🏢" },
    { id: 3, label: "Files", icon: "📁" }
  ];

  return (
    <div className="admin-project-container">
      {/* Header */}
      <div className="project-header">
        {projectData.map((pro) => (
          <div key={pro.projectId}>
            <h1>{pro.projectName}</h1>
            <p>{pro.projectDescription}</p>
            <div className="header-actions">
              <button className="btn-primary" onClick={ClickUpdate}>
                Update Project
              </button>
              <button className="btn-secondary" onClick={() => navigate(-1)}>
                Back to List
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs Navigation */}
      <div className="tabs-container">
        <div className="tabs-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Project Info Tab */}
          {activeTab === 0 && (
            <div className="tab-panel">
              <h2>Project Information</h2>
              {projectData.map((pro) => (
                <div key={pro.projectId} className="project-info-grid">
                  <div className="info-card">
                    <label>Project ID</label>
                    <span>#{pro.projectId}</span>
                  </div>
                  <div className="info-card">
                    <label>Technologies</label>
                    <span>{pro.technologies}</span>
                  </div>
                  <div className="info-card">
                    <label>Start Date</label>
                    <span>{new Date(pro.p_StartDate).toLocaleDateString()}</span>
                  </div>
                  <div className="info-card">
                    <label>Due Date</label>
                    <span>{new Date(pro.p_DueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="info-card">
                    <label>Duration</label>
                    <span>{pro.duration} days</span>
                  </div>
                  <div className="info-card">
                    <label>Project Manager</label>
                    <span>{pro.projectManagerFName} {pro.projectManagerLName}</span>
                  </div>
                  <div className="info-card full-width">
                    <label>Objectives</label>
                    <p>{pro.objectives}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Team Tab */}
          {activeTab === 1 && (
            <div className="tab-panel">
              <div className="section-header">
                <h2>Team Members</h2>
                <button className="btn-primary" onClick={handleNavigate}>
                  Add Developers
                </button>
              </div>
              
              {devData.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">👥</div>
                  <h3>No Team Members</h3>
                  <p>Add developers to start building your team.</p>
                </div>
              ) : (
                <div className="team-grid">
                  {devData.map((dev) => (
                    <div key={dev.userId} className="team-member-card">
                      <div className="member-info">
                        <div className="member-avatar">
                         {dev.profileImageUrl ? (
            <img src={dev.profileImageUrl} alt={dev.name} />
          ) : (
            dev.name
              .split(" ")
              .map((n) => n[0])
              .join("") // fallback: initials if no image
          )}
                        </div>
                        <div className="member-details">
                          <h4>{dev.firstName} {dev.lastName}</h4>
                          <span className="role-badge">{dev.jobRoleName}</span>
                          <span className="member-id">ID: {dev.userId}</span>
                        </div>
                      </div>
                      <div className="member-actions">
                        <button
                          className="btn-small btn-primary"
                          onClick={() => HandleAssign(dev.userId)}
                        >
                          Assign Task
                        </button>
                        <button
                          className="btn-small btn-secondary"
                          onClick={() => HandleTaskListButton(dev.userId)}
                        >
                          View Tasks
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="section-actions">
                <button className="btn-secondary" onClick={FullTaskList}>
                  View All Tasks
                </button>
              </div>
            </div>
          )}

          {/* Client Tab */}
          {activeTab === 2 && (
            <div className="tab-panel">
              <h2>Client Information</h2>
              {clientData.map((client) => (
                <div key={client.clientId} className="client-info">
                  <div className="client-header">
                    <h3>{client.clientName}</h3>
                    <span className="client-id">ID: #{client.clientId}</span>
                  </div>
                  <div className="client-details-grid">
                    <div className="info-card">
                      <label>NIC</label>
                      <span>{client.nic}</span>
                    </div>
                    <div className="info-card">
                      <label>Contact Number</label>
                      <span>{client.contactNumber}</span>
                    </div>
                    <div className="info-card">
                      <label>Email</label>
                      <span>{client.email}</span>
                    </div>
                    <div className="info-card full-width">
                      <label>Address</label>
                      <span>{client.address}</span>
                    </div>
                    <div className="info-card full-width">
                      <label>Description</label>
                      <p>{client.clientDescription}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Files Tab */}
          {activeTab === 3 && (
            <div className="tab-panel">
              <h2>Project Files</h2>
              <div className="files-section">
                {/* File Upload Section */}
                <div className="file-categories">
                  <div className="file-category">
                    <h3>Basic Information</h3>
                    <div className="file-upload-area">
                      <input
                        type="file"
                        onChange={(e) => setBasicInfo(e.target.files[0])}
                        className="file-input"
                      />
                      <button
                        className="btn-primary btn-small"
                        onClick={() => handleFileUpload(basicInfo, 'basic')}
                      >
                        Upload
                      </button>
                    </div>
                    <div className="file-list">
                      {basicNames.map((file) => (
                        <div key={file.id} className="file-item">
                          <span
                            className="file-name"
                            onClick={() => download(file.filePath, file.fileName)}
                          >
                            📄 {file.fileName}
                          </span>
                          <button
                            className="delete-btn"
                            onClick={() => DeleteFile(file.id)}
                          >
                            🗑️
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="file-category">
                    <h3>Timeline</h3>
                    <div className="file-upload-area">
                      <input
                        type="file"
                        onChange={(e) => setTimeLineInfo(e.target.files[0])}
                        className="file-input"
                      />
                      <button
                        className="btn-primary btn-small"
                        onClick={() => handleFileUpload(timeLineInfo, 'timeline')}
                      >
                        Upload
                      </button>
                    </div>
                    <div className="file-list">
                      {timelineNames.map((file) => (
                        <div key={file.id} className="file-item">
                          <span
                            className="file-name"
                            onClick={() => download(file.filePath, file.fileName)}
                          >
                            📄 {file.fileName}
                          </span>
                          <button
                            className="delete-btn"
                            onClick={() => DeleteFile(file.id)}
                          >
                            🗑️
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="file-category">
                    <h3>Budget Information</h3>
                    <div className="file-upload-area">
                      <input
                        type="file"
                        onChange={(e) => setBudgetInfo(e.target.files[0])}
                        className="file-input"
                      />
                      <button
                        className="btn-primary btn-small"
                        onClick={() => handleFileUpload(budgetInfo, 'budget')}
                      >
                        Upload
                      </button>
                    </div>
                    <div className="file-list">
                      {budgetNames.map((file) => (
                        <div key={file.id} className="file-item">
                          <span
                            className="file-name"
                            onClick={() => download(file.filePath, file.fileName)}
                          >
                            📄 {file.fileName}
                          </span>
                          <button
                            className="delete-btn"
                            onClick={() => DeleteFile(file.id)}
                          >
                            🗑️
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="file-category">
                    <h3>Client Documents</h3>
                    <div className="file-upload-area">
                      <input
                        type="file"
                        onChange={(e) => setClientInfo(e.target.files[0])}
                        className="file-input"
                      />
                      <button
                        className="btn-primary btn-small"
                        onClick={() => handleFileUpload(clientInfo, 'client')}
                      >
                        Upload
                      </button>
                    </div>
                    <div className="file-list">
                      {clientDocNames.map((file) => (
                        <div key={file.id} className="file-item">
                          <span
                            className="file-name"
                            onClick={() => download(file.filePath, file.fileName)}
                          >
                            📄 {file.fileName}
                          </span>
                          <button
                            className="delete-btn"
                            onClick={() => DeleteFile(file.id)}
                          >
                            🗑️
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="file-note">
                  <p>💡 Click on file names to download them</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
