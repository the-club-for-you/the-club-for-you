import React from 'react';
import { Button, Container, Grid, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Calendar from '../components/Calendar';
/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Events extends React.Component {
  constructor() {
    super();
    this.state = {
      date: new Date(),
    };
  }

  next() {
    this.setState({ date: new Date(this.state.date.getFullYear(), this.state.date.getMonth() + 1, 1) });
  }

  prev() {
    this.setState({ date: new Date(this.state.date.getFullYear(), this.state.date.getMonth() - 1, 1) });
  }

  render() {
    return (
      <div className='background'>
        <Container>
          <br />
          <Header style={ { fontSize: '400%' } } textAlign="center" inverted>Events</Header>
          <Grid centered>
            <Grid.Row>
              <Grid.Column width={1}>
                <Button icon='chevron left' className="calendarButton" size='big' onClick={this.prev.bind(this)}></Button>
              </Grid.Column>
              <Grid.Column width={14}>
                <Calendar month={this.state.date.getMonth()} year={this.state.date.getFullYear()}></Calendar>
              </Grid.Column>
              <Grid.Column width={1}>
                <Button icon='chevron right' className="calendarButton" size='big' onClick={this.next.bind(this)}></Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
Events.propTypes = {
  month: PropTypes.number,
  year: PropTypes.number,
};

export default Events;
