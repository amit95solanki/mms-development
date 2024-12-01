import React, { Suspense, lazy, useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DashboardAppPage from './pages/DashboardAppPage';
import MasterLayout from './layouts/MasterLayout';

import AuthContext from './context/AuthProvider';
import SimpleLayout from './layouts/simple/SimpleLayout';

// Lazy loaded components

const UserPage = lazy(() => import('./pages/user/pages/index'));

const PrivateRoutes = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();

  return (
    <Routes>
      <Route element={user?.user?.role === 'admin' ? <MasterLayout /> : <SimpleLayout />}>
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
              <UserPage />
            </SuspenseFallback>
          }
        />
        <Route
          path="pass-management"
          element={
            <SuspenseFallback>
              <UserPage />
            </SuspenseFallback>
          }
        />
        <Route
          path="warning"
          element={
            <SuspenseFallback>
              <UserPage />
            </SuspenseFallback>
          }
        />

        <Route
          path="report"
          element={
            <SuspenseFallback>
              <UserPage />
            </SuspenseFallback>
          }
        />

        <Route
          path="alert-notification"
          element={
            <SuspenseFallback>
              <UserPage />
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
