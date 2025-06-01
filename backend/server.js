require('dotenv').config();
const app = require('./app');
const connection = require('./src/config/db.config');

const PORT = process.env.PORT || 3333;

connection();

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});