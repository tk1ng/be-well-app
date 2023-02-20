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
    }
}