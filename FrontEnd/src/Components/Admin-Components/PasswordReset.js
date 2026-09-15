import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Alert,
  Typography,
  Grid,
  Container,
  InputAdornment,
  IconButton
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  LockReset
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import apiRequest from '../../Auth/ApiService';
import '../Admin-Components/styles/PasswordRest.css';

function PasswordReset() {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.newPassword.length < 10) {
      setAlertMessage('Password must be at least 10 characters long.');
      setAlertSeverity('error');
      setShowAlert(true);
      setLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setAlertMessage('Passwords do not match.');
      setAlertSeverity('error');
      setShowAlert(true);
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('accessToken');
    const decodedToken = jwtDecode(token);

    try {
      await apiRequest('http://localhost:5228/api/Account/password-reset', 'POST', {
        userName: decodedToken.UserName,
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });
      
      setAlertMessage('Password reset successfully!');
      setAlertSeverity('success');
      setShowAlert(true);
      
      setTimeout(() => {
        navigate("/");
      }, 2000);
      
    } catch (error) {
      setAlertMessage('Failed to reset password. Please check your old password and try again.');
      setAlertSeverity('error');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setFormData({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowAlert(false);
  };

  return (
    <Container maxWidth="sm" className="password-reset-container">
      <Paper elevation={3} className="password-reset-paper">
        <Box className="password-reset-header">
          <LockReset color="primary" className="header-icon" />
          <Typography variant="h4" component="h1" gutterBottom>
            Reset Password
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Enter your current password and set a new one
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} className="password-reset-form">
          <TextField
            fullWidth
            label="Old Password"
            type={showPassword.old ? 'text' : 'password'}
            value={formData.oldPassword}
            onChange={handleChange('oldPassword')}
            margin="normal"
            variant="outlined"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility('old')}
                    edge="end"
                  >
                    {showPassword.old ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="New Password"
                type={showPassword.new ? 'text' : 'password'}
                value={formData.newPassword}
                onChange={handleChange('newPassword')}
                margin="normal"
                variant="outlined"
                required
                error={formData.newPassword.length > 0 && formData.newPassword.length < 10}
                helperText={
                  formData.newPassword.length > 0 && formData.newPassword.length < 10
                    ? 'Password must be at least 10 characters'
                    : ''
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => togglePasswordVisibility('new')}
                        edge="end"
                      >
                        {showPassword.new ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Confirm Password"
                type={showPassword.confirm ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange('confirmPassword')}
                margin="normal"
                variant="outlined"
                required
                error={formData.confirmPassword.length > 0 && formData.newPassword !== formData.confirmPassword}
                helperText={
                  formData.confirmPassword.length > 0 && formData.newPassword !== formData.confirmPassword
                    ? 'Passwords do not match'
                    : ''
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => togglePasswordVisibility('confirm')}
                        edge="end"
                      >
                        {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>

          {showAlert && (
            <Alert 
              severity={alertSeverity} 
              className="alert-message"
              onClose={() => setShowAlert(false)}
            >
              {alertMessage}
            </Alert>
          )}

          <Box className="action-buttons">
            <Button
              variant="outlined"
              onClick={clearForm}
              disabled={loading}
              className="clear-button"
            >
              Clear
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              className="submit-button"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default PasswordReset;