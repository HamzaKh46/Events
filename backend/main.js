import express from 'express';
import dotenv from 'dotenv';
import { connectDb } from './database/migration.js';
import Event from './models/Event.js';
import { get } from 'mongoose';
import eventRoutes from './routes/eventRoutes.js';
import charityRoutes from './routes/charityRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';


const app = express();
const port = 3000;

dotenv.config();

app.use(express.json());


app.use("/api/events", eventRoutes); 
app.use('/api/charities', charityRoutes);
app.use('/api/tickets', ticketRoutes);

app.use(express.static('public'));

app.listen(port, async () => {

  connectDb();
  console.log(`App listening at http://localhost:${port}`);


});


import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

