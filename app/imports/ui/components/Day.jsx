import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Card, List, Icon, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { _ } from 'lodash';
import PropTypes from 'prop-types';
import { Events } from '../../api/event/Events';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Day extends React.Component {

  isToday(today) {
    if (today.toLocaleDateString('en-US') === this.props.date.toLocaleDateString('en-US')) {
      return (
        <Icon name='circle'color='blue'/>
      );
    }
    return null;
  }

  isMonth() {
    if (this.props.date.getMonth() === this.props.month) {
      return 'green';
    }
    return 'grey';
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (true) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const today = new Date();
    const date = this.props.date;
    const events = _.filter(this.props.events, function (data) {
      return data.date === date.toLocaleDateString('en-US');
    });

    return (
      <Card as={NavLink} to={`/event/${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`}>
        <Card.Content>
          <Header color={this.isMonth()}>{this.props.date.getDate()}  {this.isToday(today)}</Header>
        </Card.Content>
        <Card.Content extra>
          <List bulleted>
            {events.map((data) => <List.Item key={data._id}>{data.title}</List.Item>)}
          </List>
        </Card.Content>
      </Card>
    );
  }
}

// Require an array of Stuff documents in the props.
Day.propTypes = {
  events: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  date: PropTypes.any,
  month: PropTypes.number,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Events.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const events = Events.collection.find({}).fetch();
  return {
    events,
    ready,
  };
})(Day);
