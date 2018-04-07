import React, {Component} from 'react';
import {NavItem, Nav, NavDropdown, MenuItem} from 'react-bootstrap';
import {browserHistory} from 'react-router';

class HeaderLinks extends Component {
  logout() {
    localStorage.removeItem('authToken');
    window.location.assign(window.location.origin+'/');
    // browserHistory.push('/');
  }
  render() {
    return (<div>
      <div className="brodcastmsg">
        <span>Welcome to useinfluence.co</span>

      </div>
      <Nav pullRight="pullRight">
        <NavItem eventKey={1} href="#">Help Guide</NavItem>
        <NavItem eventKey={2} href="#">Video Tutorials</NavItem>
        <NavItem eventKey={3} href="#">Refer & Get Free Months</NavItem>
        <NavDropdown eventKey={4} title="Account" id="basic-nav-dropdown-right">
          <MenuItem eventKey={4.1}>Upgrade</MenuItem>
          <MenuItem eventKey={4.2} onClick={this.logout}>Logout</MenuItem>

        </NavDropdown>

      </Nav>
    </div>);
  }
}

export default HeaderLinks;
