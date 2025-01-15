# Node.js CRUD Project

## Project Description
This is a Node.js project demonstrating CRUD (Create, Read, Update, Delete) functionality for three entities: `events`, `tickets`, and `charities`. The backend is built with **Express.js**, uses **MongoDB Atlas** for the database, and includes validation with **Joi**.

---

## Features
- **Events**: Manage events with fields like title, description, date, and location.
- **Tickets**: Manage tickets linked to events with fields like price, quantity, and status.
- **Charities**: Manage charity data with search functionality.
- Pagination, sorting, and validation are implemented for better data handling.

---

## Setup Instructions

### 1. Clone the Repository
```bash
https://github.com/HamzaKh46/Events.git
cd NodeProject
```

### 2. Install Dependecies
npm install

### 3. Seed the Database (Optional)
node ./backend/seed.js
This will seed the events and tickets collections with predefined sample data.

### 4. Start The Server
npm run dev
