const styles = (theme) => ({
  grow: {
    flexGrow: 1,
  },
  signUpLinkDesktop: {
    textDecoration: 'none',
    color: 'black',
  },
  signInLinkDesktop: {
    textDecoration: 'none',
    color: 'white',
  },
  signUpInLinkMobile: {
    textDecoration: 'none',
    color: 'black',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexBasis: '250px',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  logo_button: {
    borderRadius: '0',
    color: 'white',
  },
  backColor: {
    backgroundImage: 'linear-gradient(270deg,#4668b5,#b567dc,#e04951)',
  },
});

export { styles };
