import React from 'react';
import axios from 'axios';
import { Box, Stack, Switch, Typography } from '@mui/material';
import { AuthPageState, AuthPageProps, AuthFormState } from '../interfaces';
import AuthForm from '../components/AuthForm';


class AuthPage extends React.Component<AuthPageProps, AuthPageState> {
  constructor(props: AuthPageProps) {
    super(props);
    this.state = {
      newUser: false,
      error: ' '
    };
    this.submitForm = this.submitForm.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
  }

  handleSwitch() {
    const { newUser } = this.state;
    this.setState({
      newUser: !newUser
    });
  }

  async submitForm(data: AuthFormState) {
    const { newUser } = this.state;

    if (newUser) {
      const response = await axios.post('/auth/signup', data);

      if (response.data.loggedIn) {

        this.props.verifyUser();

      } else if (response.data.existingUser) {

        this.handleSwitch();
        this.setState({
          error: response.data.message
        });

      }
    } else {
      const response = await axios.post('/auth/login', data);

      if (response.data.loggedIn) {

        this.props.verifyUser();

      } else if (response.data.wrongPassword) {

        this.setState({
          error: response.data.message
        });

      } else if (response.data.noSuchUser) {

        this.handleSwitch();
        this.setState({
          error: response.data.message
        });

      }
    }

  }

  render() {
    const labelStyle = { fontWeight: 700 };
    const { error } = this.state;

    return (
      <div className="Auth" style={{ textAlign: 'center', height: '100%' }}>
        <Box sx={{
            position: 'absolute' as 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: '60%',
            width: 500
          }}>
          <Typography sx={{ margin: '70px 45px', fontSize: 64, fontWeight: 700, height: '20%' }}>News Prefect</Typography>
          <Stack direction="column" spacing={2} alignItems="center" justifyContent="center">
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
              <Typography sx={labelStyle}>LOGIN</Typography>
              <Switch checked={this.state.newUser} onChange={this.handleSwitch} inputProps={{ 'aria-label': 'login or signup form display switch' }}/>
              <Typography sx={labelStyle}>SIGNUP</Typography>
            </Stack>
            <Typography sx={{ color: 'red' }}>
              {error}
            </Typography>
            <AuthForm registerUser={this.state.newUser} formHandler={this.submitForm} />
          </Stack>
        </Box>
      </div>
    );
  }
}

export default AuthPage;
