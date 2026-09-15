import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axios from 'axios';


export default function PopupForm() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleSubmit = () => {
    // You can handle form submission here
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Age:", age);
    setOpen(false);
  };
  

  return (
    <div>
      
      
      <div className="developer_rate">
      <Dialog open={open} onClose={handleClose}  
      /*PaperProps={{
            style: {
              backgroundColor: 'rgba(0, 0, 255, 0.5)',
            },
          }}*/>
            <Button>Developer rate</Button>
        <DialogTitle className='Rateheader'>Hourly Rate</DialogTitle>
        <DialogContent>
          
          <TextField
            autoFocus
            margin="dense"
            id="last_updated"
            label="Last Updated Date"
            type="date"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            
            margin="dense"
            id="current_rate"
            label="Current Rate"
            type="number"
            fullWidth
            value={email}  //Need to change
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            id="newrate"
            label="New Rate"
            type="number"
            fullWidth
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
      </div>
      
    </div>
  );
}
