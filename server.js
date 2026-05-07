const routes = require('./routes/routes.js');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
    console.log('Servern körs på port ' + port);
})