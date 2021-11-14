import React from 'react';
import { Grid, Header, Label } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class ClubInfo extends React.Component {
  render() {
    return (
        <div className="clubsInfo-background">
          <Grid container id='landing-page' verticalAlign="middle" className="clubsInfo">
            <div className='informations'>
              <Grid.Row>
                <br/>
                <Header as='h1'>Name of Organization</Header>
              </Grid.Row>
              <br/>
              <Grid.Row>
                <Label color='green' size='big'>Type</Label>
              </Grid.Row>
              <br/>
              <Grid.Row>
                <Header as='h3'>Club purpose:{}</Header>
              </Grid.Row>
              <br/>
              <Grid.Row>
                <Header as='h3'>Contact information:{}</Header>
                <ul>
                  <li>Contact Person:{}</li>
                  <li>Contact Person`s Email:{}</li>
                </ul>
              </Grid.Row>
              <br/> <br/> <br/>
            </div>
          </Grid>
        </div>
    );
  }
}

export default ClubInfo;
