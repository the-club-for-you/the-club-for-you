import { Email } from 'meteor/email';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';

if (Meteor.isServer || Meteor.users) {

  Meteor.startup(function () {
    process.env.MAIL_URL = 'smtps://uhtheclubforyou:uhtheclubforyou314@smtp.gmail.com:465';
  });

  Meteor.methods({
    sendEmail(to, from, subject, text) {
      // Make sure that all arguments are strings.
      check([to, from, subject, text], [String]);

      // Let other method calls from the same client start running, without
      // waiting for the email sending to complete.
      this.unblock();

      Email.send({ to, from, subject, text });
    },
    findId: function (email) {
      check([email], [String]);
      return Meteor.users.findOne({ email: email })._id;
    },
    userUpdate: function (id, password) {
      check([id, password], [String]);
      // Update account
      Accounts.setPassword(id, password);

      return true;
    },
  });
}
