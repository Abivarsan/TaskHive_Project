import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import TextField from "@mui/material/TextField";

import "./Styles/FormStyle.css";
import { useLocation, useNavigate } from "react-router-dom";

import InputGroup from "react-bootstrap/InputGroup";

export default function UpdateTaskCom() {
  const [validated, setValidated] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [dependancies, setDependancies] = useState("");
  const [priority, setPriority] = useState("");

  const [createdDate, setCreatedDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [timeDuration, setTimeDuration] = useState();

  const selectedDevId = location.state.selectedDevId;
  const selectedId = location.state.selectedId;
  const taskId = location.state.taskId; // Assume taskId is passed for editing

  useEffect(() => {
    if (taskId) {
      axios
        .get(`http://localhost:5228/api/TaskCreation/${taskId}`)
        .then((response) => {
          const task = response.data;
          setTaskName(task.taskName);
          setDescription(task.taskDescription);
          setTechnologies(task.technology);
          setDependancies(task.dependancy);
          setPriority(task.priority);
          setCreatedDate(task.createdDate);
          setDueDate(task.dueDate);
          setTimeDuration(task.timeDuration);
        })
        .catch((error) => {
          console.error("Error fetching task data: ", error);
        });
    }
  }, [taskId]);

  function getDaysBetweenDates(startDate, endDate) {
    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
      return null;
    }
    const oneDay = 1000 * 60 * 60 * 24;
    const differenceInMs = endDate.getTime() - startDate.getTime();
    return Math.floor(differenceInMs / oneDay);
  }

  const sdate = new Date(createdDate);
  const ddate = new Date(dueDate);
  var time = getDaysBetweenDates(sdate, ddate);

  const handleSubmit = (event) => {
    setTimeDuration(time);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      alert("Input the required fields");
    } else {
      event.preventDefault();
      const data = {
        TaskName: taskName,
        TaskDescription: description,
        Technology: technologies,
        Dependancy: dependancies,
        Priority: priority,
        TimeDuration: time,
        CreatedDate: createdDate,
        DueDate: dueDate,
      };

      const url = `http://localhost:5228/api/TaskCreation/${taskId ? taskId : ""}`;

      const request = taskId
        ? axios.put(url, data)
        : axios.post(url, { ...data, ProjectId: selectedId, DeveloperId: selectedDevId });

      request
        .then((response) => {
          alert(`Task ${taskId ? "updated" : "created"} successfully`);
          setValidated(false);
          navigate("/task-list"); // Navigate to the task list or any other page
        })
        .catch((error) => {
          alert(error);
          console.log(error);
        });
    }
    setValidated(true);
  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <div className="Section">
          <h3 className="SectionHeading">Task Initialization</h3>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label htmlFor="taskName">Task Name:</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  autoFocus
                  required
                  type="text"
                  placeholder="Task Name"
                  id="taskName"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter task name.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="description">Task Description:</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                required
                placeholder="Enter task description"
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter task description.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Row className="mb-3">
            <Form.Group className="mb-3">
              <Form.Label>Technologies:</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  required
                  placeholder="Enter technologies used"
                  type="text"
                  id="technologies"
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter task technologies.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Row className="mb-3" style={{ width: "70%" }}>
              <Form.Group as={Col}>
                <Form.Label>Created Date:</Form.Label>
                <TextField
                  required
                  style={{ backgroundColor: "whitesmoke", borderRadius: "10px", width: "300px" }}
                  margin="dense"
                  id="createdDate"
                  type="date"
                  fullWidth
                  value={createdDate}
                  onChange={(e) => setCreatedDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Due Date:</Form.Label>
                <TextField
                  required
                  style={{ backgroundColor: "whitesmoke", borderRadius: "10px", width: "300px" }}
                  margin="dense"
                  id="dueDate"
                  type="date"
                  fullWidth
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Dependancies:</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  required
                  placeholder="Enter dependancies"
                  type="text"
                  id="dependancies"
                  value={dependancies}
                  onChange={(e) => setDependancies(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter task dependancies.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Priority:</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                required
                placeholder="Enter priority level"
                type="number"
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter priority level.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Button type="submit">{taskId ? "Update Task" : "Create Task"}</Button>
        </div>
      </Form>
    </div>
  );
}
