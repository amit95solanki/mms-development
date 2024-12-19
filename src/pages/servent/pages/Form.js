import React from 'react';
import { Formik, Form as FormikForm, FieldArray } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Grid, MenuItem } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as actions from '../_redux/actions';

const DynamicForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (id) {
      dispatch(actions.fetchItem(id));
    }
  }, [id, dispatch]);

  const { actionsLoading, data } = useSelector(
    (state) => ({
      actionsLoading: state.servent.actionsLoading,
      data: state.servent.data,
    }),
    shallowEqual
  );

  // Initial values
  const initialValues = {
    familyDetails: [
      {
        relation: '',
        name: '',
        aadharNumber: '',
        age: '',
        photo: '',
        phoneNumber: '',
        occupation: '',
        address: '',
        workingPlace: '',
        employmentStatus: '',
      },
    ],
    name: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      pincode: '',
      country: '',
    },
    phoneNumber: '',
    aadharNumber: '',
    photo: '',
    employmentStatus: '',
    age: '',
    vehicleDetails: '',
    quarterNumber: '',
    workingPlace: '',
    role: '',
  };

  // Validation Schema
  const validationSchema = Yup.object({
    familyDetails: Yup.array().of(
      Yup.object({
        relation: Yup.string().required('Relation is required'),
        name: Yup.string().required('Name is required'),
        aadharNumber: Yup.string().required('Aadhar Number is required'),
        age: Yup.number()
          .typeError('Age must be a number')
          .required('Age is required')
          .min(0, 'Age cannot be negative'),
        phoneNumber: Yup.string().required('Phone Number is required'),
        occupation: Yup.string(),
        address: Yup.string().required('Address is required'),
        workingPlace: Yup.string(),
        employmentStatus: Yup.string().required('Employment status is required'),
      })
    ),

    address: Yup.object({
      line1: Yup.string().required('Address Line 1 is required'),
      line2: Yup.string().required('Address Line 2 is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
      pincode: Yup.string().required('Pincode is required'),
      country: Yup.string().required('Country is required'),
    }),
    name: Yup.string().required('Name is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    aadharNumber: Yup.number().required('Aadhar Number is required'),
    photo: Yup.string().required('Photo is required'),

    age: Yup.number().required('Age Number is required'),
    vehicleDetails: Yup.string().required(' Vehicle Details is required'),
    quarterNumber: Yup.string().required('house / flate is required'),
    workingPlace: Yup.string().required('Working Place is required'),
    role: Yup.string().required('Role is required'),
    employmentStatus: Yup.string().required('Employment Status is required'),
  });

  const handleSubmit = (values) => {
    console.log('Form Data', values);
    if (!id) {
      dispatch(actions.createItem(values)).then(() => handleBack());
    } else {
      dispatch(actions.updateItem({ ...values, id })).then(() => handleBack());
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'end', marginBottom: '20px' }}>
        <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={handleBack}>
          Back
        </Button>
      </Box>

      <Formik
        initialValues={data?.data || initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => {
          console.log('Current Values:', values);
          console.log('Validation Errors:', errors);
          console.log('Touched Fields:', touched);
          return (
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
                    id="phoneNumber"
                    type="number"
                    name="phoneNumber"
                    label="Phone Number"
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
                    label="Aadhar Number"
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
                    label="Photo"
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
                    type="number"
                    label="Age"
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
                    label="Vehicle Details"
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
                    label="Quarter Number"
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
                    id="workingPlace"
                    name="workingPlace"
                    label="Working Place"
                    value={values.workingPlace}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.workingPlace && Boolean(errors.workingPlace)}
                    helperText={touched.workingPlace && errors.workingPlace}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="role"
                    label="Role"
                    select
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.role && Boolean(errors.role)}
                    helperText={touched.role && errors.role}
                  >
                    <MenuItem value="maid">maid</MenuItem>
                    <MenuItem value="cleaner">cleaner</MenuItem>
                    <MenuItem value="guard">guard</MenuItem>
                    <MenuItem value="driver">driver</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="employmentStatus"
                    label="Employment Status"
                    select
                    value={values.employmentStatus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.employmentStatus && Boolean(errors.employmentStatus)}
                    helperText={touched.employmentStatus && errors.employmentStatus}
                  >
                    <MenuItem value="employed">Employed</MenuItem>
                    <MenuItem value="unemployed">Unemployed</MenuItem>
                  </TextField>
                </Grid>

                {/* Address Fields */}
                {['line1', 'line2', 'city', 'state', 'pincode', 'country'].map((field) => (
                  <Grid item xs={6} key={field}>
                    <TextField
                      fullWidth
                      id={`address.${field}`}
                      name={`address.${field}`}
                      label={field.replace(/^\w/, (c) => c.toUpperCase())}
                      value={values.address[field]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.address?.[field] && Boolean(errors.address?.[field])}
                      helperText={touched.address?.[field] && errors.address?.[field]}
                    />
                  </Grid>
                ))}

                {/* Family Details */}
                <FieldArray name="familyDetails">
                  {({ push, remove }) => (
                    <>
                      {values.familyDetails.map((familyMember, index) => (
                        <Box key={index} sx={{ border: '1px solid #ccc', padding: 2, marginY: 2, borderRadius: 2 }}>
                          <Grid container spacing={2}>
                            {['relation', 'name', 'aadharNumber', 'age', 'phoneNumber', 'address'].map((field) => (
                              <Grid item xs={6} key={field}>
                                <TextField
                                  fullWidth
                                  name={`familyDetails[${index}].${field}`}
                                  label={field.replace(/^\w/, (c) => c.toUpperCase())}
                                  value={familyMember[field]}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={
                                    touched.familyDetails?.[index]?.[field] &&
                                    Boolean(errors.familyDetails?.[index]?.[field])
                                  }
                                  helperText={
                                    touched.familyDetails?.[index]?.[field] && errors.familyDetails?.[index]?.[field]
                                  }
                                />
                              </Grid>
                            ))}
                            {/* Add the employmentStatus field */}
                            <Grid item xs={6}>
                              <TextField
                                fullWidth
                                name={`familyDetails[${index}].employmentStatus`}
                                label="Employment Status"
                                select
                                value={familyMember.employmentStatus}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                  touched.familyDetails?.[index]?.employmentStatus &&
                                  Boolean(errors.familyDetails?.[index]?.employmentStatus)
                                }
                                helperText={
                                  touched.familyDetails?.[index]?.employmentStatus &&
                                  errors.familyDetails?.[index]?.employmentStatus
                                }
                              >
                                <MenuItem value="employed">Employed</MenuItem>
                                <MenuItem value="unemployed">Unemployed</MenuItem>
                              </TextField>
                            </Grid>
                            <Grid item xs={12}>
                              <Button variant="outlined" color="error" onClick={() => remove(index)} sx={{ mt: 2 }}>
                                Remove Member
                              </Button>
                            </Grid>
                          </Grid>
                        </Box>
                      ))}
                      <Button
                        variant="outlined"
                        onClick={() =>
                          push({
                            relation: '',
                            name: '',
                            aadharNumber: '',
                            age: '',
                            photo: '',
                            phoneNumber: '',
                            occupation: '',
                            address: '',
                            workingPlace: '',
                            employmentStatus: '',
                          })
                        }
                        sx={{ mt: 2 }}
                      >
                        Add Member
                      </Button>
                    </>
                  )}
                </FieldArray>
              </Grid>
              <Button type="submit" variant="contained" sx={{ mt: 4 }}>
                Submit
              </Button>
            </FormikForm>
          );
        }}
      </Formik>
    </Box>
  );
};

export default DynamicForm;
