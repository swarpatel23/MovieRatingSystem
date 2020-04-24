import React from 'react'
import {Row, Col,Rate,Tooltip } from 'antd'

class Details extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id : this.props.match.params.id,
            details: {}
        }
    }
    componentDidMount(){
        fetch('/api/getMovieDetails?id='+this.state.id,{
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }  
          }).then(res=>{
              
                res.json().then(data=>{       
                    console.log('movie', data);                                                                 
                    this.setState({details: data.movie})                    
                })    
        })
    }
    render(){
        return(
            <div style={{
                margin: "2em 1em"
            }}>
                <Row justify="center">
                    <Col xs={18} md={{span:6, offset: 0}} style={{textAlign: "center"}}>                                   
                        <div style={{
                        textAlign:"center",
                        backgroundColor: 'black',
                        backgroundImage:`url(${this.state.details.poster})`,
                        backgroundPosition:"top center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: 'cover',
                        width:"100%",
                        minHeight: '500px',
                        boxShadow: "rgba(39, 39, 39, 0.11) 0px 1px 2px -2px, rgba(0, 0, 0, 0.93) 0px 3px 6px 0px, rgba(95, 95, 95, 0.31) 0px 5px 12px 4px"                                           
                        }}>

                        </div>                        
                    </Col>
                    <Col xs={24} md={{span:12, offset: 2}} align="middle">
                    <h1                     
                    className="roboto movie-name">{this.state.details.name}
                    </h1>
                    <Tooltip placement="bottom" title="3.5">
                    <div style={{fontSize:'2em',marginBottom: 40}}>                                                       
                        <Rate disabled  allowHalf defaultValue={2.5} style={{ fontSize: '1em ', color: '#2196f3' }}/>                                                          
                    </div>  
                    </Tooltip>
                    <Row style={{fontSize:'1.1em'}} >
                        <Col xs={24}>                        
                        </Col>
                        <Col md={{span:2}}>
                            Unrated
                        </Col>
                        <Col md={{span:10, offset: 1}}>
                        Adventure , Drama ,Musical, assdas                        
                        </Col>
                        <Col md={{span:6, offset: 1}}>
                            15 June 2020 (India)
                        </Col>                            
                        <Col md={{span:3}}>
                            2h 36min
                        </Col>
                        <Col xs={24}>
                        <Row style={{marginTop: 50}} align="left">                          
                            <Col>
                                <div className="roboto movie-description">
                                    {this.state.details.description}
                                </div>
                            </Col>
                        </Row>
                        </Col>
                    </Row>                    
                    </Col>                                           
</Row>       
                <Row style={{marginTop:30}}>
                    <Col md={{offset:4, span: 4}}>                                
                        <svg style={{height:"76",width:"300"}}>
                            <text x="0" y="50" className="heading-text active" style={{border: "2px solid white"}}>OVERVIEW</text>  
                        </svg>
                    </Col>
                    <Col md={{offset:2, span: 2}}>                                
                        <svg style={{height:"76",width:"300"}}>
                            <text x="0" y="50"  className="heading-text"stroke="#fff" stroke-width="0.2" fill="#000000">CAST</text>  
                        </svg>
                    </Col>
                    <Col md={{offset:2, span: 3}}>                                
                        <svg style={{height:"75",width:"300"}}>
                            <text x="0" y="50"  className="heading-text" stroke="#fff" stroke-width="0.2" fill="#000000">PHOTOS</text>  
                        </svg>
                    </Col>
                    <Col md={{offset:2}}>                                
                        <svg style={{height:"75",width:"300"}}>
                            <text x="0" y="50"  className="heading-text" stroke="#fff" stroke-width="0.2" fill="#000000">REVIEWS</text>  
                        </svg>
                    </Col>

                </Row>         
            </div>
        )
    }
}
export default Details;