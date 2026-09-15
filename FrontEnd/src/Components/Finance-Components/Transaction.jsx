import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Button, InputGroup } from "react-bootstrap";
import "./Styles/TransactionStyles.css"; 
import TextField from '@mui/material/TextField';
import Invoice from "./Invoice"; 

function Transaction() {
    const [projects, setProjects] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [selectedProject, setSelectedProject] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [date, setDate] = useState("");
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`http://localhost:5228/api/Transaction/register`);
            console.log("Projects:", response.data); // Debugging: log fetched projects
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const fetchTransactions = async (projectId) => {
        try {
            const response = await axios.get(`http://localhost:5228/api/Transaction/Project/${projectId}/transactions`);
            console.log("Transactions:", response.data); // Debugging: log fetched transactions
            setTransactions(response.data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    const handleProjectChange = (event) => {
        const projectId = event.target.value;
        setSelectedProject(projectId);
        if (projectId) {
            fetchTransactions(projectId);
        }
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleValueChange = (event) => {
        setValue(event.target.value);
    };

    const addValues = async (event) => {
        event.preventDefault();
        setValidated(true);
        if (!selectedProject || !selectedType || !description || !value || !date) {
            alert("Please fill in all the fields");
            return;
        }

        const transacdata = {
            Value: value,
            Type: selectedType,
            Description: description,
            Date: date
        };

        const url = `http://localhost:5228/api/Transaction/Project/${selectedProject}/register`;

        try {
            const response = await axios.post(url, transacdata);
            alert("Value added successfully");
            window.location.reload(); // Refresh Page
        } catch (error) {
            if (error.response) {
                alert(`Server responded with status ${error.response.status}: ${error.response.data}`);
            } else if (error.request) {
                alert("No response received from the server");
            } else {
                alert(`Error setting up the request: ${error.message}`);
            }
        }
    };

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="tpage">
            <div className="transactoncol">
                <Form noValidate validated={validated} onSubmit={addValues}>
                    <Row className="selectionitem">
                        <Form.Group as={Col} controlId="formGridProject" className="t1">
                            <Form.Label>
                                <div className="Invoicename">
                                    <p><b>Project</b>:</p>
                                </div>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        as="select"
                                        id="SelectProject"
                                        className="Projectlist1"
                                        value={selectedProject}
                                        onChange={handleProjectChange}
                                        required
                                    >
                                        <option value="">Select project here...</option>
                                        {projects.map(project => (
                                            <option key={project.projectId} value={project.projectId}>{project.projectName}</option>
                                        ))}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Please select a project.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Label>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridType">
                            <Form.Label>
                                <div className="Type">
                                    <p><b>Type</b> :</p>
                                </div>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        as="select"
                                        id="SelectType"
                                        className="transactype"
                                        value={selectedType}
                                        onChange={handleTypeChange}
                                        required
                                    >
                                        <option value="">Select Type...</option>
                                        <option value="Income">Income</option>
                                        <option value="Expense">Expense</option>
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Please select a type.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Label>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridDate">
                            <Form.Label>
                                <p><b>Date</b> :</p>
                                <div className="datepicker">
                                    <TextField
                                        required
                                        autoFocus
                                        margin="dense"
                                        id="last_updated"
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        inputProps={{
                                            max: getTodayDate(),
                                            style: {
                                                height: "25px",
                                                paddingTop: "0px",
                                                paddingBottom: "0px"
                                            }
                                        }}
                                        style={{ backgroundColor: "white", width: "220px", marginTop: "5px", marginLeft: "10px" }}
                                        helperText={validated && date > getTodayDate() ? 'Cannot select a future date.' : ''}
                                        error={validated && (!date || date > getTodayDate())}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please select a valid date.
                                    </Form.Control.Feedback>
                                </div>
                            </Form.Label>
                        </Form.Group>
                    </Row>
                    <Row className="val-and-dis">
                        <Form.Group as={Col} controlId="formGridDescription">
                            <Form.Label><b>Description</b></Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    required
                                    placeholder="Enter budget description"
                                    onChange={handleDescriptionChange}
                                    style={{ fontSize: "16px" }}
                                    autoComplete="off"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a description.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridValue">
                            <Form.Label><b>Value</b></Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Enter budget value"
                                    onChange={handleValueChange}
                                    style={{ fontSize: "16px" }}
                                    autoComplete="off"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a value.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <div className="addbutton">
                        <Row>
                            <Form.Group className="submit-btn" controlId="formGridAddress1">
                                <Button variant="primary" type="submit" id="usubmit" className="addbtn1" 
                                style={{ backgroundColor: '#20C997', color: 'white'}}>
                                    Add
                                </Button>
                            </Form.Group>
                        </Row>
                    </div>
                </Form>
            </div>
            <div className="outerlyr">
                <div className="invoicereport">
                    <Invoice projectId={selectedProject} />  {/*import invoice report*/}
                </div>
            </div>
        </div>
    )
}

export default Transaction;
