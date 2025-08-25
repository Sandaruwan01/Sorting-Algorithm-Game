const db = require('../config/db');

// @desc    Get global leaderboard
// @route   GET /api/leaderboard
// @access  Public
exports.getLeaderboard = (req, res) => {
    const query = `
        SELECT 
            u.id, 
            u.username as name, 
            u.email,
            SUM(gs.total_score) as totalMarks
        FROM users u
        JOIN game_sessions gs ON u.id = gs.user_id
        GROUP BY u.id
        ORDER BY totalMarks DESC
        LIMIT 100;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server Error' });
        }

        const leaderboard = results.map((row, index) => ({
            rank: index + 1,
            user: {
                id: row.id,
                name: row.name,
                email: row.email
            },
            totalMarks: row.totalMarks
        }));

        res.json(leaderboard);
    });
};
