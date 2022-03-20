import { Link as RouterLink } from 'react-router-dom';
import { Typography, Link as MUILink } from '@mui/material';
import React from 'react';
import { HeaderProps, HeaderState } from '../interfaces';

class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.props.drawerToggler();
  }

  render() {
    const linkStyle = { margin: 'auto', color: 'white', cursor: 'pointer' };

    return (
      <header className="App-header" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'grid',
        gridTemplateColumns: '5% 40% 20% 30% 5%',
        gridTemplateRows: '1fr 1fr',
        gridTemplateAreas: `". header . . ."
        ". header . navBar ."`,
        width: '100%',
        height: '10%',
        backgroundColor: '#282c34',
        color: 'white'
      }}>
        <Typography sx={{ gridArea: 'header', margin: 'auto', fontSize: 48, fontWeight: 700 }}>
          News Prefect
        </Typography>
        <nav style={{ borderRadius: '20px 20px 0 0', backgroundColor: '#424854', gridArea: 'navBar', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <MUILink underline="hover" sx={linkStyle} component={RouterLink} to="/">Home</MUILink>
          <MUILink underline="hover" sx={linkStyle} onClick={this.toggleDrawer}>Sections</MUILink>
          <MUILink underline="hover" sx={linkStyle} component={RouterLink} to="/bookmarks">My Bookmarks</MUILink>
          <MUILink underline="hover" sx={linkStyle} component={RouterLink} to="/account">Account</MUILink>
        </nav>
      </header>
    );
  }
}

export default Header;
