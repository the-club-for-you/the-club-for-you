import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Label, Icon, Portal, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { _ } from 'lodash';
import PropTypes from 'prop-types';
import * as Console from 'console';
import { NavLink, Redirect } from 'react-router-dom';
import { Clubs } from '../../api/club/Clubs';
import ClubCard from '../components/ClubCard';
import { Types } from '../../api/types/Types';

class ListClubsFilter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: null,
      open: false,
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

  strToArr(filter) {
    const arr = [];
    let temp = '';
    for (let i = 0; i <= filter.length; i++) {
      if (filter.charAt(i) === '+' || filter.charAt(i) === '') {
        arr.push(temp);
        temp = '';
      } else {
        temp += filter.charAt(i);
      }
    }
    return arr;
  }

  arrToStr(arr) {
    let str = '';
    let i = 0;
    for (i = 0; i < arr.length - 1; i++) {
      str += arr[i];
      str += '+';
    }
    str += arr[i];
    return str;
  }

  removeFilter(filterArr, type) {
    return this.arrToStr(_.filter(filterArr, function (data) {
      return data !== type;
    }));
  }

  handleClose = () => this.setState({ open: false })

  handleOpen = () => this.setState({ open: true })

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    if (this.state.filter === 'undefined') {
      return <Redirect to={'/clubs'} />;
    }
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const filter = this.state.filter;
    const { open } = this.state;
    const filterArr = this.strToArr(filter);
    Console.log(filterArr);
    return (
      <div className="background">  <br/>
        <Header as="h2" textAlign="center">Clubs</Header>
        <Container>
          <Label.Group>
            {filterArr.map((data, index) => <Label
              key={index}
            >
              <NavLink exact to={`${this.removeFilter(filterArr, data)}`}><Icon name='x' /></NavLink>
              {data}
            </Label>)}
            <Label as={'a'} onClick={this.handleOpen}>
              <Icon name={'plus circle'} />
              Add Filter
            </Label>
          </Label.Group>
        </Container>
        <Portal onClose={this.handleClose} open={open}>
          <Segment
            style={{
              left: '20%',
              position: 'fixed',
              top: '20%',
              zIndex: 1000,
              width: '500px',
            }}
          >
            <Label.Group>
              {_.filter(Types.list, function (data) {
                return filterArr.includes(data) === false;
              }).map((data, index) => <Label
                key={index}
                horizontal
                as={ NavLink }
                exact
                to={`/clubtype/${`${filter}+${data}`}`}
                onClick={this.handleClose}
              >
                {data}
              </Label>)}
            </Label.Group>
          </Segment>
        </Portal>
        <br/>
        <br/>
        <Container>
          <Card.Group centered itemsPerRow={6}>
            {_.filter(this.props.clubs, function (data) {
              for (let i = 0; i < filterArr.length; i++) {
                if (data.type.includes(filterArr[i]) === false) {
                  return false;
                }
              }
              return true;
            }).map((data) => <ClubCard key={data._id} club={data} />)}
          </Card.Group>
          <br/>
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
