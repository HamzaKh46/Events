import Event from '../models/Event.js';
import mongoose from 'mongoose'; // Add this line to import mongoose
import Ticket from '../models/Ticket.js';
import Joi from 'joi';

export const validateTicket = (req, res, next) => {
    const schema = Joi.object({
        event: Joi.string().custom((value, helper) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helper.message('Invalid event ID.');
            }
            return value;
        }).required(),
        price: Joi.number().positive().required().messages({
            'number.base': 'Price must be a number.',
            'number.positive': 'Price must be a positive number.',
            'any.required': 'Price is required.',
        }),
        quantity: Joi.number().integer().min(0).required().messages({
            'number.base': 'Quantity must be a number.',
            'number.integer': 'Quantity must be an integer.',
            'number.min': 'Quantity cannot be negative.',
            'any.required': 'Quantity is required.',
        }),
        status: Joi.string().valid('available', 'sold out').required().messages({
            'any.only': 'Status must be one of ["available", "sold out"].',
            'any.required': 'Status is required.',
        }),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            details: error.details[0].message,
        });
    }

    next(); // Proceed if validation passes
};

export const createTicket = async (req, res) => {
    const { event, price, quantity, status } = req.body;

    console.log('Raw event ID:', event, '| Length:', event.length);
    console.log('Event Collection Name:', Event.collection.name);


    try {
        const existingEvent = await Event.findById(event.trim());
        console.log('Event Query Result:', existingEvent);

        if (!existingEvent) {
            return res.status(404).json({
                success: false,
                message: 'Event not found.',
            });
        }

        const ticket = new Ticket({ event, price, quantity, status });
        const newTicket = await ticket.save();

        res.status(201).json({
            success: true,
            message: 'Ticket created successfully.',
            data: newTicket,
        });
    } catch (error) {
        console.error('Error creating ticket:', error.message);
        res.status(500).json({
            success: false,
            message: 'Error creating ticket.',
            error: error.message,
        });
    }
};






export const getTickets = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10; // Default to 10 
        const offset = parseInt(req.query.offset) || 0; 

        const tickets = await Ticket.find({})
            .skip(offset)
            .limit(limit);

        const totalTickets = await Ticket.countDocuments();

        res.status(200).json({
            success: true,
            message: 'Tickets retrieved successfully',
            data: tickets,
            pagination: {
                total: totalTickets,
                limit,
                offset,
                hasMore: offset + limit < totalTickets
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving tickets',
            error: error.message
        });
    }
};

export const getTicketById = async (req, res) => {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid ticket ID format.',
        });
    }

    try {
        const ticket = await Ticket.findById(id).populate('event');
        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: 'Ticket not found.',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Ticket retrieved successfully.',
            data: ticket,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving ticket.',
            error: error.message,
        });
    }
};

export const updateTicket = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedTicket) {
            return res.status(404).json({
                success: false,
                message: 'Ticket not found.',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Ticket updated successfully.',
            data: updatedTicket,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating ticket.',
            error: error.message,
        });
    }
};
export const deleteTicket = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTicket = await Ticket.findByIdAndDelete(id);
        if (!deletedTicket) {
            return res.status(404).json({
                success: false,
                message: 'Ticket not found.',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Ticket deleted successfully.',
            data: deletedTicket,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting ticket.',
            error: error.message,
        });
    }
};


