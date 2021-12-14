import React from 'react';
import { Container, Grid, Header, Label, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { NavLink } from 'react-router-dom';
import { Clubs } from '../../api/club/Clubs';

const bridge = new SimpleSchema2Bridge(Clubs.schema);

/** A simple static component to render some text for the landing page. */
class ClubInfo extends React.Component {
  state = { open: false }

  open = () => this.setState({ open: true })

  close = () => this.setState({ open: false })

  // On successful submit, insert the data.
  read(data) {
    const { name, approve, expire, type, contact, email, description, website, _id } = data;
    let { photo } = data;
    if (photo == null) {
      photo = 'default';
    }
    Clubs.collection.find(_id, { $set: { name, approve, expire, type, contact, email, description, photo, website } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Club find successfully', 'success')));
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
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
    return (
      <div className="clubsInfo-background">
        <Grid container id='landing-page' verticalAlign="middle" className="information" schema={bridge} onSubmit={data => this.read(data)} model={this.props.doc}>
          <Container className='informations'>
            <Grid.Row>
              <br/>
              <Header size='huge'>{this.props.doc.name}</Header>
            </Grid.Row>
            <br/>
            <Grid.Row>
              <Label.Group>
                {this.props.doc.type.map((data, index) => <Label size='big'
                  key={index}
                  horizontal
                  style={ { backgroundColor: `${labelColor(data, clubTypes)}`, color: 'white' } }
                  as={ NavLink }
                  exact
                  to={`/clubs/${data}`}
                >
                  {data}
                </Label>)}
              </Label.Group>
            </Grid.Row>
            <br/>
            <Grid.Row>
              <Header as='h2'>Purpose:</Header>
              <Header as='h4'>{this.props.doc.description}</Header>
            </Grid.Row>
            <br/>
            <Grid.Row>
              <Header as='h2'>Contact information:</Header>
              <ul>
                <li><Header as='h4'>Contact Person:</Header> {this.props.doc.contact}</li> <br/>
                <li><Header as='h4'>Contact Person`s Email:</Header> {this.props.doc.email}</li>
              </ul>
              <Header as={'h3'}>
                <a href={this.props.doc.website}> {this.props.doc.website}</a>
              </Header>
              <br/>
            </Grid.Row>
          </Container>
        </Grid>
      </div>
    );
  }
}

ClubInfo.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Clubs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Clubs.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(ClubInfo);
