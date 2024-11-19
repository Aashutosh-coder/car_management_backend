const Car = require('../Models/Car');



const addCar = async (req, res) => {

    try {
        const { title, description, tags } = req.body;
        const images = req.files.map(file => file.path); // Save file paths
  

        // Ensure req.user exists and contains the userId
        if (!req.user || !req.user._id) {
            return res.status(400).json({ message: 'User ID is missing in the request' });
        }

        const car = new Car({
            userId: req.user._id, // From auth middleware
            title,
            description,
            tags,
            images
        });
        
        await car.save();

        res.status(201).json({ message: 'Car added successfully', car });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add car', error: error.message });
    }
};

module.exports = { addCar };


