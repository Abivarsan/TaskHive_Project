import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axios from 'axios';

export default function InvoiceEdit(props) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');

  const { transacId, discription , tvalue } = props;
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDescriptionEdit = (event) => {
    setDescription(event.target.value);
  };

  const handleDateEdit = (event) => {
    setDate(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleValueEdit = (event) => {
    setValue(event.target.value);
  };

  const handleEdit = async (transacId) => {
    const editData = {};
    if (value) editData.Value = value;
    if (type) editData.Type = type;
    if (description) editData.Description = description;
    if (date) editData.Date = date;

    console.log(editData);
    const url = `http://localhost:5228/api/Transaction/Transaction/${transacId}/register?value=${value}&type=${type}&description=${description}`;
    axios.put(url, editData)
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
  };
  

  return (
    <div>
      <Button onClick={handleClickOpen} style={{ backgroundColor: '#20C997', color: 'white' }}>Edit</Button>
      <div className="invoiceedit">
        <Dialog open={open} onClose={handleClose} maxWidth='100'>
          <DialogTitle className='invoiceedit'><b>Edit Transaction</b></DialogTitle>
          <DialogContent>
            <div className="container"> 
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th scope="col">Description</th>
                        <th scope="col">Date</th>
                        <th scope="col">Type</th>
                        <th scope="col">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><input type="text" className="form-control" onChange={handleDescriptionEdit} placeholder={discription} /></td>
                        <td><input type="date" className="form-control" onChange={handleDateEdit} /></td>
                        <td>
                          <select id="SelectProject" className="form-select" value={type} onChange={handleTypeChange}>
                            <option value="" >Select Type...</option>
                            <option value="Income">Income</option>
                            <option value="Expense">Expense</option>
                          </select>
                        </td>
                        <td><input type="text" className="form-control" onChange={handleValueEdit} placeholder={tvalue}  /></td>
                      </tr>
                    </tbody>
                  </table>
             
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={() => handleEdit(transacId)}>Edit</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
