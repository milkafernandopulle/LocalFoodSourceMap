import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, CardActions, Button, TextField, Box, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NavBar from './Navbar';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const fruits = ['mango', 'strawberry', 'apple', 'pear', 'cherry', 'peach', 'raspberry', 'kiwi', 'pomegranate', 'papaya'];
const vegetables = ['bell pepper', 'cabbage', 'broccoli', 'spinach', 'zucchini', 'cauliflower', 'onion', 'pumpkin', 'avocado'];


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sort, setSort] = useState('');
    const [category, setCategory] = useState('all');
    const query = useQuery();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const categoryParam = query.get('category');
        if (categoryParam) {
            setCategory(categoryParam);
        }
    }, [query]);

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
        console.log(event.target.value);
        window.location.search = `category=${event.target.value}`;
    };

    const filteredProducts = products
        .filter(product => product.name.toLowerCase().includes(searchTerm))
        .filter(product => product.quantity > 0) // Filter products with quantity > 0
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
                    Available Products
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
                                    <Typography gutterBottom variant="h5" component="div">
                                        {product.name}
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
                                    <Button size="small" color="primary" component={Link} to={`/product/${product._id}`}> {/* Link to product details page */}
                                        View Details
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

export default ProductsPage;
