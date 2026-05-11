// Använder express, bycrypt, JWT för att hantera routes och autentisering
const express = require('express');
const router = express.Router();
const database = require('../databas/databas.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authToken = require('../middleware/middleware.js');

// Route för att registrera en ny användare
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Hashar lösenordet innan det sparas i databasen, det ska inte sparas i klartext
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Connect till databasen och lägger till den nya användaren i databasen
    database.run(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hashedPassword],
        (err) => {
            if (err) {
                return res.status(500).json({error: "Användare kunde inte registreras"});
            }
            res.status(201).json({message: "Användare registrerad"});
        }
    )
});

// Route för att logga in en användare
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Connecta till databasen och kontrollera om användaren finns och om lösenordet är korrekt
    database.get(
        "SELECT * FROM users WHERE username = ?",
        [username], 
        async (err, user) => {
            if (!user) {
                return res.status(400).json({error: "Felaktigt användarnamn eller lösenord"});
            }

            // Jämför det angivna lösenordet med det hashade lösenordet i databasen
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({error: "Felaktigt användarnamn eller lösenord"});
            }

            // Skapar en JWT-token som innehåller användarens id och username, giltig i 24 timmar
            const token = jwt.sign(
                { id: user.id, username: user.username },
                'hemlig-nyckel',
                { expiresIn: '24h' }
            );

            res.json({token});
        }
    )
});

// En skyddad route som kräver en giltig JWT-token för att få åtkomst
router.get('/protected', authToken, (req, res) => {
    res.json({message: "Du har åtkomst till denna resurs!"});
});

// Exporterar router så den kan användas i server.js
module.exports = router;