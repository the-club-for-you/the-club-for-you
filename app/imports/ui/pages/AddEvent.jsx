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
class AddEvent extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { title, isodate, description } = data;
    let { club } = data;
    const date = isodate.toLocaleDateString();
    club = _.find(this.props.clubs, function (temp) {
      return temp.name === club;
    })._id;
    Events.collection.insert({ title, date, isodate, club, description },
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
    return (
      <div className='clubs-background' style={ { marginTop: '14px' } }>
        <Grid container centered>
          <Grid.Column>
            <br/>
            <Header style={ { fontSize: '400%' } } textAlign="center" inverted>Add an Event</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} id='addEvent-form'>
              <Segment>
                <Form.Group widths={'equal'}>
                  <SelectField name='club' label='Club' id='eventClub'/>
                  <TextField name='title' label='Short Title' id='eventTitle'/>
                  <DateField name='isodate' label='Date' id='eventDate'/>
                </Form.Group>
                <Form.Group widths={'equal'}>
                  <LongTextField name='description' label='Description' id='eventDescription'/>
                </Form.Group>
                <SubmitField value='Submit' id='submit-addEvent'/>
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

AddEvent.propTypes = {
  clubs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Clubs.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const clubs = Clubs.collection.find({ owner: Meteor.user().username }).fetch();
  return {
    clubs,
    ready,
  };
})(AddEvent);
