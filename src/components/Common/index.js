import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as authActions from '../../redux/actions/authActions';

import BookForm from  '../../containers/Books/form'
import BookList from  '../../containers/Books/list'
import BookView from  '../../containers/Books/show'
import Login from  '../../containers/Login'
import Logout from  '../../containers/Logout'
import Header from  '../../components/Common/header'
import PrivateRoute from './privateRoute'

class Common extends Component {
  static propTypes = {
    authToken: PropTypes.string,
    location: PropTypes.object,
    role: PropTypes.string
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    const { authToken, location } = this.props;
    return (
      <React.Fragment>
        <Header />
        <div  className="container container-fluid">
          <Switch>
            <Route exact path="/" component={BookForm} />
            <PrivateRoute exact path="/books" component={BookList} />
            <PrivateRoute exact path="/books/new" component={BookForm} />
            <PrivateRoute exact path="/books/:id" component={BookView} />
            <Route path="/login" render={ () => (authToken && <Redirect to=
                          {
                            location.state && location.state.from ? location.state.from.pathname :
                            "/books"
                          } />) || <Login />}
            />
            <Route exact path="/logout" render={ () => (!authToken && <Redirect to="/" /> )|| <Logout />} />
          </Switch>
        </div>
      </React.Fragment>);
  }
}

export default connect(state => ({
  ...state.authentication,
}),{
  ...authActions,
})(Common);