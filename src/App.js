import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from  './components/LoginPage';
import ForgotPassword from './components/ForgotPassword';
import ValidateOtp from './components/ValidateOtp';
import CreatePassword from './components/CreatePassword';
import Dashboard from './components/Dasboard';
import PrivateRoute from './components/PrivateRoute';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/validate-otp/:id" element={<ValidateOtp />} />
        <Route path="/create-password" element={<CreatePassword />} />
       <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
   
      </Routes>
    </Router>
  );
}

export default App;
