const Wellness = require('../models/wellness');

module.exports = {
    getWellness: (req, res) => {
        const id = req.user.id;

        Wellness.findAll({
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
    addScore: (req, res) => {
        const id = req.user.id;
        const { score } = req.body;

        Wellness.create({ score: score, userId: id })
            .then(newScore => {
                res.status(201).send(newScore);
            })
    }
}