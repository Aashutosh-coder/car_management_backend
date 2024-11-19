 const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
// const ProductRouter = require('./Routes/ProductRouter'); 
const CarRouter = require('./Routes/CarRouter');

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
});
const path = require('path');
app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/cars',CarRouter);
// app.use('/products', ProductRouter); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})