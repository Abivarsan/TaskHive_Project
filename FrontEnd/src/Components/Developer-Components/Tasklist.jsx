import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { getLoggedUserId } from '../../Auth/ApiService';
import './Styles/Tasklist.css'; // Import the CSS file

function Tasklist() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userid = getLoggedUserId();
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5228/api/DeveloperTask/GetAllTasks/${userid}`);
        setTasks(response.data);
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

  const TaskSelection = (id) => {
    navigate('/TaskDescriptionDeveloper', {
      state: { selectedId: id }
    });
  };

  const handleTaskSelectionNew = (taskId) => {
    navigate('/TaskRecord', {
      state: { selectedTaskId: taskId }
    });
  };

  // Helper function to get status class
  const getStatusClass = (status) => {
    const statusLower = status?.toLowerCase() || '';
    if (statusLower.includes('pending') || statusLower.includes('waiting')) return 'pending';
    if (statusLower.includes('progress') || statusLower.includes('working')) return 'in-progress';
    if (statusLower.includes('completed') || statusLower.includes('done')) return 'completed';
    if (statusLower.includes('overdue') || statusLower.includes('late')) return 'overdue';
    if (statusLower.includes('hold') || statusLower.includes('paused')) return 'on-hold';
    return 'pending'; // default
  };

  // Helper function to check if task is overdue
  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  // Loading State
  if (loading) {
    return (
      <div className="tasklist-container">
        <div className="tasklist-content-wrapper">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <div className="loading-text">Loading Tasks...</div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="tasklist-container">
        <div className="tasklist-content-wrapper">
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
    <div className="tasklist-container">
      <div className="tasklist-content-wrapper">
        {/* Header Section */}
        <div className="tasklist-header">
          <h1 className="tasklist-title">My Tasks</h1>
          <p className="tasklist-subtitle">
            Manage and track your assigned tasks
          </p>
        </div>

        {/* Tasks Content */}
        <div className="tasks-content">
          {/* Stats Section */}
          <div className="tasks-stats">
            <div className="tasks-count">
              <span className="tasks-count-text">Total Tasks</span>
              <span className="tasks-count-badge">{tasks.length}</span>
            </div>
          </div>

          {/* Tasks Table */}
          {tasks.length > 0 ? (
            <div className="tasks-table-container">
              <table className="tasks-table">
                <thead>
                  <tr>
                    <th>Task ID</th>
                    <th>Task Name</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, index) => (
                    <tr 
                      key={task.taskId || index}
                      onClick={() => TaskSelection(task.taskId)}
                    >
                      <td>#{task.taskId}</td>
                      <td>
                        <strong>{task.taskName}</strong>
                      </td>
                      <td>
                        <span className={isOverdue(task.dueDate) ? 'text-danger' : ''}>
                          {task.dueDate ? format(new Date(task.dueDate), 'MMM dd, yyyy') : 'No due date'}
                        </span>
                      </td>
                      <td>
                        <span className={`task-status `}>
                          {task.taskStatus || 'Pending'}
                        </span>
                      </td>
                      <td>
                        <div className="task-actions">
                          <button 
                            className="btn-view"
                            onClick={(e) => {
                              e.stopPropagation();
                              TaskSelection(task.taskId);
                            }}
                          >
                            View Details
                          </button>
                          <button 
                            className="btn-record"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTaskSelectionNew(task.taskId);
                            }}
                          >
                            Record Time
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">✅</div>
              <h3 className="empty-state-title">No Tasks Found</h3>
              <p className="empty-state-message">
                You don't have any tasks assigned yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tasklist;
