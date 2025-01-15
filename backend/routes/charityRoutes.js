import express from 'express';


import { getCharities } from '../controllers/charityController.js';
import { createCharity } from '../controllers/charityController.js';
import { updateCharity } from '../controllers/charityController.js';
import { deleteCharity } from '../controllers/charityController.js';
import { searchCharities } from '../controllers/charityController.js';


const router = express.Router();

router.get('/', getCharities);

router.post('/', createCharity);

router.put('/:id', updateCharity);

router.delete('/:id', deleteCharity);

router.get('/search', searchCharities);

export default router;
