import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    const linkStyle = { color: 'white' };
    return (
      <footer>
        <div className="footer-background" style={divStyle}>
          <hr /> <br/>
          <Grid inverted className='ui centered grid container'>
            <Grid.Column textAlign='center' className='four wide column'>
              <a href="https://manoa.hawaii.edu/a-z/" style={linkStyle}> A-Z Index</a> <br/>
              <a href="https://manoa.hawaii.edu/catalog/calendar/" style={linkStyle}>Academic Calendar</a> <br/>
              <a href="https://www.hawaii.edu/access/" style={linkStyle}> Accessibility at UH</a> <br/>
            </Grid.Column>
            <Grid.Column textAlign='center' className='four wide column'>
              <a href="https://map.hawaii.edu/manoa/" style={linkStyle}> Campus Maps</a> <br/>
              <a href="https://manoa.hawaii.edu/commuter/" style={linkStyle}> Parking & Transportation </a> <br/>
              <a href="https://manoa.hawaii.edu/emergency/student-emergency-faqs/" style={linkStyle}> Emergency Information </a> <br/>
            </Grid.Column>
            <Grid.Column textAlign='center' className='four wide column'>
              <a href="https://myuh.hawaii.edu/" style={linkStyle}> MyUH </a> <br/>
              <a href="https://manoa.hawaii.edu/campus-life/safety/" style={linkStyle}> Campus Safety </a><br/>
              <a href="https://manoa.hawaii.edu/titleix/" style={linkStyle}> Title IX </a><br/>
            </Grid.Column>
          </Grid>
          <Grid container inverted className='ui centered grid container'>
            <Grid.Row>
              <a href="https://www.facebook.com/uhmanoa/"><Icon size='large' className={'inverted facebook'}/></a>
              <a href="https://www.instagram.com/uhmanoanews/"><Icon size='large' className={'inverted instagram'}/></a>
              <a href="https://twitter.com/uhmanoa"><Icon size='large' className={'inverted twitter'}/></a>
            </Grid.Row>
            <Grid.Row>
              University of Hawaiʻi at Mānoa <br />
              Honolulu, HI 96822 <br />
            </Grid.Row>
          </Grid>
        </div>
      </footer>
    );
  }
}

export default Footer;
