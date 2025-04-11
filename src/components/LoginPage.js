import React, { useState } from 'react';
import '../css/LoginPage.css';
import LoginImage from '../Assets/LoginBgImg.png';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import GoogleIcon from '../Assets/Google.png';
import MicrosoftIcon from '../Assets/Microsoft.png';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: 'ranjithkumar@workhive.com',
    password: 'ranjithkumar@workhive.com',
    confirmPassword: 'ranjithkumar@workhive.com'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (error) setError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(signUp){
      if(formData.password !== formData.confirmPassword){
        setError("Oops! Passwords Don't Match");
        return;
      }
      navigate(`/validate-otp/${formData.email}-signup`);

    }
    else if(formData.email === 'ranjithkumar@workhive.com' && formData.password === 'ranjithkumar@workhive.com'){
      localStorage.setItem('user', JSON.stringify({
        email: formData.email,
        name: 'Ranjith Kumar',
        photoURL: 'https://via.placeholder.com/150'
      }));
      navigate(`/dashboard`);
    }
    else{
      setError("Invalid email or password");
    }
    
  };

  const handleGoogleSignIn = async () => {
  
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Handle successful sign-in
      const user = result.user;
      console.log("Google Sign-in successful:", user);
      
      // Store user data if needed
      localStorage.setItem('user', JSON.stringify({
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL
      }));
      
      // Navigate to dashboard or home page
      navigate('/dashboard');
    } catch (error) {
      console.error("Google Sign-in error:", error);
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
        <h2 >Sign In</h2>
        <span className='text-muted'>Manage your workspace seamlessly. Sign in to continue.</span>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className='text-muted'>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="navinash@workhive.com"
              required
              style={{width:"96%"}}
            />
          </div>
          <div className="form-group">
            <label className='text-muted'>Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                style={{width:"89%"}}
              />
              <span 
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {!showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
          </div>
         {signUp && <div className="form-group">
            <label>Confirm Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Enter password"
                required
                style={{width:"89%"}}
              />
              <span 
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {!showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
          </div>}
          <div className="remember-forgot" style={{display:"flex", justifyContent:"space-between"}}>
            <div >
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" className='text-muted'>Remember me</label>
            </div>
            <div 
              className="forgot-password"
              onClick={() => navigate('/forgot-password')}
              style={{cursor: 'pointer'}}
            >
              Forgot Password?
            </div>
          </div>
          <button type="submit" style={{marginBottom:"10px"}}>Sign {signUp ? "Up" : "In"}</button>
          {error && <p style={{color:"red"}}>{error}</p>}

          <span style={{textAlign:"center" , marginTop:"3px"}}>Or</span>
          <div className="social-signin">
            <button 
              onClick={handleGoogleSignIn}
              style={{
                backgroundColor: "#1D1E26",
                border: "2px solid #30303D",
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "10px 20px",
                width: "100%"
              }} 
              className="google-signin"
              type="button"
            >
              <img src={GoogleIcon} alt="Google" style={{ width: "20px", height: "20px" }} />
              <span className='text-muted'>Sign In with Google</span>
            </button>
            <button 
              onClick={handleGoogleSignIn}
              style={{
                backgroundColor: "#1D1E26",
                border: "2px solid #30303D",
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "10px 20px",
                width: "100%"
              }} 
              className="google-signin"
              type="button"
            >
              <img src={MicrosoftIcon} alt="Microsoft" style={{ width: "20px", height: "20px" }} />
              <span className='text-muted'>Sign In with Microsoft</span>
            </button>
          
          </div>
          <p style={{textAlign:"center"}}> Don't have an account? <span href="#" style={{cursor:"pointer"}} className='signup' onClick={() => setSignUp(true)}>Sign Up</span></p>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;