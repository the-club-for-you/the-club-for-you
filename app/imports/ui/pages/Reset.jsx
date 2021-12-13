import React from 'react';
import { Grid, Container, Header, Segment } from 'semantic-ui-react';
import SimpleSchema from 'simpl-schema';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-semantic';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import * as Console from 'console';
import { Token } from '../../api/token/token';

const formSchema = new SimpleSchema({
  email: String,
  token: { type: String, optional: true },
});

const bridge = new SimpleSchema2Bridge(formSchema);

class Reset extends React.Component {
  submit(data) {
    const { email } = data;
    Console.log(email);
    const token = Random.secret();
    Token.collection.insert({ email: email, token: token, time: new Date() });
    Meteor.call(
      'sendEmail',
      email,
      'uhtheclubforyou@gmail.com',
      'Reset Password For The Club For You',
      `Here is the link to reset the password: ${Meteor.absoluteUrl()}#/reset-password/${Token.collection.findOne({ token: token })._id}
      (if the link doesn't work please copy and paste, then try again.)
       The access token will be: ${token} 
       (this token will be expire in 30 minutes)`,
    );
    swal('Success', 'Reset password email sent', 'success');
  }

  render() {
    let fRef = null;
    return (
      <div className='reset-background'>
        <Container>
          <Header textAlign='center' inverted>Forget your password?</Header>
          <Grid columns='2' verticalAlign='middle' container>
            <Grid.Column>
              <p>Enter the email address associated with your account in the text field to the right. We will then send an email to that address containing a link that will redirect you to a page where you can reset the password for your
                account. This link will expire within 30 minutes of your request, when a new password reset request is sent, or the password being changed, whichever comes first.</p>
              <p>If you do not remember the email address associated with your account, send an email to help@foo.com and one of our trained technicians will help you restore your account.</p>
            </Grid.Column>

            <Grid.Column>
              <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
                <Segment>
                  <TextField name='email'/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}
export default Reset;
