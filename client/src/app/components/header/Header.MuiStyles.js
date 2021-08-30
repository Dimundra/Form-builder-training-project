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
  logoButton: {
    borderRadius: '0',
    color: 'white',
  },
  logoText: {
    marginLeft: '0.5rem',
  },
  headerBackgroundColor: {
    backgroundImage: 'linear-gradient(270deg,#4668b5,#b567dc,#e04951)',
  },
  signUpMobileButton: {
    backgroundColor: 'transparent',
  },
  signInMobileButton: {
    backgroundColor: 'transparent',
    paddingLeft: '15px',
  },
});

export { styles };
