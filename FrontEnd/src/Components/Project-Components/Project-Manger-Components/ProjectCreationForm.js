// ProjectCreationForm.js
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { getLoggedUserId } from '../../../Auth/ApiService';
import '../Styles/ProjectCreationForm.css';


export default function ProjectCreationForm() {
  // State variables
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [objectives, setObjectives] = useState("");
  const [projectTeamName, setProjectTeamName] = useState("");
  const [projectManagerID, setProjectManagerID] = useState("");
  const [clientID, setClientID] = useState("");
  const [timeDuration, setTimeDuration] = useState("");
  const [timeline, setTimeline] = useState("");
  const [budgetAllocation, setBudgetAllocation] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Data for dropdowns
  const [projectManagers, setProjectManagers] = useState([]);
  const [clients, setClients] = useState([]);

  // Fetch project managers
  const getProjectManagers = async () => {
    try {
      const response = await axios.get("http://localhost:5228/api/GetProjectManagerName");
      setProjectManagers(response.data);
    } catch (error) {
      console.error("Error fetching project managers:", error);
    }
  };

  // Fetch clients
  const getClients = async () => {
    try {
      const response = await axios.get("http://localhost:5228/api/GetClientNames");
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  useEffect(() => {
    getProjectManagers();
    getClients();
  }, []);

  // Calculate duration between dates
  const getDaysBetweenDates = (startDate, endDate) => {
    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
      return null;
    }
    const oneDay = 1000 * 60 * 60 * 24;
    const differenceInMs = endDate.getTime() - startDate.getTime();
    return Math.floor(differenceInMs / oneDay);
  };

  useEffect(() => {
    if (startDate && dueDate) {
      const sDate = new Date(startDate);
      const dDate = new Date(dueDate);
      const duration = getDaysBetweenDates(sDate, dDate);
      setTimeDuration(duration || 0);
    }
  }, [startDate, dueDate]);



  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!projectName.trim()) newErrors.projectName = "Project name is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!objectives.trim()) newErrors.objectives = "Objectives are required";
    if (!projectTeamName.trim()) newErrors.projectTeamName = "Team name is required";
    if (!projectManagerID) newErrors.projectManagerID = "Project manager is required";
    if (!clientID) newErrors.clientID = "Client is required";
    if (!timeline.trim()) newErrors.timeline = "Timeline is required";
    if (!budgetAllocation.trim()) newErrors.budgetAllocation = "Budget allocation is required";
    if (!technologies.trim()) newErrors.technologies = "Technologies are required";
    if (!startDate) newErrors.startDate = "Start date is required";
    if (!dueDate) newErrors.dueDate = "Due date is required";

    if (startDate && dueDate && new Date(startDate) >= new Date(dueDate)) {
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

    setLoading(true);

    try {
      const userId = getLoggedUserId();
      const data = {
        ProjectName: projectName,
        ProjectDescription: description,
        Technologies: technologies,
        BudgetEstimation: budgetAllocation,
        P_StartDate: startDate,
        P_DueDate: dueDate,
        Duration: timeDuration,
        Objectives: objectives,
        TeamName: projectTeamName,
        ProjectManagerId: projectManagerID,
        ClientId: clientID,
        TimeLine: timeline,
      };

      const url = `http://localhost:5228/api/PMCreateProject?id=${userId}`;
      const response =await axios.post(url, data);

     // backend should return projectId + clientId etc.
      alert("Project created successfully!");

      
      // Reset form
      setProjectName("");
      setDescription("");
      setObjectives("");
      setProjectTeamName("");
      setProjectManagerID("");
      setClientID("");
      setTimeline("");
      setBudgetAllocation("");
      setTechnologies("");
      setStartDate("");
      setDueDate("");
      setErrors({});

    } catch (error) {
      console.error("Error creating project:", error);
      alert("Failed to create project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="project-creation-container">
      <div className="form-header">
        <h1>Create New Project</h1>
        <p>Fill in the details to create a new project</p>
      </div>

      <form onSubmit={handleSubmit} className="project-form">
        {/* Project Information Section */}
        <div className="form-section">
          <h2 className="section-title">Project Information</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="projectName">Project Name *</label>
              <input
                type="text"
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className={errors.projectName ? "error" : ""}
                placeholder="Enter project name"
              />
              {errors.projectName && <span className="error-message">{errors.projectName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="teamName">Team Name *</label>
              <input
                type="text"
                id="teamName"
                value={projectTeamName}
                onChange={(e) => setProjectTeamName(e.target.value)}
                className={errors.projectTeamName ? "error" : ""}
                placeholder="Enter team name"
              />
              {errors.projectTeamName && <span className="error-message">{errors.projectTeamName}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Project Description *</label>
             <ReactQuill
          theme="snow"
          value={description}
          onChange={setDescription}
          placeholder="Write a detailed project description..."
        />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="objectives">Objectives *</label>
            <ReactQuill
          theme="snow"
          value={objectives}
          onChange={setObjectives}
          placeholder="List project objectives..."
        />
            {errors.objectives && <span className="error-message">{errors.objectives}</span>}
          </div>
        </div>

        {/* Assignment Section */}
        <div className="form-section">
          <h2 className="section-title">Assignment</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="projectManager">Project Manager *</label>
              <select
                id="projectManager"
                value={projectManagerID}
                onChange={(e) => setProjectManagerID(e.target.value)}
                className={errors.projectManagerID ? "error" : ""}
              >
                 <option value="">Select Project Manager</option>
                    {projectManagers.map((manager) => (
                      <option key={manager.userId} value={manager.userId}>
                        {`${manager.firstName} ${manager.lastName}`}
                      </option>
                    ))}
              </select>
              {errors.projectManagerID && <span className="error-message">{errors.projectManagerID}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="client">Client *</label>
              <select
                id="client"
                value={clientID}
                onChange={(e) => setClientID(e.target.value)}
                className={errors.clientID ? "error" : ""}
              >
                <option value="">Select Client</option>
                {clients.map((client) => (
                  <option key={client.id || client.clientId} value={client.id || client.clientId}>
                    {client.name || client.clientName}
                  </option>
                ))}
              </select>
              {errors.clientID && <span className="error-message">{errors.clientID}</span>}
            </div>
          </div>
        </div>

        {/* Project Details Section */}
        <div className="form-section">
          <h2 className="section-title">Project Details</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDate">Start Date *</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={errors.startDate ? "error" : ""}
              />
              {errors.startDate && <span className="error-message">{errors.startDate}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="dueDate">Due Date *</label>
              <input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={errors.dueDate ? "error" : ""}
              />
              {errors.dueDate && <span className="error-message">{errors.dueDate}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="duration">Duration (Days)</label>
              <input
                type="number"
                id="duration"
                value={timeDuration}
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
                value={budgetAllocation}
                onChange={(e) => setBudgetAllocation(e.target.value)}
                className={errors.budgetAllocation ? "error" : ""}
                placeholder="Enter budget amount"
                min="0"
                step="0.01"
              />
              {errors.budgetAllocation && <span className="error-message">{errors.budgetAllocation}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="timeline">Timeline *</label>
              <input
                type="text"
                id="timeline"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className={errors.timeline ? "error" : ""}
                placeholder="Enter project timeline"
              />
              {errors.timeline && <span className="error-message">{errors.timeline}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="technologies">Technologies *</label>
            <input
              type="text"
              id="technologies"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              className={errors.technologies ? "error" : ""}
              placeholder="e.g., React, Node.js, MongoDB"
            />
            {errors.technologies && <span className="error-message">{errors.technologies}</span>}
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => window.history.back()}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Creating Project..." : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
