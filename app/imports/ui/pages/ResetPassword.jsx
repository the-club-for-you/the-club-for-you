import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Form, Grid, Header, Loader, Message, Segment } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import * as Console from 'console';
import swal from 'sweetalert';
import { Token } from '../../api/token/token';

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

  submit = () => {
    const { token, password } = this.state;
    if (this.props.tokens.token === token) {
      const email = this.props.tokens.email;
      Console.log(email);
      Meteor.call(
        'findId', email,
        (err, result) => {
          if (err) {
            swal('Error', 'Reset Password fail', 'error');
          } else {
            Meteor.call('userUpdate', result, password, token);
            swal('Success', 'Reset Password Success', 'success');
          }
        },
      );
    } else {
      swal('Error', 'Token Incorrect', 'error');
    }
  }

  renderPage() {
    if (this.props.tokens.time !== undefined) {
      if ((new Date() - this.props.tokens.time) >= 1800000) {
        Token.collection.remove(this.props.tokens._id);
      }
    }
    return (
      <div className='clubsInfo-background'>
        <Container id="reset-page">
          <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
            <Grid.Column className='information'>
              <br/>
              <Header as="h1" textAlign="center" inverted>
                Reset your password
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
              <Message>Don`t have an account? Sign up <Link to="/signup" position="right">here</Link>
              </Message>
              <br/>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

/* Ensure that the React Router location object is available in case we need to redirect. */
ResetPassword.propTypes = {
  ready: PropTypes.bool.isRequired,
  tokens: PropTypes.object,
};

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  // Get access to Token documents.
  const subscription = Meteor.subscribe(Token.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Token documents
  const tokens = Token.collection.findOne(documentId);
  return {
    tokens,
    ready,
  };
})(ResetPassword);
