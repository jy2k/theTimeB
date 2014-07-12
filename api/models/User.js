/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */
//User.js
var bcrypt = require('bcrypt');
module.exports = {
  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    balance: {
      type: 'float',
      float: true,
      defaultsTo: 0
    },
    fullName: {
      type: 'string',
      required: true
    },
    age: {
      type: 'integer',
      required: true
    },
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    address: {
      type: 'string',
      required: true
    },
    phone: {
      type: 'string',
      required: true,
    }

    //Override toJSON method to remove password from API
    toJSON: function() {
      var obj = this.toObject();
      // Remove the password object value
      delete obj.password;
      // return the new object without password
      return obj;
    }
  },

  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        }else{
          user.password = hash;
          cb(null, user);
        }
      });
    });
  },

  afterCreate: function(user, cb) {
    User.update({ id: user.id }, { balance: 0 }, function(err, user) {
      if (err) {
        console.log(err);
        cb(err);
      }
      else {
        cb(null, user);
      }
    });
  }
};
