const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/db');

// Load env vars
dotenv.config({ path: './.env' });

const app = express();

// Enable CORS
app.use(cors());

// Body parser
app.use(express.json());

// Test DB connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database: ', err);
        return;
    }
    console.log('MySQL Connected...');
    connection.release();
});

// Mount routers
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/algorithms', require('./routes/algorithms'));
app.use('/api/game', require('./routes/game'));
app.use('/api/leaderboard', require('./routes/leaderboard'));
app.use('/api/admin', require('./routes/admin'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
