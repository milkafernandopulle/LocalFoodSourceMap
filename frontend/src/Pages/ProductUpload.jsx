import React, { useState } from 'react';
import { Button, Typography, Container, Paper, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavBar from './Navbar';
import { useNavigate } from 'react-router-dom';


const productOptions = [
  'apple',
  'mango',
  'strawberry',
  'bell pepper',
  'cabbage',
  'eggplant'
];

function ProductUpload() {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [productData, setProductData] = useState({
        name: '', // Set to empty string for initial state
        description: '',
        price: '',
        quantity: '',
        imageUrl: '',
        longitude: '',
        lattitude: '' // Corrected to 'latitude'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userTypeStored = localStorage.getItem('user');
        const user = JSON.parse(userTypeStored);

        const formData = {
            ...productData,
            userId: user.id // Assuming user ID is stored in local storage under 'userId'
        };
        console.log(formData);

        try {
            const response = await axios.post('http://localhost:4000/api/products', formData);
            Swal.fire(
                'Success!',
                'Product has been uploaded successfully.',
                'success'
            );
            navigate('/myproduct');
            console.log('Product uploaded:', response.data);
        } catch (error) {
            Swal.fire(
                'Error!',
                'Failed to upload product. Please try again.',
                'error'
            );
        }
    };

    return (
        <div>
            <NavBar />
            <Container component="main" maxWidth="sm">
                <Paper elevation={6} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
                    <Typography component="h1" variant="h5">
                        Upload New Product
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1rem' }}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="productName-label">Product Name</InputLabel>
                            <Select
                                labelId="productName-label"
                                id="name"
                                name="name"
                                value={productData.name}
                                label="Product Name"
                                onChange={handleInputChange}
                            >
                                <MenuItem value="">
                                    <em>Select a product</em>
                                </MenuItem>
                                {productOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="description"
                            label="Product Description"
                            value={productData.description}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="price"
                            label="Price"
                            type="number"
                            value={productData.price}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="quantity"
                            label="Available Quantity"
                            type="number"
                            value={productData.quantity}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="imageUrl"
                            label="Image URL"
                            value={productData.imageUrl}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="longitude"
                            label="Longitude"
                            value={productData.longitude}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="lattitude"
                            label="Latitude" // Corrected label to 'Latitude'
                            value={productData.lattitude} // Corrected to 'lattitude'
                            onChange={handleInputChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: 'green' }}
                        >
                            Upload Product
                        </Button>
                    </form>
                </Paper>
            </Container>
        </div>
    );
}

export default ProductUpload;
