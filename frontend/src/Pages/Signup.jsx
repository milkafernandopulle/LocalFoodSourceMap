import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Paper, Link, MenuItem, FormControl, Select, InputLabel } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

function Signup() {
    // State for form fields
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        address: '',
        userType: '',
        telephone: '',
        plants: 'None'
    });

    // State for form validation
    const [errors, setErrors] = useState({});

    // Handle input change
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Validate form
    const validateForm = () => {
        let tempErrors = {};
        tempErrors.email = formData.email ? "" : "Email is required.";
        tempErrors.password = formData.password ? "" : "Password is required.";
        tempErrors.password = formData.password ? "" : "Confirm password is required.";
        tempErrors.name = formData.name ? "" : "Name is required.";
        tempErrors.address = formData.address ? "" : "Address is required.";
        tempErrors.userType = formData.userType ? "" : "User type is required.";
        tempErrors.telephone = formData.telephone ? "" : "Telephone number is required.";
        if (formData.userType === "farmer") {
            tempErrors.plants = formData.plants ? "" : "Plants information is required for farmers.";
        }
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    // Handle form submit
    // Handle form submit
// Handle form submit
// Handle form submit
const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
        try {
            const response = await axios.post('http://localhost:4000/api/users/register', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201 && response.data && response.data.message === 'User registered successfully!') {
                // Show success message
                Swal.fire({
                    icon: 'success',
                    title: 'Signup Successful',
                    text: 'You have successfully signed up!',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Save token and user data to local storage
                        localStorage.setItem('token', response.data.user.token);
                        localStorage.setItem('user', JSON.stringify(response.data.user));

                        // Redirect to another page (replace '/dashboard' with your desired route)
                        window.location.href = '/';
                    }
                });
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('Error:', error);
            // Show error message
            Swal.fire({
                icon: 'error',
                title: 'Signup Failed',
                text: error.response ? (error.response.data.error || 'Something went wrong. Please try again.') : 'Something went wrong. Please try again.',
                confirmButtonText: 'OK'
            });
        }
    } else {
        console.log('Form is invalid:', errors);
    }
};


    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={6} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#e8f5e9' }}>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="name"
                        label="Name"
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="address"
                        label="Address"
                        type="text"
                        id="address"
                        value={formData.address}
                        onChange={handleChange}
                        error={!!errors.address}
                        helperText={errors.address}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="userType-label">User Type</InputLabel>
                        <Select
                            labelId="userType-label"
                            id="userType"
                            name="userType"
                            value={formData.userType}
                            label="User Type"
                            onChange={handleChange}
                            error={!!errors.userType}
                        >
                            <MenuItem value="user">User</MenuItem>
                            <MenuItem value="farmer">Farmer</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="telephone"
                        label="Telephone Number"
                        type="text"
                        id="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        error={!!errors.telephone}
                        helperText={errors.telephone}
                    />
                    {formData.userType === 'farmer' && (
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="plants"
                            label="Plants"
                            type="text"
                            id="plants"
                            value={formData.plants}
                            onChange={handleChange}
                            error={!!errors.plants}
                            helperText={errors.plants}
                        />
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, bgcolor: 'green' }}
                    >
                        Sign Up
                    </Button>
                    <Link href="#" variant="body2">
                        {"Already have an account? Sign in"}
                    </Link>
                </form>
            </Paper>
        </Container>
    );
}

export default Signup;
