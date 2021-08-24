import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import { LogoIcon } from '../../svg/LogoIcon/LogoIcon.js';
import { SignUpIcon } from '../../svg/SignUpIcon/SignUpIcon.js';
import { SignInIcon } from '../../svg/SingInIcon/SignInIcon.js';
import { Container } from '@material-ui/core';
import { styles } from './Header.styles.js';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
    };
  }

  render() {
    const { classes } = this.props;
    const isMobileMenuOpen = Boolean(this.state.mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
      this.setState({
        mobileMoreAnchorEl: null,
      });
    };

    const handleMobileMenuOpen = (event) => {
      this.setState({
        mobileMoreAnchorEl: event.currentTarget,
      });
    };

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={this.state.mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton
            disableRipple={true}
            disableFocusRipple={true}
            color='primary'
            style={{ backgroundColor: 'transparent' }}
          >
            <SignUpIcon />
          </IconButton>
          <p>Sign Up</p>
        </MenuItem>
        <MenuItem>
          <IconButton
            disableRipple={true}
            disableFocusRipple={true}
            color='inherit'
            style={{ backgroundColor: 'transparent', paddingLeft: '15px' }}
          >
            <SignInIcon />
          </IconButton>
          <p>Sign In</p>
        </MenuItem>
      </Menu>
    );
    return (
      <div className={classes.grow}>
        <AppBar position='static' className={classes.backColor}>
          <Container>
            <Toolbar disableGutters={true}>
              <Button className={classes.logo_button}>
                <LogoIcon />
                <span style={{ marginLeft: '0.5rem' }}>Form builder</span>
              </Button>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <Grid container spacing={3}>
                  <Grid item>
                    <Button
                      disableElevation={true}
                      variant='contained'
                      size='large'
                    >
                      Sign Up
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      disableElevation={true}
                      variant='contained'
                      color='secondary'
                      size='large'
                    >
                      Sign in
                    </Button>
                  </Grid>
                </Grid>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label='show more'
                  aria-controls={mobileMenuId}
                  aria-haspopup='true'
                  onClick={handleMobileMenuOpen}
                  color='inherit'
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
        {renderMobileMenu}
      </div>
    );
  }
}

export default withStyles(styles)(Header);
