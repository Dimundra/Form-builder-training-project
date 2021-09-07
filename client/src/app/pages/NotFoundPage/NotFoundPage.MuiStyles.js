import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
  return {
    mainContainer: {
      overflow: 'hidden',
    },
    mainGridContainer: {
      height: 'calc(100vh - 64px)',
    },
    notFoundIcon: {
      [theme.breakpoints.down('md')]: {
        transform: 'scale(0.9, 0.9)',
      },
      [theme.breakpoints.down('sm')]: {
        transform: 'scale(0.8, 0.8)',
      },
      [theme.breakpoints.down('xs')]: {
        transform: 'scale(0.7, 0.7)',
      },
    },
    mainText: {
      fontWeight: 'bolder',
    },
  };
});

export { useStyles };
