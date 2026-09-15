import React, { useState } from 'react';
import './Styles/LoginForm.css';
import { FaEnvelope, FaUser } from "react-icons/fa";
import apiRequest from '../../Auth/ApiService';
import emailjs from "emailjs-com";
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [userEmail, setEmail] = useState('');
  const [userName, setUsername] = useState('');
  const [randomPassword, setRandomPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      UserName: userName,
      Email: userEmail // Ensure Email is sent to the API if needed
    };

    console.log("Email:", userEmail);
    console.log("UserName:", userName);

    try {
      const response = await apiRequest('http://localhost:5228/api/Account/password-forgot', 'POST', data);
      console.log('API Response:', response);

      const randomPassword = response; // Assuming response contains the random password
      setRandomPassword(randomPassword);

      alert("A random created password sent to your mail.");
      
      // Call sendEmail after successful registration
      sendEmail(randomPassword, userName, userEmail);
      clearForm();
    } catch (error) {
      console.error("Password reset failed:", error);
      alert("Failed to reset password. Please try again later.");
    }
  };

  const sendEmail = (password, userName, userEmail) => {
    const serviceID = 'service_gl08djb';
    const templateID = 'template_kb7lvca';
    const publicKey = 'z40CrSJ1g5HnvpJt8';

    const templateParams = {
      user_name: userName,
      user_password: password,
      user_mail: userEmail
    };

    console.log('Sending email with:', serviceID, templateID, templateParams, publicKey);
    emailjs
      .send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        alert("Email sent successfully!");
        navigate("/loginForm");
      })
      .catch((error) => {
        console.error("FAILED...", error);
        alert("Failed to send email. Please try again later.");
      });
  };

  const clearForm = () => {
    setEmail('');
    setUsername('');
  };

  return (
    <div className='wrapper1'>
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="email"
              placeholder="Enter email ID"
              value={userEmail}
              onChange={handleEmailChange}
              required
            />
            <FaEnvelope className='icon' />
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder="Enter user name"
              value={userName}
              onChange={handleUserNameChange}
              required
            />
            <FaUser className='icon' />
          </div>
          <button type="submit">Submit</button>

          <div className="remember-forgot">
            <div className="centered-text">
              <a href="/loginForm">_________Login__________</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
