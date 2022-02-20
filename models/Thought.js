const { schema } = require('mongoose');

const ThoughtSchema = new Schema( 
    {
        thoughtText: {
            type: DataTypes.Data
            required
            must be between 1 and 280 characters
        },
        createdAt: {
            type: DataTypes.Date,
            default: Date.now,
            get: () => .format('MM, DD, YYYY [at] hh:mm') Use a getter method to format the timestamp on query
        },
        username (user created this thought): {
            type: DataTypes.STRING,
            required: true
        },
        reactions (these are like replies): {
           // array of nested documents created with the reaction schema
        }
    }
)

// schema settings
// create a virtual called reactionCount that retrieves teh length of hte thought's reactions array field on query
UserSchema.virtual('reactionCount')