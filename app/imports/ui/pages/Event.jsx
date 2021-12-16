import React from 'react';
import { Loader, Header, Item, Container, Segment } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { _ } from 'lodash';
import { Events } from '../../api/event/Events';
import { Clubs } from '../../api/club/Clubs';

/** Renders the Page for editing a single document. */
class Event extends React.Component {

  getClubData(_id) {
    return _.find(this.props.clubs, function (data) {
      return data._id === _id;
    });
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <div className='background'>
        <Container>
          <br />
          <Header style={ { fontSize: '400%' } } textAlign="center" inverted>Events</Header>
          <Header as='h2' inverted>{this.props.date.toLocaleDateString()}</Header>
          {this.renderEvents()}
        </Container>
      </div>

    );
  }

  renderEvents() {
    if (this.props.events.length > 0) {
      return (
        <Segment>
          <Item.Group divided>
            {this.props.events.map((data, index) => <Item key={index}>
              <Item.Image size='tiny' src={this.getClubData(data.club).photo}/>
              <Item.Content>
                <Item.Header as='h3'>{`${data.title} (`}<NavLink to={`/clubsInfo/${data.club}`}>{this.getClubData(data.club).name}</NavLink>{')'}</Item.Header>
                <Item.Meta>{data.isodate.toLocaleTimeString()}</Item.Meta>
                <Item.Description>{data.description}</Item.Description>
              </Item.Content>
            </Item>)}
          </Item.Group>
        </Segment>
      );
    }
    return (
      <Header as='h2' inverted>No Events</Header>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
Event.propTypes = {
  events: PropTypes.array,
  clubs: PropTypes.array,
  ready: PropTypes.bool.isRequired,
  date: PropTypes.any,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const year = match.params.year;
  const month = match.params.month;
  const day = match.params.day;
  const date = new Date(year, month, day);
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Events.userPublicationName);
  const subscription2 = Meteor.subscribe(Clubs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the document
  const events = Events.collection.find({ date: date.toLocaleDateString() }).fetch();
  const clubs = Clubs.collection.find({}).fetch();
  return {
    events,
    ready,
    date,
    clubs,
  };
})(Event);
