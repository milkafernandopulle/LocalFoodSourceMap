import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Rating,
  Typography,
} from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

const ReviewDialog = ({ open, onClose, orderId, productId, userName, onReviewSubmit }) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleReviewSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/api/reviews`, {
        orderId,
        productId,
        userName,
        review,
        rating,
      });
      onReviewSubmit(response.data);
      Swal.fire({
        title: "Review Submitted!",
        text: "Your review has been submitted successfully.",
        icon: "success",
        button: "OK",
      });
      onClose();
    } catch (error) {
      console.error('Error submitting review:', error);
      Swal.fire({
        title: "Error!",
        text: "There was an error submitting your review. Please try again.",
        icon: "error",
        button: "OK",
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Submit Review</DialogTitle>
      <DialogContent>
        <Typography component="legend">Rating</Typography>
        <Rating
          name="rating"
          value={rating}
          onChange={(event, newValue) => setRating(newValue)}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Review"
          type="text"
          fullWidth
          variant="outlined"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleReviewSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewDialog;
