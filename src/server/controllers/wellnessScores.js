const Wellness = require('../models/wellness');

module.exports = {
    getWellness: (req, res) => {
        const id = req.user.id;

        Wellness.findAll({
            where: {
                userId: id
            }
        }).then(entries => {
            res.status(200).send(entries);
        })
    }
}