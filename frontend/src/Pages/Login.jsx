import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Paper, Link } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

function Login() {
    // State for login form fields
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    // Handle input change
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(formData);
            const response = await axios.post('http://localhost:4000/api/users/login', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                // Show success message
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'You have successfully logged in!',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        localStorage.setItem('token', response.data.user.token);
                        localStorage.setItem('user', JSON.stringify(response.data.user));
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
                title: 'Login Failed',
                text: error.response ? (error.response.data.error || 'Something went wrong. Please try again.') : 'Something went wrong. Please try again.',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={6} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#e8f5e9' }}>
                <Typography component="h1" variant="h5">
                    Sign in
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
                        autoFocus
                        value={formData.email}
                        onChange={handleChange}
                        sx={{ marginBottom: '1rem' }}
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
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, bgcolor: 'green' }}
                    >
                        Sign In
                    </Button>
                    <Link href="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                </form>
            </Paper>
        </Container>
    );
}

export default Login;
