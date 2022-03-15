// create user model with schema
const { Schema, model } = require('mongoose');
const { User } = require('.');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true
            
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/] // regex for validation email
        },
        //  array of _id values referencing the thought model
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "Thoughts"
        }],
        // array of _id values referencing the User model (self-reference)
        friends: [{
            type: Schema.Types.ObjectId,
            ref: "Users"
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

// schema settings
// create a virtual called friendCount that retrieves the length of the user's friends array field of query (total count of friends)
UserSchema.virtual("friendCount").get(function() {
    return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;