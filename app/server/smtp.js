import { Email } from 'meteor/email';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

if (Meteor.isServer && Meteor.users) {

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
  });
}
