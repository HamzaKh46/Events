import express from 'express';

import { getEvents } from '../controllers/eventController.js';
import { createEvent } from '../controllers/eventController.js';
import { updateEvent } from '../controllers/eventController.js';
import { deleteEvent } from '../controllers/eventController.js';
import { searchEvents } from '../controllers/eventController.js';


import mongoose, { get } from 'mongoose';


const router = express.Router();

router.get('/', getEvents);

router.post('/', createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

router.get('/search', searchEvents);



export default router;
