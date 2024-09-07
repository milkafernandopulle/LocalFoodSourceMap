import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import HistoryIcon from '@mui/icons-material/History';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import { green } from '@mui/material/colors';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import MapIcon from '@mui/icons-material/Map';
import EventIcon from '@mui/icons-material/Event';

// Import your page components
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import ProductUpload from './Pages/ProductUpload';
import ProductsPage from './Pages/ProductPage';
import SingleProduct from './Pages/SingleProduct';
import ProductEditPage from './Pages/ProductEditPage';
import ProfilePage from './Pages/ProfilePage';
import BulkOrderPage from './Pages/BulkOrderPage';
import HomePage from './Pages/HomePage';
import PastOrdersPage from './Pages/PastOrdersPage';
import Analysis from './Pages/Analysis';
import MapComponent from './Pages/MapComponent';
import CheckoutPage from './Pages/CheckoutPage';
import MyProducts from './Pages/MyProducts';
import Orders from './Pages/Orders';
import EventCreate from './Pages/EventCreate';
import EventDetails from './Pages/EventDetails';
import EventDisplay from './Pages/EventDisplay';
import CommunityPage from './Pages/CommunityPage';

const drawerWidth = 240;

function App() {
  // State to manage the user type
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    // Fetch the user type from local storage on component mount
    try {
    const userTypeStored = localStorage.getItem('user');
    const user = JSON.parse(userTypeStored);
    setUserType(user.userType);
    }
    catch(error){
      setUserType(null);
    }
  }, []);

  const commonMenuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
  ];

  const userMenuItems = [
    { text: 'Profile', icon: <AccountCircleIcon />, path: '/profile' },
    { text: 'Products', icon: <ShoppingCartIcon />, path: '/product' },
    { text: 'Bulk Order', icon: <ShoppingCartIcon />, path: '/bulkorder' },
    { text: 'Past Orders', icon: <HistoryIcon />, path: '/pastorders' },
    { text: 'Map', icon: <MapIcon />, path: '/map'},
    { text: 'Events', icon: <EventIcon />, path: '/event'},
    { text: 'Community', icon: <NaturePeopleIcon />, path: '/community' },
  ];

  const farmerMenuItems = [
    { text: 'Add Product', icon: <LibraryAddIcon />, path: '/addproduct' },
    { text: 'My Products', icon: <NaturePeopleIcon />, path: '/myproduct' },
    { text: 'Orders', icon: <ShoppingCartIcon />, path: '/order' },
    { text: 'Profile', icon: <AccountCircleIcon />, path: '/profile' },
    { text: 'Analysis', icon: <AutoGraphIcon />, path: '/analytics' },
    { text: 'Events', icon: <EventIcon />, path: '/event'},
    { text: 'Community', icon: <NaturePeopleIcon />, path: '/community' },
  ];

  // Function to get the correct menu items based on user type
  const getMenuItems = () => {
    switch (userType) {
      case 'user':
        return [...commonMenuItems, ...userMenuItems];
      case 'farmer':
        return [...commonMenuItems, ...farmerMenuItems];
      default:
        return commonMenuItems;
    }
  };

  const Sidebar = () => (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', bgcolor: green[500] },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {getMenuItems().map((item, index) => (
            <ListItem button key={item.text} component={Link} to={item.path}>
              <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: 'white' }} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {/* Render the sidebar only if the user is logged in */}
        {userType && <Sidebar />}
        <Box
          component="main"
          sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', marginTop: -8 }} // Remove top margin
        >
          <Toolbar />
          <Routes>
            {/* Routes without sidebar */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            {/* Routes with sidebar */}
            <Route path="/" element={<HomePage />} />
            <Route path="/addproduct" element={<ProductUpload />} />
            <Route path="/product" element={<ProductsPage />} />
            <Route path="/product/:productId" element={<SingleProduct />} />
            <Route path="/product/:productId/edit" element={<ProductEditPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/bulkorder" element={<BulkOrderPage />} />
            <Route path="/pastorders" element={<PastOrdersPage />} />
            <Route path="/analytics" element={<Analysis />} />
            <Route path='checkout' element={<CheckoutPage />} />
            {/* //AIzaSyDtWm_HSFCxyaP24QKYNekeIX-pYqeXKJc */}
            <Route path='/map' element={<MapComponent />} />
            <Route path='/myproduct' element={<MyProducts />} />
            <Route path='/order' element={<Orders />} />
            <Route path='/event/create' element={<EventCreate />} />
            <Route path='/event/:eventId' element={<EventDetails />} />
            <Route path='/event' element={<EventDisplay />} />
            <Route path='/community' element={<CommunityPage />} />
            {/* Add more routes here */}
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
