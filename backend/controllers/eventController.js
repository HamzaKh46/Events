import Event from '../models/Event.js';



export const getEvents = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

        const sortBy = req.query.sortBy || 'date';
        const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

        const events = await Event.find({})
            .sort({ [sortBy]: sortOrder }) // Apply sorting
            .limit(limit)
            .skip(offset);

        const totalEvents = await Event.countDocuments();

        if (events.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No events found for the given parameters',
                data: [],
            });
        }

        const response = {
            success: true,
            message: "Events retrieved successfully",
            data: events,
            pagination: {
                total: totalEvents,
                limit,
                offset,
                hasMore: offset + limit < totalEvents
            }
        };
        res.json(response);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving events',
            error: error.message,
        });
    }
};


export const createEvent = async (req, res) => {
    const event = req.body;
    if (!event.title || !event.description || !event.date || !event.location) {
        return res.status(400).json({
            success: false,
            message: 'Invalid event data, all fields are required.'
        });
    }
    try {
        const newEvent = await Event.create(event);
        res.status(201).json({
            success: true,
            message: 'Event created successfully',
            data: newEvent
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating event',
            error: error.message
        });
    }
}

export const updateEvent = async (req, res) => {
    const eventId = req.params.id;
    const event = req.body;
    
    if (!eventId || !event.title || !event.description || !event.date || !event.location) {
        return res.status(400).json({
            success: false,
            message: 'Invalid event data, all fields are required.'
        });
    }
    try {
        const updatedEvent = await Event.findByIdAndUpdate(eventId, event, { new: true });
        if (updatedEvent) {
            res.status(200).json({
                success: true,
                message: 'Event updated successfully',
                data: updatedEvent
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Event not found'
            });
        }
    } catch (error) {
        console.error(error); 
        res.status(500).json({
            success: false,
            message: 'Error updating event',
            error: error.message
        });
    }
}

export const deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (deletedEvent) {
            res.status(200).json(deletedEvent);
        } else {
            res.status(404).send('Event not found');
        }
    } catch (error) {
        res.status(500).send('Error deleting event');
    }
};

export const searchEvents = async (req, res) => {
    try {
        const { title, location, date } = req.query; // Extract search criteria from query parameters

        // Build a dynamic filter object
        const filter = {};
        if (title) filter.title = new RegExp(title, 'i'); // Case-insensitive search
        if (location) filter.location = new RegExp(location, 'i'); // Case-insensitive search
        if (date) filter.date = new Date(date); // Exact match for date

        // Fetch events based on filter
        const events = await Event.find(filter);

        // Response
        res.status(200).json({
            success: true,
            message: 'Events retrieved successfully',
            data: events
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error searching for events',
            error: error.message
        });
    }
};


    



