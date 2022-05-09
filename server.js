// Dependencies
import express from "express"
import ejs from "ejs"
import chalk from "chalk"

// Enviroment
const app = express();

// Variables
const port = 5000;

// Template engine
app.set('view enginge', 'ejs');

// Set static file
app.use(express.static('public'));

app.get('*', (req, res, next) => {
    res.render('index.ejs');
});


// ----------------- CONSOLE LOGS ---------------------------------

console.log(chalk.blue("test"));

// ----------------------------------------------------------------

// Server starts
app.listen(port, () => {
    console.log(chalk.blue(`Server running on port ${port}`));
});