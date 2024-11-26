const express = require('express');
const bodyparser = require('body-parser');
const db = require('./models');
const routes = require('./routes');
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use('/api', routes);

db.sequelize
    .sync()
    .then(result => {
        console.log("Database connected");
        app.listen(3000);
    })
    .catch(err => console.log(err));
