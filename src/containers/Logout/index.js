import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'reactstrap';

import * as authActions from '../../redux/actions/authActions';
//import localStore from '../../utils/localStore';

class Logout extends Component {

  static propTypes = {
    deleteAuthenticationToken: PropTypes.func,
    authToken: PropTypes.string,
  };

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    //this.deleteAuthenticationToken();
  }

  deleteAuthenticationToken = () => {
    this.props.deleteAuthenticationToken().then(() => {
      this.context.router.history.push('/logout');
    });
  };

  render() {
    return <NavLink href="#" onClick={this.deleteAuthenticationToken}>Logout</NavLink>
  }
}

export default connect(state => ({
  ...state.authentication,
}),{
  ...authActions,
})(Logout);