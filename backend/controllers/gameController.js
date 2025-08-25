const db = require('../config/db');

// @desc    Get questions for an algorithm
// @route   GET /api/game/questions/:slug
// @access  Public
exports.getQuestions = (req, res) => {
    const { slug } = req.params;
    const count = parseInt(req.query.count, 10) || 5;

    const query = `
        SELECT q.id, q.question_text as question, q.option_a, q.option_b, q.option_c, q.option_d, q.correct_answer 
        FROM questions q
        JOIN algorithms a ON q.algorithm_id = a.id
        WHERE a.slug = ?
        ORDER BY RAND()
        LIMIT ?
    `;

    db.query(query, [slug, count], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server Error' });
        }
        
        // Format for frontend
        const formattedResults = results.map(q => {
            const optionsMap = {
                a: q.option_a,
                b: q.option_b,
                c: q.option_c,
                d: q.option_d,
            };
            return {
                id: q.id,
                question: q.question,
                options: [q.option_a, q.option_b, q.option_c, q.option_d],
                correctAnswer: optionsMap[q.correct_answer]
            };
        });

        res.json(formattedResults);
    });
};

// @desc    Submit game score
// @route   POST /api/game/score
// @access  Private
exports.submitScore = (req, res) => {
    const userId = req.user.id;
    const { algorithmSlug, totalMarks, initialMcqScore, finalMcqScore } = req.body;

    if (!algorithmSlug || totalMarks === undefined || initialMcqScore === undefined || finalMcqScore === undefined) {
        return res.status(400).json({ message: 'Missing required score data' });
    }

    const algoQuery = 'SELECT id FROM algorithms WHERE slug = ?';
    db.query(algoQuery, [algorithmSlug], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ message: 'Algorithm not found' });
        }
        
        const algorithmId = results[0].id;
        
        const newSession = {
            user_id: userId,
            algorithm_id: algorithmId,
            total_score: totalMarks,
            initial_mcq_score: initialMcqScore,
            final_mcq_score: finalMcqScore,
        };

        db.query('INSERT INTO game_sessions SET ?', newSession, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error saving game session' });
            }
            res.status(201).json({ message: 'Game session saved successfully', sessionId: result.insertId });
        });
    });
};
