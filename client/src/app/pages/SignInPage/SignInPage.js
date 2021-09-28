import React from 'react';
import {
  Grid,
  Container,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './SignInPage.MuiStyles.js';
import { validationSchema } from './validation/validationSchema.js';
import { connect } from 'react-redux';
import { login } from '../../store/actionCreators/authActions.js';
import {
  setValidationError,
  cleanErrors,
} from '../../store/actionCreators/errorActions.js';
import { withRouter } from 'react-router-dom';

class SignInPage extends React.Component {
  constructor(props) {
    super(props);
    this.STATE_TYPES = {
      EMAIL: 'email',
      PASSWORD: 'password',
    };
    this.state = {
      email: '',
      password: '',
    };
  }

  handleFormChange(e, type) {
    this.setState({
      [type]: e.target.value,
    });
    this.props.cleanErrors();
  }

  handleSubmit() {
    validationSchema
      .validate({ email: this.state.email, password: this.state.password })
      .then(({ email, password }) => {
        const redirect = this.props.history.push;
        this.props.login(email, password, redirect);
      })
      .catch((error) => {
        this.props.setValidationError(error.message);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <Container>
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          direction='column'
          className={classes.mainGridContainer}
        >
          <Typography variant='h4' className={classes.title}>
            Sign In Here!
          </Typography>
          <form>
            <Grid container direction='column' alignItems='center' spacing={2}>
              <Grid item className={classes.TextFieldContainer}>
                <TextField
                  className={classes.TextFieldStyles}
                  label='email'
                  variant='outlined'
                  error={this.props.isError}
                  value={this.state.email}
                  onChange={(e) =>
                    this.handleFormChange(e, this.STATE_TYPES.EMAIL)
                  }
                />
              </Grid>
              <Grid item>
                <TextField
                  className={classes.TextFieldStyles}
                  error={this.props.isError}
                  helperText={this.props.isError ? this.props.errorMessage : ''}
                  label='password'
                  variant='outlined'
                  value={this.state.password}
                  onChange={(e) =>
                    this.handleFormChange(e, this.STATE_TYPES.PASSWORD)
                  }
                />
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  color='primary'
                  size='large'
                  onClick={(e) => this.handleSubmit()}
                >
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    isError: state.errorReducer.isError,
    errorMessage: state.errorReducer.errorMessage,
  };
}

const mapDispatchToProps = {
  login,
  setValidationError,
  cleanErrors,
};

//add material styles
let wrappedSingInPage = withStyles(styles)(SignInPage);

//add react-router props
wrappedSingInPage = withRouter(wrappedSingInPage);

//add redux props
wrappedSingInPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(wrappedSingInPage);

export default wrappedSingInPage;
