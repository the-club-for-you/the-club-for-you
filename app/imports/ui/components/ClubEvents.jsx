import React from 'react';
import { Loader, Item, Container, Segment, Button } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { _ } from 'lodash';
import { Events } from '../../api/event/Events';

/** Renders the Page for editing a single document. */
class Event extends React.Component {

  ifOwnedEdit(_id) {
    if (this.props.owner) {
      return (
        <Item.Extra>
          <Button as={NavLink} to={`/editevent/${_id}`} floated='right'>Edit</Button>
        </Item.Extra>
      );
    }
    return null;
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    const _id = this.props.club;
    const events = _.filter(this.props.events, function (data) {
      return data.club === _id;
    });

    return (
      <Container>
        <Segment>
          <Item.Group divided>
            {events.map((data, index) => <Item key={index}>
              <Item.Content>
                <Item.Header as='h3'>{`${data.title}`}</Item.Header>
                <Item.Meta>{`${data.date} at ${data.isodate.toLocaleTimeString('en-US')}`}</Item.Meta>
                <Item.Description>{data.description}</Item.Description>
                {this.ifOwnedEdit(data._id)}
              </Item.Content>
            </Item>)}
          </Item.Group>
        </Segment>
      </Container>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
Event.propTypes = {
  events: PropTypes.array,
  club: PropTypes.string,
  ready: PropTypes.bool.isRequired,
  owner: PropTypes.bool,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  const subscription = Meteor.subscribe(Events.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const events = Events.collection.find({}).fetch();
  return {
    events,
    ready,
  };
})(Event);
