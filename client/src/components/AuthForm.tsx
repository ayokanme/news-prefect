import React from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { AuthFormProps, AuthFormState } from '../interfaces';

class AuthForm extends React.Component<AuthFormProps, AuthFormState>{
  constructor(props: AuthFormProps) {
    super(props);
    this.state = {
      passwordLongEnough: false,
      name: '',
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;

    this.setState({
      ...this.state,
      [name]: value
    });

    if (name === 'password') {
      this.setState({
        passwordLongEnough: value.length > 7
      });
    }
  }

  submitForm(e: React.SyntheticEvent) {
    e.preventDefault();

    const { name, email, password, passwordLongEnough } = this.state;

    if (this.props.registerUser && passwordLongEnough) {
      this.props.formHandler({
        name: name,
        email: email,
        password: password
      });
    } else {
      this.props.formHandler({
        email: email,
        password: password
      });
    }

    this.setState({
      name: '',
      email: '',
      password: ''
    });
  }

  render () {
    const { registerUser } = this.props;
    const { passwordLongEnough } = this.state;

    return (
      <Stack direction="column" spacing={2} alignItems="center" justifyContent="center">
        {
          registerUser
          &&
          <TextField
            label="Name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            required
            inputProps={{ 'aria-label': 'authorization form name field' }}
          />
        }
        <TextField
          label="Email"
          name="email"
          type="email"
          value={this.state.email}
          onChange={this.handleChange}
          required
          inputProps={{ 'aria-label': 'authorization form email field' }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
          helperText={ (registerUser && !passwordLongEnough ) ? 'min. length: 8 characters' : ' ' }
          required
          inputProps={{ 'aria-label': 'authorization form password field' }}
        />
        <Button variant="contained" onClick={this.submitForm}>{registerUser ? 'signup' : 'login'}</Button>
      </Stack>
    );
  }
}

export default AuthForm;
