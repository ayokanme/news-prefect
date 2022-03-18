import React from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ArticleCard from '../components/ArticleCard';
import { HomeProps, HomeState } from '../interfaces';
import { Box, CircularProgress, Typography } from '@mui/material';
import SectionsDrawer from '../components/SectionsDrawer';


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
    const { results, initialized } = this.state;

    if (initialized) {
      return (
        <div className="App" style={{ textAlign: 'center', height: '100%' }}>
          <Header drawerToggler={this.toggleDrawer} />
          <div className="AppBody" style={{ position: 'fixed', top: '10%', left: 0, maxHeight: '90%', overflowY: 'scroll', width: '100%' }}>
            <div className="article-list" /* style={{ display: 'inline-bloc' }} */>
              {
                results.map((articleData) => {
                  return (
                    <ArticleCard article={articleData} />
                  )
                })
              }
            </div>
            <SectionsDrawer isOpen={this.state.isDrawerOpen} drawerToggler={this.toggleDrawer} />
            <Footer />
          </div>
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
          aria-describedby="progress circle"
          aria-busy={true}
        >
          <Typography>
            Welcome. Please be patient while I fetch the news for you...
          </Typography>
          <CircularProgress />
        </Box>
      );
    }
  }
}

export default Home;
