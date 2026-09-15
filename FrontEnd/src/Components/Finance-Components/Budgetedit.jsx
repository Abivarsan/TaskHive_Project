import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import './Styles/Budgetedit.css'


const Budgetedit = (props) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');
  const [selectionProcessCost, setSelectionProcessCost] = useState('');
  const [serversCost, setServersCost] = useState('');
  const [hardwareCost, setHardwareCost] = useState('');
  const [connectionCost, setConnectionCost] = useState('');
  const [developerCost, setDeveloperCost] = useState('');
  const [otherExpenses, setOtherExpenses] = useState('');
  const [licenseCost, setLicenseCost] = useState('');

  const { projectId, budgetData } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectionEdit = (event) => {
    setSelectionProcessCost(event.target.value);
  };
  const handleDateEdit = (event) => {
    setDate(event.target.value);
  };
  const handleServerEdit = (event) => {
    setServersCost(event.target.value);
  };
  const handleHardwareEdit = (event) => {
    setHardwareCost(event.target.value);
  };
  const handleConnectionEdit = (event) => {
    setConnectionCost(event.target.value);
  };
  const handleOtherEdit = (event) => {
    setOtherExpenses(event.target.value);
  };
  const handleDeveloperEdit = (event) => {
    setDeveloperCost(event.target.value);
  };
  const handleLicenseEdit = (event) => {
    setLicenseCost(event.target.value);
  };

  const handleEdit = async (projectId) => {
    const editdata = {};
    if (selectionProcessCost) editdata.SelectionProcessCost = selectionProcessCost;
    if (licenseCost) editdata.LicenseCost = licenseCost;
    if (serversCost) editdata.ServersCost = serversCost;
    if (hardwareCost) editdata.HardwareCost = hardwareCost;
    if (connectionCost) editdata.ConnectionCost = connectionCost;
    if (developerCost) editdata.DeveloperCost = developerCost;
    if (otherExpenses) editdata.OtherExpenses = otherExpenses;
    if (date) editdata.Date = date;

    const url = `http://localhost:5228/api/Budget/Projects/${projectId}/register`;
    axios.put(url, editdata)
      .then((result) => {
        alert("Data edited");
        window.location.reload();
      })
      .catch((error) => {
        if (error.response) {
          console.error("Request made, but server responded with error:");
          console.error("Status Code:", error.response.status);
          console.error("Response Data:", error.response.data);
          console.error("Response Headers:", error.response.headers);
        } else if (error.request) {
          console.error("Request made, but no response received:", error.request);
        } else {
          console.error("Error setting up the request:", error.message);
        }
        alert("An error occurred while processing the request. Please check the console for details.");
      });
  }

  return (
    <div>
      <button type="button" className="btn btn-secondary" onClick={handleClickOpen} style={{ width: '80px', margin: '10px', backgroundColor: '#20C997' }}>Edit</button>
      <div className="budgetedit" >
        <Dialog open={open} onClose={handleClose} maxWidth='100' className='budgeteditform'>
          <DialogTitle className='budgetedit'><b>Edit Budget</b></DialogTitle>
          <DialogContent>
            <div className="container">
              {budgetData.map((data, index) => (
                <React.Fragment key={index}>
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th scope="col">Selection Process Cost</th>
                        <th scope="col">License Cost</th>
                        <th scope="col">Server Cost</th>
                        <th scope="col">Hardware Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><input type="text" className="form-control" onChange={handleSelectionEdit} placeholder={data.selectionprocessCost}/></td>
                        <td><input type="text" className="form-control" onChange={handleLicenseEdit} placeholder={data.licenseCost}/></td>
                        <td><input type="text" className="form-control" onChange={handleServerEdit} placeholder={data.serversCost}/></td>
                        <td><input type="text" className="form-control" onChange={handleHardwareEdit} placeholder={data.hardwareCost}/></td>
                      </tr>
                    </tbody>
                    <thead>
                      <tr>
                        <th scope="col">Connection Cost</th>
                        <th scope="col">Developer Cost</th>
                        <th scope="col">Other Expenses</th>
                        <th scope="col">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><input type="text" className="form-control" onChange={handleConnectionEdit} placeholder={data.connectionCost}/></td>
                        <td><input type="text" className="form-control" onChange={handleDeveloperEdit} placeholder={data.developerCost}/></td>
                        <td><input type="text" className="form-control" onChange={handleOtherEdit} placeholder={data.otherExpenses}/></td>
                        <td><input type="date" className="form-control" onChange={handleDateEdit} placeholder={data.date}/></td>
                      </tr>
                    </tbody>
                  </table>
                </React.Fragment>
              ))}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={() => handleEdit(projectId)}>Edit</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Budgetedit;
