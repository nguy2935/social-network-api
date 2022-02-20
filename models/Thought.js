thoughtText: {
    type: DataTypes.STRING
    required
    must be between 1 and 280 characters
},
createdAt: {
    type: DataTypes.Date,
    Set default value to the current timestamp
    Use a getter method to format the timestamp on query
},
username (user created this thought): {
    type: DataTypes.STRING,
    required
},
reactions (these are like replies): {
    array of nested documents created with the reaction schema
}

// schema settings
// create a virtual called reactionCount that retrieves teh length of hte thought's reactions array field on query