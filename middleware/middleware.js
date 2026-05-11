const jwt = require('jsonwebtoken');

// Middleware för att autentisera JWT-token
function authToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];

    // If-sats som kollar om det finns en token i headern, om inte skickas ett fel
    if (!token) {
        return res.status(401).json({ error: "Ingen token" });
    }

    // Try-catch som verifierar token och lägger till den dekodade informationen i req.user
    try {
        const decoded = jwt.verify(token, 'hemlig-nyckel');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: "Ogiltig token" });
    }
}

// Exporterar middleware-funktionen
module.exports = authToken;