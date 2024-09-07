import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia
} from '@mui/material';
import Swal from 'sweetalert2';
import SaveIcon from '@mui/icons-material/Save';
import NavBar from './Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductEditPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    quantity: ''
  });

  useEffect(() => {
    fetchProductDetails(productId);
  }, [productId]);

  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const updateProductDetails = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/api/products/${productId}`, product);
      if (response.status === 200) {
        Swal.fire({
          title: 'Success!',
          text: 'Product updated successfully!',
          icon: 'success',
          confirmButtonColor: '#4caf50'
        });
      }
    } catch (error) {
      console.error('Error updating product details:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again later.',
        icon: 'error',
        confirmButtonColor: '#f44336'
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <>
      <NavBar />
      <Container>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Edit Product
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                  component="img"
                  image={product.imageUrl}
                  alt="Product Image"
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <TextField
                    fullWidth
                    label="Product Name"
                    name="name"
                    variant="outlined"
                    margin="normal"
                    value={product.name}
                    onChange={handleInputChange}
                  />
                  <TextField
                    fullWidth
                    label="Product Description"
                    name="description"
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={4}
                    value={product.description}
                    onChange={handleInputChange}
                  />
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    variant="outlined"
                    margin="normal"
                    value={product.price}
                    onChange={handleInputChange}
                  />
                  <TextField
                    fullWidth
                    label="Quantity"
                    name="quantity"
                    variant="outlined"
                    margin="normal"
                    value={product.quantity}
                    onChange={handleInputChange}
                  />
                </CardContent>
                <CardActions>
                  <Button
                    startIcon={<SaveIcon />}
                    variant="contained"
                    color="primary"
                    onClick={updateProductDetails}
                  >
                    Save Changes
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ProductEditPage;
