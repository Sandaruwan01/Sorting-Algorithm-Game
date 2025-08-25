const db = require('../config/db');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getProfile = (req, res) => {
    const userId = req.user.id;

    const userQuery = 'SELECT id, username as name, email, date_of_birth as dob, user_role as userRole, system_role as role, profile_picture_url as profilePictureUrl FROM users WHERE id = ?';
    
    db.query(userQuery, [userId], (err, userResults) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
        if (userResults.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userProfile = userResults[0];

        const scoresQuery = `
            SELECT a.name as algorithm, gs.total_score as score
            FROM game_sessions gs
            JOIN algorithms a ON gs.algorithm_id = a.id
            WHERE gs.user_id = ?
            ORDER BY gs.played_at DESC
        `;
        
        db.query(scoresQuery, [userId], (err, scoreResults) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Server error retrieving scores' });
            }

            const totalMarks = scoreResults.reduce((acc, curr) => acc + curr.score, 0);

            res.json({
                ...userProfile,
                totalMarks: totalMarks,
                gameScores: scoreResults
            });
        });
    });
};
