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
          <Grid container inverted className={'ui centered grid container'}>
            <Grid.Row>
              <Icon size='large' className={'facebook'}/>
              <Icon size='large' className={'instagram'}/>
              <Icon size='large' className={'twitter'}/>
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
