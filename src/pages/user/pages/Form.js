import React from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const DynamicForm = () => {
  const navigate = useNavigate();

  // Initial values
  const initialValues = {
    name: '',
    husbandName: '',
    address: '',
    phoneNumber: '',
    aadharNumber: '',
    photo: '',
    age: '',
    vehicleDetails: '',
    quarterNumber: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    workingPlace: '',
    role: '',
  };

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
  });

  // Submit Handler
  const handleSubmit = (values) => {
    console.log('Form Data', values);
  };

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

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <FormikForm>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="husbandName"
                  name="husbandName"
                  label="husbandName"
                  value={values.husbandName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.husbandName && Boolean(errors.husbandName)}
                  helperText={touched.husbandName && errors.husbandName}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="address"
                  name="address"
                  label="address"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.address && Boolean(errors.address)}
                  helperText={touched.address && errors.address}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="phoneNumber"
                  name="phoneNumber"
                  label="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="aadharNumber"
                  name="aadharNumber"
                  label="aadharNumber"
                  value={values.aadharNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.aadharNumber && Boolean(errors.aadharNumber)}
                  helperText={touched.aadharNumber && errors.aadharNumber}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="photo"
                  name="photo"
                  label="photo"
                  value={values.photo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.photo && Boolean(errors.photo)}
                  helperText={touched.photo && errors.photo}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="age"
                  name="age"
                  label="age"
                  value={values.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.age && Boolean(errors.age)}
                  helperText={touched.age && errors.age}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="vehicleDetails"
                  name="vehicleDetails"
                  label="vehicleDetails"
                  value={values.vehicleDetails}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.vehicleDetails && Boolean(errors.vehicleDetails)}
                  helperText={touched.vehicleDetails && errors.vehicleDetails}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="quarterNumber"
                  name="quarterNumber"
                  label="quarterNumber"
                  value={values.quarterNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.quarterNumber && Boolean(errors.quarterNumber)}
                  helperText={touched.quarterNumber && errors.quarterNumber}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="employmentStatus"
                  name="employmentStatus"
                  label="employmentStatus"
                  value={values.employmentStatus}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.employmentStatus && Boolean(errors.employmentStatus)}
                  helperText={touched.employmentStatus && errors.employmentStatus}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="line1"
                  name="line1"
                  label="line1"
                  value={values.line1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.line1 && Boolean(errors.line1)}
                  helperText={touched.line1 && errors.line1}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="line2"
                  name="line2"
                  label="line2"
                  value={values.line2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.line2 && Boolean(errors.line2)}
                  helperText={touched.line2 && errors.line2}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="city"
                  name="city"
                  label="city"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.city && Boolean(errors.city)}
                  helperText={touched.city && errors.city}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="state"
                  name="state"
                  label="state"
                  value={values.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.state && Boolean(errors.state)}
                  helperText={touched.state && errors.state}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="pincode"
                  name="pincode"
                  label="pincode"
                  value={values.pincode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.pincode && Boolean(errors.pincode)}
                  helperText={touched.pincode && errors.pincode}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="country"
                  name="country"
                  label="country"
                  value={values.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.country && Boolean(errors.country)}
                  helperText={touched.country && errors.country}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="role"
                  name="role"
                  label="role"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.role && Boolean(errors.role)}
                  helperText={touched.role && errors.role}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="workingPlace"
                  name="workingPlace"
                  label="workingPlace"
                  value={values.workingPlace}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.workingPlace && Boolean(errors.workingPlace)}
                  helperText={touched.workingPlace && errors.workingPlace}
                />
              </Grid>
            </Grid>

            <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
              Submit
            </Button>
          </FormikForm>
        )}
      </Formik>
    </>
  );
};

export default DynamicForm;
