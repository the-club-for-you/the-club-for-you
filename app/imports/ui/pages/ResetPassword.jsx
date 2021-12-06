import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Loader, Message, Segment } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'lodash';
import * as Console from 'console';
import { Token } from '../../api/token/token';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class ResetPassword extends React.Component {

  /* Initialize state fields. */
  constructor(props) {
    super(props);
    this.state = { token: '', password: '' };
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /* Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    const { token, password } = this.state;
    let id;
    const email = _.find(this.props.tokens, (tokens) => tokens.token === token).email;
    if (email.length !== 0) {
      Console.log(email);
      id = Meteor.call('findId', token);
    }
    Console.log(id);
    Meteor.call(
      'userUpdate',
      id,
      password,
    );
  }

  /* Display the signup form. Redirect to add page after successful registration and login. */
  renderPage() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    return (
      <div className='clubsInfo-background'>
        <Container id="reset-page">
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column className='information'>
              <br/>
              <Header as="h1" textAlign="center" inverted>
                Register your account
              </Header>
              <Form onSubmit={this.submit}>
                <Segment stacked>
                  <Form.Input
                    label="Token"
                    id="reset-form-token"
                    icon="key"
                    iconPosition="left"
                    name="token"
                    type="token"
                    placeholder="token"
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    label="New Password"
                    id="reset-form-password"
                    icon="lock"
                    iconPosition="left"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={this.handleChange}
                  />
                  <Form.Button id="reset-form-submit" content="Submit"/>
                </Segment>
              </Form>
              <Message>
                Already have an account? Login <Link to="/signin">here</Link>
              </Message>
              <Message>Forget your password? Reset <Link to="/resetpassword" position="right">here</Link>
              </Message>
              <br/>
              {this.state.error === '' ? (
                ''
              ) : (
                <Message
                  error
                  header="Reset Password was not successful"
                  content={this.state.error}
                />
              )}
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

/* Ensure that the React Router location object is available in case we need to redirect. */
ResetPassword.propTypes = {
  location: PropTypes.object,
  ready: PropTypes.bool.isRequired,
  tokens: PropTypes.array.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Token.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const tokens = Token.collection.find({}).fetch();
  return {
    tokens,
    ready,
  };
})(ResetPassword);
