import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Container, CircularProgress } from '@mui/material';
import axios from 'axios';

function EventDetails() {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const { eventId } = useParams();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/events/${eventId}`);
                setEvent(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching event:', error);
                setLoading(false);
            }
        };

        fetchEvent();
    }, [eventId]);

    if (loading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    if (!event) {
        return (
            <Container>
                <Typography variant="h5">Event not found</Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Card>
                <CardContent>
                    <Typography variant="h4" component="div">
                        {event.eventName}
                    </Typography>
                    <Typography color="text.secondary">
                        Date: {event.eventDate} at {event.eventTime}
                    </Typography>
                    <Typography variant="body1" style={{ marginTop: '20px' }}>
                        {event.eventDescription}
                    </Typography>
                    <Typography variant="body2" color="primary" style={{ marginTop: '10px' }}>
                        Zoom Link: <a href={event.zoomLink} target="_blank" rel="noopener noreferrer">{event.zoomLink}</a>
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
}

export default EventDetails;
