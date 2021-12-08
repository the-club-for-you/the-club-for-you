import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Input, Icon, Button, Form } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'lodash';
import { Clubs } from '../../api/club/Clubs';
import { Favorites } from '../../api/Favorites/Favorites';
import ClubCard from '../components/ClubCard';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListClubs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', search: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.returnClick = this.returnClick.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit() {
    this.setState({ search: this.state.value });
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({ search: this.state.value });
  }

  returnClick() {
    this.setState({ search: '' });
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  // searchValue is what user put in the search box.
  // findClub(clubName, allClub) return all the clubs that match the searchValue.
  renderPage() {
    const searchValue = this.state.search;
    const favorites = this.props.favorites;
    console.log(this.props.favorites);

    function findClub(clubName, allClub) {
      const clubFound = [];
      for (let i = 0; i < allClub.length; i++) {
        const clubs = (allClub[i].name).toUpperCase();
        const input = clubName.toUpperCase();
        if (clubs.includes(input)) {
          clubFound.push(allClub[i]);
        }
      }
      if (clubFound.length === 0) {
        return (<Header style={ { fontSize: '200%' } } inverted>No club Found.</Header>);
      }

      return (
        <div> <br/><br/>
          <Card.Group centered stackable itemsPerRow={5}>
            {clubFound.map((data) => <ClubCard
              key={data._id} club={data}
              favorite={_.find(favorites, function (fav) { return fav.favorite === data._id; })}
            />)}
          </Card.Group>
        </div>
      );
    }
    return (
      <div className='clubs-background'>
        <Container style={{ paddingLeft: '20px', paddingRight: '20px' }}>
          <br/>
          <Button onClick={this.returnClick} color={'green'}>Back <Icon className='arrow left'/></Button>
          <Header style={ { fontSize: '400%' } } textAlign="center" inverted>Clubs</Header>
          <Form style={ { marginLeft: '25%' } } onSubmit={this.handleSubmit} id='search-bar'>
            <Input size="huge" style={ { width: '50%' } } type="text" value={this.state.value} onChange={this.handleChange} placeholder="Search by club's name" id='search-input'/>
            <Button size="huge" color='green' onClick={this.handleClick} id='search-button'><Icon className="search"/>Search</Button>
          </Form>
          {findClub(searchValue, this.props.clubs)}
          <br/><br/><br/>
        </Container>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
ListClubs.propTypes = {
  clubs: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  filter: PropTypes.string,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Clubs.userPublicationName);
  const subscription2 = Meteor.subscribe(Favorites.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Stuff documents
  const clubs = Clubs.collection.find({}).fetch();
  const favorites = Favorites.collection.find({ owner: Meteor.user().username }).fetch();
  return {
    clubs,
    favorites,
    ready,
  };
})(ListClubs);
