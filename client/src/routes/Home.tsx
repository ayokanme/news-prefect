import React from 'react';
import axios from 'axios';
import Header from '../components/Header';
import ArticleList from '../components/ArticleList';
import { HomeProps, HomeState } from '../interfaces';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Routes, Route } from 'react-router-dom';


class Home extends React.Component <HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      initialized: false,
      results: [],
      isDrawerOpen: false
    };
    this.getTopStories = this.getTopStories.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  componentDidMount() {
    this.getTopStories('home');
  }

  getTopStories(topic: string) {
    axios.get(`/api/top-stories/${topic}`, { validateStatus: (status: number) => status === 200 })
      .then((success) => {
        this.setState({
          results: success.data,
          initialized: true
        });
      })
      .catch((error) => {
        console.error(error);
      });

  }

  toggleDrawer() {
    const { isDrawerOpen } = this.state;
    this.setState({
      isDrawerOpen: !isDrawerOpen
    });
  }


  render () {
    const { results, initialized, isDrawerOpen } = this.state;

    if (initialized) {
      return (
        <div className="App" style={{ textAlign: 'center', height: '100%' }}>
          <Header drawerToggler={this.toggleDrawer} />
          <Routes>
            <Route index element={<ArticleList articles={results} isOpen={isDrawerOpen} drawerToggler={this.toggleDrawer} />}></Route>
            <Route path="bookmarks" element={<ArticleList articles={results} isOpen={isDrawerOpen} drawerToggler={this.toggleDrawer} />}></Route>
            {/* add no match route here */}
          </Routes>
        </div>
      );
    } else {
      return (
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
          aria-label="loading message and progress circle"
          aria-busy={true}
        >
          <Typography>
            Welcome. Please be patient while the app loads...
          </Typography>
          <CircularProgress />
        </Box>
      );
    }
  }
}

export default Home;
