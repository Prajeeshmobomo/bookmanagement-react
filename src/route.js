import React, {Component} from "react";
import {connect} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {Switch, Route} from 'react-router-dom';
import {history} from './store/configureStore';
import PropTypes from 'prop-types';

import Common from './components/Common/';

import * as authActions from './redux/actions/authActions';

class AppRouter extends Component {
  static propTypes = {
    authToken: PropTypes.string,
    checkAlreadyLoggedIn: PropTypes.func,
  }

  componentWillMount() {
    this.props.checkAlreadyLoggedIn();
  }

  render() {
    const {authToken} = this.props;
    const params = {
      authToken
    };
    return (authToken !== undefined && (
          <ConnectedRouter history={history}>
            <Switch>
              <Route path="/" component={Common} {...params} />
            </Switch>
          </ConnectedRouter>
        )) || null;
  }
}

export default connect(state => ({
  ...state.authentication,
}),{
  ...authActions,
})(AppRouter);
