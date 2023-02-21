const User = require('../models/user');
const Entry = require('../models/entry');

module.exports = {
    getEntries: (req, res) => {
        const id = req.user.id;

        Entry.findAll({
            where: {
                userId: id
            }
        }).then(entries => {
            res.status(200).send(entries);
        })
    },
    addEntry: (req, res) => {
        const { description, notes } = req.body;
        const id = req.user.id;
        console.log('Creating...', req.body);

        Entry.create({ userId: id, description, notes })
            .then(newEntry => {
                res.status(201).send(newEntry);
            })
    }
}