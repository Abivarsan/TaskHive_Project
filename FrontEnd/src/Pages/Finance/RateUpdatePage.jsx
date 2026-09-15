import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import './RateUpdateStyles.css'

export default function PopupForm() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [rate, setRate] = useState(null);
  const [currentRate, setCurrentRate] = useState({ currentRate: 0 });
  const [error, setError] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (!selectedDate && !rate) {
      setError('Date and Rate fields are required');
      return;
    }
    if (!selectedDate) {
      setError('Date field is required');
      return;
    }
    if (!rate) {
      setError('Rate field is required');
      return;
    }
    if (rate < 0) {
      setError('Invalid rate');
      return;
    }
    if (isNaN(parseFloat(rate))) {
      setError('Rate must be a number');
      return;
    }
    setError('');
    const ratedata = {
      CurrentRate: rate,
      UpdatedDate: selectedDate
    };
    const url = 'http://localhost:5228/api/DeveloperRate/register';
    axios.post(url, ratedata)
      .then((result) => {
        alert("Data inserted");
        window.location.reload(); 
      })
      .catch((error) => {
        alert(error);
      });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5228/api/DeveloperRate/register');
        setCurrentRate(response.data);  
        console.log(currentRate);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(); 
  }, []);

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <Button onClick={handleClickOpen} style={{ backgroundColor: '#20C997', color: 'white' }}><b>Developer rate</b></Button>
      <div className="developerrate">
        <Dialog open={open} onClose={handleClose}>
          <div className="rate">
            <DialogTitle className='Rateheader'>Hourly Rate</DialogTitle>
            <DialogContent>
              {error && <div style={{ color: 'red' }}>{error}</div>}
              <TextField
                autoFocus
                margin="dense"
                id="last_updated"
                type="date"
                fullWidth
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                inputProps={{
                  max: getTodayDate(), // Set the max attribute to today's date
                  style: {
                    height: '30px',
                    paddingTop: '0px',
                    paddingBottom: '0px',
                  },
                }}
                error={selectedDate > getTodayDate()}
                helperText={selectedDate > getTodayDate() ? 'Cannot select a future date.' : 'Looks good!'}
              />
              <TextField
                margin="dense"
                id="current_rate"
                label="Current Rate"
                type="number"
                fullWidth
                value={currentRate ? currentRate.currentRate : ''}
              />
              <TextField
                margin="dense"
                id="newrate"
                label="New Rate"
                type="number"
                fullWidth
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </DialogContent>
            <div className="actionbutton">
              <DialogActions>
                <Button onClick={handleClose} className="dialog-action-button">Close</Button>
                <Button onClick={handleSubmit} className="dialog-action-button">Update</Button>
              </DialogActions>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}
