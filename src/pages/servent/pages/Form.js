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
    dispatch(actions.fetchItem(id));
  }, [id, dispatch]);

  const { actionsLoading, data } = useSelector(
    (state) => ({
      actionsLoading: state.servent.actionsLoading,
      data: state.servent.data,
    }),
    shallowEqual
  );

  console.log('servent data', data?.data);

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
        aadharNumber: Yup.number()
          .required('aadhar no is required & must be a number')
          .typeError('Age must be a number')
          .min(0, 'Age cannot be negative'),
        age: Yup.number()
          .required('age is required & must be a number')
          .typeError('Age must be a number')
          .min(0, 'Age cannot be negative'),
        phoneNumber: Yup.number().required('aadhar no is required & must be a number'),
        occupation: Yup.string(),
        address: Yup.string().required('Address is required'),
        workingPlace: Yup.string(),
        employmentStatus: Yup.string()
          .oneOf(['employed', 'unemployed'], 'Invalid status')
          .required('Employment status is required'),
      })
    ),
    name: Yup.string().required('Name is required'),
    address: Yup.object({
      line1: Yup.string().required('Address Line 1 is required'),
      line2: Yup.string().required('Address Line 2 is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string().required('State is required'),
      pincode: Yup.string().required('Pincode is required'),
      country: Yup.string().required('Country is required'),
    }),
    phoneNumber: Yup.string().required('this field is required'),
    aadharNumber: Yup.string().required('this field is required'),
    photo: Yup.string().required('this field is required'),
    age: Yup.string().required('this field is required'),
    vehicleDetails: Yup.string().required('this field is required'),
    quarterNumber: Yup.string().required('this field is required'),
    employmentStatus: Yup.string().required('this field is required'),
    line1: Yup.string().required('this field is required'),
    line2: Yup.string().required('this field is required'),
    city: Yup.string().required('this field is required'),
    state: Yup.string().required('this field is required'),
    pincode: Yup.string().required('this field is required'),
    country: Yup.string().required('this field is required'),
    workingPlace: Yup.string().required('this field is required'),
    role: Yup.string().required('this field is required'),
  });

  const handleSubmit = (values) => {
    console.log('Form Data', values);

    const payload = {
      name: values.name,

      address: {
        line1: values.addressLine1,
        line2: values.addressLine2,
        city: values.city,
        state: values.state,
        pincode: values.pincode,
        country: values.country || 'India',
      },
      phoneNumber: values.phoneNumber,
      aadharNumber: values.aadharNumber,
      photo: values.photo,
      age: values.age,
      vehicleDetails: values.vehicleDetails,
      quarterNumber: values.quarterNumber,
      employmentStatus: values.employmentStatus,
      workingPlace: values.workingPlace,
      familyDetails: values.familyDetails?.map((family) => ({
        relation: family.relation,
        name: family.name,
        aadharNumber: family.aadharNumber,
        age: family.age,
        photo: family.photo,
        phoneNumber: family.phoneNumber,
        occupation: family.occupation,
        address: family.address,
        workingPlace: family.workingPlace,
        employmentStatus: family.employmentStatus,
      })),
      passes: values.passes,
      warnings: values.warnings,
      alerts: values.alerts,
      role: values.role,
      societies: values.societies,
      households: values.households,
      isActive: values.isActive !== undefined ? values.isActive : true,
    };

    // Dispatch create or update action
    if (!id) {
      dispatch(actions.createItem(payload)).then(() => handleback());
    } else {
      dispatch(actions.updateItem({ ...payload, id })).then(() => handleback());
    }
  };

  const handleback = () => {
    navigate(-1);
  };

  return (
    <>
      <Box sx={{ padding: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'end', marginBottom: '20px' }}>
          <Link to="/product-list">
            <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={handleback}>
              Back
            </Button>
          </Link>
        </Box>

        <Formik
          initialValues={data?.data || initialValues}
          enableReinitialize // Make sure it's a boolean true, not a string "true"
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <FormikForm onSubmit={handleSubmit}>
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

                <Grid item xs={12} sm={6}>
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
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="address.line1"
                    name="address.line1"
                    label="Address Line 1"
                    value={values.address.line1}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.address?.line1 && Boolean(errors.address?.line1)}
                    helperText={touched.address?.line1 && errors.address?.line1}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="address.line2"
                    name="address.line2"
                    label="Address Line 2"
                    value={values.address.line2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.address?.line2 && Boolean(errors.address?.line2)}
                    helperText={touched.address?.line2 && errors.address?.line2}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="address.city"
                    name="address.city"
                    label="City"
                    value={values.address.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.address?.city && Boolean(errors.address?.city)}
                    helperText={touched.address?.city && errors.address?.city}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="address.state"
                    name="address.state"
                    label="State"
                    value={values.address.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.address?.state && Boolean(errors.address?.state)}
                    helperText={touched.address?.state && errors.address?.state}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="address.pincode"
                    name="address.pincode"
                    label="Pincode"
                    value={values.address.pincode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.address?.pincode && Boolean(errors.address?.pincode)}
                    helperText={touched.address?.pincode && errors.address?.pincode}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="address.country"
                    name="address.country"
                    label="Country"
                    value={values.address.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.address?.country && Boolean(errors.address?.country)}
                    helperText={touched.address?.country && errors.address?.country}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
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
                    <MenuItem value="maid">Maid</MenuItem>
                    <MenuItem value="cleaner">Cleaner</MenuItem>
                    <MenuItem value="guard">Guard</MenuItem>
                    <MenuItem value="driver">Driver</MenuItem>
                  </TextField>
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

              <FieldArray name="familyDetails">
                {({ push, remove }) => (
                  <div>
                    {values.familyDetails.map((familyMember, index) => (
                      <Box
                        key={index}
                        sx={{
                          border: '1px solid #ccc',
                          padding: '16px',
                          marginY: '16px',
                          borderRadius: '8px',
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              name={`familyDetails[${index}].relation`}
                              label="Relation"
                              value={familyMember.relation}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.familyDetails?.[index]?.relation &&
                                Boolean(errors.familyDetails?.[index]?.relation)
                              }
                              helperText={
                                touched.familyDetails?.[index]?.relation && errors.familyDetails?.[index]?.relation
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              name={`familyDetails[${index}].name`}
                              label="Name"
                              value={familyMember.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.familyDetails?.[index]?.name && Boolean(errors.familyDetails?.[index]?.name)
                              }
                              helperText={touched.familyDetails?.[index]?.name && errors.familyDetails?.[index]?.name}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              name={`familyDetails[${index}].aadharNumber`}
                              label="Aadhar Number"
                              value={familyMember.aadharNumber}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.familyDetails?.[index]?.aadharNumber &&
                                Boolean(errors.familyDetails?.[index]?.aadharNumber)
                              }
                              helperText={
                                touched.familyDetails?.[index]?.aadharNumber &&
                                errors.familyDetails?.[index]?.aadharNumber
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              name={`familyDetails[${index}].age`}
                              label="Age"
                              type="number"
                              value={familyMember.age}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.familyDetails?.[index]?.age && Boolean(errors.familyDetails?.[index]?.age)}
                              helperText={touched.familyDetails?.[index]?.age && errors.familyDetails?.[index]?.age}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              name={`familyDetails[${index}].phoneNumber`}
                              label="Phone Number"
                              type="number"
                              value={familyMember.phoneNumber}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.familyDetails?.[index]?.phoneNumber &&
                                Boolean(errors.familyDetails?.[index]?.phoneNumber)
                              }
                              helperText={
                                touched.familyDetails?.[index]?.phoneNumber &&
                                errors.familyDetails?.[index]?.phoneNumber
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              name={`familyDetails[${index}].address`}
                              label="Addressr"
                              type="text"
                              value={familyMember.address}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.familyDetails?.[index]?.address &&
                                Boolean(errors.familyDetails?.[index]?.address)
                              }
                              helperText={
                                touched.familyDetails?.[index]?.address && errors.familyDetails?.[index]?.address
                              }
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
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
                        </Grid>
                        <Button variant="outlined" color="error" sx={{ mt: 2 }} onClick={() => remove(index)}>
                          Remove Family Member
                        </Button>
                      </Box>
                    ))}
                    <Button
                      variant="contained"
                      color="primary"
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
                    >
                      Add Family Member
                    </Button>
                  </div>
                )}
              </FieldArray>

              <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
                Submit
              </Button>
            </FormikForm>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default DynamicForm;
