import React from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
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
      accessGranted: false
    };
    this.authCheck = this.authCheck.bind(this);
  }

  componentDidMount() {
    this.authCheck();
  }

  authCheck() {

    const { cookies } = this.props;
    const cookie = cookies.get('newsPrefect');

    if (cookie) {
      this.setState({
        accessGranted: true
      });
    } else {
      this.setState({
        accessGranted: false
      });
    }

  }

  render() {
    return (
      <div className="Main">
        {
          !this.state.accessGranted
          ?
          <AuthPage verifyUser={this.authCheck}/>
          :
          <Home verifyUser={this.authCheck}/>
        }
      </div>
    );
  }
}

export default withCookies(App);