const express = require('express');
const app = express();

const { handleError, logError } = require('./utils/error.utils');

app.use(express.json());

const db = require('./models');
db.sequelize.sync();

app.get('/ping', (req, res) => {
  res.json({
    message: 'pong',
  });
});

app.use('/api/issues', require('./routes/issue.routes'));

// app.use(logError);
app.use(handleError);

module.exports = app;
