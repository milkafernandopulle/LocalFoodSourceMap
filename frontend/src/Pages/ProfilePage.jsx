import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  TextField,
  Container,
  Paper,
  Link,
  Grid
} from '@mui/material';
import Swal from 'sweetalert2';
import SaveIcon from '@mui/icons-material/Save';
import NavBar from './Navbar';
import axios from 'axios';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    telephone: '',
    plants: ''
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userTypeStored = localStorage.getItem('user');
        const user = JSON.parse(userTypeStored);
        const userId = user.id;
        const response = await axios.get(`http://localhost:4000/api/users/${userId}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
        const userTypeStored = localStorage.getItem('user');
        const user = JSON.parse(userTypeStored);
        const userId = user.id;
      await axios.put(`http://localhost:4000/api/users/edit/${userId}`, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_TOKEN_HERE'
        }
      });
      Swal.fire({
        title: 'Success!',
        text: 'Your profile has been updated.',
        icon: 'success',
        confirmButtonColor: '#4caf50'
      });
    } catch (error) {
      console.error('Failed to update profile:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update profile. Please try again later.',
        icon: 'error',
        confirmButtonColor: '#f44336'
      });
    }
  };

  return (
    <>
      <NavBar />
      <Container component="main" maxWidth="md">
        <Paper elevation={6} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Profile
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                variant="outlined"
                margin="normal"
                value={formData.email}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                variant="outlined"
                margin="normal"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                variant="outlined"
                margin="normal"
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Telephone"
                name="telephone"
                variant="outlined"
                margin="normal"
                value={formData.telephone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Plants"
                name="plants"
                variant="outlined"
                margin="normal"
                value={formData.plants}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            sx={{ mt: 3 }}
          >
            Save Changes
          </Button>
          <Link href="#" variant="body2" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
            Need to change your password? Click here
          </Link>
        </Paper>
      </Container>
    </>
  );
};

export default ProfilePage;
