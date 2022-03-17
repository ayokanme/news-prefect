import React from 'react';
import axios from 'axios';
import Header from './components/Header';
import ArticleCard from './components/ArticleCard';
import { AppProps, AppState } from './interfaces';
import { Box, CircularProgress, Typography } from '@mui/material';

import './App.css';


class App extends React.Component <AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      initialized: false,
      results: []
    };
    this.getTopStories = this.getTopStories.bind(this);
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

  render () {
    const { results, initialized } = this.state;

    if (initialized) {
      return (
        <div className="App" style={{ textAlign: 'center', height: '100%' }}>
          <Header />
          <div className="AppBody" style={{ position: 'fixed', top: '10%', left: '0.5%', maxHeight: '90%', overflowY: 'scroll', width: '99%' }}>
            <div className="article-list">
              {
                results.map((articleData) => {
                  return (
                    <ArticleCard article={articleData} />
                  )
                })
              }
            </div>
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
            Please be patient while I fetch the news for you...
          </Typography>
          <CircularProgress />
        </Box>
      );
    }
  }
}

export default App;
