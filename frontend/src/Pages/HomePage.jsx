import React from 'react';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import NavBar from './Navbar';
import { useNavigate } from "react-router-dom";

const vegetables = [
  { name: 'Carrots', description: 'Fresh Carrots', imageUrl: 'https://ucarecdn.com/459eb7be-115a-4d85-b1d8-deaabc94c643/-/format/auto/-/preview/3000x3000/-/quality/lighter/' },
  { name: 'Tomatoes', description: 'Organic Tomatoes', imageUrl: 'https://media.post.rvohealth.io/wp-content/uploads/2020/09/AN313-Tomatoes-732x549-Thumb.jpg' },
  { name: 'Peppers', description: 'Bell Peppers', imageUrl: 'https://blog.lexmed.com/images/librariesprovider80/blog-post-featured-images/shutterstock_1901644783.jpg?sfvrsn=1986920b_0' },
];

const fruits = [
  { name: 'Apples', description: 'Red Apples', imageUrl: 'https://www.hexhamshireorganics.co.uk/cdn/shop/products/Orchard-Apples_1200x1200.jpg?v=1687558961' },
  { name: 'Bananas', description: 'Ripe Bananas', imageUrl: 'https://e3.365dm.com/23/11/1600x900/skynews-bananas-fruit_6377381.jpg?20231130101914' },
  { name: 'Oranges', description: 'Citrus Oranges', imageUrl: 'https://cdn.britannica.com/24/174524-050-A851D3F2/Oranges.jpg' },
];

const HomePage = () => {
  const navigate = useNavigate();

  const handleCardClick = (category) => {
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);

    if (user?.userType === 'user') {
      navigate(`/product?category=${category}`);
    } else {
      navigate(`/myproduct?category=${category}`);
    }
  };

  const createCardSection = (title, items, category) => (
    <>
      <Typography variant="h4" component="h2" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={4}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card onClick={() => handleCardClick(category)}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.imageUrl}
                  alt={item.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h3">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box textAlign="center" marginTop={2} marginBottom={4} sx={{ alignContent: 'flex-end' }}>
        <Button variant="contained" color="primary" onClick={() => handleCardClick(category)}>See More</Button>
      </Box>
    </>
  );

  return (
    <>
      <NavBar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h3" component="h1" color="black" textAlign="center" sx={{ fontWeight: 'bold' }}>
          Welcome to Our Marketplace
        </Typography>
        <Box
          sx={{
            height: 400,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: 'url(https://www.scripps.org/sparkle-assets/images/fruits_and_vegetables_1200x750-14d2361da5b94c82e03246168212ff6b.jpg)',
            backgroundSize: 'cover',
          }}
        />
        <Box my={4}>
          {createCardSection('Vegetables', vegetables, 'vegetables')}
        </Box>
        <Box my={4}>
          {createCardSection('Fruits', fruits, 'fruits')}
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
