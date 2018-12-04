import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Alert } from 'reactstrap';
import './style.scss';
import * as authActions from '../../redux/actions/authActions';
import helpers from '../../utils/helpers';


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      visible: true
    };
    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let obj = this.state;
    this.props.checkAuthentication(obj)
  }

  handleChange =(e) => {
    let name = e.target.name,
      value = e.target.value;
    this.setState({[name]: value});
  }

  componentWillReceiveProps = (nextProp) => {
    if(!this.state.visible) {
      this.setState({visible: true});
    }
  }

  render() {
    return (
      <div className="login-wrapper">
        {
          this.props.response && this.props.response.data
          && this.props.response.data.message === helpers.constants.invalidCredentials  &&
            <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
               {helpers.constants.invalidCredentials}
            </Alert>
        }
        <h3>Login</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Username</label>
            <input type="text" name="username" onChange={(e) => this.handleChange(e)} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" onChange={(e) => this.handleChange(e)}/>
          </div>
          <input type="submit" className="btn" />
        </form>
      </div>
    );
  }
}

export default connect(state => ({
  ...state.authentication,
}),{
  ...authActions,
})(Login);