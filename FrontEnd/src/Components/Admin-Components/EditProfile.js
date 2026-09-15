// EditProfile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../Config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getLoggedUserId } from '../../Auth/ApiService';
import apiRequest from '../../Auth/ApiService';
import './styles/EditProfileComponent.css';

const EditProfileComponent = () => {
  const navigate = useNavigate();
  
  let userId;
  try {
    userId = getLoggedUserId();
  } catch (error) {
    console.error('Error getting logged user ID:', error);
  }

  // State management
  const [userData, setUserData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    address: '',
    gender: '',
    nic: '',
    dob: '',
    userCategoryType: '',
    jobRoleType: '',
    profileImageUrl: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Image upload states
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Allowed image types
  const allowedImageTypes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/gif',
    'image/webp',
    'image/bmp',
    'image/svg+xml'
  ];

  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        console.error('No user ID available');
        setErrorMessage('No user ID available');
        setLoading(false);
        return;
      }

      try {
        const response = await apiRequest(`http://localhost:5228/api/Admin/${userId}`);
        console.log('Fetched User Data:', response);

        // Format dob if needed
        const formattedDob = response.dob ? new Date(response.dob).toISOString().split('T')[0] : '';
        
        setUserData({
          ...response,
          dob: formattedDob,
          profileImageUrl: response.profileImageName || response.profileImageUrl || ''
        });
        
        // Set image preview if user has existing profile image
        if (response.profileImageName || response.profileImageUrl) {
          setImagePreview(response.profileImageName || response.profileImageUrl);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
        setErrorMessage('Error fetching user data');
      }
    };

    fetchUserData();
  }, [userId]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  // Validate file type and extension
  const isValidImageFile = (file) => {
    // Check MIME type
    if (!allowedImageTypes.includes(file.type)) {
      return false;
    }
    
    // Check file extension as additional validation
    const fileName = file.name.toLowerCase();
    const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));
    
    return hasValidExtension;
  };

  // Format file size for display
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Handle image selection and preview - FIXED VERSION
  const handleImageChange = (e) => {
    console.log('File input changed'); // Debug log
    
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]; // FIX: Get the first file from FileList
      
      console.log('Selected file:', {
        name: file.name,
        type: file.type,
        size: formatFileSize(file.size)
      }); // Debug log
      
      // Validate file exists and has type
      if (!file || !file.type) {
        alert('Invalid file selected. Please choose a valid image file.');
        e.target.value = ''; // Clear the input
        return;
      }
      
      // Validate file type
      if (!isValidImageFile(file)) {
        alert(`Please select a valid image file. Allowed types: ${allowedExtensions.join(', ')}`);
        e.target.value = ''; // Clear the input
        return;
      }
      
      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        alert(`Image size (${formatFileSize(file.size)}) exceeds the 5MB limit. Please choose a smaller image.`);
        e.target.value = ''; // Clear the input
        return;
      }
      
      console.log('File validation passed'); // Debug log
      
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (x) => {
        setImagePreview(x.target.result);
        console.log('Image preview created'); // Debug log
      };
      reader.onerror = (error) => {
        console.error('FileReader error:', error);
        alert('Error reading the selected file. Please try again.');
      };
      reader.readAsDataURL(file);
    } else {
      console.log('No file selected'); // Debug log
    }
  };

  // Upload image to Firebase Storage with organized folder structure
  const uploadImageToFirebase = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(null);
        return;
      }

      setIsUploading(true);
      setUploadProgress(0);

      // Create organized folder structure: profile-images/userId/timestamp_filename
      const timestamp = Date.now();
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_'); // Clean filename
      const fileName = `profile-images/${userId}/${timestamp}_${cleanFileName}`;
      
      console.log('Uploading to Firebase path:', fileName); // Debug log
      
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Track upload progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(Math.round(progress));
          console.log('Upload progress:', Math.round(progress) + '%'); // Debug log
        },
        (error) => {
          console.error('Upload failed:', error);
          setIsUploading(false);
          alert('Upload failed. Please try again.');
          reject(error);
        },
        async () => {
          // Upload completed successfully
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('Upload successful. Download URL:', downloadURL); // Debug log
            setIsUploading(false);
            setUploadProgress(100);
            resolve(downloadURL);
          } catch (error) {
            console.error('Error getting download URL:', error);
            setIsUploading(false);
            alert('Error getting image URL. Please try again.');
            reject(error);
          }
        }
      );
    });
  };

  // Handle save changes
  const handleSaveChanges = async () => {
    setSaving(true);
    setErrorMessage(null);

    try {
      // Upload new image to Firebase if selected
      let imageUrl = userData.profileImageUrl;
      if (imageFile) {
        console.log('Uploading new image...'); // Debug log
        imageUrl = await uploadImageToFirebase(imageFile);
        console.log('New image URL:', imageUrl); // Debug log
      }

      // Prepare data for API
      const updateData = {
        email: userData.email,
        contactNumber: userData.contactNumber,
        address: userData.address,
        profileImageUrl: imageUrl // Firebase URL
      };

      console.log('Updating with data:', updateData);

      await apiRequest(`http://localhost:5228/api/User/update/${userId}`, 'PUT', updateData);
      
      alert('Profile updated successfully!');
      setIsEditing(false);
      setImageFile(null);
      
      // Update userData with new image URL
      setUserData(prev => ({ ...prev, profileImageUrl: imageUrl }));
      setImagePreview(imageUrl);
      
    } catch (error) {
      setErrorMessage('Error updating profile. Please try again.');
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    setErrorMessage(null);
    if (!isEditing) {
      setImageFile(null);
      setImagePreview(userData.profileImageUrl);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
    setImageFile(null);
    setImagePreview(userData.profileImageUrl);
    setErrorMessage(null);
  };

  if (loading) {
    return (
      <div className="edit-profile-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-profile-container">
      <div className="profile-header">
        <h2>Edit Profile</h2>
        <p>Update your personal information</p>
      </div>

      {errorMessage && (
        <div className="error-message">
          <strong>Error:</strong> {errorMessage}
        </div>
      )}

      <div className="profile-form-card">
        {/* Profile Image Section */}
        <div className="profile-image-section">
          <div className="image-container">
            {imagePreview ? (
              <img 
                src={imagePreview} 
                alt="Profile" 
                className="profile-image-preview"
              />
            ) : (
              <div className="profile-image-placeholder">
                <span>{userData.firstName?.charAt(0)}{userData.lastName?.charAt(0)}</span>
              </div>
            )}
          </div>

          {isEditing && (
            <div className="image-upload-controls">
              <input
                type="file"
                accept={allowedExtensions.join(',')}
                onChange={handleImageChange}
                className="file-input"
                id="imageUpload"
              />
              <label htmlFor="imageUpload" className="upload-button">
                Choose New Image
              </label>
              
              <div className="file-requirements">
                <small>
                  <strong>Requirements:</strong><br/>
                  • File types: {allowedExtensions.join(', ')}<br/>
                  • Maximum size: 5MB<br/>
                  • Recommended: Square images for best results
                </small>
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
            </div>
          )}
        </div>

        {/* Rest of your form components remain the same */}
        <form className="profile-form">
          <div className="form-section">
            <h3>Personal Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="userName"
                  value={userData.userName}
                  disabled
                  className="readonly-input"
                />
              </div>

              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  disabled
                  className="readonly-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  disabled
                  className="readonly-input"
                />
              </div>

              <div className="form-group">
                <label>NIC</label>
                <input
                  type="text"
                  name="nic"
                  value={userData.nic}
                  disabled
                  className="readonly-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={userData.dob}
                  disabled
                  className="readonly-input"
                />
              </div>

              <div className="form-group">
                <label>Gender</label>
                <input
                  type="text"
                  name="gender"
                  value={userData.gender}
                  disabled
                  className="readonly-input"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Contact Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={isEditing ? '' : 'readonly-input'}
                  required
                />
              </div>

              <div className="form-group">
                <label>Contact Number *</label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={userData.contactNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={isEditing ? '' : 'readonly-input'}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Address *</label>
              <textarea
                name="address"
                value={userData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={isEditing ? '' : 'readonly-input'}
                rows="3"
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Role Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>User Category</label>
                <input
                  type="text"
                  name="userCategoryType"
                  value={userData.userCategoryType}
                  disabled
                  className="readonly-input"
                />
              </div>

              <div className="form-group">
                <label>Job Role</label>
                <input
                  type="text"
                  name="jobRoleType"
                  value={userData.jobRoleType}
                  disabled
                  className="readonly-input"
                />
              </div>
            </div>
          </div>
        </form>

        {/* Action Buttons */}
        <div className="form-actions">
          {!isEditing ? (
            <button 
              type="button" 
              className="btn-primary"
              onClick={toggleEditMode}
            >
              Edit Profile
            </button>
          ) : (
            <div className="edit-actions">
              <button 
                type="button" 
                className="btn-secondary"
                onClick={handleCancel}
                disabled={saving || isUploading}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="btn-primary"
                onClick={handleSaveChanges}
                disabled={saving || isUploading}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfileComponent;
