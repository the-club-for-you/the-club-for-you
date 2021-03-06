import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
import { AutoForm, DateField, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { withTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { _ } from 'lodash';
import { Events } from '../../api/event/Events';
import { Clubs } from '../../api/club/Clubs';

// Create a schema to specify the structure of the data to appear in the form.

/** Renders the Page for adding a document. */
class EditEvent extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { title, isodate, description } = data;
    const _id = this.props.doc._id;
    let { club } = data;
    const date = isodate.toLocaleDateString();
    club = _.find(this.props.clubs, function (temp) {
      return temp.name === club;
    })._id;
    Events.collection.update(_id, { $set: { title, date, isodate, club, description } },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    const clubs = _.map(this.props.clubs, 'name');
    const tempDoc = this.props.doc;
    const formSchema = new SimpleSchema({
      title: String,
      isodate: Date,
      club: {
        type: String,
        allowedValues: clubs,
      },
      description: String,
    });
    const bridge = new SimpleSchema2Bridge(formSchema);
    let fRef = null;
    tempDoc.club = _.find(this.props.clubs, function (data) {
      return data._id === tempDoc.club;
    }).name;
    return (
      <div className='clubs-background' style={ { marginTop: '14px' } }>
        <Grid container centered>
          <Grid.Column>
            <br/>
            <Header style={ { fontSize: '400%' } } textAlign="center" inverted>Add an Event</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} id='add-form' model={this.props.doc}>
              <Segment>
                <Form.Group widths={'equal'}>
                  <SelectField name='club' label='Club'/>
                  <TextField name='title' label='Short Title'/>
                  <DateField name='isodate' label='Date'/>
                </Form.Group>
                <Form.Group widths={'equal'}>
                  <LongTextField name='description' label='Description'/>
                </Form.Group>
                <SubmitField value='Submit'/>
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

EditEvent.propTypes = {
  clubs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  doc: PropTypes.object,
};

export default withTracker(({ match }) => {
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Clubs.userPublicationName);
  const subscription2 = Meteor.subscribe(Events.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Stuff documents
  const clubs = Clubs.collection.find({ owner: Meteor.user().username }).fetch();
  const doc = Events.collection.findOne(documentId);
  return {
    clubs,
    ready,
    doc,
  };
})(EditEvent);
