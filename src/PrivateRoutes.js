import React, { Suspense, lazy, useContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import DashboardAppPage from './pages/DashboardAppPage';
import MasterLayout from './layouts/MasterLayout';
import AuthContext from './context/AuthProvider';
import SimpleLayout from './layouts/simple/SimpleLayout';

// Lazy loaded components
const ServentPage = lazy(() => import('./pages/servent/pages/index'));
const PassPage = lazy(() => import('./pages/pass/pages/index'));
const WarningPage = lazy(() => import('./pages/warning/pages/index'));

const PrivateRoutes = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://himalayacarpets.co.in/servant-service/v1/api/users/${user.id}`);
        setRole(response?.data?.data?.role);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchUserById();
    }
  }, []);

  useEffect(() => {
    if (error) {
      // Navigate to the login page when an error occurs
      logoutUser();
    }
  }, [error, navigate]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user data found.</p>;

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Products after successful login/registration */}
        <Route path="mms/*" element={<Navigate to="/dashboard" />} />

        {/* Pages */}
        <Route
          path="dashboard"
          element={
            <SuspenseFallback>
              <DashboardAppPage />
            </SuspenseFallback>
          }
        />
        <Route
          path="user/*"
          element={
            <SuspenseFallback>
              <ServentPage />
            </SuspenseFallback>
          }
        />
        <Route
          path="pass-management/*"
          element={
            <SuspenseFallback>
              <PassPage />
            </SuspenseFallback>
          }
        />
        <Route
          path="warning/*"
          element={
            <SuspenseFallback>
              <WarningPage />
            </SuspenseFallback>
          }
        />
        <Route
          path="report"
          element={
            <SuspenseFallback>
              <ServentPage />
            </SuspenseFallback>
          }
        />
        <Route
          path="alert-notification"
          element={
            <SuspenseFallback>
              <ServentPage />
            </SuspenseFallback>
          }
        />
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};

const TopBarProgress = () => {
  return <div>Loading...</div>;
};

const SuspenseFallback = ({ children }) => {
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export default PrivateRoutes;
