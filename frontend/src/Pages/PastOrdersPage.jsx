import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Container,
  Alert,
  Dialog,
} from '@mui/material';
import NavBar from './Navbar';
import axios from 'axios';
import ReviewDialog from './ReviewDialog';

const PastOrdersPage = () => {
  const [pastOrders, setPastOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [error, setError] = useState(null);  // Error state
  const userTypeStored = localStorage.getItem('user');
  const user = JSON.parse(userTypeStored);
  const userId = user.id;

  useEffect(() => {
    const fetchPastOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/orders/user/${userId}`);
        setPastOrders(response.data);
      } catch (error) {
        setError('Error fetching past orders. Please try again later.'); // Set error message
        console.error('Error fetching past orders:', error);
      }
    };

    fetchPastOrders();
  }, [userId]);

  const handleOpenReviewDialog = (order) => {
    setSelectedOrder(order);
    setOpenReviewDialog(true);
  };

  const handleCloseReviewDialog = () => {
    setOpenReviewDialog(false);
    setSelectedOrder(null);
  };

  const handleReviewSubmit = (newReview) => {
    // Update past orders or handle review submission success
    console.log('Review submitted:', newReview);
  };

  // Function to determine the color based on the status
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'yellow';
      case 'delivered':
        return 'green';
      case 'cancelled':
        return 'red';
      default:
        return 'yellow';
    }
  };

  return (
    <>
      <NavBar />
      <Container>
        {/* Error Alert should be placed before the review dialog and should have a high z-index */}
        {error && (
          <Box sx={{ position: 'fixed', top: 10, left: '50%', transform: 'translateX(-50%)', zIndex: 1500 }}>
            <Alert severity="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          </Box>
        )}
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
                <Typography color="textSecondary">Total: £{order.totalPrice}</Typography>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    disabled
                    sx={{ bgcolor: getStatusColor(order.status), color: 'white' }}
                  >
                    {order.status}
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleOpenReviewDialog(order)}
                  >
                    Review
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
      {/* Review Dialog should come after the error alert */}
      {selectedOrder && (
        <ReviewDialog
          open={openReviewDialog}
          onClose={handleCloseReviewDialog}
          orderId={selectedOrder._id}
          productId={selectedOrder.productId} // Assuming order has productId
          userName={user.name}
          onReviewSubmit={handleReviewSubmit}
        />
      )}
    </>
  );
};

export default PastOrdersPage;
