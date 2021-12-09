import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    return (
      <Menu attached="top" borderless>
        <Image style={ { padding: '5px 5px 5px 5px', height: '50px' } } src="/images/logo.png"/>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
           Home
        </Menu.Item>
        <Menu.Item as={NavLink} activeClassName="active" exact to="/contact"
          key='contact' id='contact-page'>Contact</Menu.Item>
        {this.props.currentUser ? (
          [<Menu.Item as={NavLink} activeClassName="active" exact to="/clubs" key='clubs' id="list-clubs">Clubs</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/interests" key='interest' id='interests-page'>Interests</Menu.Item>],
          [<Menu.Item as={NavLink} activeClassName="active" exact to="/clubs" key='clubs' id="list-clubs">Clubs</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/interests" key='interest' id="interests-page">Interests</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/favorites" key='favorites' id="favorites-page">Favorites</Menu.Item>]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'club') ? (
          [<Menu.Item as={NavLink} activeClassName="active" exact to="/myclubs" key='myclubs'>My Clubs</Menu.Item>]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          [<Menu.Item as={NavLink} activeClassName="active" exact to="/edit" key='edit' id='editClubs'>Edit Clubs</Menu.Item>,
            <Menu.Item as={NavLink} activeClassName="active" exact to="/add" key='add' id='addClub'>Add a New Club</Menu.Item>]
        ) : ''}
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Dropdown id="login-dropdown" text="Login" pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

// Declare the types of all properties.
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
