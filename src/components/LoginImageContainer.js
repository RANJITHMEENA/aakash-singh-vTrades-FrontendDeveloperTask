import LoginImage from '../Assets/LoginBgImg.png';

const LoginImageContainer = () => {
    return (
        <div className="login-image">
        <img src={LoginImage} style={{width:'760px' }} alt="Team" />
        <div className="welcome-text">
          <h1 style={{marginLeft:"2rem"}}>Welcome to WORKHIVE!</h1>
          <ul>
            <li>Employee Management: View detailed profiles, track performance, and manage attendance.</li>
            <li>Performance Insights: Analyze team goals, progress, and achievements.</li>
            <li>Attendance & Leaves: Track attendance patterns and manage leave requests effortlessly.</li>
          </ul>
        </div>
      </div>
    );
};

export default LoginImageContainer;
