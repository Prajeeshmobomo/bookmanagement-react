import React, {PureComponent} from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as authActions from '../../redux/actions/authActions';

class PrivateRoute extends PureComponent {
  static propTypes = {
    authToken: PropTypes.string,
    location: PropTypes.any,
    component: PropTypes.any
  }
  render() {
    const { authToken, location, component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={ () =>
          (authToken && <Component {...this.props} />) ||
          
          <Redirect to={{
            pathname: '/login',
            state: { id: '123' }
        }}
/>
        }
      />
    )
  }
}
export default connect(state => ({
  ...state.authentication,
}),{
  ...authActions,
})(PrivateRoute);
