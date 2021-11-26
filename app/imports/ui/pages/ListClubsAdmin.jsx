import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Form, Input, Button, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Clubs } from '../../api/club/Clubs';
import ClubCardAdmin from '../components/ClubCardAdmin';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListClubsAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', search: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const searchValue = this.state.search;
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
            {clubFound.map((data) => <ClubCardAdmin key={data._id} club={data} />)}
          </Card.Group>
        </div>
      );
    }
    return (
      <div className='clubs-background'>
        <Container>
          <br/>
          <Header style={ { fontSize: '400%' } } textAlign="center" inverted>Clubs</Header><br/>
          <Form style={ { marginLeft: '25%' } } onSubmit={this.handleSubmit}>
            <Input size="huge" style={ { width: '50%' } } type="text" value={this.state.value} onChange={this.handleChange} placeholder="Search by club's name"/>
            <Button size="huge" color='green' onClick={this.handleClick}><Icon className="search"/>Search</Button>
          </Form>
          {findClub(searchValue, this.props.clubs)}
          <br/><br/><br/>
        </Container>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
ListClubsAdmin.propTypes = {
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
})(ListClubsAdmin);
