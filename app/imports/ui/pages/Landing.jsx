import React from 'react';
import { Button, Grid, Header, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div className="home-background">
        <Grid container id='landing-page' verticalAlign="middle" className="home">
          <Grid.Row columns={2}>
            <Grid.Column>
              <Image src="/images/uhlogo.png"/>
            </Grid.Column>
            <Grid.Column>
              <Header as='h3'>
                  UH Mānoa student life offers exciting opportunities to establish lifelong friendships and memories you’ll never forget.
                  Let`s balance your social and academic life by exploring the clubs and organizations that Mānoa offers!
              </Header>
              <br/>
              <Button color='green' size='big' as={NavLink} exact to="/signin">Let`s explore now!</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Landing;
