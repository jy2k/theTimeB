/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

 var _ = require('underscore');

module.exports = {
  index: function(req, res) {
    Task.find({
      or: [
        { userOwner: req.user.id },
        { userPurchased: req.user.id}
      ]
    })
    .done(function(err, tasks) {
      return res.view({
        tasks: tasks
      });
    });
  },

  tasks: function(req, res) {
    Task.find({
        or: [
          { userOwner: req.user.id },
          { userPurschased: req.user.id }
        ]
      })
      .done(function(err, tasks) {
        var sortedTasks = _.groupBy(tasks, function(obj) {
            return (obj.userOwner === req.user[0].id ? 'offered' : 'purchased');
          });

        res.view('user/tasks/index', {
          offeredTasks: sortedTasks['offered'] || [],
          purchasedTasks: sortedTasks['purchased'] || []
        })
      });
  },

  create: function(req, res) {
    User.create(req.body).done(function(err, user) {
      if (err) {
        console.log(err);
      }

      return res.redirect('/tasks');
    });
  },

  show: function(req, res) {
    res.view();
  },

  edit: function(req, res) {
    User.findOne(req.user.id)
      .done(function(err, user) {
        return res.view({
          user: user
        });
      });
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {}


};
