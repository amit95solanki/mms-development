import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
// @mui
import { Stack, TextField, Box, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const validationSchema = yup.object({
  email: yup.string().required('Stock is required'),
});

const ForgetPassword = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('values', values);
      // Here you can perform any action with form data, like submitting to backend
    },
  });
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Link to="/login">
          <Button variant="outlined" startIcon={<ArrowBackIcon />}>
            Back
          </Button>
        </Link>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10%' }}>
          <Stack direction={'column'} spacing={2}>
            <TextField
              sx={{ width: '50ch' }}
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
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

export default ForgetPassword;
