const express = require('express');
const router = express.Router();
const database = require('./databas/databas.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hashSync(password, 10);

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

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    database.get(
        "SELECT * FROM users WHERE username = ?",
        [username], 
        async (err, user) => {
            if (!user) {
                return res.status(400).json({error: "Felaktigt användarnamn eller lösenord"});
            }

            const isPasswordValid = await bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({error: "Felaktigt användarnamn eller lösenord"});
            }

            const token = jwt.sign({
                id: user.id,
                username: user.username,
                'hemlig-nyckel': 'hemlig-nyckel'
            }, 'hemlig-nyckel')

            res.json({token});
        }
    )
});

router.get('/protected', authToken, (req, res) => {
    res.json({message: "Du har åtkomst till denna resurs!"});
});

module.exports = router;