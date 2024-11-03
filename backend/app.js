const express = require('express');
const routes = require('./routes');
const db = require('./models');

const app = express();
app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});