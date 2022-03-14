import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  // constructor(props: any) {
  //   super(props);

  // }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={"https://developer.nytimes.com/files/poweredby_nytimes_65a.png?v=1583354208350"} className="App-logo" alt="logo" />
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
