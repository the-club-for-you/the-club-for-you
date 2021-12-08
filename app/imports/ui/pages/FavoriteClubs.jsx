import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { _ } from 'lodash';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Favorites } from '../../api/Favorites/Favorites';
import FavoriteClubCard from '../components/FavoriteClubCard';
import { Clubs } from '../../api/club/Clubs';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class FavoritesClubs extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const favoriteIds = _.map(this.props.favorites, 'favorite');

    return (
      <div className="background">
        <Container>
          <br/>
          <Header as={'h1'} textAlign="center" inverted>My Favorites Clubs</Header>
          <Card.Group centered itemsPerRow={6}>
            {_.filter(this.props.clubs, function (data) {
              return _.includes(favoriteIds, data._id);
            }).map((data) => <FavoriteClubCard key={data._id} club={data}
              favorite={_.find(this.props.favorites, function (fav) { return fav.favorite === data._id; })}
            />)}
          </Card.Group>
          <br/>
        </Container>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
FavoritesClubs.propTypes = {
  favorites: PropTypes.array.isRequired,
  clubs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Favorites.userPublicationName);
  const subscription2 = Meteor.subscribe(Clubs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Stuff documents
  const favorites = Favorites.collection.find({ owner: Meteor.user().username }).fetch();
  const clubs = Clubs.collection.find({}).fetch();
  return {
    favorites,
    clubs,
    ready,
  };
})(FavoritesClubs);
