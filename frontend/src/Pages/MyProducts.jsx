import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, CardActions, Button, TextField, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NavBar from './Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

const fruits = ['apple', 'mango', 'strawberry'];
const vegetables = ['bell pepper', 'cabbage', 'eggplant'];

function MyProducts() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sort, setSort] = useState('');
    const [category, setCategory] = useState('all');
    const userTypeStored = localStorage.getItem('user');
    const user = JSON.parse(userTypeStored);
    const userId = user.id;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/products/user/${userId}`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [userId]);

    useEffect(() => {
        // Sorting products based on the selected sort option
        setProducts((prevProducts) => {
            return [...prevProducts].sort((a, b) => {
                if (sort === 'name') {
                    return a.name.localeCompare(b.name);
                } else if (sort === 'price') {
                    return a.price - b.price;
                }
                return 0;
            });
        });
    }, [sort]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const handleSortChange = (event) => {
        setSort(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const filteredProducts = products
        .filter(product => product.name.toLowerCase().includes(searchTerm))
        .filter(product => {
            if (category === 'all') return true;
            if (category === 'fruits') return fruits.includes(product.name.toLowerCase());
            if (category === 'vegetables') return vegetables.includes(product.name.toLowerCase());
            return true;
        });

    return (
        <>
            <NavBar />
            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>
                    My Products
                </Typography>
                <Box sx={{ display: 'flex', marginBottom: 2 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search products"
                        margin="normal"
                        InputProps={{
                            endAdornment: <SearchIcon />
                        }}
                        onChange={handleSearchChange}
                    />
                    <FormControl fullWidth margin="normal" sx={{ marginLeft: 2, width: '200px' }}>
                        <InputLabel>Sort By</InputLabel>
                        <Select
                            value={sort}
                            label="Sort By"
                            onChange={handleSortChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="name">Name</MenuItem>
                            <MenuItem value="price">Price</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal" sx={{ marginLeft: 2, width: '200px' }}>
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={category}
                            label="Category"
                            onChange={handleCategoryChange}
                        >
                            <MenuItem value="all">
                                <em>All</em>
                            </MenuItem>
                            <MenuItem value="fruits">Fruits</MenuItem>
                            <MenuItem value="vegetables">Vegetables</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Grid container spacing={4}>
                    {filteredProducts.map((product) => (
                        <Grid item key={product._id} xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={product.imageUrl}
                                    alt={product.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">{product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.description}
                                    </Typography>
                                    <Typography variant="body1">
                                        Price: £{product.price}
                                    </Typography>
                                    <Typography variant="body1">
                                        Available Quantity: {product.quantity}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary" component={Link} to={`/product/${product._id}/edit`}> {/* Link to product edit page */}
                                        Edit Details
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
}

export default MyProducts;
