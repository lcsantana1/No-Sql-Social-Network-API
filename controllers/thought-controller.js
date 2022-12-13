
const { Thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .sort({ createdAt: -1 })
            .then((dbThoughtData) => { res.json(dbThoughtData); })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((dbThoughtData) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { Thoughts: dbThoughtData._id } },
                    { new: true }
                );
            })
            .then ((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'Thought created but no user with this id!'});
                }
                res.json({ message: 'Thought successfully created!'});
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
    });
},
}

module.exports = thoughtController;