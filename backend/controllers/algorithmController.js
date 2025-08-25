const db = require('../config/db');

// @desc    Get all algorithms
// @route   GET /api/algorithms
// @access  Public
exports.getAlgorithms = (req, res) => {
    const query = 'SELECT id, slug, name, description, theory FROM algorithms';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server Error' });
        }
        // Add hardcoded colors for the frontend
        const colors = {
            'bubble-sort': { color: 'bg-blue-600', hoverColor: 'hover:bg-blue-700' },
            'selection-sort': { color: 'bg-green-600', hoverColor: 'hover:bg-green-700' },
            'insertion-sort': { color: 'bg-purple-600', hoverColor: 'hover:bg-purple-700' },
            'merge-sort': { color: 'bg-yellow-600', hoverColor: 'hover:bg-yellow-700' },
            'quick-sort': { color: 'bg-red-600', hoverColor: 'hover:bg-red-700' },
        };
        const algorithmsWithColors = results.map(algo => ({
            ...algo,
            ...colors[algo.slug]
        }));
        res.json(algorithmsWithColors);
    });
};

// @desc    Get single algorithm by slug
// @route   GET /api/algorithms/:slug
// @access  Public
exports.getAlgorithmBySlug = (req, res) => {
    const { slug } = req.params;
    const query = 'SELECT id, slug, name, description, theory FROM algorithms WHERE slug = ?';
    db.query(query, [slug], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server Error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Algorithm not found' });
        }
        res.json(results[0]);
    });
};
