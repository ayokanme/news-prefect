import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const Header = () => {

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
      <nav style={{ borderRadius: '10px 10px 0 0', backgroundColor: '#424854', gridArea: 'navBar', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Link to="/" style={{ margin: 'auto', color: 'white' }}>Home</Link>
        <Link to="/sections" style={{ margin: 'auto', color: 'white' }}>Sections</Link>
        <Link to="/bookmarks" style={{ margin: 'auto', color: 'white' }}>My Bookmarks</Link>
        <Link to="/signout" style={{ margin: 'auto', color: 'white' }}>Logout</Link>
      </nav>
    </header>
  );
};

export default Header;

// <a className="App-link" href="https://developer.nytimes.com/" target="_blank" rel="noopener noreferrer">
// Data Provided by NYTimes
// </a>
// <img src={"https://developer.nytimes.com/files/poweredby_nytimes_150a.png?v=1583354208339"} className="App-logo" alt="logo" />
