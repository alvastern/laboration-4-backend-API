// Använder allt som behövs för att detta API ska fungera som tänkt
const routes = require('./routes/routes.js');
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

// Använder cors för att tillåta cors-origin requests
app.use(cors());
app.use(express.json());
app.use('/api', routes);

// Startar servern på port 3000
app.listen(port, () => {
    console.log('Servern körs på port ' + port);
})