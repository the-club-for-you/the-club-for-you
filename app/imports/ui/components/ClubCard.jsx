import React from 'react';
import { Card, Image, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ClubCard extends React.Component {
  render() {
    if (this.props.club.photo === 'default') {
      this.props.club.photo = '/images/UH-logo.jpg';
    }
    return (
      <Card as={NavLink} activeClassName="active" exact to={`/clubsInfo/${this.props.club._id}`}>
        <Image src={this.props.club.photo} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{this.props.club.name}</Card.Header>
          <Card.Meta>
            {this.props.club.approve.toLocaleDateString('en-US').substr(this.props.club.approve.toLocaleDateString('en-US').length - 4, 4)}
            -
            {this.props.club.expire.toLocaleDateString('en-US').substr(this.props.club.expire.toLocaleDateString('en-US').length - 4, 4)}
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Label.Group>
            {this.props.club.type.map((data, index) => <Label
              key={index}
              horizontal
              as={ NavLink }
              exact
              to={`/clubtype/${data}`}
            >
              {data}
            </Label>)}
          </Label.Group>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
ClubCard.propTypes = {
  club: PropTypes.shape({
    name: PropTypes.string,
    photo: PropTypes.string,
    approve: PropTypes.any,
    expire: PropTypes.any,
    type: PropTypes.array,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ClubCard);
