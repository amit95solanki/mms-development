import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Grid, Select, MenuItem, FormControl, InputLabel, Box, Avatar } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  gender: yup.string().required('Gender is required'),
  phone: yup.string().required('Gender is required'),
  working_place: yup.string().required('Gender is required'),
  current_address: yup.string().required('Gender is required'),
  permanent_address: yup.string().required('Gender is required'),
  maritalStatus: yup.string().when('gender', {
    is: 'female',
    then: yup.string().required('Marital Status is required'),
    otherwise: yup.string().nullable(),
  }),
  husband: yup.string().when(['gender', 'maritalStatus'], {
    is: (gender, maritalStatus) => gender === 'female' && maritalStatus === 'married',
    then: yup.string().required('Husband Name is required'),
    otherwise: yup.string().nullable(),
  }),
  children: yup.string().when('maritalStatus', {
    is: 'married',
    then: yup.string().required('Children count is required'),
    otherwise: yup.string().nullable(),
  }),
});

const Form = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const categories = ['Single', 'Married', 'Divorced', 'Widowed']; // Example categories

  const formik = useFormik({
    initialValues: {
      name: '',
      aadhar_no: '',
      age: '',
      status: '',
      upload_photo: '',
      gender: '',
      maritalStatus: '',
      husband: '',
      children: '',
      phone: '',
      working_place: '',
      current_address: '',
      permanent_address: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      navigate(-1); // Redirect to previous page
    },
  });

  const handleback = () => {
    navigate(-1);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'end', marginBottom: '20px' }}>
        <Link to="/product-list">
          <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={handleback}>
            Back
          </Button>
        </Link>
      </Box>
      <form onSubmit={formik.handleSubmit} style={{ padding: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="age"
              name="age"
              label="Age"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age && formik.errors.age}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="aadhar_no"
              name="aadhar_no"
              label="Aadhar No"
              value={formik.values.aadhar_no}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.aadhar_no && Boolean(formik.errors.aadhar_no)}
              helperText={formik.touched.aadhar_no && formik.errors.aadhar_no}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Mobile No"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="working_place"
              name="working_place"
              label="Working Place Detail"
              value={formik.values.working_place}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.working_place && Boolean(formik.errors.working_place)}
              helperText={formik.touched.working_place && formik.errors.working_place}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="current_address"
              name="current_address"
              label="Current Address"
              value={formik.values.current_address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.current_address && Boolean(formik.errors.current_address)}
              helperText={formik.touched.current_address && formik.errors.current_address}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="permanent_address"
              name="permanent_address"
              label="Permanent Address"
              value={formik.values.permanent_address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.permanent_address && Boolean(formik.errors.permanent_address)}
              helperText={formik.touched.permanent_address && formik.errors.permanent_address}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth error={formik.touched.status && Boolean(formik.errors.status)}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.status && formik.errors.status && (
                <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.status}</div>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth error={formik.touched.gender && Boolean(formik.errors.gender)}>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
              {formik.touched.gender && formik.errors.gender && (
                <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.gender}</div>
              )}
            </FormControl>
          </Grid>
          {formik.values.gender === 'female' && (
            <Grid item xs={6}>
              <FormControl fullWidth error={formik.touched.maritalStatus && Boolean(formik.errors.maritalStatus)}>
                <InputLabel id="marital-status-label">Marital Status</InputLabel>
                <Select
                  labelId="marital-status-label"
                  id="maritalStatus"
                  name="maritalStatus"
                  value={formik.values.maritalStatus}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem value="married">Married</MenuItem>
                  <MenuItem value="unmarried">Unmarried</MenuItem>
                </Select>
                {formik.touched.maritalStatus && formik.errors.maritalStatus && (
                  <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.maritalStatus}</div>
                )}
              </FormControl>
            </Grid>
          )}
          {formik.values.gender === 'female' && formik.values.maritalStatus === 'married' && (
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="husband"
                name="husband"
                label="Husband's Name"
                value={formik.values.husband}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.husband && Boolean(formik.errors.husband)}
                helperText={formik.touched.husband && formik.errors.husband}
              />
            </Grid>
          )}
          {formik.values.maritalStatus === 'married' && (
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="children"
                name="children"
                label="Number of Children"
                value={formik.values.children}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.children && Boolean(formik.errors.children)}
                helperText={formik.touched.children && formik.errors.children}
              />
            </Grid>
          )}
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="upload_photo"
              name="upload_photo"
              label="Upload Photo URL"
              value={formik.values.upload_photo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.upload_photo && Boolean(formik.errors.upload_photo)}
              helperText={formik.touched.upload_photo && formik.errors.upload_photo}
            />
          </Grid>
          <Grid item xs={6}>
            {formik.values.upload_photo && (
              <Avatar alt="Uploaded" src={formik.values.upload_photo} sx={{ marginTop: '5px' }} />
            )}
          </Grid>
        </Grid>
        <Button color="primary" variant="contained" fullWidth type="submit" sx={{ marginTop: '20px' }}>
          Submit
        </Button>
      </form>
    </>
  );
};

export default Form;
