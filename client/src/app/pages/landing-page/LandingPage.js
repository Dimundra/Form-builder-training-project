import { Box, Container, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import Header from '../../components/header/Header.js';
import { ShootingStars } from '../../svg/ShootingStars/ShootingStars.js';
import { Gear } from '../../svg/Gear/Gear.js';
import { useStyles } from './LandingPage.MuiStyles.js';

function LandingPage() {
  const classes = useStyles();
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
            <Box className={classes.gearIcon}>
              <Gear />
            </Box>
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

export default LandingPage;
