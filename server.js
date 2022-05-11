// Dependencies
import express from "express";
import ejs from "ejs";

import eventModel from "./models/eventModel.js";
import eventController from "./controllers/eventController.js";


const app = express();
const port = 5000;

// Set static folder
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Route request
app.get('/', eventController.getAllEvents);
app.get('/events', eventController.getAllEvents);

// // 404 not found
// app.get('*', (req, res, next) => res.render('404.ejs'));

// // server error 500
// app.use((err, req, res, next) => {

//     // show response
//     return res.status(500).send("Server error, please return later");
// });

// Server starts
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// ----------------- CONSOLE LOGS ---------------------------------

console.log(eventModel.readEvents());
console.log(eventModel.getEvent(2), eventModel.getEvent(3).day);

// ----------------------------------------------------------------