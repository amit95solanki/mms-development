import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
// @mui
import { Stack, TextField, Box, Button, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// components

// ----------------------------------------------------------------------

const validationSchema = yup.object({
  password: yup.string().required('password is required'),
  c_password: yup.string().required('confirm password is required'),
});

const UpdatePassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log('token amit', token);

  const formik = useFormik({
    initialValues: {
      password: '',
      c_password: '',
      user_id: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:8000/api/v1/user/update-password', {
          password: values.password,
          c_password: values.c_password,
          user_id: values.user_id,
        });

        if (response.data.success) {
          // Handle success scenario, e.g., redirect to login page
          navigate('/macho-man-shop/login');
        } else {
          // Handle failure scenario, e.g., show an error message
          setError(new Error(response.data.message || 'Password update failed'));
        }
      } catch (error) {
        setError(error);
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/user/reset-password?token=${token}`);

        formik.setValues({
          ...formik.values,
          user_id: response.data.user_id,
        });
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          <i> Update Password</i>
        </Typography>
        <Link to="/login">
          <Button variant="outlined" startIcon={<ArrowBackIcon />}>
            Back
          </Button>
        </Link>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Stack direction={'column'} spacing={2}>
            <TextField
              sx={{ width: '50ch' }}
              id="password"
              name="password"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              sx={{ width: '50ch' }}
              id="c_password"
              name="c_password"
              label="Confirm Password"
              value={formik.values.c_password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.c_password && Boolean(formik.errors.c_password)}
              helperText={formik.touched.c_password && formik.errors.c_password}
            />
            <LoadingButton sx={{ m: 1, width: '50ch' }} size="large" type="submit" variant="contained">
              send
            </LoadingButton>
          </Stack>
        </Box>
      </form>
    </>
  );
};

export default UpdatePassword;
