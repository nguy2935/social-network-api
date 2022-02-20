// create user model with schema
const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: DataTypes.STRING,
            unique: true,
            required: true,
            trimmed: true
            
        },
        email: {
            type: DataTypes.STRING,
            required: true,
            unique: true,
            match:
        },
        thoughts: {
            array of _id values referencing the thought model
        },
        friends: {
            array of _id values referencing the User model (self-reference)
        }
    }
)

// schema settings
// create a virtual called friendCount that retrieves the length of the user's friends array field of query