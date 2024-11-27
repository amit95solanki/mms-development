import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import jwt from 'jwt-decode';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AuthContext from '../../../context/AuthProvider';
import { login } from '../../../pages/auth/core/_request';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const validationSchema = yup.object({
  email: yup.string().required('email is required'),
  password: yup.string().required('password is required'),
});

export default function LoginForm() {
  const { authTokens, setUser, setAuthTokens, user } = React.useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  const formik = useFormik({
    initialValues: {
      email: 'maid@gmail.com',
      password: '123456',
    },
    validationSchema,
    onSubmit: (values) => {
      setIsLoading(true); // Start loading
      const newUser = values;
      console.log('newUser', newUser);
      login(newUser)
        .then(({ data }) => {
          console.log(data);
          setAuthTokens(data.accessToken);
          setUser(jwt(data.accessToken));
          localStorage.setItem('authTokens', JSON.stringify(data));
          // Navigate or do something else on success
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false); // Stop loading
        });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2} sx={{ marginBottom: '20px' }}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email Name"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Checkbox name="remember" label="Remember me" />
          <Link to="/macho-man-shop/forget-password">Forgot password?</Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading} // Show spinner
          disabled={isLoading} // Disable button
        >
          Login
        </LoadingButton>
      </form>
    </>
  );
}
