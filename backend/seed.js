import mongoose from 'mongoose';
import Event from './models/Event.js';
import Ticket from './models/Ticket.js';


import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Database connection
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1);
    }
};

// Seed data
const seedData = async () => {
    try {
        // Clear existing data
        await Event.deleteMany({});
        await Ticket.deleteMany({});
        console.log('Cleared existing data');

        // Add events
        const events = await Event.insertMany([
            {
                title: 'Tech Innovation Summit',
                description: 'Explore the latest in technology and innovation.',
                date: new Date('2025-01-20'),
                location: 'San Francisco',
            },
            {
                title: 'Health and Wellness Workshop',
                description: 'A workshop to improve your overall health and wellness.',
                date: new Date('2024-12-01'),
                location: 'Los Angeles',
            },
            {
                title: 'Music Festival 2025',
                description: 'A day filled with music and joy.',
                date: new Date('2025-06-30'),
                location: 'Chicago',
            },
        ]);
        console.log('Events seeded successfully:', events);

        // Add tickets linked to events
        const tickets = await Ticket.insertMany([
            {
                event: events[0]._id,
                price: 50.0,
                quantity: 200,
                status: 'available',
            },
            {
                event: events[1]._id,
                price: 30.0,
                quantity: 150,
                status: 'available',
            },
            {
                event: events[2]._id,
                price: 75.0,
                quantity: 100,
                status: 'available',
            },
        ]);
        console.log('Tickets seeded successfully:', tickets);

        // Close connection
        mongoose.connection.close();
        console.log('Seeding completed');
    } catch (error) {
        console.error('Error seeding data:', error.message);
        mongoose.connection.close();
    }
};

// Run the seeder
connectDb().then(seedData);
