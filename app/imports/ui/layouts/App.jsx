import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import ListClubs from '../pages/ListClubs';
import ListClubsFilter from '../pages/ListClubsFilter';
import ListClubsAdmin from '../pages/ListClubsAdmin';
import AddClub from '../pages/AddClub';
import EditStuff from '../pages/EditStuff';
import EditClub from '../pages/EditClub';
import EditMyClub from '../pages/EditMyClub';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import Reset from '../pages/Reset';
import Interests from '../pages/Interests';
import MyClubs from '../pages/MyClubs';
import Contact from '../pages/Contact';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/signout" component={Signout}/>
            <Route path="/resetpassword" component={Reset}/>
            <Route path="/clubs" component={ListClubs}/>
            <Route path="/interests" component={Interests}/>
            <Route path="/clubtype/:type" component={ListClubsFilter}/>
            <Route path="/clubtype" component={Interests}/>
            <Route path="/contact" component={Contact}/>
            <ProtectedRoute path="/list" component={ListClubs}/>
            <ProtectedRoute path="/add" component={AddClub}/>
            <ProtectedRoute path="/edit/:_id" component={EditClub}/>
            <AdminProtectedRoute path="/edit" component={ListClubsAdmin}/>
            <AdminProtectedRoute path="/add" component={AddClub}/>
            <AdminProtectedRoute path="/edit/:_id" component={EditStuff}/>
            <AdminProtectedRoute path="/edit/:_id" component={EditClub}/>
            <AdminProtectedRoute path="/admin" component={ListClubsAdmin}/>
            <ClubProtectedRoute path="/myclubs/edit/:_id" component={EditMyClub}/>
            <ClubProtectedRoute path="/myclubs" component={MyClubs}/>
            <Route component={NotFound}/>
          </Switch>
          <Footer/>
        </div>
      </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      return (isLogged && isAdmin) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

const ClubProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isClub = Roles.userIsInRole(Meteor.userId(), 'club');
      return (isLogged && isClub) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

ClubProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
