require('dotenv').config();
const app = require('./src');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`API started on port: ${PORT}...`));
