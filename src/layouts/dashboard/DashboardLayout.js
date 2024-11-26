import { useState } from 'react';
import { Outlet, Routes, Route } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
//
import Header from './header';
import Nav from './nav';
import LoginPage from '../../pages/auth/LoginPage';
import SignupPage from '../../pages/auth/SignupPage';
import EmailVerifyPage from '../../pages/auth/EmailVerifyPage';

import UpdatePassword from '../../sections/auth/UpdatePassword';
import ForgetPassword from '../../sections/auth/pages/ForgetPassword';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export function DashboardLayout() {
  const [open, setOpen] = useState(false);

  const user = true;

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} user={user} />

      {/* <Nav openNav={open} onCloseNav={() => setOpen(false)} /> */}

      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
}

const AuthPage = () => (
  <Routes>
    <Route element={<DashboardLayout />}>
      <Route path="email" element={<EmailVerifyPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="forget-password" element={<ForgetPassword />} />
      <Route path="sign-up/:emails" element={<SignupPage />} />
      <Route path="update-password/:token" element={<UpdatePassword />} />
      {/* <Route path="products" element={<ProductsPage />} /> */}

      {/* <Route path="/products/:id" element={<DetailView />} /> */}
      {/* <Route index element={<ProductsPage />} /> */}
    </Route>
  </Routes>
);

export default AuthPage;
