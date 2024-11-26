import React, { Suspense, lazy, useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DashboardAppPage from './pages/DashboardAppPage';
import MasterLayout from './layouts/MasterLayout';

import AuthContext from './context/AuthProvider';
import SimpleLayout from './layouts/simple/SimpleLayout';

// Lazy loaded components

const UserPage = lazy(() => import('./pages/user/pages/UserPage'));

const PrivateRoutes = () => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();

  return (
    <Routes>
      <Route element={user?.user?.role === 'admin' ? <MasterLayout /> : <SimpleLayout />}>
        {/* Redirect to Products after successful login/registration */}
        <Route path="mms/*" element={<Navigate to="/user" />} />

        {/* Pages */}

        <Route
          path="user"
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
