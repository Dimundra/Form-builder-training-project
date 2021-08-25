import { Box, Container, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import Header from '../../components/header/Header.js';
import { ShootingStars } from '../../svg/ShootingStars/ShootingStars.js';
import { Gear } from '../../svg/Gear/Gear.js';
import { styles } from './LandingPage.MuiStyles.js';

class LandingPage extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <Header />
        <Container>
          <Grid
            container
            spacing={6}
            justifyContent='center'
            alignItems='center'
            direction='column'
            className={classes.mainContainer}
          >
            <Grid item container justifyContent='space-around'>
              <Box>
                <ShootingStars />
              </Box>
              <Gear />
              <Box>
                <ShootingStars />
              </Box>
            </Grid>
            <Grid item>
              <Typography
                variant='h3'
                align='center'
                className={classes.mainText}
              >
                THE SUPERIOR FORM BUILDER DESIGNED SPECIFICALLY FOR YOU
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}

export default withStyles(styles)(LandingPage);
