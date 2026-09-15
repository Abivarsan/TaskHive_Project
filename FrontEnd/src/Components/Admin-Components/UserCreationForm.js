// UserCreationForm.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { storage } from '../../Config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import apiRequest from '../../Auth/ApiService';
import axios from 'axios';
import emailjs from "emailjs-com";
import './styles/UserCreationForm.css';

emailjs.init('WcuGZ2ivU-n9OBxuF');

export default function UserCreationForm() {
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    address: '',
    nic: '',
    dob: '',
    gender: '',
    mobileNumber: '',
    email: '',
    userCategory: '',
    jobRole: ''
  });

  // Image and upload state
  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  // Other state
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [randomPassword, setRandomPassword] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  // Dropdown data
  const [usersCategories, setUsersCategories] = useState([]);
  const [jobRoles, setJobRoles] = useState([]);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // Handle image selection and preview
  const handleImageChange = (e) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0]; // ✅ Correct

    // Validate file type
    if (!file.type || !file.type.startsWith("image/")) {
      alert("Please select an image file");
      e.target.value = "";
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      e.target.value = "";
      return;
    }

    setImageFile(file);

    // Preview
    const reader = new FileReader();
    reader.onload = (ev) => setImageSrc(ev.target.result);
    reader.readAsDataURL(file);
  }
};


  // Upload image to Firebase Storage
  const uploadImageToFirebase = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(null);
        return;
      }

      setIsUploading(true);
      setUploadProgress(0);

      // Create a unique filename
      const fileName = `users/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, fileName);
      
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Track upload progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(Math.round(progress));
        },
        (error) => {
          console.error('Upload failed:', error);
          setIsUploading(false);
          reject(error);
        },
        async () => {
          // Upload completed successfully
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setIsUploading(false);
            setUploadProgress(100);
            resolve(downloadURL);
          } catch (error) {
            console.error('Error getting download URL:', error);
            setIsUploading(false);
            reject(error);
          }
        }
      );
    });
  };

  // Fetch user categories and job roles
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, jobRolesRes] = await Promise.all([
          axios.get('http://localhost:5228/api/User/UserCategories'),
          axios.get('http://localhost:5228/api/User/jobRoles')
        ]);
        setUsersCategories(categoriesRes.data);
        setJobRoles(jobRolesRes.data);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };
    fetchData();
  }, []);

  // Form validation
  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Check required fields
    Object.keys(formData).forEach(key => {
      if (!formData[key].trim()) {
        errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
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
    if (!emailPattern.test(formData.email)) {
      errors.email = 'Email must be in valid format';
      isValid = false;
    }

    // Check if image is selected
    if (!imageSrc) {
      errors.image = 'Profile image is required';
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

    try {
      // Upload image to Firebase first
      let imageUrl = null;
      if (imageFile) {
        imageUrl = await uploadImageToFirebase(imageFile);
      }

      // Prepare data for API
      const submitData = {
        UserName: formData.userName,
        FirstName: formData.firstName,
        LastName: formData.lastName,
        Address: formData.address,
        NIC: formData.nic,
        DOB: formData.dob,
        Gender: formData.gender,
        ContactNumber: formData.mobileNumber,
        Email: formData.email,
        ProfileImageUrl: imageUrl, // Firebase URL instead of file
        UserCategoryType: formData.userCategory,
        JobRoleType: formData.jobRole
      };

      console.log('Sending data:', submitData);
      
      const response = await apiRequest('http://localhost:5228/api/Admin/UserRegister', 'POST', submitData);
      
      const randomPassword = response;
      setRandomPassword(randomPassword);
      
      const userDetails = {
        UserName: formData.userName,
        Email: formData.email,
      };
      setUserDetails(userDetails);

      alert("User registered successfully. Sending email with credentials...");
      await sendEmail(randomPassword, userDetails.UserName, userDetails.Email);
      clearForm();

    } catch (error) {
      console.error("User registration failed:", error);
      alert("Failed to register user. User email may already exist.");
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
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      alert("Email sent successfully!");
      navigate("/userCreation");
    } catch (error) {
      console.error("Email sending failed:", error);
      alert("Failed to send email. Please try again later.");
    }
  };

  // Clear form
  const clearForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      userName: '',
      address: '',
      nic: '',
      dob: '',
      gender: '',
      mobileNumber: '',
      email: '',
      userCategory: '',
      jobRole: ''
    });
    setImageFile(null);
    setImageSrc('');
    setFormErrors({});
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <div className="user-creation-container">
      <div className="user-creation-card">
        <h2>Create New User</h2>
        
        {formErrors.required && (
          <div className="alert alert-danger">
            <strong>Error!</strong> All fields are required.
          </div>
        )}

        <form onSubmit={handleSubmit} className="user-creation-form">
          {/* Personal Information Section */}
          <div className="form-section">
            <h3 className="section-title">Personal Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={formErrors.firstName ? 'error' : ''}
                  placeholder="Enter first name"
                />
                {formErrors.firstName && <span className="error-message">{formErrors.firstName}</span>}
              </div>

              <div className="form-group">
                <label>Last Name *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={formErrors.lastName ? 'error' : ''}
                  placeholder="Enter last name"
                />
                {formErrors.lastName && <span className="error-message">{formErrors.lastName}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Username *</label>
                <input
                  type="text"
                  value={formData.userName}
                  onChange={(e) => handleInputChange('userName', e.target.value)}
                  className={formErrors.userName ? 'error' : ''}
                  placeholder="Enter username"
                />
                {formErrors.userName && <span className="error-message">{formErrors.userName}</span>}
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={formErrors.email ? 'error' : ''}
                  placeholder="Enter email address"
                />
                {formErrors.email && <span className="error-message">{formErrors.email}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>NIC *</label>
                <input
                  type="text"
                  value={formData.nic}
                  onChange={(e) => handleInputChange('nic', e.target.value)}
                  className={formErrors.nic ? 'error' : ''}
                  placeholder="Enter NIC number here"
                  maxLength="12"
                />
                {formErrors.nic && <span className="error-message">{formErrors.nic}</span>}
              </div>

              <div className="form-group">
                <label>Date of Birth *</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => handleInputChange('dob', e.target.value)}
                  className={formErrors.dob ? 'error' : ''}
                />
                {formErrors.dob && <span className="error-message">{formErrors.dob}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Gender *</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className={formErrors.gender ? 'error' : ''}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {formErrors.gender && <span className="error-message">{formErrors.gender}</span>}
              </div>

              <div className="form-group">
                <label>Mobile Number *</label>
                <input
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                  className={formErrors.mobileNumber ? 'error' : ''}
                  placeholder="Enter mobile number"
                />
                {formErrors.mobileNumber && <span className="error-message">{formErrors.mobileNumber}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Address *</label>
              <textarea
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className={formErrors.address ? 'error' : ''}
                placeholder="Enter full address"
                rows="3"
              />
              {formErrors.address && <span className="error-message">{formErrors.address}</span>}
            </div>
          </div>

          {/* Role Assignment Section */}
          <div className="form-section">
            <h3 className="section-title">Role Assignment</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>User Category *</label>
                <select
                  value={formData.userCategory}
                  onChange={(e) => handleInputChange('userCategory', e.target.value)}
                  className={formErrors.userCategory ? 'error' : ''}
                >
                  <option value="">Select User Category</option>
                  {usersCategories.map((category) => (
                    <option key={category.userCategoryId} value={category.userCategoryType}>
                      {category.userCategoryType}
                    </option>
                  ))}
                </select>
                {formErrors.userCategory && <span className="error-message">{formErrors.userCategory}</span>}
              </div>

              <div className="form-group">
                <label>Job Role *</label>
                <select
                  value={formData.jobRole}
                  onChange={(e) => handleInputChange('jobRole', e.target.value)}
                  className={formErrors.jobRole ? 'error' : ''}
                >
                  <option value="">Select Job Role</option>
                  {jobRoles.map((role) => (
                    <option key={role.jobRoleId} value={role.jobRoleType}>
                      {role.jobRoleType}
                    </option>
                  ))}
                </select>
                {formErrors.jobRole && <span className="error-message">{formErrors.jobRole}</span>}
              </div>
            </div>
          </div>

          {/* Profile Image Section */}
          <div className="form-section">
            <h3 className="section-title">Profile Image</h3>
            
            <div className="image-upload-container">
              <div className="form-group">
                <label>Profile Image *</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className={formErrors.image ? 'error' : ''}
                />
                {formErrors.image && <span className="error-message">{formErrors.image}</span>}
              </div>

              {isUploading && (
                <div className="upload-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{uploadProgress}% uploaded</span>
                </div>
              )}

              {imageSrc && (
                <div className="image-preview">
                  <img 
                    src={imageSrc} 
                    alt="Profile Preview" 
                    className="profile-image-preview"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={clearForm}
              disabled={loading || isUploading}
            >
              Reset
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading || isUploading}
            >
              {loading ? 'Creating User...' : 'Create User'}
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
