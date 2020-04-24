import React, { Component } from 'react';
import { Menu, Row, Col,Drawer } from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import SearchTitle from '../Light/SearchTitle';
class RightMenu extends Component {
  constructor(){
    super();
    this.updateSearchResult = this.updateSearchResult.bind(this);
  }
  componentDidMount(){
    if(localStorage.getItem('isLoggedIn') !== undefined){      
      this.setState({isLoggedIn: localStorage.getItem('isLoggedIn')==="true"?true:false});
      if(this.state.isLoggedIn){        
        this.setState({username: localStorage.getItem('username')});
      }
    }    
  }
  state = {    
    visible: false,
    queryresult: [],
    isLoggedIn: true,
    username: ""
  }
  showSearchDrawer = () => {
    this.setState({
      visible: true,      
    });
  };
  onClose = () => {
    this.setState({
      visible: false,      
    });
  };
  updateSearchResult = (value) => {    
    //this.state.queryresult.push(value);           '
    this.setState({queryresult: value});
    this.forceUpdate();
  };
  render() {
    const title = <SearchTitle triggerParentUpdate={this.updateSearchResult}/>
    let menu; 
    if(!this.state.isLoggedIn) 
      menu= <Menu mode="horizontal">                  
      <Menu.Item key="search">
        <SearchOutlined style={{fontSize: "20px", transform: "translateY(-6px)"}} onClick={this.showSearchDrawer}/>
        <Drawer
          title={title}
          placement="top"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          height="60vh"
        >
          {            
          this.state.queryresult.map((q,index)=>
          <a href={`/Movie/${q._id}`}>
             <Row style={{marginTop: 10}}>
               <Col xs={{span:2,offset:1}} md={{span:1,offset:1}}>
               <div style={{                
                backgroundImage:`url(${q.poster})`,                    
              }}
              className="poster-min-div"
              >
                </div>
               </Col>
               <Col xs={{span:20,offset:1}} md={{span:21, offset: 1}}>
                <h1>{q.name}</h1>
               </Col>
             </Row>                                   
          </a>)}
        </Drawer>
      </Menu.Item>       
      <Menu.Item key="signup">            
            <Link to="/Signup">Sign up</Link>
          </Menu.Item>
          <Menu.Item key="Login">            
            <Link to="/Login">Login</Link>
          </Menu.Item>             
    </Menu>;
    else
      menu= <Menu mode="horizontal">                  
      <Menu.Item key="search">
        <SearchOutlined style={{fontSize: "20px", transform: "translateY(-6px)"}} onClick={this.showSearchDrawer}/>
        <Drawer
          title={title}
          placement="top"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          height="60vh"
        >
          {            
          this.state.queryresult.map((q,index)=>
          <a href={`/Movie/${q._id}`}>
             <Row style={{marginTop: 10}}>
               <Col xs={{span:2,offset:1}} md={{span:1,offset:1}}>
               <div style={{                
                backgroundImage:`url(${q.poster})`,                    
              }}
              className="poster-min-div"
              >
                </div>
               </Col>
               <Col xs={{span:20,offset:1}} md={{span:21, offset: 1}}>
                <h1>{q.name}</h1>
               </Col>
             </Row>                                   
          </a>)}
        </Drawer>
      </Menu.Item>
      <Menu.Item key="watchlater">
      <Link to="/WatchLater">Watch Later</Link>
      </Menu.Item>         
      <Menu.Item key="logout">            
            <Link  to="/Login" onClick={()=>{localStorage.clear();console.log("logout");window.location = "/Login";}}>Logout</Link>            
      </Menu.Item>      
    </Menu>;
    return (
      <>        
          {menu}
        </>
    );
  }
}

export default RightMenu;