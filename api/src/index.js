const express = require('express');
const app = express();

app.use(express.json());

const db = require('./models');
db.sequelize.sync();

app.get('/ping', (req, res) => {
  res.json({
    message: 'pong',
  });
});

module.exports = app;
