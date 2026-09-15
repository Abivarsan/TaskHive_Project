import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Styles/TaskStyle.css';
import { format } from 'date-fns';
import { getLoggedUserId } from '../../Auth/ApiService';

export default function Task() {
  const [taskData, setTaskData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [stopTime, setStopTime] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const location = useLocation();
  const selectedTaskId = location.state?.selectedTaskId;
  console.log("Task ID = " + selectedTaskId);

  // Update current time every second for live clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const showStatusMessage = (message, type = 'success') => {
    setStatusMessage({ message, type });
    setTimeout(() => setStatusMessage(null), 5000);
  };

  const startTimer = async () => {
    if (!startTime) {
      const currentDateTime = new Date().toISOString();
      setStartTime(currentDateTime);
      console.log('Start Time:', currentDateTime);
      showStatusMessage('Task started successfully! ⏱️', 'success');

      const editDataNew = { TaskStartTime: currentDateTime };
      try {
        const urlTaskStatusStart = `http://localhost:5228/api/DeveloperTime/tasksStatusStart/${selectedTaskId}`;
        const responseTaskStatusStart = await axios.put(urlTaskStatusStart, editDataNew);
        console.log('Start time submitted:', editDataNew);
      } catch (error) {
        console.error('There was an error submitting the start time!', error);
        showStatusMessage('Error starting task. Please try again.', 'error');
      }
    } else {
      showStatusMessage('Task already started. Please stop the timer before starting again.', 'warning');
    }
  };

  const stopTimer = () => {
    if (startTime && !stopTime) {
      const currentDateTime = new Date().toISOString();
      setStopTime(currentDateTime);
      console.log('Stop Time:', currentDateTime);
      showStatusMessage('Task stopped successfully! 🛑', 'success');
    } else {
      showStatusMessage('Task not yet started or already stopped.', 'warning');
    }
  };

  const submit = async () => {
    if (!stopTime) {
      showStatusMessage('Please stop the timer before submitting!', 'warning');
      return;
    }

    const editData = {
      TaskStartTime: startTime,
      TaskCompleteTime: stopTime,
    };

    try {
      const userid = getLoggedUserId();
      const url = `http://localhost:5228/api/DeveloperTime/taskTimes/${selectedTaskId}/${userid}`;
      const response = await axios.post(url, editData);
      
      const urlTask = `http://localhost:5228/api/DeveloperTime/tasks/${selectedTaskId}`;
      const responseTask = await axios.put(urlTask, editData);
      
      const newProject = `http://localhost:5228/api/DeveloperTime/projects/${selectedTaskId}`;
      const responseProject = await axios.put(newProject, editData);

      console.log(editData);
      showStatusMessage('Time data submitted successfully! 📝', 'success');
      
      // Reset timers after successful submission
      setTimeout(() => {
        setStartTime(null);
        setStopTime(null);
      }, 2000);
    } catch (error) {
      console.error('There was an error editing the data!', error);
      showStatusMessage('Error submitting data. Please try again.', 'error');
    }
  };

  const completed = async () => {
    const editData = {
      TaskStartTime: startTime,
      TaskCompleteTime: stopTime,
    };

    try {
      const urlTaskStatus = `http://localhost:5228/api/DeveloperTime/tasksStatusStop/${selectedTaskId}`;
      const responseTaskStatus = await axios.put(urlTaskStatus, editData);
      console.log(editData);
      showStatusMessage('Task marked as completed! ✅', 'success');
    } catch (error) {
      console.error('There was an error marking task as completed!', error);
      showStatusMessage('Error marking task as completed. Please try again.', 'error');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedTaskId) {
        setError('No task ID provided');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5228/api/DeveloperTask/TaskDescription/${selectedTaskId}`);
        const data = await response.json();
        setTaskData(data);
        console.log(data);
        setIsLoading(false);
        setStartTime(null);
        setStopTime(null);
      } catch (error) {
        setError(error.message || 'Failed to load task data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedTaskId]);

  // Calculate elapsed time
  const getElapsedTime = () => {
    if (!startTime) return '00:00:00';
    
    const start = new Date(startTime);
    const end = stopTime ? new Date(stopTime) : currentTime;
    const diff = Math.max(0, end - start);
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Get timer status
  const getTimerStatus = () => {
    if (!startTime) return 'idle';
    if (startTime && !stopTime) return 'running';
    return 'stopped';
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="task-timer-container">
        <div className="task-timer-wrapper">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <div className="loading-text">Loading Task Timer...</div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="task-timer-container">
        <div className="task-timer-wrapper">
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

  const timerStatus = getTimerStatus();

  return (
    <div className="task-timer-container">
      <div className="task-timer-wrapper">
        {/* Header */}
        <div className="task-timer-header">
          <h1 className="timer-title">Task Timer</h1>
          <p className="timer-subtitle">
            Track your time and manage task progress
          </p>
        </div>

        {/* Content */}
        <div className="task-timer-content">
          {/* Status Message */}
          {statusMessage && (
            <div className={`status-message ${statusMessage.type}`}>
              {statusMessage.message}
            </div>
          )}

          {/* Task Info Section */}
          {taskData && (
            <div className="task-info-section">
              <div className="task-info-header">
                <span className="task-info-icon">📋</span>
                <h2 className="task-info-title">Task Information</h2>
              </div>
              
              <div className="task-details-grid">
                <div className="task-detail-item">
                  <span className="task-detail-label">Task Name</span>
                  <div className="task-detail-value">
                    {taskData[0].taskName || 'Task Name Not Available'}
                  </div>
                </div>
                
                <div className="task-detail-item">
                  <span className="task-detail-label">Project</span>
                  <div className="task-detail-value">
                    {taskData[0].projectName || 'Project Not Available'}
                  </div>
                </div>
                
                <div className="task-detail-item">
                  <span className="task-detail-label">Due Date</span>
                  <div className="task-detail-value">
                    {taskData[0].dueDate ? format(new Date(taskData[0].dueDate), 'MMM dd, yyyy') : 'Not set'}
                  </div>
                </div>
                
                <div className="task-detail-item">
                  <span className="task-detail-label">Estimated Time</span>
                  <div className="task-detail-value">
                    {taskData[0].timeDuration || 'Not specified'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Timer Section */}
          <div className="timer-section">
            <div className="timer-display">
              <div className="timer-clock">{getElapsedTime()}</div>
              <div className={`timer-status ${timerStatus}`}>
                <span className={`status-indicator ${timerStatus}`}></span>
                {timerStatus === 'idle' && 'Ready to start'}
                {timerStatus === 'running' && 'Timer running'}
                {timerStatus === 'stopped' && 'Timer stopped'}
              </div>
            </div>

            {/* Time Cards */}
            <div className="time-cards">
              <div className="time-card start-time">
                <div className="time-card-icon">🚀</div>
                <div className="time-card-label">Start Time</div>
                <div className="time-card-value">
                  {startTime ? format(new Date(startTime), 'HH:mm:ss') : '--:--:--'}
                </div>
              </div>
              
              <div className="time-card stop-time">
                <div className="time-card-icon">🛑</div>
                <div className="time-card-label">Stop Time</div>
                <div className="time-card-value">
                  {stopTime ? format(new Date(stopTime), 'HH:mm:ss') : '--:--:--'}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="timer-actions">
              <button
                className="timer-button start-button"
                onClick={startTimer}
                disabled={startTime && !stopTime}
              >
                <span className="button-icon">▶️</span>
                Start Timer
              </button>

              <button
                className="timer-button stop-button"
                onClick={stopTimer}
                disabled={!startTime || stopTime}
              >
                <span className="button-icon">⏸️</span>
                Stop Timer
              </button>

              <button
                className="timer-button submit-button"
                onClick={submit}
                disabled={!stopTime}
              >
                <span className="button-icon">📝</span>
                Submit Time
              </button>

              <button
                className="timer-button complete-button"
                onClick={completed}
                disabled={!startTime}
              >
                <span className="button-icon">✅</span>
                Mark Complete
              </button>
            </div>
          </div>

          {/* Tips Section */}
          <div className="tips-section">
            <div className="tips-header">
              <span className="tips-icon">💡</span>
              <h3 className="tips-title">Timer Tips</h3>
            </div>
            <ul className="tips-list">
              <li>Click "Start Timer" to begin tracking your work time</li>
              <li>Use "Stop Timer" when you take breaks or finish working</li>
              <li>Submit your time to record it in the system</li>
              <li>Mark the task as complete when you're finished</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
