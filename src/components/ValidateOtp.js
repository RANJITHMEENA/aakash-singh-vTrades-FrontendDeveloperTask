import React, { useState } from 'react';
import '../css/LoginPage.css';  
import '../css/popup.css';
import LoginImage from '../Assets/LoginBgImg.png';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ValidateOTP = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [isSignUp, setIsSignUp] = useState(id.includes('signup'));

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    setError(""); // Clear any existing error

    // Focus next input
    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if all digits are entered
    if (otp.some(digit => digit === "")) {
      setError("Please enter all digits of the OTP");
      return;
    }

    // If all digits are entered, navigate to create password
    if(!isSignUp){
      navigate('/create-password');
    }
    else{
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = e.target.previousSibling;
      if (prevInput) {
        prevInput.focus();
      }
    }
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
        <h2>Enter OTP</h2>
        <span className='text-muted'>Enter the OTP that we have sent to your email address <br /> {id.split('-')[0]}.</span>
        <form onSubmit={handleSubmit}>
          <div className="otp-inputs">
            {otp.map((data, index) => (
              <input
                type="text"
                name="otp"
                maxLength="1"
                key={index}
                value={data}
                onChange={e => handleOtpChange(e.target, index)}
                onKeyDown={e => handleKeyDown(e, index)}
                onFocus={e => e.target.select()}
              />
            ))}
          </div>
          {error && <div className="error-message" style={{color:"red"}}>{error}</div>}
          <button type="submit" className="continue-btn text-muted">Continue</button>
          <div className="otp-actions">
            <a href="#" className="resend-otp text-muted" style={{cursor:"pointer" , marginTop:"2rem"}}>Resend OTP ?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ValidateOTP;