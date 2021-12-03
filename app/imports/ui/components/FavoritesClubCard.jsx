import React from 'react';
import swal from 'sweetalert';
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import { Favorites } from '../../api/Favorites/Favorites';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ClubCard extends React.Component {

  submit(data) {
    const name = this.props.club.name;
    const approve = this.props.club.approve;
    const expire = this.props.club.expire;
    const type = this.props.club.type;
    const contact = this.props.club.contact;
    const email = this.props.club.email;
    const description = this.props.club.description;
    const _id = this.props.club._id;
    let { photo } = data;
    if (photo == null) {
      photo = 'default';
    }
    Favorites.collection.insert(_id, { $set: { name, approve, expire, type, contact, email, description, photo } },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Club added to Favorites', 'success');
        }
      });
  }

  render() {
    const clubTypes = [
      { name: 'academic', color: '#129488' },
      { name: 'cultural', color: '#3FDA7F' },
      { name: 'ethnic', color: '#3BA2B4' },
      { name: 'fraternity or sorority', color: '#90afa2' },
      { name: 'honorary society', color: '#20c4f4' },
      { name: 'leisure', color: '#AAC84C' },
      { name: 'political', color: '#2AC3F3' },
      { name: 'professional', color: '#4ca3dd' },
      { name: 'recreational', color: '#62D5CC' },
      { name: 'religious', color: '#276F9A' },
      { name: 'spiritual', color: '#532AF3' },
      { name: 'sports', color: '#F3362A' },
      { name: 'service', color: '#30D03B' },
    ];

    function labelColor(type, clubType) {
      let color = '';
      for (let i = 0; i < clubType.length; i++) {
        if (type.toUpperCase() === clubType[i].name.toUpperCase()) {
          color = clubType[i].color;
        }
      }
      return color;
    }

    if (this.props.club.photo === 'default') {
      this.props.club.photo = '/images/UH-logo.jpg';
    }
    return (
      <Card style={ { borderRadius: '25px' } }>
        <Image src={this.props.club.photo} wrapped ui={false} as={NavLink} to={`/clubsInfo/${this.props.club._id}`}/>
        <Card.Content as={NavLink} to={`/clubsInfo/${this.props.club._id}`}>
          <Card.Header>{this.props.club.name}</Card.Header>
          <Card.Meta>
            {this.props.club.approve.toLocaleDateString('en-US').substr(this.props.club.approve.toLocaleDateString('en-US').length - 4, 4)}
            -
            {this.props.club.expire.toLocaleDateString('en-US').substr(this.props.club.expire.toLocaleDateString('en-US').length - 4, 4)}
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Label.Group size={'large'}>
            {this.props.club.type.map((data, index) => <Label
              key={index}
              horizontal
              style={ { backgroundColor: `${labelColor(data, clubTypes)}`, color: 'white' } }
              as={ NavLink }
              exact
              to={`/clubtype/${data}`}
            >
              {data}
            </Label>)}
          </Label.Group>
        </Card.Content>

        <Card.Content extra>
          <Button onClick={data => this.submit(data)}>
            <Icon name="heart"/>
          </Button>
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
    contact: PropTypes.string,
    email: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.array,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ClubCard);
