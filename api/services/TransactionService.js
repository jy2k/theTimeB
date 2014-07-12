exports.transact = function(sender_id, reciever_id, amount) {
  var privates = {
    console: function(err, user) {

    }
  };

  return User.findOne().where({ id: sender_id })
    .then(function(sender) {
      var reciever = User.findOne().where({ id: reciever_id }).then(function(user) { return user; } );
      return [sender, reciever];
    })
    .spread(function(sender, reciever) {
      User.update({ id: sender.id }, { balance: sender.balance - amount}, privates.console);
      User.update({ id: reciever.id }, { balance: reciever.balance + amount }, privates.console);

      return true;
    })
    .fail(function(err) {
      console.log('[TransactionService] An error has occured');
      console.log(err);

      return false;
    });
};
