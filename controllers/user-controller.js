// require user model
const {User} = require('../models');

const userController = {
    // need to create a new user
    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    // get all users
    getAllUsers(req, res) {
        Users.find({})
        // populate users thoughts and friends
        .populate({
            path: "thoughts", select: "-__v"
        })
        .populate({
            path: "friends", select: "-__v"
        })
        .select("-__v")
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // get a single user by the ID
    // update the current user by ID
    // delete a current friend
}