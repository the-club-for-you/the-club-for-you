import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header } from 'semantic-ui-react';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    const outStyle = { marginTop: '0px'};
    Meteor.logout();
    return (
      <div className='home-background' style={outStyle}>
        <Container className='home'>
          <br/>
          <Header id="signout-page" as="h2" textAlign="center">
            You are signed out.
            <p>Thank you for using The Club For You</p>
            <p>See you soon !</p>
          </Header>
          <br/>
        </Container>
      </div>
    );
  }
}
