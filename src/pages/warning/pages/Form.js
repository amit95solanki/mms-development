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

  // Initial values
  const initialValues = {
    servantId: '675c7aea3c13304655e3a701',
    type: '',
    issueDate: '',
    remarks: '',
    passStatus: '',
  };

  // Validation Schema
  const validationSchema = Yup.object({
    servantId: Yup.string().required('Name is required'),
    type: Yup.string().required('this field is required'),
    issueDate: Yup.string().required('this field is required'),
    expiryDate: Yup.string().required('this field is required'),
    passStatus: Yup.string().required('this field is required'),
  });

  const { actionsLoading, data } = useSelector(
    (state) => ({
      actionsLoading: state.pass.actionsLoading,
      data: state.pass.data,
    }),
    shallowEqual
  );

  // Submit Handler

  const handleSubmit = (values) => {
    console.log('Form Data', values);

    // const payload = {
    //   name: values.name,
    // };

    // Dispatch create or update action
    if (!id) {
      dispatch(actions.createItem(values)).then(() => handleback());
    } else {
      dispatch(actions.updateItem({ ...values, id })).then(() => handleback());
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

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <FormikForm>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="type"
                    label="Type"
                    select
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.type && Boolean(errors.type)}
                    helperText={touched.type && errors.type}
                  >
                    <MenuItem value="Temporary">Temporary</MenuItem>
                    <MenuItem value="Permanent">Permanent</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="issueDate"
                    type="date"
                    name="issueDate"
                    label="Issue Date"
                    value={values.issueDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.issueDate && Boolean(errors.issueDate)}
                    helperText={touched.issueDate && errors.issueDate}
                    InputLabelProps={{ shrink: true }} // Prevent overlap
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="remarks"
                    name="remarks"
                    label="Remarks"
                    value={values.remarks}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.remarks && Boolean(errors.remarks)}
                    helperText={touched.remarks && errors.remarks}
                    InputLabelProps={{ shrink: true }} // Prevent overlap
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name="warningStatus"
                    label="Warning Status"
                    select
                    value={values.warningStatus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.warningStatus && Boolean(errors.warningStatus)}
                    helperText={touched.warningStatus && errors.warningStatus}
                  >
                    <MenuItem value="Open">Open</MenuItem>
                    <MenuItem value="Closed">Closed</MenuItem>
                  </TextField>
                </Grid>
              </Grid>

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
