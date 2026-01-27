import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import './App.css';
import Landing from './components/pages/landingpage/Landing.jsx';
import Login from "./components/pages/auth/login/Login.jsx";
import AdminLogin from './components/pages/auth/adminLogin/AdminLogin.jsx';
import DirectorDashboard from './components/pages/directorDashboard/DirectorDashboard.jsx';
import ParentDashboard from "./components/pages/parentDashboard/ParentDashboard.jsx";
import CEODashboard from "./components/pages/ceoDashboard/CEODashboard.jsx";
import AboutUs from "./components/pages/aboutUs/AboutUs.jsx";
import ElolamServices from "./components/pages/elolamServices/ElolamServices.jsx";
import Donate from "./components/pages/donatePage/Donate.jsx";

function App() {
    const { userInfo, isAuthenticated } = useSelector((state) => state.user);

    return (
        <Router>
            <Toaster position="top-center" reverseOrder={false} />

            <Routes>
                {/* --- PUBLIC ROUTES --- */}
                <Route path="/" element={<Landing />} />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path="/elolamServices" element={<ElolamServices />} />
                <Route path="/donate" element={<Donate />} />

                {/* --- AUTH ROUTES --- */}
                <Route path="/login" element={<Login />} />
                <Route path="/admin-login" element={<AdminLogin />} />

                {/* --- PROTECTED CEO ROUTE --- */}
                <Route
                    path="/ceo/dashboard"
                    element={
                        isAuthenticated && userInfo?.role === 'CEO'
                            ? <CEODashboard />
                            : <Navigate to="/admin-login" replace />
                    }
                />

                {/* --- PROTECTED DIRECTOR ROUTE --- */}
                <Route
                    path="/director/dashboard"
                    element={
                        isAuthenticated && userInfo?.role === 'DIRECTOR'
                            ? <DirectorDashboard />
                            : <Navigate to="/admin-login" replace />
                    }
                />

                {/* --- PROTECTED PARENT ROUTE --- */}
                <Route
                    path="/parent/dashboard"
                    element={
                        isAuthenticated && (userInfo?.role === 'PARENT' || userInfo?.role === 'ROLE_PARENT')
                            ? <ParentDashboard />
                            : <Navigate to="/login" replace />
                    }
                />

                {/* Fallback to Landing */}
                <Route path="*" element={<Landing />} />
            </Routes>
        </Router>
    );
}

export default App;