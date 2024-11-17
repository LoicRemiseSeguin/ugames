const express = require('express');
const routes = require('./routes');
const authRoutes = require('./routes/auth');
const db = require('./models');

const app = express();
app.use(express.json());

app.use('/api', routes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
