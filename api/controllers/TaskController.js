/**
 * TaskController
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
    Task.find()
      .done(function(err, tasks) {
        return res.view({
          tasks: tasks
        });
      });
  },

  show: function(req, res) {
    Task.findOne(req.param('id'))
      .done(function(err, task) {
        return res.view({
          task: task
        });
      });
  },

  new: function(req, res) {
    res.view();
  },

  edit: function(req, res) {
    Task.findOne(req.param('id'))
      .done(function(err, task) {
        return res.view({
          task: task
        });
      });
  },

  create: function(req, res) {
    Task.create(
        _.extend(req.body, {
          userOwner: req.user[0].id
        })
      )
      .done(function(err, result){
        return res.redirect('/tasks')
    });
  },

  purchase: function(req, res) {
    Task.findOne(req.param('id'))
    .done(function(err, task) {
      User.find()
        .where({ id: task.userOwner})
        .done(function(err, user) {
        TransactionService.transact(req.user[0].id, user.id, task.cost).done(function(response) {
        if (response) {
          return res.redirect('/tasks');
        }
        else {
          res.redirect('/task/' + task.id);
        }
      });
      });

    });
  },

  destroy: function(req, res) {
    Task.destroy({ id : req.param('id')})
    .done(function(err) {
        res.redirect('/user/tasks');
    });
  },

  destroy_all: function(req, res) {
    Task.destroy()
    .done(function(err) {
        res.redirect('/user/tasks');
    });
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to TaskController)
   */
  _config: {}


};
