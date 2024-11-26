import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import CryptoJS from 'crypto-js';
import * as yup from 'yup';
import axios from 'axios';
// @mui
import { Stack, TextField, Box, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

const validationSchema = yup.object({
  email: yup.string().required('Stock is required'),
});

const EmailVerify = () => {
  const [open, setOpen] = useState(false);

  const postData = async (values) => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/email-verify', values);
      setOpen(true);
      console.log(response.data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: (values) => {
      postData(values);
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2} sx={{ marginBottom: '20px' }}>
          {open ? (
            <Alert icon={false} severity="success">
              Please check your email .
            </Alert>
          ) : (
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
          )}
        </Stack>
        {open ? (
          ''
        ) : (
          <LoadingButton fullWidth size="large" type="submit" variant="contained">
            Login
          </LoadingButton>
        )}
      </form>
    </>
  );
};

export default EmailVerify;
