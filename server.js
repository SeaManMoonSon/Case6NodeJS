// Dependencies
import express from "express";
import eventController from "./controllers/eventController.js"


const app = express();
const port = 5000;

// Set static folder
app.use(express.static('public'));

// Set view engine
app.set('view engine', 'ejs');

// Handle form post
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route request
app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/landing', (req, res) => {
    res.render('landing');
});

app.put('/events/:id', eventController.editEvent);

app.get('/calendar', eventController.getAll);
app.post('/calendar', eventController.createEvent);

app.get('/calendar/api', eventController.getApi);

app.delete('/index/:id', eventController.deleteEvent);

// 404 not found
app.get('*', (req, res, next) => res.render('404.ejs'));

// server error 500
app.use((err, req, res, next) => {

    // show response
    return res.status(500).send("Server error, please return later");
});

// Server starts
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
