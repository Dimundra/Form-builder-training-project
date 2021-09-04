import { Box, Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { ShootingStars } from '../../svg/ShootingStars/ShootingStars.js';
import { Gear } from '../../svg/Gear/Gear.js';
import { useStyles } from './LandingPage.MuiStyles.js';

function LandingPage() {
  const classes = useStyles();
  return (
    <Container className={classes.mainContainer}>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        direction='column'
        wrap='nowrap'
        spacing={7}
        className={classes.mainGridContainer}
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
          <Box className={classes.gearIcon}>
            <Gear />
          </Box>
          <Box className={classes.starIcon}>
            <ShootingStars />
          </Box>
        </Grid>
        <Grid item>
          <Typography variant='h3' align='center' className={classes.mainText}>
            THE SUPERIOR FORM BUILDER DESIGNED SPECIFICALLY FOR YOU
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LandingPage;
