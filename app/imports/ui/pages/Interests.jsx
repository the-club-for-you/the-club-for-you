import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Interests } from '../../api/interest/Interests';
import InterestCard from '../components/InterestCard';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ClubTypes extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">Types of Clubs</Header>
        <Card.Group centered itemsPerRow={6}>
          {this.props.interests.map((data) => <InterestCard key={data._id} interest={data} />)}
        </Card.Group>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ClubTypes.propTypes = {
  interests: PropTypes.array.isRequired,
  filter: PropTypes.string,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Interests.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const interests = Interests.collection.find({}).fetch();
  return {
    interests,
    ready,
  };
})(ClubTypes);
