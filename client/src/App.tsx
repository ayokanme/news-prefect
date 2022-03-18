import React from 'react';
// import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Box, Stack, Switch, Typography } from '@mui/material';
import { AppProps, AppState, AuthFormState } from './interfaces';
import AuthForm from './components/AuthForm';


class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      newUser: false,
      user: false,
      error: ''
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

  submitForm(data: AuthFormState) {
    //temp auth method
    console.log('the form data: ', data);
    if (data.password === 'letMe1N!') {
      this.setState({
        user: true
      });
    }
  }

  render() {
    const labelStyle = {
      fontWeight: 700
    };
    return (
      <div className="App" style={{ textAlign: 'center', height: '100%' }}>
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
            <AuthForm registerUser={this.state.newUser} formHandler={this.submitForm} />
          </Stack>
        </Box>
        { this.state.user && <Navigate to="/home" replace={true} />}
      </div>
    );
  }
}

export default App;
