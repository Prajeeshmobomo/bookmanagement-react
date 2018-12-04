import React, {Component} from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import localStore from '../../utils/localStore';
import Logout from '../../containers/Logout'

export default class Header extends Component {
  render() {
    console.log(localStore.getData('loginToken') && localStore.getData('loginToken').length > 0)
    return (
      <React.Fragment>
        <Nav className="float-right">
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/books">Books</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Contact</NavLink>
          </NavItem>
          <NavItem>
            {
              localStore.getData('loginToken') !== null && localStore.getData('loginToken').length > 0 ?
                <Logout/>
              :
                <NavLink href="/login">Login</NavLink>  
            }
          </NavItem>
        </Nav>
        <div className="clearfix"></div>
      </React.Fragment>
    );
  }
}

