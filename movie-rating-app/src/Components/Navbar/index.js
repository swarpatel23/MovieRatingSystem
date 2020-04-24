import React, { Component } from 'react';
import LeftMenu from './LeftMenu'
import RightMenu from './RightMenu'
import {MenuOutlined} from '@ant-design/icons';
import { Drawer } from 'antd';
import {Link} from 'react-router-dom';
class MainHeader extends Component {
  state = {    
    visible: false,
    isLoggedIn: true,
    username: ""
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
onClose = () => {
    this.setState({
      visible: false,
    });
  };
  componentDidMount(){
    if(localStorage.getItem('isLoggedIn') !== undefined){      
      this.setState({isLoggedIn: localStorage.getItem('isLoggedIn')==="true"?true:false});
      if(this.state.isLoggedIn){        
        this.setState({username: localStorage.getItem('username')});
      }
    }    
  }
render() {
    let rest; 
    if(!this.state.isLoggedIn) 
      rest= <>
              <li><Link to="/Signup">Sign up</Link></li>
              <li><Link to="/Login">Login</Link></li>
            </>;                
    else
      rest= <>
              <li><Link to="/WatchLater">Watch Later</Link></li>
              <li><Link  to="/Login" onClick={()=>{localStorage.clear();console.log("logout");window.location = "/Login";}}>Logout</Link></li>
          
            </>;
    console.log("loggedIn ", this.state.isLoggedIn)
    return (
        <nav className="menuBar">
          <div className="logo">          
            <Link to="/"><img src="/logof.svg" className="logo-img" alt="logo"/></Link>
          </div>
          <div className="menuCon">
            <div className="leftMenu">
              <LeftMenu />
            </div>
            <div className="rightMenu">
              <RightMenu />
            </div>
            <div className="menu-icon-container" onClick={this.showDrawer}>
              <MenuOutlined className="menu-icon" style={{fontSize:"1.2em", color: "black"}} />
            </div>
            <Drawer
              title="Navigation"
              placement="left"
              closable={true}
              onClose={this.onClose}
              visible={this.state.visible}              
            >
              <div className="vertical-nav-container">
                <ol>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/Movies/all">Movies</Link>              
                  </li>
                  <li>
                    <Link to="/Contactus">Contact Us</Link>
                  </li>
                    {rest}                  
                </ol>
              </div>             
            </Drawer>            
          </div>
        </nav>
    );
  }
}
export default MainHeader;