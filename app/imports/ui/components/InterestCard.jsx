import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class InterestCard extends React.Component {

  render() {
    return (
      <Card as={ NavLink } id={`${this.props.interest.name}`}
        exact
        to={`/clubs/${this.props.interest.name}` }>
        <br></br>
        <Icon color={'green'} fitted size='huge' name={this.props.interest.icon} />
        <br></br>
        <Card.Content>
          <Card.Header>{this.props.interest.name}</Card.Header>
          <Card.Meta>
          </Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
InterestCard.propTypes = {
  interest: PropTypes.shape({
    name: PropTypes.string,
    icon: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(InterestCard);
