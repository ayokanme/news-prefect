import React from 'react';
import axios from 'axios';

import './App.css';
import ArticleCard from './components/ArticleCard';
import { AppProps, AppState } from './interfaces';


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
    axios.get(`/api/top-stories/${topic}`)
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
        <div className="App">
          <header className="App-header">
            <img src={"https://developer.nytimes.com/files/poweredby_nytimes_150a.png?v=1583354208339"} className="App-logo" alt="logo" />
            <p>
              Hello ~TypeScript~ World!<br></br>We're setting up the dev environment today, the first iteration will arrive tomorrow.<br></br>Stay tuned!
            </p>
            <a className="App-link" href="https://developer.nytimes.com/" target="_blank" rel="noopener noreferrer">
              Data Provided by NYTimes
            </a>
          </header>
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
      );
    } else {
      return 'loading...';
    }
  }
}

export default App;
