const User = require('../models/user');
const Entry = require('../models/entry');

module.exports = {
    getEntries: (req, res) => {
        const id = req.user.id;

        Entry.findAll({
            where: {
                userId: id
            },
            order: [
                ['createdAt', 'DESC']
            ]
        }).then(entries => {
            res.status(200).send(entries);
        })
    },
    addEntry: (req, res) => {
        const { date, time, description, notes } = req.body;
        const id = req.user.id;
        console.log('Creating...', req.body);

        Entry.create({ userId: id, date, time, description, notes })
            .then(newEntry => {
                res.status(201).send(newEntry);
            })
    },
    editEntry: (req, res) => {
        const { entryId, date, time, description, notes } = req.body;
        const id = req.user.id;

        Entry.update({ date, time, description, notes }, {
            where: {
                id: entryId
            }
        })
            .then(newEntry => {
                res.status(201).send(newEntry);
            })
    },
    deleteEntry: (req, res) => {
        const { entryId } = req.params;

        Entry.destroy({
            where: {
                id: entryId
            }
        })
            .then(result => {
                res.sendStatus(204);
            })
            .catch(err => console.log(err))

    }
}