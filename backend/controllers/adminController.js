const db = require('../config/db');

// @desc    Get summary data for admin dashboard
// @route   GET /api/admin/summary
// @access  Private/Admin
exports.getSummaryData = (req, res) => {
    const query = `
        SELECT
            u.id,
            u.username as name,
            u.email,
            u.user_role as userRole,
            u.profile_picture_url as profilePictureUrl,
            a.slug as algorithmSlug,
            gs.initial_mcq_score as initialMcqScore,
            gs.final_mcq_score as finalMcqScore,
            gs.total_score as algorithmScore
        FROM users u
        LEFT JOIN game_sessions gs ON u.id = gs.user_id
        LEFT JOIN algorithms a ON gs.algorithm_id = a.id
        ORDER BY u.id, gs.played_at;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server Error' });
        }

        // Process the flat results into a structured format
        const userMap = new Map();

        results.forEach(row => {
            if (!userMap.has(row.id)) {
                userMap.set(row.id, {
                    user: {
                        id: row.id,
                        name: row.name,
                        email: row.email,
                        userRole: row.userRole,
                        profilePictureUrl: row.profilePictureUrl,
                    },
                    // Use the latest score for a given user
                    initialMcqScore: row.initialMcqScore, 
                    finalMcqScore: row.finalMcqScore,
                    algorithmScores: {
                        'bubble-sort': null,
                        'selection-sort': null,
                        'insertion-sort': null,
                        'merge-sort': null,
                        'quick-sort': null,
                    }
                });
            }

            const userData = userMap.get(row.id);
            if (row.algorithmSlug) {
                // Keep the highest score for each algorithm
                if (userData.algorithmScores[row.algorithmSlug] < row.algorithmScore) {
                     userData.algorithmScores[row.algorithmSlug] = row.algorithmScore;
                }
            }
             if (row.initialMcqScore !== null) {
                userData.initialMcqScore = row.initialMcqScore;
            }
            if (row.finalMcqScore !== null) {
                userData.finalMcqScore = row.finalMcqScore;
            }
        });

        res.json(Array.from(userMap.values()));
    });
};
