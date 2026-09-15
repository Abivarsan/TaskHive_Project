// ClientCreationForm.js
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import apiRequest from '../../Auth/ApiService';
import emailjs from "emailjs-com";
import './styles/ClientCreationForm.css';

// Initialize EmailJS
emailjs.init('WcuGZ2ivU-n9OBxuF');

export default function ClientCreationForm() {
  // Form state
  const [formData, setFormData] = useState({
    clientName: '',
    userName: '',
    address: '',
    nic: '',
    mobileNumber: '',
    email: '',
    clientDescription: '',
    totalPayment: '',
    userCategory: 'CLIENT'
  });

  // Other state
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [randomPassword, setRandomPassword] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Check required fields
    const requiredFields = ['clientName', 'userName', 'address', 'nic', 'mobileNumber', 'email', 'clientDescription', 'totalPayment'];
    
    requiredFields.forEach(field => {
      if (!formData[field] || !formData[field].toString().trim()) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
        isValid = false;
      }
    });

    const nic = formData.nic.trim().toUpperCase();

    // Regex patterns
    const oldNicPattern = /^[0-9]{9}[VX]$/;   // 9 digits + V/X
    const newNicPattern = /^[0-9]{12}$/;      // 12 digits only

    if (!oldNicPattern.test(nic) && !newNicPattern.test(nic)) {
      errors.nic = 'Invalid Sri Lankan NIC. Use old format (123456789V) or new format (200012345678).';
      isValid = false;
    }

    // Validate email
    const emailPattern = /\S+@\S+\.\S+/;
    if (formData.email && !emailPattern.test(formData.email)) {
      errors.email = 'Email must be in valid format';
      isValid = false;
    }

    // Validate mobile number
    const mobilePattern = /^[0-9]{10}$/;
    if (formData.mobileNumber && !mobilePattern.test(formData.mobileNumber)) {
      errors.mobileNumber = 'Mobile number must be 10 digits';
      isValid = false;
    }

    // Validate total payment
    if (formData.totalPayment && (isNaN(formData.totalPayment) || parseFloat(formData.totalPayment) <= 0)) {
      errors.totalPayment = 'Total payment must be a valid positive number';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!validateForm()) {
      alert('Please fix all errors before submitting');
      return;
    }

    setLoading(true);

    const data = {
      ClientName: formData.clientName,
      UserName: formData.userName,
      Address: formData.address,
      NIC: formData.nic,
      ContactNumber: formData.mobileNumber,
      Email: formData.email,
      UserCategoryType: formData.userCategory,
      ClientDescription: formData.clientDescription,
      TotalPayment: parseFloat(formData.totalPayment),
    };

    try {
      console.log('Sending data:', data);
      const response = await apiRequest('http://localhost:5228/api/Admin/ClientRegister', 'POST', data);
      console.log('API Response:', response);

      const randomPassword = response;
      setRandomPassword(randomPassword);

      const userDetails = {
        UserName: data.UserName,
        Email: data.Email,
      };
      setUserDetails(userDetails);

      alert("Client registered successfully. Sending email with credentials...");
      await sendEmail(randomPassword, userDetails.UserName, userDetails.Email);
      clearForm();

    } catch (error) {
      console.error("Client registration failed:", error);
      alert("Failed to register client. User Email may already exists.");
    } finally {
      setLoading(false);
    }
  };

  // Send email function
  const sendEmail = async (password, userName, userEmail) => {
    const serviceID = 'service_42yhret';
    const templateID = 'template_qtrb6ll';
    const publicKey = 'WcuGZ2ivU-n9OBxuF';

    const templateParams = {
      user_name: userName,
      user_password: password,
      user_mail: userEmail
    };

    try {
      console.log('Sending email with:', serviceID, templateID, templateParams, publicKey);
      const response = await emailjs.send(serviceID, templateID, templateParams, publicKey);
      console.log("Email sent successfully!", response.status, response.text);
      alert("Email sent successfully!");
      navigate("/clientlist");
    } catch (error) {
      console.error("Email sending failed:", error);
      alert("Failed to send email. Please try again later.");
    }
  };

  // Clear form
  const clearForm = () => {
    setFormData({
      clientName: '',
      userName: '',
      address: '',
      nic: '',
      mobileNumber: '',
      email: '',
      clientDescription: '',
      totalPayment: '',
      userCategory: 'CLIENT'
    });
    setFormErrors({});
    setFormSubmitted(false);
  };

  return (
    <div className="client-creation-container">
      <div className="client-creation-card">
        <h2>Create New Client</h2>

        <form className="client-creation-form" onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          <div className="form-section">
            <h3 className="section-title">Personal Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Client Name</label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                  className={formErrors.clientName ? 'error' : ''}
                  placeholder="Enter client name"
                />
                {formErrors.clientName && <span className="error-message">{formErrors.clientName}</span>}
              </div>

              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={formData.userName}
                  onChange={(e) => handleInputChange('userName', e.target.value)}
                  className={formErrors.userName ? 'error' : ''}
                  placeholder="Enter username"
                />
                {formErrors.userName && <span className="error-message">{formErrors.userName}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>NIC</label>
                <input
                  type="text"
                  value={formData.nic}
                  onChange={(e) => handleInputChange('nic', e.target.value)}
                  className={formErrors.nic ? 'error' : ''}
                  placeholder="Enter 12-digit NIC number"
                  maxLength="12"
                />
                {formErrors.nic && <span className="error-message">{formErrors.nic}</span>}
              </div>

              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                  className={formErrors.mobileNumber ? 'error' : ''}
                  placeholder="Enter 10-digit mobile number"
                  maxLength="10"
                />
                {formErrors.mobileNumber && <span className="error-message">{formErrors.mobileNumber}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={formErrors.email ? 'error' : ''}
                placeholder="Enter email address"
              />
              {formErrors.email && <span className="error-message">{formErrors.email}</span>}
            </div>

            <div className="form-group">
              <label>Address</label>
              <textarea
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className={formErrors.address ? 'error' : ''}
                placeholder="Enter complete address"
                rows="3"
              />
              {formErrors.address && <span className="error-message">{formErrors.address}</span>}
            </div>
          </div>

          {/* Business Information Section */}
          <div className="form-section">
            <h3 className="section-title">Business Information</h3>
            
            <div className="form-group">
              <label>Client Description</label>
              <textarea
                value={formData.clientDescription}
                onChange={(e) => handleInputChange('clientDescription', e.target.value)}
                className={formErrors.clientDescription ? 'error' : ''}
                placeholder="Describe the client's business or requirements"
                rows="4"
              />
              {formErrors.clientDescription && <span className="error-message">{formErrors.clientDescription}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Total Payment</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.totalPayment}
                  onChange={(e) => handleInputChange('totalPayment', e.target.value)}
                  className={formErrors.totalPayment ? 'error' : ''}
                  placeholder="Enter total payment amount"
                />
                {formErrors.totalPayment && <span className="error-message">{formErrors.totalPayment}</span>}
              </div>

              <div className="form-group">
                <label>User Category</label>
                <select
                  value={formData.userCategory}
                  onChange={(e) => handleInputChange('userCategory', e.target.value)}
                  disabled
                >
                  <option value="CLIENT">CLIENT</option>
                </select>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button 
              type="button" 
              className="btn-secondary"
              onClick={clearForm}
              disabled={loading}
            >
              Clear Form
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Creating Client...' : 'Create Client'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}