import React from 'react';
import { Box, Button, Divider, Stack } from '@mui/material';
import axios from 'axios';
import { AccountPageProps, AccountPageState } from '../interfaces';
import AccountDeleteModal from '../components/AccountDeleteModal';

class AccountPage extends React.Component<AccountPageProps, AccountPageState>{
  constructor(props: AccountPageProps) {
    super(props);
    this.state = {
      modalStatus: false
    };
    this.logout = this.logout.bind(this);
    this.modalHandler = this.modalHandler.bind(this);
  }

  logout () {
    axios.get('/auth/logout')
      .then(() => {
        this.props.verifyUser();
      });
  }

  modalHandler () {
    const { modalStatus } = this.state;

    this.setState({
      modalStatus: !modalStatus
    });
  }

  render() {
    return (
      <div className="Account" style={{ textAlign: 'center', height: '100%' }}>
        <Box sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          height: '40%',
          width: 500
        }}>
          <Stack direction="column" spacing={2} alignItems="center" justifyContent="center">
            <Button onClick={this.logout} variant="contained">LOGOUT</Button>
            <Divider />
            <Button onClick={this.modalHandler} variant="outlined" color="error">DELETE ACCOUNT</Button>
            <AccountDeleteModal modalHandler={this.modalHandler} modalStatus={this.state.modalStatus} verifyUser={this.props.verifyUser}/>
          </Stack>
        </Box>
      </div>
    );
  }
}

export default AccountPage;
