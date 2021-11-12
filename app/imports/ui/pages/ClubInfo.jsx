import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class ClubInfo extends React.Component {
  render() {
    return (
      <Grid container className='clubsInfo'>
        <Grid.Row>
          <Grid.Column>
            <Header as={'h1'}>Clubs Name</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header as={'h2'}>Purpose</Header>
            <Header as={'h2'}>Contact Information</Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default ClubInfo;
