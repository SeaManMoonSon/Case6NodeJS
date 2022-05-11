// Dependencies
import express from "express"
import ejs from "ejs"

// Enviroment
const app = express();

// Variables
const port = 5000;

// Template engine
app.set('view enginge', 'ejs');

// Route request
app.get('/', (req, res) => {
    res.render('index.ejs');
});

// Set static file
app.use(express.static('public'));

// 404 not found
app.get('*', (req, res, next) => {
    res.render('404');
});

// server error 500
app.use((err, req, res, next) => {

    // show response
    return res.status(500).send("Server error, please return later");
});

// Server starts
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// ----------------- CONSOLE LOGS ---------------------------------

console.log("test");

// ----------------------------------------------------------------