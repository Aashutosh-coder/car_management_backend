const express = require('express');
const { addCar } = require('../Controllers/CarController');
const ensureAuthenticated = require('../Middlewares/Auth');
const upload = require('../Middlewares/ImageUpload'); 
const Car = require('../Models/Car')
const router = express.Router();

// Add Car Route
router.post('/add', ensureAuthenticated, (req, res, next) => {
    upload.array('images', 10)(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: err.message });
        }
        next();
    });
}, addCar);




// Route to fetch cars for the logged-in user
router.get('/user-cars', ensureAuthenticated, async (req, res) => {
    try {
        const userId = req.user._id; // Auth middleware provides user ID
        console.log(userId);
        const cars = await Car.find({ userId }); // Find cars by userId
        res.status(200).json(cars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch cars', error: error.message });
    }
});

router.delete('/delete/:id', ensureAuthenticated, async (req, res) => {
    try {
        const carId = req.params.id;
        await Car.findByIdAndDelete(carId);
        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete car', error: error.message });
    }
});

router.get('/:id', ensureAuthenticated, async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch car', error: error.message });
    }
});

router.put('/update/:id', ensureAuthenticated, async (req, res) => {
    try {
        const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedCar);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update car', error: error.message });
    }
});

router.get('/:id', ensureAuthenticated, async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(car);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, tags } = req.body;

    try {
        const car = await Car.findByIdAndUpdate(
            id,
            { title, description, tags },
            { new: true }
        );
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.json(car);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update car', error: err.message });
    }
});


module.exports = router;



