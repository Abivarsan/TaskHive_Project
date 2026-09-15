import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import './Styles/ProfileFIleView.css';

export default function ProjectFileView() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const projectid = location.state?.newSelectedId;

  const [basicNames, setBasicNames] = useState([]);
  const [imgNames, setImgNames] = useState([]);
  const [audioNames, setAudioNames] = useState([]);
  const [zipNames, setZipNames] = useState([]);

  // Enhanced API calls with better error handling
  const fetchAllFiles = async () => {
    setIsLoading(true);
    try {
      const [basicRes, imgRes, audioRes, zipRes] = await Promise.allSettled([
        axios.get(`http://localhost:5228/api/DeveloperProjectFileView/TaskInfo/${projectid}`),
        axios.get(`http://localhost:5228/api/DeveloperProjectFileView/Images/${projectid}`),
        axios.get(`http://localhost:5228/api/DeveloperProjectFileView/audio/${projectid}`),
        axios.get(`http://localhost:5228/api/DeveloperProjectFileView/zip/${projectid}`)
      ]);

      if (basicRes.status === 'fulfilled') setBasicNames(basicRes.value.data);
      if (imgRes.status === 'fulfilled') setImgNames(imgRes.value.data);
      if (audioRes.status === 'fulfilled') setAudioNames(audioRes.value.data);
      if (zipRes.status === 'fulfilled') setZipNames(zipRes.value.data);

    } catch (error) {
      console.error('Error fetching files:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const download = async (filePath, fileName) => {
    const urlDownload = `http://localhost:5228/api/DeveloperProjectFileDownload/DeveloperProjectFileDownload/${filePath}/${fileName}`;
    
    if (window.confirm('Do you want to download this item?')) {
      try {
        const response = await axios.get(urlDownload, { responseType: 'blob' });
        const blob = new Blob([response.data], { type: response.data.type });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        alert("Downloaded successfully!");
      } catch (error) {
        console.error('Download error:', error);
        alert("Download failed. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (projectid) {
      fetchAllFiles();
    } else {
      setError('No project ID provided');
      setIsLoading(false);
    }
  }, [projectid]);

  // Helper function to render file items
  const renderFileItems = (files, type) => {
    if (!files || files.length === 0) {
      return (
        <div className="empty-state">
          <div className="empty-state-icon">📄</div>
          <div className="empty-state-title">No {type} files</div>
          <div className="empty-state-message">No files found in this category</div>
        </div>
      );
    }

    return (
      <div className="file-list">
        {files.map((file, index) => (
          <div key={index} className="file-item">
            <div className={`file-icon ${type.toLowerCase()}`}>
              {getFileIcon(type)}
            </div>
            <div className="file-info">
              <div className="file-name">{file.fileName || file.name || `${type} File ${index + 1}`}</div>
              <div className="file-path">{file.filePath || file.path || 'Unknown path'}</div>
            </div>
            <div className="file-actions">
              <button
                className="download-btn"
                onClick={() => download(file.filePath || file.path, file.fileName || file.name)}
              >
                <span>📥</span>
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Helper function to get file type icon
  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'document': case 'basic': return '📄';
      case 'image': return '🖼️';
      case 'audio': return '🎵';
      case 'zip': return '📦';
      default: return '📄';
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="project-files-container">
        <div className="project-files-wrapper">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <div className="loading-text">Loading project files...</div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="project-files-container">
        <div className="project-files-wrapper">
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
    <div className="project-files-container">
      <div className="project-files-wrapper">
        {/* Header */}
        <div className="files-header">
          <h1 className="files-title">Project Files</h1>
          <p className="files-subtitle">
            Browse and download project resources and documents
          </p>
        </div>

        {/* Files Content */}
        <div className="files-content">
          <div className="file-categories-grid">
            {/* Documents */}
            <div className="file-category-card basic-files">
              <div className="category-header">
                <span className="category-icon">📄</span>
                <h3 className="category-title">Documents</h3>
                <span className="category-count">{basicNames.length}</span>
              </div>
              {renderFileItems(basicNames, 'document')}
            </div>

            {/* Images */}
            <div className="file-category-card image-files">
              <div className="category-header">
                <span className="category-icon">🖼️</span>
                <h3 className="category-title">Images</h3>
                <span className="category-count">{imgNames.length}</span>
              </div>
              {renderFileItems(imgNames, 'image')}
            </div>

            {/* Audio Files */}
            <div className="file-category-card audio-files">
              <div className="category-header">
                <span className="category-icon">🎵</span>
                <h3 className="category-title">Audio Files</h3>
                <span className="category-count">{audioNames.length}</span>
              </div>
              {renderFileItems(audioNames, 'audio')}
            </div>

            {/* Archives */}
            <div className="file-category-card zip-files">
              <div className="category-header">
                <span className="category-icon">📦</span>
                <h3 className="category-title">Archives</h3>
                <span className="category-count">{zipNames.length}</span>
              </div>
              {renderFileItems(zipNames, 'zip')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
