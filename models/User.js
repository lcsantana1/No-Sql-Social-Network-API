const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
        type: String, 
        unique:  true, 
        require: true,
        trim: true
    },
    email: {
        type: String, 
        unique:  true, 
        require: true,
        // need to look at mongoose documentation for matching (himt this will user regex)
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
          },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
          }
    ]
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `commentCount` that gets the amount of comments per user
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });


// Initialize our User model
const User = model('User', userSchema);

module.exports = User;
