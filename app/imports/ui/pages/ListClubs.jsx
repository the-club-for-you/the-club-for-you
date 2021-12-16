import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Input, Icon, Button, Form, Label, Portal, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink, Redirect } from 'react-router-dom';
import { _ } from 'lodash';
import { Clubs } from '../../api/club/Clubs';
import { Favorites } from '../../api/Favorites/Favorites';
import ClubCard from '../components/ClubCard';
import { Types } from '../../api/types/Types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListClubs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      search: '',
      filter: null,
      open: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.returnClick = this.returnClick.bind(this);
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
    if (filter === undefined || filter === '') {
      return [];
    }
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

  currentFilters(filterArr) {
    if (filterArr.length > 0) {
      return (
        filterArr.map((data, index) => <Label
          key={index}
          style={ { backgroundColor: `${this.labelColor(data)}`, color: 'white' } }
        >
          <NavLink exact to={`${this.removeFilter(filterArr, data)}`}><Icon name='x' /></NavLink>
          {data}
        </Label>)
      );
    }
    return null;
  }

  changeFilter(current, filter) {
    if (current.length <= 0) {
      return filter;
    }
    return `${current}+${filter}`;
  }

  handleClose = () => this.setState({ open: false })

  handleOpen = () => this.setState({ open: true })

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

  labelColor(type) {
    let color = '';
    const clubType = [
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
    for (let i = 0; i < clubType.length; i++) {
      if (type.toUpperCase() === clubType[i].name.toUpperCase()) {
        color = clubType[i].color;
      }
    }
    return color;
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    if (this.state.filter === undefined || this.state.filter === 'undefined') {
      return <Redirect to={'/clubs/all'} />;
    }
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  // searchValue is what user put in the search box.
  // findClub(clubName, allClub) return all the clubs that match the searchValue.
  renderPage() {
    const searchValue = this.state.search;
    const { open } = this.state;
    let filter = this.state.filter;
    let filterArr;
    let filteredClubs;

    if (filter === 'all') {
      filter = '';
      filterArr = this.strToArr(filter);
      filteredClubs = this.props.clubs;
    } else {
      filterArr = this.strToArr(filter);
      filteredClubs = _.filter(this.props.clubs, function (data) {
        for (let i = 0; i < filterArr.length; i++) {
          if (data.type.includes(filterArr[i]) === false) {
            return false;
          }
        }
        return true;
      });
    }

    return (
      <div className='clubs-background'>
        <Container style={{ paddingLeft: '20px', paddingRight: '20px' }}>
          <br/>
          <Button onClick={this.returnClick} color={'green'}>Back <Icon className='arrow left'/></Button>
          <Header style={ { fontSize: '400%' } } textAlign="center" inverted>Clubs</Header>
          <Container>
            <Label.Group>
              {this.currentFilters(filterArr)}
              <Label as={'a'} onClick={this.handleOpen} id={'addFilter'}>
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
                  id={data}
                  as={ NavLink }
                  exact
                  to={`/clubs/${this.changeFilter(filter, data)}`}
                  onClick={this.handleClose}
                  style={ { backgroundColor: `${this.labelColor(data)}`, color: 'white' } }
                >
                  {data}
                </Label>)}
              </Label.Group>
            </Segment>
          </Portal>
          <br/>
          <br/>
          <Form style={ { marginLeft: '25%' } } onSubmit={this.handleSubmit} id='search-bar'>
            <Input size="huge" style={ { width: '50%' } } type="text" value={this.state.value} onChange={this.handleChange} placeholder="Search by club's name" id='search-input'/>
            <Button size="huge" color='green' onClick={this.handleClick} id='search-button'><Icon className="search"/>Search</Button>
          </Form>
          {this.renderClubs(searchValue, filteredClubs)}
          <br/><br/><br/>
        </Container>
      </div>
    );
  }

  renderClubs(clubName, allClub) {
    const clubFound = [];
    const favorites = this.props.favorites;

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
        <Card.Group centered stackable itemsPerRow={5} id="club-list" >
          {clubFound.map((data) => <ClubCard
            key={data._id} club={data}
            favorite={_.find(favorites, function (fav) { return fav.favorite === data._id; })}
          />)}
        </Card.Group>
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
export default withTracker(({ match }) => {
  const filter = match.params.type;
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
    filter,
  };
})(ListClubs);
