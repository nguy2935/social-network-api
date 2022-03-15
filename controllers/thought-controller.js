const {Thought, User} = require("../models");

const thoughtController = {
    createThought({body}, res) {
        Thought.create(body)
        .then(dbThoughtData => {
            User.findOneAndUpdate({_id: body.userId},{$push:{thoughts: dbThoughtData._id}},{new:true, runValidators: true});
            return res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
    
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // get a single thought the ID
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: "There is no thought with this ID!"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        });
    },
    // update the current thought by ID
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: "There is no User with this ID!"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete a thought
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message:"There is no thought with this ID!"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    // add a new reaction
    addReaction({params,body}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions:body}},{new:true, runValidators:true})
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.json({message: "There is no thought with this ID!"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
    // add a delete reaction
        addReaction({params,body}, res) {
            Thought.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions:body}},{new:true, runValidators:true})
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.json({message: "There is no thought with this ID!"});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
        }
}
module.exports = thoughtController;