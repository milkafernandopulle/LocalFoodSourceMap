import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  MenuItem,
  Grid,
} from '@mui/material';
import NavBar from './Navbar';
import axios from 'axios';

const initialFormData = {
  region: '',
  plantingSeason: '',
  landArea: '',
  budget: '',
  soilType: '',
  N: '',
  P: '',
  K: '',
  temperature: '',
  humidity: '',
  ph: '',
  rainfall: '',
};

const colors = ['lime', 'yellow','lightblue'];

const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
const soilTypes = ['Sandy', 'Clay', 'Loamy'];
const regions = ['New England', 'Mid-Atlantic', 'Southeast', 'Midwest', 'Southwest', 'Rocky Mountains', 'Pacific Northwest', 'California'];

const Analysis = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [results, setResults] = useState([]);
  const [recommendedCrops, setRecommendedCrops] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAnalysis = async () => {
    // API call to get farming analysis results
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        N: formData.N,
        P: formData.P,
        K: formData.K,
        temperature: formData.temperature,
        humidity: formData.humidity,
        ph: formData.ph,
        rainfall: formData.rainfall,
      });

      if (response.status === 200) {
        console.log('Analyzing with: ', formData);
        setRecommendedCrops(response.data.top_3_crops);
        setResults(response.data.results);
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      <NavBar />
      <Container sx={{ mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          Farming Analysis
        </Typography>
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Input Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                required
                select
                label="Region"
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                fullWidth
                helperText="Select your region"
              >
                {regions.map((region) => (
                  <MenuItem key={region} value={region}>
                    {region}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                required
                select
                label="Planting Season"
                name="plantingSeason"
                value={formData.plantingSeason}
                onChange={handleInputChange}
                fullWidth
                helperText="Select the planting season"
              >
                {seasons.map((season) => (
                  <MenuItem key={season} value={season}>
                    {season}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                required
                select
                label="Soil Type"
                name="soilType"
                value={formData.soilType}
                onChange={handleInputChange}
                fullWidth
                helperText="Select the soil type"
              >
                {soilTypes.map((soilType) => (
                  <MenuItem key={soilType} value={soilType}>
                    {soilType}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                required
                label="Land Area (ha)"
                name="landArea"
                type="number"
                value={formData.landArea}
                onChange={handleInputChange}
                fullWidth
                helperText="Enter the land area in hectares"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                required
                label="Budget (£/ha)"
                name="budget"
                type="number"
                value={formData.budget}
                onChange={handleInputChange}
                fullWidth
                helperText="Enter the budget per hectare"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                required
                label="Nitrogen Content (N)"
                name="N"
                type="number"
                value={formData.N}
                onChange={handleInputChange}
                fullWidth
                helperText="Enter the nitrogen content"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                required
                label="Phosphorus Content (P)"
                name="P"
                type="number"
                value={formData.P}
                onChange={handleInputChange}
                fullWidth
                helperText="Enter the phosphorus content"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                required
                label="Potassium Content (K)"
                name="K"
                type="number"
                value={formData.K}
                onChange={handleInputChange}
                fullWidth
                helperText="Enter the potassium content"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                required
                label="Temperature (°F)"
                name="temperature"
                type="number"
                value={formData.temperature}
                onChange={handleInputChange}
                fullWidth
                helperText="Enter the temperature"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                required
                label="Humidity (%)"
                name="humidity"
                type="number"
                value={formData.humidity}
                onChange={handleInputChange}
                fullWidth
                helperText="Enter the humidity percentage"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                required
                label="pH Level"
                name="ph"
                type="number"
                value={formData.ph}
                onChange={handleInputChange}
                fullWidth
                helperText="Enter the pH level"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                required
                label="Rainfall (mm)"
                name="rainfall"
                type="number"
                value={formData.rainfall}
                onChange={handleInputChange}
                fullWidth
                helperText="Enter the rainfall amount"
              />
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" onClick={handleAnalysis} sx={{ mt: 3 }}>
            Analyze
          </Button>
        </Paper>
        {recommendedCrops.length > 0 && (
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Top 3 Recommended Crops
            </Typography>
            <Typography variant="body1">
              {
                recommendedCrops.map((i,index)=> <span style={{display:'inline-block', borderRadius:4, marginRight:4, background:colors[index], paddingRight:6, paddingLeft:6}}>{i}</span>)
              }
            </Typography>
          </Paper>
        )}
        <TableContainer component={Paper} style={{marginBottom:100}}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Plant Variety</TableCell>
                <TableCell align="right">Expected Yield (kg/ha)</TableCell>
                <TableCell align="right">Cost of Cultivation (£/ha)</TableCell>
                <TableCell align="right">Expected Market Price (£/kg)</TableCell>
                <TableCell align="right">Historical Profitability (£)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((row, index) => (
                <TableRow key={index} style={{background:colors[index]}}>
                  <TableCell component="th" scope="row">
                    {row.plantVariety}
                  </TableCell>
                  <TableCell align="right">{row.expectedYield}</TableCell>
                  <TableCell align="right">{row.costOfCultivation}</TableCell>
                  <TableCell align="right">{row.expectedMarketPrice}</TableCell>
                  <TableCell align="right">{row.historicalProfitability}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Analysis;
