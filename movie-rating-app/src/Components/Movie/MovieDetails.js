import React from 'react'
import OverviewComp from './OverviewComp';
import {Row, Col } from 'antd'
import CastComp from './CastComp';
import PhotosComp from './PhotosComp';
import ReviewComp from './ReviewComp';

class MovieDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {            
            id : this.props.match.params.id,
            details: {},
            selected: "1"
        }
    }
    handleClickEvent = (e) =>{
        console.log(e.target.id);
        this.setState({selected: e.target.id});
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
                    document.title = data.movie.name;                                                              
                    this.setState({details: data.movie})                    
                })    
        })
    }
    render(){
        const handleReviewUpdate = ()=>{
            console.log("from parent");            
        };
        return(                     
            <Row key="movfadetairoasw">
                <Col xs={{span:2}} style={{textAlign:"center"}} key="leftndfsdavi">
                    <Row style={{paddingTop: "10em"}} className="row-left">
                        <Col xs={3} style={{ transform: "rotateZ(-90deg)"}}>
                            <svg style={{height:"76",width:"300",}}>
                                <text x="0" y="50" className={`heading-text ${this.state.selected==='1'?'active':''}`} style={{border: "2px solid white"}} onClick={this.handleClickEvent} id="1">OVERVIEW</text>  
                            </svg>
                        </Col>
                    </Row>
                    <Row style={{paddingTop: "2em"}} className="row-left">
                        <Col xs={3} style={{ transform: "rotateZ(-90deg)"}} >
                            <svg style={{height:"76",width:"100",}}>
                                <text x="0" y="50" className={`heading-text ${this.state.selected==='2'?'active':''}`} style={{border: "2px solid white"}} onClick={this.handleClickEvent} id="2">CAST</text>  
                            </svg>
                        </Col>
                    </Row>
                    <Row style={{paddingTop: "5em"}} className="row-left">
                        <Col xs={3} style={{ transform: "rotateZ(-90deg)"}} >
                            <svg style={{height:"76",width:"150",}}>
                                <text x="0" y="50" className={`heading-text ${this.state.selected==='3'?'active':''}`} style={{border: "2px solid white"}} onClick={this.handleClickEvent} id="3">PHOTOS</text>  
                            </svg>
                        </Col>
                    </Row>
                    <Row style={{paddingTop: "7em"}} className="row-left">
                        <Col xs={3} style={{ transform: "rotateZ(-90deg)"}} >
                            <svg style={{height:"76",width:"200",}}>
                                <text x="0" y="50"className={`heading-text ${this.state.selected==='4'?'active':''}`} style={{border: "2px solid white"}} onClick={this.handleClickEvent} id="4">REVIEWS</text>  
                            </svg>
                        </Col>          
                    </Row>                       
                </Col>
                <Col xs={{span:20}} key="rightasfdacont">                    
                    {/* <OverviewComp/>  */}
                    {{ 
                        "1": <OverviewComp Movie={this.state.details} key="1sada"/>,
                        "2": <CastComp Cast={this.state.details.cast}key="2asdas"/>,
                        "3": <PhotosComp list={this.state.details.images} key="3gvds"/>,
                        "4": <ReviewComp list={this.state.details.reviews} key="4agsagv" mid={this.state.id} triggerParentUpdate={handleReviewUpdate}/>
                    }[this.state.selected]}
                </Col>
            </Row>   
        )
    }
}
export default MovieDetails;