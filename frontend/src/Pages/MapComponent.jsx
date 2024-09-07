import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { TextField, Box, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { Icon } from 'leaflet';

const productOptions = [
  'apple',
  'mango',
  'strawberry',
  'bell pepper',
  'cabbage',
  'eggplant'
];

const MapComponent = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  const foodIcon = new Icon({
    iconUrl: 'https://img.icons8.com/doodle/48/apple.png',
    iconSize: [35, 35], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/products');
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    (product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.description.toLowerCase().includes(search.toLowerCase())) &&
    (filter === '' || product.name.toLowerCase() === filter.toLowerCase())
  );

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Product Locations
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
          <InputLabel>Filter By</InputLabel>
          <Select
            value={filter}
            label="Filter By"
            onChange={handleFilterChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {productOptions.map(option => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <MapContainer center={[51.5077082,-0.1271894]} zoom={15} style={{ height: '100vh', width: '100%' }} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredProducts.map(product => (
          <Marker
            key={product._id} // Assuming _id is the unique identifier for products
            position={[product.lattitude, product.longitude]}
            icon={foodIcon}
          >
            <Popup>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={product.imageUrl} alt={product.name} style={{ width: 80, height: 80, marginRight: 10, borderRadius: '5px 0 0 5px' }} />
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Price: £{product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                  <a href={`http://localhost:3000/product/${product._id}`} target="_blank" rel="noopener noreferrer">Visit Product</a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}

export default MapComponent;
