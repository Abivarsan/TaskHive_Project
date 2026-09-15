// UpdateProjectCom.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./Styles/ProjectCreationForm.css";

export default function UpdateProjectCom() {
  const [oldData, setOldData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const proId = location.state?.selectedId;

  // Form state
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    objectives: "",
    projectTeamName: "",
    timeline: "",
    budgetAllocation: "",
    technologies: "",
    startDate: "",
    dueDate: "",
    timeDuration: 0
  });

  // Get existing project data
  const GetOldData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5228/api/CreateProject/GetDetails?ProId=${proId}`
      );
      const data = response.data;
      setOldData(data);

      if (data.length > 0) {
        const project = data[0];
        setFormData({
          projectName: project.projectName || "",
          description: project.projectDescription || "",
          objectives: project.objectives || "",
          projectTeamName: project.teamName || "",
          timeline: project.timeline || "",
          budgetAllocation: project.budgetEstimation || "",
          technologies: project.technologies || "",
          startDate: project.p_StartDate ? project.p_StartDate.split("T")[0] : "",
          dueDate: project.p_DueDate ? project.p_DueDate.split("T")[0] : "",
          timeDuration: project.duration || 0
        });
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
      alert("Failed to load project data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (proId) {
      GetOldData();
    }
  }, [proId]);

  // Calculate duration between dates
  const getDaysBetweenDates = (startDate, endDate) => {
    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
      return 0;
    }
    const oneDay = 1000 * 60 * 60 * 24;
    const differenceInMs = endDate.getTime() - startDate.getTime();
    return Math.floor(differenceInMs / oneDay);
  };

  // Update duration when dates change
  useEffect(() => {
    if (formData.startDate && formData.dueDate) {
      const duration = getDaysBetweenDates(
        new Date(formData.startDate),
        new Date(formData.dueDate)
      );
      setFormData(prev => ({ ...prev, timeDuration: duration }));
    }
  }, [formData.startDate, formData.dueDate]);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.projectName.trim()) {
      newErrors.projectName = "Project name is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.objectives.trim()) {
      newErrors.objectives = "Objectives are required";
    }
    if (!formData.projectTeamName.trim()) {
      newErrors.projectTeamName = "Team name is required";
    }
    if (!formData.timeline.trim()) {
      newErrors.timeline = "Timeline is required";
    }
    if (!formData.budgetAllocation.trim()) {
      newErrors.budgetAllocation = "Budget allocation is required";
    }
    if (!formData.technologies.trim()) {
      newErrors.technologies = "Technologies are required";
    }
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }
    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    }

    if (formData.startDate && formData.dueDate && 
        new Date(formData.startDate) >= new Date(formData.dueDate)) {
      newErrors.dueDate = "Due date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      alert("Please fill in all required fields correctly");
      return;
    }

    setSubmitting(true);

    try {
      const data = {
        ProjectName: formData.projectName,
        ProjectDescription: formData.description,
        Technologies: formData.technologies,
        BudgetEstimation: formData.budgetAllocation,
        P_StartDate: formData.startDate,
        P_DueDate: formData.dueDate,
        Duration: formData.timeDuration,
        Objectives: formData.objectives,
        TeamName: formData.projectTeamName,
        TimeLine: formData.timeline,
        ClientID: 0,
        ProjectManagerId: 0
      };

      await axios.put(`http://localhost:5228/api/CreateProject/${proId}`, data);
      
      alert("Project updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to update project. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? All changes will be lost.")) {
      navigate(-1);
    }
  };

  if (loading) {
    return (
      <div className="update-project-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading project data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="update-project-container">
      <div className="form-header">
        <h1>Update Project</h1>
        <p>Modify project details and save changes</p>
      </div>

      <form onSubmit={handleSubmit} className="update-project-form">
        {/* Project Information Section */}
        <div className="form-section">
          <h2 className="section-title">Project Information</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="projectName">Project Name *</label>
              <input
                type="text"
                id="projectName"
                value={formData.projectName}
                onChange={(e) => handleInputChange('projectName', e.target.value)}
                className={errors.projectName ? "error" : ""}
                placeholder="Enter project name"
              />
              {errors.projectName && (
                <span className="error-message">{errors.projectName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="teamName">Team Name *</label>
              <input
                type="text"
                id="teamName"
                value={formData.projectTeamName}
                onChange={(e) => handleInputChange('projectTeamName', e.target.value)}
                className={errors.projectTeamName ? "error" : ""}
                placeholder="Enter team name"
              />
              {errors.projectTeamName && (
                <span className="error-message">{errors.projectTeamName}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Project Description *</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={errors.description ? "error" : ""}
              placeholder="Describe the project..."
              rows="4"
            />
            {errors.description && (
              <span className="error-message">{errors.description}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="objectives">Objectives *</label>
            <textarea
              id="objectives"
              value={formData.objectives}
              onChange={(e) => handleInputChange('objectives', e.target.value)}
              className={errors.objectives ? "error" : ""}
              placeholder="List the project objectives..."
              rows="3"
            />
            {errors.objectives && (
              <span className="error-message">{errors.objectives}</span>
            )}
          </div>
        </div>

        {/* Project Details Section */}
        <div className="form-section">
          <h2 className="section-title">Project Timeline & Budget</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">Start Date *</label>
              <input
                type="date"
                id="startDate"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className={errors.startDate ? "error" : ""}
              />
              {errors.startDate && (
                <span className="error-message">{errors.startDate}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="dueDate">Due Date *</label>
              <input
                type="date"
                id="dueDate"
                value={formData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                className={errors.dueDate ? "error" : ""}
              />
              {errors.dueDate && (
                <span className="error-message">{errors.dueDate}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="duration">Duration (Days)</label>
              <input
                type="number"
                id="duration"
                value={formData.timeDuration}
                readOnly
                placeholder="Auto-calculated"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="budget">Budget Allocation *</label>
              <input
                type="number"
                id="budget"
                value={formData.budgetAllocation}
                onChange={(e) => handleInputChange('budgetAllocation', e.target.value)}
                className={errors.budgetAllocation ? "error" : ""}
                placeholder="Enter budget amount"
                min="0"
                step="0.01"
              />
              {errors.budgetAllocation && (
                <span className="error-message">{errors.budgetAllocation}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="timeline">Timeline *</label>
              <input
                type="text"
                id="timeline"
                value={formData.timeline}
                onChange={(e) => handleInputChange('timeline', e.target.value)}
                className={errors.timeline ? "error" : ""}
                placeholder="Enter project timeline"
              />
              {errors.timeline && (
                <span className="error-message">{errors.timeline}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="technologies">Technologies *</label>
            <input
              type="text"
              id="technologies"
              value={formData.technologies}
              onChange={(e) => handleInputChange('technologies', e.target.value)}
              className={errors.technologies ? "error" : ""}
              placeholder="e.g., React, Node.js, MongoDB"
            />
            {errors.technologies && (
              <span className="error-message">{errors.technologies}</span>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={handleCancel}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={submitting}
          >
            {submitting ? "Updating Project..." : "Update Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
