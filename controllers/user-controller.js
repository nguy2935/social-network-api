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
    getUserById({params}, res) {
        User.findOne({_id: params.id})
        .populate({path: "thoughts", select: "-__v"})
        .populate({path: "friends", select: "-__v"})
        .select("-__v")
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: "There is no User with this ID!"});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        });
    },
    // update the current user by ID
    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: "There is no User with this ID!"});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        }
    },

    // delete a current friend
    deleteFriend({params}, res) {
        User.findOneAndUpdate({_id: params.userId}, {$pull: {friends: {id: params.friends}}}, {new: true, runValidators: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: "There is no User with this ID!"});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        }
    }
};

module.exports = userController;