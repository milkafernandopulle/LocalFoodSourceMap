import React, { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, Button, Typography, Grid, Container, CardMedia, Box, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from './Navbar';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function EventDisplay() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/events');
                setEvents(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <>
            <NavBar />
            <Container sx={{ marginTop: '20px' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="30px">
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                        Upcoming Events
                    </Typography>
                    <Button variant="contained" color="secondary" component={Link} to="/event/create">
                        Add Event
                    </Button>
                </Box>
                <Grid container spacing={4} justifyContent="center">
                    {events.map((event, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 5, borderRadius: '12px' }}>
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={event.imageUrl || "https://cdn.mos.cms.futurecdn.net/25UeWUrVGmuXUjnG6Yt7rj.jpg"}
                                    alt={event.eventName}
                                    sx={{ borderRadius: '12px 12px 0 0' }}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" fontWeight="bold" component="div">
                                        {event.eventName}
                                    </Typography>
                                    <Box display="flex" alignItems="center" mb={1.5}>
                                        <EventIcon color="action" sx={{ marginRight: 1 }} />
                                        <Typography variant="body1" color="text.primary">
                                            {new Date(event.eventDate).toLocaleDateString('en-US', {
                                                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                                            })}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <AccessTimeIcon color="action" sx={{ marginRight: 1 }} />
                                        <Typography variant="body1" color="text.primary">
                                            {event.eventTime}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary">
                                        {event.eventDescription}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="medium"
                                        href={event.zoomLink}
                                        target="_blank"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ margin: '16px' }}
                                    >
                                        Join Event
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}

export default EventDisplay;
