/**
 * AuthController
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
// Location: /api/controllers/AuthController.js
var passport = require("passport");
module.exports = {
  signup: function(res, req) {
    req.view();
  },

  login: function(req,res){
    res.view("auth/login");
  },

  process: function(req,res){
    passport.authenticate('local', function(err, user, info){
      if ((err) || (!user)) {
        res.redirect('/login');
        return;
      }
      req.logIn(user, function(err){
        if (err) res.redirect('/login');
        return res.redirect('/tasks');
      });
    })(req, res);
  },

  logout: function (req,res){
    req.logout();
    res.send('logout successful');
  },
  _config: {}
};

