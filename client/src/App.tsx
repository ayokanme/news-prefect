import React from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { Routes, Route } from 'react-router-dom';
import { AppProps, AppState } from './interfaces';
import AuthPage from './routes/AuthPage';
import Home from './routes/Home';

class App extends React.Component<AppProps, AppState>{

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props: AppProps) {
    super(props);
    this.state = {
      // cookie: hold,
      accessGranted: false
    };
    this.authCheck = this.authCheck.bind(this);
  }

  componentDidMount() {
    this.authCheck();
  }

  authCheck() {
    const { cookies } = this.props;
    const cookie = cookies.getAll();
    console.log('the cookie is: ', cookie);
  }

  render() {
    return (
      <div className="Main">
        <Routes>
          <Route index element={<AuthPage verifyUser={this.authCheck}/>} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    );
  }
}

export default withCookies(App);