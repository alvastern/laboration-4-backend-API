const jwt = require('jsonwebtoken');

function authToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Ingen token" });
    }

    try {
        const decoded = jwt.verify(token, 'hemlig-nyckel');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Ogiltig token" });
    }
}

module.exports = authToken;