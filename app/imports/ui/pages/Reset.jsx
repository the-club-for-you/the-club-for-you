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
    Meteor.call(
      'findId', email,
      (err) => {
        if (err) {
          swal('Error', 'No user exists', 'error');
        } else {
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
      },
    );
  }

  render() {
    let fRef = null;
    return (
      <div className='reset-background'>
        <Container>
          <Header textAlign='center' inverted size={'huge'}>Reset Password</Header>
          <Grid columns='2' verticalAlign='middle' container>
            <Grid.Column>
              <p>Please enter your email address to the text field. If the system finds that user exist, it will send an email with token and link to reset the password. If the link is not working when you click on them,
                please try copy and paste the url to go to the page.
                The token and link will expire in 30 minutes or expire when you reset your password successfully. If you having troubles to reset the password, please contact to the following email: malialiu@hawaii.edu. </p>
              <p>If you do not remember the email address associated with your account, send an email to malialiu@hawaii.edu and we will help you to restore your account. Thank you so much for using The Club For You. </p>
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
