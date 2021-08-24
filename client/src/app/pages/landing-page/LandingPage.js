import { Box, Container, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import Header from '../../components/header/Header.js';
import { ShootingStars } from '../../svg/ShootingStars/ShootingStars.js';
import { Gear } from '../../svg/Gear/Gear.js';
import { styles } from './LandingPage.styles.js';

class LandingPage extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <Header />
        <Container>
          <Box key={2} className={classes.starLeft}>
            <ShootingStars />
          </Box>
          <Grid
            container
            spacing={6}
            justifyContent='center'
            alignItems='center'
            direction='column'
            className={classes.mainContainer}
          >
            <Grid item>
              <Gear />
            </Grid>
            <Grid item>
              <Typography variant='h3' align='center' className={classes.text}>
                THE SUPERIOR FORM BUILDER DESIGNED SPECIFICALLY FOR YOU
              </Typography>
            </Grid>
          </Grid>
          <Box key={1} className={classes.starRight}>
            <ShootingStars />
          </Box>
        </Container>
      </>
    );
  }
}

export default withStyles(styles)(LandingPage);
