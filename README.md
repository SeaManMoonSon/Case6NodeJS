# Case6NodeJS
Calendar 
TESTING

# Setup an Express server using template engine ejs

### Initiate a new Node.js project
`npm init`

### Create server file, like index.js, server.js, app.js
`server.js`

### Edit package.json to use ES6 module: import (not require)
*package.json*
`"type": "module"`

install dependencies
`npm install express`
`npm install ejs`

### Create folder structure
Folder *public* to serve static files
Folder named *views* is the default folder for template engine *ejs*

```
project
└── public
│ └── images
│ └── styles
│ └── js
│
└── views
│ │── partials
│ │ └── header.ejs
│ │ default.ejs
│ README.md
│ server.js

```

### Edit server file

```javascript

import express from 'express';
import ejs from 'ejs';

// "app" environment
// -------------------------
const app = express();

// variables
// -------------------------
const port = 3000;

// set template engine to ejs
// -------------------------
app.set('view engine', 'ejs');


// middleware (use param next...)
// -------------------------
// ...

// handle requests
// -------------------------

// route request
// -------------------------
app.get('/', (req, res) => {
res.render('index');
});

// serve static files
// -------------------------
app.use(express.static('public'));

// handle errors
// -------------------------

// 404 not found
// -------------------------
app.get('*', (req, res, next) => {
res.render('404');
});

// server error 500...
// -------------------------
app.use((err, req, res, next) => {

// show response
return res.status(500).send("Server error, please return later");
});

// start server
app.listen(port, () => {
console.log(`Server running on port ${port}`);
});

```

### Start server using
`node server`

Server can also be started using npm cmd
`npm start`

### Using GitHub
Create a file named `.gitignore` in project folder

Edit *.gitignore* to exclude folders and files
```
node_modules/
```