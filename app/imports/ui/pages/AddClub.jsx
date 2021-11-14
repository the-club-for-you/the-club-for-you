import React from 'react';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
import { AutoForm, DateField, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Clubs } from '../../api/club/Clubs';
import { Types } from '../../api/types/Types';
import MultiSelectField from '../../forms/controllers/MultiSelectField';

const types = Types.list;

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  approve: Date,
  expire: Date,
  type: { type: Array, optional: false },
  'type.$': { type: String, allowedValues: types },
  contact: String,
  owner: String,
  description: String,
  photo: { type: String, optional: true },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddClub extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, approve, expire, type, contact, owner, description } = data;
    let { photo } = data;
    if (photo == null) {
      photo = 'default';
    }
    Clubs.collection.insert({ name, approve, expire, type, contact, owner, description, photo },
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
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <br/>
          <Header as="h2" textAlign="center">Add a New Club</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
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
              <ErrorsField/>
            </Segment>
          </AutoForm>
          <br/>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddClub;
