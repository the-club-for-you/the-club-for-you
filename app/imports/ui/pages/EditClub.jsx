import React from 'react';
import { Grid, Loader, Header, Segment, Form, Button, Confirm } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, DateField, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Clubs } from '../../api/club/Clubs';
import MultiSelectField from '../../forms/controllers/MultiSelectField';

const bridge = new SimpleSchema2Bridge(Clubs.schema);

/** Renders the Page for editing a single document. */
class EditClub extends React.Component {

  state = { open: false }

  open = () => this.setState({ open: true })

  close = () => this.setState({ open: false })

  // On successful submit, insert the data.
  submit(data) {
    const { name, approve, expire, type, contact, owner, description, _id } = data;
    let { photo } = data;
    if (photo == null) {
      photo = 'default';
    }
    Clubs.collection.update(_id, { $set: { name, approve, expire, type, contact, owner, description, photo } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  }

  delete() {
    Clubs.collection.remove(this.props.doc._id,
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item Deleted Successfully', 'success');
        }
      });
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <div className='clubsInfo-background'>
        <Grid container centered>
          <Grid.Column>
            <br/>
            <Header as="h1" textAlign="center" inverted>Edit Club</Header>
            <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
              <Segment>
                <TextField name='name' label='Title of Club' />
                <Form.Group widths={'equal'}>
                  <TextField name='contact' label='Main Contact Name'/>
                  <TextField name='email'/>
                </Form.Group>
                <Form.Group widths={'equal'}>
                  <MultiSelectField name='type' />
                  <DateField name='approve' label='Approved On'/>
                  <DateField name='expire' label='Expires On'/>
                </Form.Group>
                <TextField name='owner' label='Owner (email address)'/>
                <TextField name='photo' label='Photo (url)'/>
                <LongTextField name='description' />
                <SubmitField value='Submit'/>
                <Button type="button" basic icon='trash' color='red' floated='right' onClick={this.open}/>
                <Confirm
                  open={this.state.open}
                  content='Are you sure you want to delete this club? This cannot be undone.'
                  onCancel={this.close}
                  onConfirm={this.delete.bind(this)}
                />
                <ErrorsField/>
              </Segment>
            </AutoForm>
            <br/>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditClub.propTypes = {
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
})(EditClub);
