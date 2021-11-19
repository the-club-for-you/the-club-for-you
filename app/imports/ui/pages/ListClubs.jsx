import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Input, Icon, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Clubs } from '../../api/club/Clubs';
import ClubCard from '../components/ClubCard';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListClubs extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <div className='background'>
        <Container className="information">
          <Container style={{ paddingLeft: '30px', paddingRight: '30px' }}>
            <br/>
            <Header as={'h1'} textAlign="center" inverted>Clubs</Header>
            <div style={ { marginLeft: '25%' } }>
              <Input size="huge" style={ { width: '50%' } } type="text" placeholder="Search..."/>
              <Button size="huge" color='green'><Icon className="search"/>Search</Button>
            </div>
            <br/>
            <Card.Group centered stackable itemsPerRow={5}>
              {this.props.clubs.map((data) => <ClubCard key={data._id} club={data} />)}
            </Card.Group>
            <br/>
          </Container>
        </Container>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
ListClubs.propTypes = {
  clubs: PropTypes.array.isRequired,
  filter: PropTypes.string,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Clubs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const clubs = Clubs.collection.find({}).fetch();
  return {
    clubs,
    ready,
  };
})(ListClubs);
