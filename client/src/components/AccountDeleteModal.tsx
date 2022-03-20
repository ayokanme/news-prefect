import React from 'react';
import axios from 'axios';
import { Modal, Card, Typography, TextField, Button } from '@mui/material';
import { AccountDeleteProps, AccountDeleteState } from '../interfaces';


class AccountDeleteModal extends React.Component<AccountDeleteProps, AccountDeleteState>{
  constructor(props: AccountDeleteProps) {
    super(props);
    this.state = {
      error: ' ',
      password: ''
    };
    this.handleDeletion = this.handleDeletion.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e: React.SyntheticEvent) {
    const target  = e.target as HTMLInputElement;

    this.setState({
      password: target.value
    })
  }

  async handleDeletion (e: React.SyntheticEvent) {
    e.preventDefault();

    const { password } = this.state;
    const response = await axios.post('/delete-user-account', { password });

    if (response.data.wrongPassword) {
      this.setState({
        error: response.data.message,
        password: ''
      });
    }

  }

  render () {
    return (
      <Modal
        open={this.props.modalStatus}
        onClose={() => this.props.modalHandler()}
        aria-label="account deletion password prompt modal"
      >
        <Card sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: 200,
          width: 450,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly'
        }}>
          <Typography variant="body1" gutterBottom component="div" sx={{ fontSize: 20 }}>
            Please enter your password
          </Typography>
          <TextField
            type="password"
            label="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <Typography sx={{ color: 'red' }}>
            {this.state.error}
          </Typography>
          <Button onClick={this.handleDeletion} variant="contained" color="error">
            SUBMIT
          </Button>
        </Card>
      </Modal>
    );
  }

}

export default AccountDeleteModal;