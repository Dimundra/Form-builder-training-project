import { Container, Grid, Typography } from '@material-ui/core';
import { NotFoundIcon } from '../../svg/NotFoundIcon/NotFoundIcon.js';
import { useStyles } from './NotFoundPage.MuiStyles.js';

function NotFoundPage() {
  const classes = useStyles();
  return (
    <Container className={classes.mainContainer}>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        direction='column'
        spacing={7}
        className={classes.mainGridContainer}
      >
        <Grid item className={classes.notFoundIcon}>
          <NotFoundIcon />
        </Grid>
        <Grid item>
          <Typography variant='h3' align='center' className={classes.mainText}>
            Sorry! Unfortunately such page doesn't exist.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default NotFoundPage;
