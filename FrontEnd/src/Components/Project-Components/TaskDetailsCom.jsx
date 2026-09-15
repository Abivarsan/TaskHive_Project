// TaskDetailsCom.jsx - Modern Material UI Design
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./Styles/TaskDetailsCom.css";

export default function TaskDetailsCom() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Basic task data
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  // File states
  const [taskInfo, setTaskInfo] = useState(null);
  const [img, setImg] = useState(null);
  const [audio, setAudio] = useState(null);
  const [zip, setZip] = useState(null);

  // File lists
  const [basicNames, setBasicNames] = useState([]);
  const [imgNames, setImgNames] = useState([]);
  const [audioNames, setAudioNames] = useState([]);
  const [zipNames, setZipNames] = useState([]);

  // Upload states
  const [uploading, setUploading] = useState({
    taskInfo: false,
    img: false,
    audio: false,
    zip: false
  });

  const selectedTaskId = location.state?.selectedTaskId;
  const proId = location.state?.ProId;

  // Get task details
  const getTaskDetails = async () => {
    if (!selectedTaskId) {
      setError("Task ID is missing");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const url = `http://localhost:5228/api/TaskDetailsView?Tid=${selectedTaskId}`;
      const response = await axios.get(url);
      
      setTaskData(response.data);
      console.log("Task details loaded:", response.data);
    } catch (err) {
      console.error("Error fetching task details:", err);
      setError("Failed to load task details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Get file names for different categories
  const getBasicFileNames = async () => {
    try {
      const url = `http://localhost:5228/api/TaskFilesView/TaskInfo?PId=${proId}&TId=${selectedTaskId}`;
      const response = await axios.get(url);
      setBasicNames(response.data);
    } catch (error) {
      console.error("Error fetching task info files:", error);
    }
  };

  const getImgNames = async () => {
    try {
      const url = `http://localhost:5228/api/TaskFilesView/Images?PId=${proId}&TId=${selectedTaskId}`;
      const response = await axios.get(url);
      setImgNames(response.data);
    } catch (error) {
      console.error("Error fetching image files:", error);
    }
  };

  const getAudioNames = async () => {
    try {
      const url = `http://localhost:5228/api/TaskFilesView/audio?PId=${proId}&TId=${selectedTaskId}`;
      const response = await axios.get(url);
      setAudioNames(response.data);
    } catch (error) {
      console.error("Error fetching audio files:", error);
    }
  };

  const getZipNames = async () => {
    try {
      const url = `http://localhost:5228/api/TaskFilesView/zip?PId=${proId}&TId=${selectedTaskId}`;
      const response = await axios.get(url);
      setZipNames(response.data);
    } catch (error) {
      console.error("Error fetching zip files:", error);
    }
  };

  // Upload functions
  const uploadFile = async (file, uploadType, apiEndpoint) => {
    if (!file) {
      alert(`Please select a ${uploadType} file`);
      return;
    }

    setUploading(prev => ({ ...prev, [uploadType]: true }));

    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const url = `${apiEndpoint}?ProID=${proId}&TId=${selectedTaskId}`;
      
      await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      alert("Upload successful!");
      
      // Reset file state and refresh file list
      switch(uploadType) {
        case 'taskInfo':
          setTaskInfo(null);
          getBasicFileNames();
          break;
        case 'img':
          setImg(null);
          getImgNames();
          break;
        case 'audio':
          setAudio(null);
          getAudioNames();
          break;
        case 'zip':
          setZip(null);
          getZipNames();
          break;
      }
      
      // Reset file input
      const fileInput = document.querySelector(`input[data-upload-type="${uploadType}"]`);
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error(`Error uploading ${uploadType}:`, error);
      alert(`Failed to upload ${uploadType}. Please try again.`);
    } finally {
      setUploading(prev => ({ ...prev, [uploadType]: false }));
    }
  };

  // Download file
  const downloadFile = async (filePath, fileName) => {
    if (window.confirm('Do you want to download this file?')) {
      try {
        const url = `http://localhost:5228/api/ProjectFileDownload/DownloadProjectFile?FilePath=${filePath}&FileName=${fileName}`;
        const response = await axios.get(url, { responseType: 'blob' });
        
        const blob = new Blob([response.data], { type: response.data.type });
        const link = document.createElement('a');
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
  const deleteFile = async (fileId, refreshFunction) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      try {
        const url = `http://localhost:5228/api/TaskFileDelete/deleteFile?fileId=${fileId}`;
        await axios.delete(url);
        
        alert("File deleted successfully!");
        refreshFunction(); // Refresh the file list
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete file. Please try again.");
      }
    }
  };

  // Delete task
  const deleteTask = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const url = `http://localhost:5228/api/TaskDeletion?TId=${selectedTaskId}`;
        const response = await axios.delete(url);
        
        if (response.status === 204) {
          alert("Task deleted successfully!");
          navigate(-1);
        } else if (response.status === 200) {
          alert("Task is ongoing and cannot be deleted.");
        }
      } catch (error) {
        console.error("Delete task failed:", error);
        alert("Please delete all uploaded resources first.");
      }
    }
  };

  // Delete all files
  const deleteAllFiles = async () => {
    if (window.confirm('Are you sure you want to delete all uploaded files?')) {
      try {
        const url = `http://localhost:5228/api/TaskFileDelete?id=${selectedTaskId}`;
        const response = await axios.delete(url);
        
        if (response.status === 204) {
          alert("All files deleted successfully!");
          // Refresh all file lists
          getBasicFileNames();
          getImgNames();
          getAudioNames();
          getZipNames();
        } else {
          alert("Error occurred while deleting files.");
        }
      } catch (error) {
        console.error("Delete all files failed:", error);
        alert("Failed to delete files. Please try again.");
      }
    }
  };

  // Handle back navigation
  const handleBack = () => {
    navigate(-1);
  };

  // Get priority badge class
  const getPriorityBadge = (priority) => {
    const priorityLower = priority?.toLowerCase();
    if (priorityLower === 'low') return 'priority-low';
    if (priorityLower === 'medium') return 'priority-medium';
    if (priorityLower === 'high') return 'priority-high';
    if (priorityLower === 'critical') return 'priority-critical';
    return 'priority-default';
  };

  // Initialize data
  useEffect(() => {
    if (selectedTaskId && proId) {
      getTaskDetails();
      getBasicFileNames();
      getImgNames();
      getAudioNames();
      getZipNames();
    }
  }, [selectedTaskId, proId]);

  if (loading) {
    return (
      <div className="task-details-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading task details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="task-details-container">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <div className="error-message">{error}</div>
          <button className="back-btn-error" onClick={handleBack}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="task-details-container">
      {/* Header */}
      <div className="task-details-header">
        <button className="back-btn" onClick={handleBack}>
          ← Back
        </button>
        <h1 className="task-details-title">Task Details</h1>
        <p className="task-details-subtitle">
          Task ID: #{selectedTaskId} • Project ID: #{proId}
        </p>
      </div>

      {/* Task Information Card */}
      {taskData.map((task) => (
        <div key={task.taskId} className="task-info-card">
          <div className="task-info-header">
            <h2 className="task-name">{task.taskName || 'Untitled Task'}</h2>
            <span className={`priority-badge ${getPriorityBadge(task.priority)}`}>
              {task.priority}
            </span>
          </div>

          <div className="task-info-grid">
            <div className="info-item">
              <label>Task ID</label>
              <span>#{task.taskId}</span>
            </div>
            <div className="info-item">
              <label>Priority</label>
              <span className={`priority-text ${getPriorityBadge(task.priority)}`}>
                {task.priority}
              </span>
            </div>
            <div className="info-item">
              <label>Start Date</label>
              <span>{task.createdDate?.split("T")[0]}</span>
            </div>
            <div className="info-item">
              <label>Due Date</label>
              <span>{task.dueDate?.split("T")[0]}</span>
            </div>
            <div className="info-item">
              <label>Duration</label>
              <span>{task.timeDuration} days</span>
            </div>
            <div className="info-item">
              <label>Status</label>
              <span className="status-badge">{task.taskStatus}</span>
            </div>
            <div className="info-item full-width">
              <label>Description</label>
              <p className="task-description">{task.taskDescription}</p>
            </div>
            <div className="info-item full-width">
              <label>Technologies</label>
              <div className="tech-tags">
                {task.technologies?.split(',').map((tech, index) => (
                  <span key={index} className="tech-tag">{tech.trim()}</span>
                ))}
              </div>
            </div>
            {task.dependancies && (
              <div className="info-item full-width">
                <label>Dependencies</label>
                <p className="dependencies">{task.dependancies}</p>
              </div>
            )}
          </div>

          <div className="task-actions">
            <button className="delete-all-files-btn" onClick={deleteAllFiles}>
              🗑️ Delete All Files
            </button>
            <button className="delete-task-btn" onClick={deleteTask}>
              ❌ Delete Task
            </button>
          </div>
        </div>
      ))}

      {/* File Management Tabs */}
      <div className="file-tabs-container">
        <div className="file-tabs-nav">
          <button
            className={`tab-btn ${activeTab === 0 ? 'active' : ''}`}
            onClick={() => setActiveTab(0)}
          >
            📄 Task Info
          </button>
          <button
            className={`tab-btn ${activeTab === 1 ? 'active' : ''}`}
            onClick={() => setActiveTab(1)}
          >
            🖼️ Images
          </button>
          <button
            className={`tab-btn ${activeTab === 2 ? 'active' : ''}`}
            onClick={() => setActiveTab(2)}
          >
            🎵 Audio
          </button>
          <button
            className={`tab-btn ${activeTab === 3 ? 'active' : ''}`}
            onClick={() => setActiveTab(3)}
          >
            📁 ZIP Files
          </button>
        </div>

        <div className="file-tab-content">
          {/* Task Info Tab */}
          {activeTab === 0 && (
            <div className="file-category">
              <div className="upload-section">
                <h3>Upload Task Information Files</h3>
                <div className="file-upload-area">
                  <input
                    type="file"
                    data-upload-type="taskInfo"
                    onChange={(e) => setTaskInfo(e.target.files[0])}
                    className="file-input"
                    accept=".pdf,.doc,.docx,.txt"
                  />
                  <button
                    className="upload-btn"
                    onClick={() => uploadFile(taskInfo, 'taskInfo', 'http://localhost:5228/api/TaskInfoUpload/ZipUpload')}
                    disabled={uploading.taskInfo || !taskInfo}
                  >
                    {uploading.taskInfo ? 'Uploading...' : 'Upload File'}
                  </button>
                </div>
              </div>

              <div className="files-list">
                <h4>Task Information Files ({basicNames.length})</h4>
                {basicNames.length === 0 ? (
                  <div className="empty-files">No files uploaded yet</div>
                ) : (
                  <div className="file-items">
                    {basicNames.map((file) => (
                      <div key={file.fileId} className="file-item">
                        <div className="file-info">
                          <span className="file-icon">📄</span>
                          <span className="file-name" onClick={() => downloadFile(file.filePath, file.fileName)}>
                            {file.fileName}
                          </span>
                        </div>
                        <button
                          className="delete-file-btn"
                          onClick={() => deleteFile(file.fileId, getBasicFileNames)}
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Images Tab */}
          {activeTab === 1 && (
            <div className="file-category">
              <div className="upload-section">
                <h3>Upload Images</h3>
                <div className="file-upload-area">
                  <input
                    type="file"
                    data-upload-type="img"
                    onChange={(e) => setImg(e.target.files[0])}
                    className="file-input"
                    accept="image/*"
                  />
                  <button
                    className="upload-btn"
                    onClick={() => uploadFile(img, 'img', 'http://localhost:5228/api/TaskImageUpload/ImgUpload')}
                    disabled={uploading.img || !img}
                  >
                    {uploading.img ? 'Uploading...' : 'Upload Image'}
                  </button>
                </div>
              </div>

              <div className="files-list">
                <h4>Images ({imgNames.length})</h4>
                {imgNames.length === 0 ? (
                  <div className="empty-files">No images uploaded yet</div>
                ) : (
                  <div className="file-items">
                    {imgNames.map((file) => (
                      <div key={file.fileId} className="file-item">
                        <div className="file-info">
                          <span className="file-icon">🖼️</span>
                          <span className="file-name" onClick={() => downloadFile(file.filePath, file.fileName)}>
                            {file.fileName}
                          </span>
                        </div>
                        <button
                          className="delete-file-btn"
                          onClick={() => deleteFile(file.fileId, getImgNames)}
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Audio Tab */}
          {activeTab === 2 && (
            <div className="file-category">
              <div className="upload-section">
                <h3>Upload Audio Files</h3>
                <div className="file-upload-area">
                  <input
                    type="file"
                    data-upload-type="audio"
                    onChange={(e) => setAudio(e.target.files[0])}
                    className="file-input"
                    accept="audio/*"
                  />
                  <button
                    className="upload-btn"
                    onClick={() => uploadFile(audio, 'audio', 'http://localhost:5228/api/TaskAudioUpload/AudioUpload')}
                    disabled={uploading.audio || !audio}
                  >
                    {uploading.audio ? 'Uploading...' : 'Upload Audio'}
                  </button>
                </div>
              </div>

              <div className="files-list">
                <h4>Audio Files ({audioNames.length})</h4>
                {audioNames.length === 0 ? (
                  <div className="empty-files">No audio files uploaded yet</div>
                ) : (
                  <div className="file-items">
                    {audioNames.map((file) => (
                      <div key={file.fileId} className="file-item">
                        <div className="file-info">
                          <span className="file-icon">🎵</span>
                          <span className="file-name" onClick={() => downloadFile(file.filePath, file.fileName)}>
                            {file.fileName}
                          </span>
                        </div>
                        <button
                          className="delete-file-btn"
                          onClick={() => deleteFile(file.fileId, getAudioNames)}
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ZIP Files Tab */}
          {activeTab === 3 && (
            <div className="file-category">
              <div className="upload-section">
                <h3>Upload ZIP Files</h3>
                <div className="file-upload-area">
                  <input
                    type="file"
                    data-upload-type="zip"
                    onChange={(e) => setZip(e.target.files[0])}
                    className="file-input"
                    accept=".zip,.rar,.7z"
                  />
                  <button
                    className="upload-btn"
                    onClick={() => uploadFile(zip, 'zip', 'http://localhost:5228/api/TaskZipUpload/ZipUpload')}
                    disabled={uploading.zip || !zip}
                  >
                    {uploading.zip ? 'Uploading...' : 'Upload ZIP'}
                  </button>
                </div>
              </div>

              <div className="files-list">
                <h4>ZIP Files ({zipNames.length})</h4>
                {zipNames.length === 0 ? (
                  <div className="empty-files">No ZIP files uploaded yet</div>
                ) : (
                  <div className="file-items">
                    {zipNames.map((file) => (
                      <div key={file.fileId} className="file-item">
                        <div className="file-info">
                          <span className="file-icon">📁</span>
                          <span className="file-name" onClick={() => downloadFile(file.filePath, file.fileName)}>
                            {file.fileName}
                          </span>
                        </div>
                        <button
                          className="delete-file-btn"
                          onClick={() => deleteFile(file.fileId, getZipNames)}
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* File Management Note */}
      <div className="file-note">
        <p>💡 Click on file names to download them. Use the delete button to remove files.</p>
      </div>
    </div>
  );
}