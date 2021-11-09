import React from 'react';
import { Grid, Header, Image } from 'semantic-ui-react';

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
                Balance your social and academic life by exploring the clubs and organizations that Mānoa offers.
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Landing;
