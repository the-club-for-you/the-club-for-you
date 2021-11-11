import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class ClubInfo extends React.Component {
  render() {
    return (
      <Grid id='landing-page' columns={2} textAlign='center' >
        <Grid.Row>
          <br/> <br/>
          <Header as={'h1'}>Club name</Header>
          <br/> <br/>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header as={'h2'}>Clubs picture(?)</Header>
          </Grid.Column>
          <Grid.Column>
            <Header as={'h2'}>Clubs Description</Header><hr/>
            <Header as={'h2'}>Contact Information</Header><hr/>
          </Grid.Column>
        </Grid.Row>

      </Grid>
    );
  }
}

export default ClubInfo;
