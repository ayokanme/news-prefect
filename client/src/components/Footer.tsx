import { Link, Typography } from '@mui/material';

const Footer = () => {

  return (
    <footer className="App-header" style={{
      position: 'relative',
      width: '100%',
      backgroundColor: '#424854',
      color: 'white'
    }}>
      <Typography sx={{ gridArea: 'header', margin: 'auto', fontSize: 16, padding: '1%' }}>
        News Prefect is the #1 app for you if you want to stay in the know!
      </Typography>
      <a href="https://developer.nytimes.com/" target="_blank" rel="noopener noreferrer" style={{ padding: '1%' }}>
        <img src={'https://developer.nytimes.com/files/poweredby_nytimes_200c.png?v=1583354208354'}
          alt="New York Times logo and text: 'Data provided by the New York Times'"
        >
        </img>
      </a>
      <Typography sx={{ gridArea: 'header', margin: 'auto', fontSize: 16, padding: '1%' }}>
        {'Built by '}
        <Link href="https://github.com/ayokanme"
          underline="hover"
          target="_blank"
          rel="noopener noreferrer"
          gutterBottom
          component="a"
          sx={{ margin: 'auto', fontSize: 16, cursor: 'pointer' }}
          >
            {'ayokanme'}
          </Link>
      </Typography>
    </footer>
  );
};

export default Footer;
