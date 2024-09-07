import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  MenuItem,
  Select,
  CardMedia,
  TextField,
  Typography,
  InputLabel,
  FormControl
} from '@mui/material';
import Swal from 'sweetalert2';
import NavBar from './Navbar';

// Mock data for products

const products = [
  { id: 1, name: 'Apple', price: 0.99, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/full-frame-shot-of-granny-smith-apples-royalty-free-image-1627315895.jpg' },
  { id: 2, name: 'Mango', price: 1.29, imageUrl: 'https://cdn.wikifarmer.com/wp-content/uploads/2023/03/Mango-Yield-Harvest-and-Post-Harvest-Handling.png' },
  { id: 3, name: 'Strawberry', price: 2.00, imageUrl: 'https://www.rhs.org.uk/getmedia/e76ee82a-144c-4738-bea2-fdf5129ad6aa/strawberries.jpg?width=940&height=627&ext=.jpg' },
  { id: 4, name: 'Bell Pepper', price: 0.79, imageUrl: 'https://www.grocery.coop/sites/default/files/wp-content/uploads/2011/06/Bell_Peppers_0.jpg' },
  { id: 5, name: 'Cabbage', price: 1.50, imageUrl: 'https://www.greenlife.co.ke/wp-content/uploads/2022/04/Cabbage.jpg' },
  { id: 6, name: 'Eggplant', price: 1.10, imageUrl: 'https://www.tasteofhome.com/wp-content/uploads/2019/07/Chinese-eggplant-shutterstock_2033421.jpg?fit=1024,640' }
];

function BulkOrderPage() {
  const [order, setOrder] = useState({
    selectedProductId: '',
    quantity: 1,
    totalPrice: 0
  });
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductChange = (event) => {
    const productId = event.target.value;
    const product = products.find(p => p.id === productId);
    setSelectedProduct(product);
    setOrder({
      ...order,
      selectedProductId: productId,
      totalPrice: product ? product.price * order.quantity : 0
    });
  };

  const handleQuantityChange = (event) => {
    const quantity = event.target.value;
    setOrder({
      ...order,
      quantity: quantity,
      totalPrice: selectedProduct ? selectedProduct.price * quantity : 0
    });
  };

  const handlePlaceOrder = () => {
    const userTypeStored = localStorage.getItem('user');
    const user = JSON.parse(userTypeStored);
    const userId = user.id;
    
    fetch('http://localhost:4000/api/bulk/bulk-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        type: selectedProduct.name.toLowerCase(),  // Assuming product names are the type
        totalQuantity: order.quantity
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      Swal.fire({
        title: 'Order Placed!',
        text: `You have successfully placed a bulk order for ${order.quantity} units of ${selectedProduct.name}.`,
        icon: 'success',
        confirmButtonColor: '#4caf50',
      });
    })
    .catch((error) => {
      console.error('Error:', error);
      console.log(error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to place the order. Please try again later.',
        icon: 'error',
        confirmButtonColor: '#f44336',
      });
    });
  };

  return (
    <>
    <NavBar />
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Place Bulk Order
        </Typography>
        <Grid container spacing={2} alignItems="center">
          {/* Column for the image */}
          <Grid item xs={12} md={6}>
            {selectedProduct && (
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                />
              </Card>
            )}
          </Grid>
          {/* Column for the form */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="product-label">Product</InputLabel>
              <Select
                labelId="product-label"
                id="product"
                value={order.selectedProductId}
                label="Product"
                onChange={handleProductChange}
              >
                {products.map((product) => (
                  <MenuItem key={product.id} value={product.id}>
                    {product.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              type="number"
              label="Quantity"
              variant="outlined"
              value={order.quantity}
              onChange={handleQuantityChange}
              InputProps={{ inputProps: { min: 1 } }}
              fullWidth
              sx={{ mt: 2 }}
            />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Total: £{order.totalPrice.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePlaceOrder}
              disabled={!order.selectedProductId || order.quantity < 1}
              fullWidth
              sx={{ mt: 2 }}
            >
              Place Order
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
    </>
  );
}

export default BulkOrderPage;
