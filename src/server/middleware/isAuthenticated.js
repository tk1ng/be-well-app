require('dotenv').config()

const jwt = require('jsonwebtoken');

const { REACT_APP_JWT_SECRET } = process.env;

module.exports = {
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization')

        // if no Authorization request header is present, error is thrown
        if (!headerToken) {
            console.log('ERROR IN auth middleware');
            return res.status(401).send('Access denied. No token provided.');
        }

        try {
            const token = jwt.verify(headerToken, REACT_APP_JWT_SECRET);

            if (!token) {
                const error = new Error('Not authenticated.');
                error.statusCode = 401;
                throw error;
            }

        } catch (err) {
            err.statusCode = 500;
            throw err;
        }

        next()
    }
}