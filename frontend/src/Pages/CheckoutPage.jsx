import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

const CheckoutPage = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });
  const orderDetails = JSON.parse(localStorage.getItem('orders'));


  const handleChange = (event) => {
    const { name, value } = event.target;
    setPaymentDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handlePayment = async () => {
    // Retrieve order details from localStorage
    const orderDetails = JSON.parse(localStorage.getItem('orders'));
    const userTypeStored = localStorage.getItem('user');
    const user = JSON.parse(userTypeStored);
  
    try {
      // Make API call to create the order
      const response = await axios.post('http://localhost:4000/api/orders', {
        userId: user.id, // Set sellerId as userId
        sellerId: orderDetails[0].userId[0], // Set actual user ID as sellerId
        productId: orderDetails[0].productId,
        quantity: orderDetails[0].quantity,
        totalPrice: orderDetails[0].totalPrice,
        status: "pending"
      });
      console.log('Order created:', response.data);
      Swal.fire({
        title: 'Payment Successful!',
        text: 'Your order has been placed.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      });
      localStorage.removeItem('orders');
      window.location.href="/"
    } catch (error) {
      console.error('Error creating order:', error);
      Swal.fire({
        title: 'Payment Failed!',
        text: 'There was an error processing your payment.',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Try Again'
      });
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={6} style={{ marginTop: 30, padding: 20 }}>
        <Typography component="h1" variant="h5" gutterBottom>
          Checkout
        </Typography>
        <Grid container spacing={4}>
          {/* Order Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Order Details
            </Typography>
            {/* Display order details here */}
            {/* For demonstration, let's assume the order details are available */}
            {/* Replace the content below with your actual order details */}
            <Typography variant="body1">
              Product: {orderDetails[0].productName}<br />
              Quantity: {orderDetails[0].quantity}<br />
              Total Price: {orderDetails[0].totalPrice}
            </Typography>
          </Grid>
          {/* Payment Details */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Payment Details
            </Typography>
            {/* Payment form */}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="cardNumber"
                label="Card Number"
                name="cardNumber"
                autoComplete="cc-number"
                autoFocus
                value={paymentDetails.cardNumber}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="nameOnCard"
                label="Name on Card"
                name="nameOnCard"
                autoComplete="cc-name"
                value={paymentDetails.nameOnCard}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="expiryDate"
                label="Expiry Date"
                name="expiryDate"
                autoComplete="cc-exp"
                placeholder="MM/YY"
                value={paymentDetails.expiryDate}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="cvv"
                label="CVV"
                name="cvv"
                autoComplete="cc-csc"
                type="password"
                value={paymentDetails.cvv}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: 20 }}
                onClick={handlePayment}
              >
                Pay
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CheckoutPage;
