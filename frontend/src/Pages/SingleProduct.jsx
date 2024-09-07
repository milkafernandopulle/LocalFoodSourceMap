import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Container,
  Grid,
  TextField,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from './Navbar';
import Rating from '@mui/material/Rating';

const SingleProductPage = () => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams(); // Extracting the id parameter from the URL

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/products/${productId}`);
        setProduct(response.data);
        fetchRelatedProducts(response.data.userId);
        fetchReviews(response.data._id);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [productId]);

  const fetchRelatedProducts = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/products/user/${userId}`);
      setRelatedProducts(response.data);
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  const fetchReviews = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/reviews/product/${productId}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleQuantityChange = (event) => {
    const inputQuantity = parseInt(event.target.value, 10);

    if (!isNaN(inputQuantity) && inputQuantity > 0 && inputQuantity <= product.quantity) {
      setQuantity(inputQuantity);
    } else if (inputQuantity > product.quantity) {
      alert(`Only ${product.quantity} items available in stock.`);
      setQuantity(product.quantity);
    } else {
      setQuantity(1); // Default to 1 if input is invalid or less than 1
    }
  };

  const handleAddToCart = () => {
    if (quantity > product.quantity) {
      alert(`Only ${product.quantity} items available in stock.`);
      return;
    }

    // Construct order details
    const orderDetails = {
      userId: product.userId,
      productId: product._id,
      productName: product.name,
      quantity: quantity,
      totalPrice: quantity * product.price,
    };

    // Save order details to local storage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(orderDetails);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Redirect to checkout page
    window.location.href = '/checkout'; // Assuming the checkout page is at '/checkout'
  };

  if (!product) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  return (
    <>
      <NavBar />
      <Container>
        <Box sx={{ my: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia component="img" image={product.imageUrl} alt={product.name} />
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" component="h2">
                {product.name}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {product.description}
              </Typography>
              <Typography variant="h6" color="primary" sx={{ my: 2 }}>
                £{product.price * quantity}
              </Typography>
              <TextField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                inputProps={{ min: 1, max: product.quantity }}
                fullWidth
                sx={{ my: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<ShoppingCartIcon />}
                sx={{ my: 2 }}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Button style={{display:'none'}} variant="outlined" startIcon={<FavoriteBorderIcon />} sx={{ my: 2 }}>
                Add to Wishlist
              </Button>
              <Typography variant="body1" sx={{ my: 2 }}>
                Product Description
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="h6" sx={{ my: 4 }}>
            Related Products
          </Typography>
          <Grid container spacing={2}>
            {relatedProducts.map((relatedProduct) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={relatedProduct._id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={relatedProduct.imageUrl}
                    alt={relatedProduct.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                      {relatedProduct.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      £{relatedProduct.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" component={Link} to={`/product/${relatedProduct._id}`}>
                      View
                    </Button>{' '}
                    {/* Link to related product page */}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Typography variant="h6" sx={{ my: 4 }}>
            Reviews
          </Typography>
          <Grid container spacing={2}>
            {reviews.map((review) => (
              <Grid item xs={12} key={review._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{review.userName}</Typography>
                    <Rating value={review.rating} readOnly />
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      {review.review}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default SingleProductPage;
