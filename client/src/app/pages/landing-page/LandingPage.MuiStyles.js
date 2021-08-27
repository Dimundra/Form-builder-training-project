const styles = (theme) => {
  return {
    mainContainer: {
      height: 'calc(100vh - 64px)',
      paddingBottom: '60px',
    },
    mainText: {
      backgroundImage: 'linear-gradient(90deg,#12c2e9,#c471ed,#f64f59)',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
      fontWeight: 'bold',
    },
    iconsContainer: {
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
    starIcon: {
      flexShrink: '0',
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    gearIcon: {
      flexShrink: '0',
    },
  };
};

export { styles };
