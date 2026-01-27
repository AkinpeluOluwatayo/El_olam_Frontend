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
    const SECRET_ADMIN_PATH = "/el-olam-access-gate";

    return (
        <Router>
            <Toaster position="top-center" reverseOrder={false} />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path="/elolamServices" element={<ElolamServices />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/login" element={<Login />} />

                {/* Secret Admin Route */}
                <Route path={SECRET_ADMIN_PATH} element={<AdminLogin />} />

                <Route
                    path="/ceo/dashboard"
                    element={
                        isAuthenticated && userInfo?.role === 'CEO'
                            ? <CEODashboard />
                            : <Navigate to={SECRET_ADMIN_PATH} replace />
                    }
                />

                <Route
                    path="/director/dashboard"
                    element={
                        isAuthenticated && userInfo?.role === 'DIRECTOR'
                            ? <DirectorDashboard />
                            : <Navigate to={SECRET_ADMIN_PATH} replace />
                    }
                />

                <Route
                    path="/parent/dashboard"
                    element={
                        isAuthenticated && (userInfo?.role === 'PARENT' || userInfo?.role === 'ROLE_PARENT')
                            ? <ParentDashboard />
                            : <Navigate to="/login" replace />
                    }
                />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;