import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Container,
} from '@mui/material';
import NavBar from './Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';

const Orders = () => {
  const [pastOrders, setPastOrders] = useState([]);
  const userTypeStored = localStorage.getItem('user');
  const user = JSON.parse(userTypeStored);
  const userId = user.id;

  useEffect(() => {
    const fetchPastOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/orders/seller/${userId}`);
        setPastOrders(response.data);
      } catch (error) {
        console.error('Error fetching past orders:', error);
      }
    };

    fetchPastOrders();
  }, [userId]);

  // Function to handle the view order action
  const handleViewOrder = async (orderId) => {
    try {
      // Make API call to fetch order details
      const response = await axios.get(`http://localhost:4000/api/orders/${orderId}`);
      const orderDetails = response.data;

      // Display order details in a popup
      Swal.fire({
        title: 'Order Details',
        html: `
          <b>Order ID:</b> ${orderDetails._id}<br>
          <b>Date:</b> ${orderDetails.createdAt}<br>
          <b>Product ID:</b> ${orderDetails.productId}<br>
          <b>Items:</b> ${orderDetails.quantity}<br>
          <b>Total:</b> £${orderDetails.totalPrice}<br>
          <b>Status:</b> ${orderDetails.status}<br>
          <b>Customer ID:</b> ${orderDetails.userId}<br>
          <!-- Add more details as needed -->
        `,
        icon: 'info',
        confirmButtonColor: '#4caf50',
        confirmButtonText: 'Close',
        showCloseButton: true,
      });
    } catch (error) {
      console.error('Error fetching order details:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to fetch order details. Please try again later.',
        icon: 'error',
        confirmButtonColor: '#f44336',
        confirmButtonText: 'OK',
      });
    }
  };

  // Function to handle the mark as shipped action
  const handleMarkAsShipped = async (orderId) => {
    try {
      // Make API call to mark order as shipped
      await axios.put(`http://localhost:4000/api/orders/${orderId}`, { status: 'shipped' });
      // Update the order status locally after it's marked as shipped
      setPastOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: 'shipped' } : order
        )
      );
      // Show success message
      Swal.fire({
        title: 'Success!',
        text: 'Order marked as shipped successfully.',
        icon: 'success',
        confirmButtonColor: '#4caf50',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error('Error marking order as shipped:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to mark order as shipped. Please try again later.',
        icon: 'error',
        confirmButtonColor: '#f44336',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <>
      <NavBar />
      <Container>
        <Typography variant="h4" gutterBottom>
          My Orders
        </Typography>
        <Box sx={{ my: 4 }}>
          {pastOrders.map((order) => (
            <Card key={order._id} sx={{ mb: 2 }}>
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Order ID: {order._id}</Typography>
                <Typography color="textSecondary">Date: {order.createdAt}</Typography>
                <Typography color="textSecondary">Items: {order.quantity}</Typography>
                <Typography color="textSecondary">Total: ${order.totalPrice}</Typography>
                <Typography color="textSecondary">Status: {order.status}</Typography>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleViewOrder(order._id)}
                    sx={{ bgcolor: 'primary.main', color: 'white' }}
                  >
                    View Order
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleMarkAsShipped(order._id)}
                    sx={{ bgcolor: 'green', color: 'white' }}
                  >
                    Mark as Shipped
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default Orders;
