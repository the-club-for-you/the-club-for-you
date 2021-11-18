import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    return (
      <footer>
        <div className="footer-background" style={divStyle}>
          <hr /> <br/>
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
