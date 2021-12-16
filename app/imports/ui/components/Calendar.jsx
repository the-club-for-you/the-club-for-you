import React from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Day from './Day';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Calendar extends React.Component {

  createCalendar() {
    const calendar = [[], [], [], [], [], []];
    const yesterday = new Date(this.props.year, this.props.month, 1);
    yesterday.setDate(yesterday.getDate() - yesterday.getDay() - 1);
    for (let week = 0; week < 6; week++) {
      for (let day = 0; day < 7; day++) {
        calendar[week][day] = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate() + 1);
        yesterday.setDate(yesterday.getDate() + 1);
      }
    }
    return calendar;
  }

  getMonthAsStr() {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[this.props.month];
  }

  render() {
    const calendar = this.createCalendar();
    const month = this.getMonthAsStr();

    return (
      <Container>
        <Header as='h2' inverted>{`${month} ${this.props.year}`}</Header>
        <br />
        <Grid columns={7} divided>
          <Grid.Row>
            <Grid.Column>
              <Header as='h3' textAlign='center' inverted>SUNDAY</Header>
            </Grid.Column>
            <Grid.Column>
              <Header as='h3' textAlign='center' inverted>MONDAY</Header>
            </Grid.Column>
            <Grid.Column>
              <Header as='h3' textAlign='center' inverted>TUESDAY</Header>
            </Grid.Column>
            <Grid.Column>
              <Header as='h3' textAlign='center' inverted>WEDNESDAY</Header>
            </Grid.Column>
            <Grid.Column>
              <Header as='h3' textAlign='center' inverted>THURSDAY</Header>
            </Grid.Column>
            <Grid.Column>
              <Header as='h3' textAlign='center' inverted>FRIDAY</Header>
            </Grid.Column>
            <Grid.Column>
              <Header as='h3' textAlign='center' inverted>SATURDAY</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid columns={7} divided>
          {
            calendar.map((week) => <Grid.Row key={week}>
              {
                week.map((day) => <Grid.Column key={day} >
                  <Day date={day} month={this.props.month}/>
                </Grid.Column>)
              }
            </Grid.Row>)
          }
          <Grid.Row>
            <Grid.Column>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
Calendar.propTypes = {
  month: PropTypes.number,
  year: PropTypes.number,
};

export default Calendar;
