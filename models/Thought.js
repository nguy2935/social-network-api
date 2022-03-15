const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// ThoughtSchema
const ThoughtSchema= new Schema( 
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal).format("MMM DD, YYYY [at] hh:mm a") // Use a getter method to format the timestamp on query
        },
        // user created this thought
        username: {
            type: String,
            required: true
        },
        // array of nested documents created with the reaction schema
        reactions: [ReactionsSchema]
        },
        {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
        }
)

// ReactionsSchema is used to validate data 
const ReactionsSchema = new Schema( 
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
             maxlength: 280,
            default: Date.now,
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal).format("MMM DD, YYYY [at] hh:mm a")
        }
    }
);

// create a virtual called reactionCount that retrieves the length of hte thought's reactions array field on query
ThoughtsSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);
//export thoughts module
module.exports = Thought;

// UserSchema.virtual('reactionCount')