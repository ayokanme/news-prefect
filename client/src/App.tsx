import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppProps, AppState } from './interfaces';
import AuthPage from './routes/AuthPage';
import Home from './routes/Home';

class App extends React.Component<AppProps, AppState>{
  constructor(props: AppProps) {
    super(props);
    this.state = {
      accessGranted: false
    };
    this.authCheck = this.authCheck.bind(this);
  }

  authCheck(status: boolean) {
    this.setState({
      accessGranted: status
    })
  }

  render() {
    return (
      <div className="App">
        <Routes>
          <Route index element={<AuthPage verifyUser={this.authCheck}/>} />
          <Route path="home" element={<Home />} />
        </Routes>
      </div>
    );
  }
}

export default App;