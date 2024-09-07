import React, { useState } from 'react';
import { Button, Typography, Container, Paper, TextField } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavBar from './Navbar';
import { useNavigate } from 'react-router-dom';

function EventCreate() {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const userTypeStored = localStorage.getItem('user');
    const user = JSON.parse(userTypeStored);
    const userId = user.id;
    const [eventData, setEventData] = useState({
        eventName: '',
        eventDescription: '',
        eventDate: '',
        eventTime: '',
        zoomLink: '',
        creatorId: userId,
        creatorName: user.name
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(eventData);
            const response = await axios.post('http://localhost:4000/api/events', eventData);
            Swal.fire(
                'Success!',
                'Event has been created successfully.',
                'success'
            );
            console.log('Event created:', response.data);

            // Redirect to the events page upon successful creation
            navigate('/event');
        } catch (error) {
            Swal.fire(
                'Error!',
                'Failed to create the event. Please try again.',
                'error'
            );
            console.error('Failed to create event:', error);
        }
    };

    return (
        <div>
            <NavBar />
            <Container component="main" maxWidth="sm">
                <Paper elevation={6} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
                    <Typography component="h1" variant="h5">
                        Create New Event
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '1rem' }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="eventName"
                            name="eventName"
                            label="Event Name"
                            value={eventData.eventName}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="eventDescription"
                            label="Event Description"
                            type="text"
                            multiline
                            rows={4}
                            value={eventData.eventDescription}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="eventDate"
                            label="Event Date"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={eventData.eventDate}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="eventTime"
                            label="Event Time"
                            type="time"
                            InputLabelProps={{ shrink: true }}
                            value={eventData.eventTime}
                            onChange={handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="zoomLink"
                            label="Zoom Link"
                            type="url"
                            value={eventData.zoomLink}
                            onChange={handleInputChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: 'primary.main' }}
                        >
                            Create Event
                        </Button>
                    </form>
                </Paper>
            </Container>
        </div>
    );
}

export default EventCreate;
