import React, { useState } from 'react';
import '../css/LoginPage.css';
import '../css/popup.css';
import LoginImage from '../Assets/LoginBgImg.png';
import SuccessIcon from '../Assets/SuccessMail.png';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (email) => {
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) {
      validateEmail(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate(`/validate-otp/${email}-forgot`);
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={LoginImage} alt="Team" />
        <div className="welcome-text">
          <h1 style={{marginLeft:"2rem"}}>Welcome to WORKHIVE!</h1>
          <ul>
            <li>Employee Management: View detailed profiles, track performance, and manage attendance.</li>
            <li>Performance Insights: Analyze team goals, progress, and achievements.</li>
            <li>Attendance & Leaves: Track attendance patterns and manage leave requests effortlessly.</li>
          </ul>
        </div>
      </div>
      <div className="login-form">
        <h2>Forgot Your Password?</h2>
        <span className='text-muted'>Don't worry! Enter your email address, and we'll send you a link to reset it.</span>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{width:"95%"}}>
            <label className='text-muted'>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="navinash@workhive.com"
              className={emailError ? 'error-input' : ''}
            />
            {emailError && <div className="error-message" style={{color:"red" , marginTop:"5px"}}>{emailError}</div>}
          </div>
          <button type="submit" className='text-muted'>Submit</button>
        </form>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-icon">
              <span role="img" aria-label="email"><img src={SuccessIcon} alt="Success" /></span>
            </div>
            <h3>Link Sent Successfully!</h3>
            <p>Check your inbox! We've sent you an email with instructions <br /> to reset your password.</p>
            <button onClick={handleClosePopup}>Okay</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;