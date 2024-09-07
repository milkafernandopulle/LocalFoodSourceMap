require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import cors module
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const bulkRoutes = require('./routes/bulkRoutes');
const eventRoutes = require('./routes/eventRoutes');
const routes = require('./routes/communityPostRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
  }));
  

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/bulk', bulkRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/community-posts', routes);
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
