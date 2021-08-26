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
            justifyContent='space-evenly'
            alignItems='center'
            direction='column'
            wrap='nowrap'
            className={classes.mainContainer}
          >
            <Grid
              item
              container
              justifyContent='space-around'
              wrap='nowrap'
              className={classes.iconsContainer}
            >
              <Box className={classes.starIcon}>
                <ShootingStars />
              </Box>
              <Gear />
              <Box className={classes.starIcon}>
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
