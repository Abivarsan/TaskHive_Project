// TaskCreationCom.js - Modern Material UI Design
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./Styles/TaskCreationCom.css";

export default function TaskCreationCom() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    taskName: "",
    description: "",
    technologies: "",
    dependencies: "",
    priority: "Medium",
    createdDate: "",
    dueDate: "",
    timeDuration: 0
  });

  // Other state
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const selectedDevId = location.state?.selectedDevId;
  const selectedId = location.state?.selectedId;

  // Set current date as default for created date
  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setFormData(prev => ({
      ...prev,
      createdDate: currentDate
    }));
  }, []);

  // Calculate time duration when dates change
  useEffect(() => {
    if (formData.createdDate && formData.dueDate) {
      const startDate = new Date(formData.createdDate);
      const endDate = new Date(formData.dueDate);
      const timeDiff = endDate.getTime() - startDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      setFormData(prev => ({
        ...prev,
        timeDuration: daysDiff > 0 ? daysDiff : 0
      }));
    }
  }, [formData.createdDate, formData.dueDate]);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Check required fields
    const requiredFields = ['taskName', 'description', 'technologies', 'priority', 'createdDate', 'dueDate'];
    
    requiredFields.forEach(field => {
      if (!formData[field] || !formData[field].toString().trim()) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
        isValid = false;
      }
    });

    // Validate dates
    if (formData.createdDate && formData.dueDate) {
      const startDate = new Date(formData.createdDate);
      const endDate = new Date(formData.dueDate);
      
      if (endDate <= startDate) {
        errors.dueDate = 'Due date must be after the created date';
        isValid = false;
      }
    }

    // Validate task name length
    if (formData.taskName && formData.taskName.length < 3) {
      errors.taskName = 'Task name must be at least 3 characters long';
      isValid = false;
    }

    // Validate description length
    if (formData.description && formData.description.length < 10) {
      errors.description = 'Description must be at least 10 characters long';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!validateForm()) {
      alert('Please fix all errors before submitting');
      return;
    }

    if (!selectedDevId || !selectedId) {
      alert('Missing developer ID or project ID. Please try again.');
      return;
    }

    setLoading(true);

    const data = {
      TaskName: formData.taskName,
      TaskDescription: formData.description,
      Technology: formData.technologies,
      Dependancy: formData.dependencies,
      Priority: formData.priority,
      TimeDuration: formData.timeDuration,
      ProjectId: selectedId,
      DeveloperId: selectedDevId,
      CreatedDate: formData.createdDate,
      DueDate: formData.dueDate,
    };

    try {
      console.log('Sending data:', data);
      const response = await axios.post("http://localhost:5228/api/TaskCreation", data);
      
      console.log("Task created successfully:", response.data);
      alert("Task created successfully!");
      
      // Clear form
      clearForm();
      
      // Navigate back or reload
      setTimeout(() => {
        navigate(-1); // Go back to previous page
      }, 1000);

    } catch (error) {
      console.error("Task creation failed:", error);
      if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("Failed to create task. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Clear form
  const clearForm = () => {
    const currentDate = new Date().toISOString().split("T")[0];
    setFormData({
      taskName: "",
      description: "",
      technologies: "",
      dependencies: "",
      priority: "Medium",
      createdDate: currentDate,
      dueDate: "",
      timeDuration: 0
    });
    setFormErrors({});
    setFormSubmitted(false);
  };

  // Handle back navigation
  const handleBack = () => {
    if (window.confirm("Are you sure you want to go back? Any unsaved changes will be lost.")) {
      navigate(-1);
    }
  };

  return (
    <div className="task-creation-container">
      <div className="task-creation-card">
        <div className="task-creation-header">
          <button className="back-btn" onClick={handleBack}>
            ← Back
          </button>
          <h2>Create New Task</h2>
          <p className="header-subtitle">
            Project ID: #{selectedId} • Developer ID: #{selectedDevId}
          </p>
        </div>

        <form className="task-creation-form" onSubmit={handleSubmit}>
          {/* Task Information Section */}
          <div className="form-section">
            <h3 className="section-title">Task Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Task Name</label>
                <input
                  type="text"
                  value={formData.taskName}
                  onChange={(e) => handleInputChange('taskName', e.target.value)}
                  className={formErrors.taskName ? 'error' : ''}
                  placeholder="Enter task name"
                  required
                />
                {formErrors.taskName && <span className="error-message">{formErrors.taskName}</span>}
              </div>

              <div className="form-group">
                <label>Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className={formErrors.priority ? 'error' : ''}
                  required
                >
                  <option value="">Select Priority</option>
                  <option value="Low">🟢 Low</option>
                  <option value="Medium">🟡 Medium</option>
                  <option value="High">🟠 High</option>
                  <option value="Critical">🔴 Critical</option>
                </select>
                {formErrors.priority && <span className="error-message">{formErrors.priority}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Task Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className={formErrors.description ? 'error' : ''}
                placeholder="Describe the task requirements and objectives"
                rows="4"
                required
              />
              {formErrors.description && <span className="error-message">{formErrors.description}</span>}
            </div>
          </div>

          {/* Technical Details Section */}
          <div className="form-section">
            <h3 className="section-title">Technical Details</h3>
            
            <div className="form-group">
              <label>Technologies</label>
              <input
                type="text"
                value={formData.technologies}
                onChange={(e) => handleInputChange('technologies', e.target.value)}
                className={formErrors.technologies ? 'error' : ''}
                placeholder="e.g., React, Node.js, MongoDB, CSS"
                required
              />
              {formErrors.technologies && <span className="error-message">{formErrors.technologies}</span>}
            </div>

            <div className="form-group">
              <label>Dependencies (Optional)</label>
              <textarea
                value={formData.dependencies}
                onChange={(e) => handleInputChange('dependencies', e.target.value)}
                className={formErrors.dependencies ? 'error' : ''}
                placeholder="List any dependencies or prerequisites for this task"
                rows="3"
              />
              {formErrors.dependencies && <span className="error-message">{formErrors.dependencies}</span>}
            </div>
          </div>

          {/* Timeline Section */}
          <div className="form-section">
            <h3 className="section-title">Timeline</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Created Date</label>
                <input
                  type="date"
                  value={formData.createdDate}
                  onChange={(e) => handleInputChange('createdDate', e.target.value)}
                  className={formErrors.createdDate ? 'error' : ''}
                  required
                />
                {formErrors.createdDate && <span className="error-message">{formErrors.createdDate}</span>}
              </div>

              <div className="form-group">
                <label>Due Date</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange('dueDate', e.target.value)}
                  className={formErrors.dueDate ? 'error' : ''}
                  min={formData.createdDate}
                  required
                />
                {formErrors.dueDate && <span className="error-message">{formErrors.dueDate}</span>}
              </div>

              <div className="form-group">
                <label>Duration</label>
                <div className="duration-display">
                  <span className="duration-value">{formData.timeDuration}</span>
                  <span className="duration-unit">days</span>
                </div>
                <small className="duration-note">
                  Automatically calculated from dates
                </small>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={clearForm}
              disabled={loading}
            >
              Clear Form
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Creating Task...' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>

      {/* Task Summary Preview */}
      {formData.taskName && (
        <div className="task-preview-card">
          <h3>Task Preview</h3>
          <div className="preview-content">
            <div className="preview-item">
              <strong>Task:</strong> {formData.taskName}
            </div>
            <div className="preview-item">
              <strong>Priority:</strong> 
              <span className={`priority-badge priority-${formData.priority.toLowerCase()}`}>
                {formData.priority}
              </span>
            </div>
            <div className="preview-item">
              <strong>Duration:</strong> {formData.timeDuration} days
            </div>
            <div className="preview-item">
              <strong>Technologies:</strong> {formData.technologies}
            </div>
            {formData.dependencies && (
              <div className="preview-item">
                <strong>Dependencies:</strong> {formData.dependencies.substring(0, 50)}...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}