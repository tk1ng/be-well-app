require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


module.exports = {
    register: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email: email } });

            if (user) {
                return res.status(400).send('User already exists. Try signing in.');
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(password, salt);

            const newUser = await User.create({ email: email, passHash: hashedPass });

            const token = createToken({ email: newUser.dataValues.email, id: newUser.dataValues.id });
            const exp = Date.now() + 1000 * 60 * 60 * 48;

            res.status(201).header('x-auth-token', token).send({
                email: newUser.dataValues.email,
                id: newUser.dataValues.id,
                exp
            });

        } catch (err) {
            console.log(err)
        }
    },
    // TODO: Refactor for readability to match register function using async
    login: (req, res) => {
        const { email, password } = req.body;

        User.findOne({ where: { email: email } })
            .then(user => {
                if (!user) {
                    console.log('No existing user, try signing up!');
                    return res.status(404).send('No existing user, try signing up!');
                }

                bcrypt.compare(password, user.passHash)
                    .then(isMatch => {
                        if (!isMatch) {
                            return res.status(401).send('Not Authorized. Invalid email/password')
                        }

                        const token = createToken({ email: user.dataValues.email, id: user.dataValues.id });

                        const exp = Date.now() + 1000 * 60 * 60 * 48;

                        res.status(201).send({
                            id: user.dataValues.id,
                            token,
                            exp
                        });

                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }
}

const createToken = (email, id) => {
    const { REACT_APP_JWT_SECRET } = process.env;

    return jwt.sign({ email, id }, REACT_APP_JWT_SECRET, {
        expiresIn: '2 days'
    });
}