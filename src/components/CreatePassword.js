import React, { useState } from 'react';
import '../css/LoginPage.css';
import '../css/popup.css';
import '../css/createpassword.css';
import LoginImage from '../Assets/LoginBgImg.png';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import SuccessIcon from '../Assets/Tick.png';
import { useNavigate } from 'react-router-dom';     

const CreatePassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Clear error when user starts typing again
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Oops! Passwords Don't Match");
      return;
    }
    // Continue with password update logic here
    setShowPopup(true);
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/dashboard');
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
        <h2>Create New Password</h2>
        <span className='text-muted'>Your new password must be different from previous used passwords.</span>
        <form onSubmit={handleSubmit}>
          <div className="form-group"style={{width:"90%"}}>
            <label className='text-muted'>Password</label>
            <div className="password-input-container text-muted">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
              <span 
                className="password-toggle"
                onClick={() => togglePasswordVisibility('password')}
              >
                {!showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
          </div>
          <div className="form-group"style={{width:"90%"}}>
            <label className='text-muted'>Confirm Password</label>
            <div className="password-input-container text-muted">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
              />
              <span 
                className="password-toggle"
                onClick={() => togglePasswordVisibility('confirm')}
              >
                {!showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
            {error && <div className="password-error">{error}</div>}
          </div>
          <button type="submit" className='text-muted'>Reset Password</button>
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

export default CreatePassword;