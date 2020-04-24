import React, { Component } from 'react';
import { Menu } from 'antd';
import {Link} from 'react-router-dom';
class LeftMenu extends Component {
  render() {
    return (
			<Menu mode="horizontal">
      	<Menu.Item key="Home">          
          <Link to="/">Home</Link>
        </Menu.Item>        
        <Menu.Item key="movies">
          <Link to="/Movies/all">Movies</Link>
        </Menu.Item>
        <Menu.Item key="contact">          
          <Link to="/Contactus">Contact Us</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default LeftMenu;