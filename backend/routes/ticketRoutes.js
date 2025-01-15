import express from 'express';
import {
    createTicket,
    getTickets,
    getTicketById,
    updateTicket,
    deleteTicket,
    validateTicket
    
} from '../controllers/ticketController.js';

const router = express.Router();

router.post('/', validateTicket, createTicket);
router.get('/', getTickets);
router.get('/:id', getTicketById); 
router.put('/:id', updateTicket);
router.delete('/:id', deleteTicket); 

export default router;
