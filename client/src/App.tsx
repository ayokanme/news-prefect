import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {


  constructor(props: any) {
    super(props);
    this.state = {

    };

  }

  makeAPICall() {
    // axios({
    //   method: 'GET',
    //   url: '/'
    // });
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={"https://developer.nytimes.com/files/poweredby_nytimes_150a.png?v=1583354208339"} className="App-logo" alt="logo" />
          <p>
            Hello ~TypeScript~ World!<br></br>We're setting up the dev environment today, the first iteration will arrive tomorrow.<br></br>Stay tuned!
          </p>
          <a
            className="App-link"
            href="https://developer.nytimes.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Data Provided by NYTimes
          </a>
        </header>
      </div>
    );
  }
}

export default App;
