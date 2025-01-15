import Charity from '../models/Charity.js';

export const getCharities = async (req, res) => {
    try {
        const charities = await Charity.find({});
        const response = {
            success: true,
            message: "Charities retrieved successfully",
            data: charities,
            totalCharities: charities.length, 
        };
        res.json(response);
    } catch (error) {
        const response = {
            success: false,
            message: 'Error retrieving charities',
            error: error.message, 
        };
        res.status(500).json(response);
    }
}

export const createCharity = async (req, res) => {
    const charities = req.body;

    // Check if the request body is an array
    if (!Array.isArray(charities) || charities.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid data. Provide an array of charities.',
        });
    }

    // Validate each charity in the array
    const invalidCharity = charities.find(
        (charity) =>
            !charity.title || !charity.description || !charity.date || !charity.location
    );

    if (invalidCharity) {
        return res.status(400).json({
            success: false,
            message: 'Invalid charity data. All fields are required for each charity.',
            invalidCharity,
        });
    }

    try {
        // Insert multiple charities into the database
        const newCharities = await Charity.insertMany(charities);

        res.status(201).json({
            success: true,
            message: 'Charities created successfully',
            data: newCharities,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating charities',
            error: error.message,
        });
    }
};

export const updateCharity = async (req, res) => {
    const charityId = req.params.id;
    const charity = req.body;
    
    if (!charityId || !charity.title || !charity.description || !charity.date || !charity.location) {
        return res.status(400).json({
            success: false,
            message: 'Invalid charity data, all fields are required.'
        });
    }
    try {
        const updatedCharity = await Charity.findByIdAndUpdate(charityId, charity, { new: true });
        if (updatedCharity) {
            res.status(200).json({
                success: true,
                message: 'Charity updated successfully',
                data: updatedCharity
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Charity not found'
            });
        }
    } catch (error) {
        console.error(error); 
        res.status(500).json({
            success: false,
            message: 'Error updating charity',
            error: error.message
        });
    }
}

export const deleteCharity = async (req, res) => {
    try {
        const deleteCharity = await Charity.findByIdAndDelete(req.params.id);
        if (deleteCharity) {
            res.status(200).json(deleteCharity);
        } else {
            res.status(404).send('Charity not found');
        }
    } catch (error) {
        res.status(500).send('Error deleting charity');
    }
};


export const searchCharities = async (req, res) => {
    try {
        const { title, location, date } = req.query; // Extract search criteria from query parameters

        // Build a dynamic filter object
        const filter = {};
        if (title) filter.title = new RegExp(title, 'i'); // Case-insensitive search
        if (location) filter.location = new RegExp(location, 'i'); // Case-insensitive search
        if (date) filter.date = new Date(date); // Exact match for date

        // Fetch events based on filter
        const events = await Charity.find(filter);

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



