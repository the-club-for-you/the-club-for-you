import { Email } from 'meteor/email';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { Token } from '../imports/api/token/token';

if (Meteor.isServer || Meteor.users) {

  Meteor.startup(function () {
    if (Meteor.settings && Meteor.settings.smtp) {
      const { userName, password, host, port, isSecure } = Meteor.settings.smtp;
      const scheme = isSecure ? 'smtps' : 'smtp';
      process.env.MAIL_URL = `${scheme}://${encodeURIComponent(userName)}:${encodeURIComponent(password)}@${host}:${port}`;
    }
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
      return Meteor.users.findOne({ username: email })._id;
    },
    getCurrentTime: function () {
      return this.getCurrentTime.format('MMM DD HH:mm:ss');
    },
    userUpdate: function (id, password, token) {
      check([id, password, token], [String]);
      // Update account
      Accounts.setPassword(id, password);
      Token.collection.remove({ token: token });
      return true;
    },
  });
}
