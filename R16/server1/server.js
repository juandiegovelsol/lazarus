// server.js
const express = require('express');
const app = express();
const port = 3000;
const db = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Secret key for signing and verifying JWTs
const secretKey = 'your-secret-key';

app.use(express.json());

// Function to generate a JWT for a user
function generateToken(user) {
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
    return token;
}

// Function to verify a JWT and get the user's ID
function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded.userId;
    } catch (err) {
        return null;
    }
}

// Register a new user and generate a JWT
app.post('/register', async (req, res) => {
    const { username, email, role, hireDate, sector, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run('INSERT INTO users (username, email, role, hireDate, sector, password) VALUES (?, ?, ?, ?, ?, ?)', [username, email, role, hireDate, sector, hashedPassword], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const userId = this.lastID;
        const token = generateToken({ id: userId });
        db.run('INSERT INTO tokens (token, userId) VALUES (?, ?)', [token, userId], (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ token });
        });
    });
});

// Login an existing user and generate a JWT
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isValidPassword = await bcrypt.compare(password, row.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = generateToken(row);
        db.run('INSERT INTO tokens (token, userId) VALUES (?, ?)', [token, row.id], (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ token });
        });
    });
});

// Authenticate requests using the JWT
function authenticate(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const userId = verifyToken(token);
    if (!userId) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    req.userId = userId;
    next();
}

// Get all users (requires authentication)
app.get('/users', authenticate, (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Get a user by ID (requires authentication)
app.get('/users/:id', authenticate, (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(row);
    });
});

// Create a new user (requires authentication)
app.post('/users', authenticate, async (req, res) => {
    const { username, email, role, hireDate, sector, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run('INSERT INTO users (username, email, role, hireDate, sector, password) VALUES (?, ?, ?, ?, ?, ?)', [username, email, role, hireDate, sector, hashedPassword], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, username, email, role, hireDate, sector });
    });
});

// Update a user (requires authentication)
app.put('/users/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const { username, email, role, hireDate, sector, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run('UPDATE users SET username = ?, email = ?, role = ?, hireDate = ?, sector = ?, password = ? WHERE id = ?', [username, email, role, hireDate, sector, hashedPassword, id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'User updated successfully' });
    });
});

// Delete a user (requires authentication)
app.delete('/users/:id', authenticate, (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM users WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'User deleted successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server running on PORT: ${port}`);
});