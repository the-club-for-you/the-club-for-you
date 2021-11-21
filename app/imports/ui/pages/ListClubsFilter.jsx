import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'lodash';
import PropTypes from 'prop-types';
import * as Console from 'console';
import { Clubs } from '../../api/club/Clubs';
import ClubCard from '../components/ClubCard';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListClubsFilter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: null,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.type !== prevState.filter) {
      return {
        filter: nextProps.match.params.type,
      };
    }
    return null;
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const filter = this.state.filter;
    Console.log(filter);
    return (
      <div className="background">
        <Container className="information">
          <Container style={{ padding: '30px 30px 130px 30px' }}>
            <br/>
            <Header as="h1" textAlign="center" inverted>Clubs</Header>
            <Card.Group centered stackable itemsPerRow={5}>
              {_.filter(this.props.clubs, function (data) { return data.type.includes(filter); }).map((data) => <ClubCard key={data._id} club={data} />)}
            </Card.Group>
            <br/>
          </Container>
        </Container>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
ListClubsFilter.propTypes = {
  clubs: PropTypes.array.isRequired,
  filter: PropTypes.string,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  const filter = match.params.type;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Clubs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const clubs = Clubs.collection.find({}).fetch();
  return {
    clubs,
    ready,
    filter,
  };
})(ListClubsFilter);
