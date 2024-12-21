import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
} from '@mui/material';

// Sample user data
const userProfile = {
  avatar: 'https://via.placeholder.com/150',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1234567890',
  address: '123 Main St, Springfield, USA',
};

const SarventSearch = () => {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>
              <Typography variant="h6" align="center">
                Sarvent Profile
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center" colSpan={2}>
              <Avatar
                src={userProfile.avatar}
                alt={userProfile.name}
                sx={{ width: 100, height: 100, margin: 'auto' }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Name</b>
            </TableCell>
            <TableCell>{userProfile.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Email</b>
            </TableCell>
            <TableCell>{userProfile.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Phone</b>
            </TableCell>
            <TableCell>{userProfile.phone}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Address</b>
            </TableCell>
            <TableCell>{userProfile.address}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SarventSearch;
