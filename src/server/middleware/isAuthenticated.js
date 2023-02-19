require('dotenv').config()

const jwt = require('jsonwebtoken');

const { REACT_APP_JWT_SECRET } = process.env;

module.exports = {
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization')

        // if no Authorization request header is present, error is thrown
        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token;

        try {
            token = jwt.verify(headerToken, REACT_APP_JWT_SECRET);
        } catch (err) {
            err.statusCode = 500;
            throw err;
        }

        if (!token) {
            const error = new Error('Not authenticated.');
            error.statusCode = 401;
            throw error;
        }

        next()
    }
}