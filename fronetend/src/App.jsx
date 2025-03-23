

import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import Home from './Components/Home';
import Navbar from './NavBar/NavBar';
import { AuthContext } from './Context/AuthContext';
import AddUser from './Components/User/AddUser/AddUser';
import UserDetails from './Components/User/UserDetails/UserDetails';
import UpdateUser from './Components/User/UpdateUser/UpdateUser';
import OvertimeCalculator from './Components/User/CalculateOT/CalculateOT';
import ContactAdmin from './Components/User/ContactAdmin/ContactAdmin';

import './App.css'

function App() {

const { user, loading, logout } = useContext(AuthContext);

 if (loading) {
    
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <div className="loading-message">Please Wait...</div>
      </div>
    );
  }

  return (
    <div>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      
        {user ? (
          <>
          
            {user.role === 'admin' ? (
              <>
                <Route path="/" element={<><Navbar handleLogout={logout} /><Home /></>} />
                <Route path="/user/AddUser" element={<><Navbar handleLogout={logout} /><AddUser /></>} />
                <Route path="/user/UserDetails" element={<><Navbar handleLogout={logout} /><UserDetails /></>} />
                <Route path="/UpdateUser/:id" element={<><Navbar handleLogout={logout} /><UpdateUser /></>} />
                <Route path="/user/CalculateOT" element={<><Navbar handleLogout={logout} /><OvertimeCalculator /></>} />
              </>
            ) : (
            
              user.role === 'employee' && (
                <>
                  <Route path="/" element={<><Navbar handleLogout={logout} /><Home /></>} />
                  <Route path="/user/ContactAdmin" element={<><Navbar handleLogout={logout} /><ContactAdmin /></>} />
                </>
              )
            )}
          </>
        ) : (
          
          <Route path="/*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
