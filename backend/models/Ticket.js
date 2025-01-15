import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event', // Reference to the Event model
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['available', 'sold out'], // Restrict status to specific values
        required: true,
    },
}); 

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
