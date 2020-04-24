import React from 'react';
import { Row,Col,Pagination  } from 'antd';
import MovieLightList from '../Light/MovieLightList'

class MovieList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            movielist: [],
            genre: this.props.match.params.category,
            page: localStorage.getItem('page'),
            pageSize: localStorage.getItem('pagesize')
        };
    }    
    onShowSizeChange = (current, pageSize) => {  
        let page = localStorage.getItem('page');
        console.log('pagesizechange', page);
        this.setState({page:current});             
        this.setState({pageSize: pageSize});      
        console.log(current, pageSize)
        fetch('/api/getMovieIdListMod?genre='+this.state.genre+'&page='+(current)+'&limit='+pageSize,{
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res=>{
            res.json().then(data=>{             
                this.setState({movielist: data["movies"]});           
                console.log(this.state.movielist);
               // let temp = this.state.movielist.splice(0,pageSize);
               // this.setState({movielist: temp});
            })
        });                
    }
    onChange = (current) =>{        
        this.setState({page:current});  
        console.log("current", current, "page", this.state.page);
        localStorage.setItem('page', current);
        this.onShowSizeChange(current,this.state.pageSize);
    }
    componentDidMount(){        
        let page = localStorage.getItem('page');
        if(page === null){
            localStorage.setItem('page', 1);
            this.setState({page:1});                         
        }
        else{
            this.setState({page:page});                                     
        }
        console.log('page', page);                
        this.onShowSizeChange(page,10);
    }
    render(){
        return(
            <>
            <div style={{textAlign:"center"}}>
            <h1 style={{textTransform: "uppercase",marginBottom: 30}}>
                {this.state.genre} Movies
            </h1>
            </div>            
            <div>
            <Row        
            justify="center"
            >
                <Col>
                <Pagination
                    showSizeChanger
                    onShowSizeChange={this.onShowSizeChange}
                    onChange={this.onChange}
                    defaultCurrent={this.state.page}
                    total={110}
                />

                </Col>
            </Row>
            <MovieLightList list={this.state.movielist}/>
           
            </div>                    
            </>
        )
    }
}

export default MovieList;