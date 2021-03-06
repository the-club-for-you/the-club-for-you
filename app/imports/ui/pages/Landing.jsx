import React from 'react';
import { Button, Grid, Header, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    function checkSignInState() {
      if (Meteor.userId()) {
        return '/clubs/all';
      }
      return '/signin';
    }
    return (
      <div className="home-background" id='landing-page'>
        <Grid container verticalAlign="middle" className="home">
          <Grid.Row columns={2}>
            <Grid.Column>
              <Image src="/images/uhlogo.png"/>
            </Grid.Column>
            <Grid.Column>
              <Header as='h3'>
                UH Mānoa student life offers exciting opportunities to establish lifelong friendships and memories you’ll never forget.
                Let`s balance your social and academic life by exploring the clubs and organizations that Mānoa offers today!
              </Header>
              <Button color="green" size="large" as={NavLink} exact to={`${checkSignInState()}`}>Let`s start it here.</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Landing;
