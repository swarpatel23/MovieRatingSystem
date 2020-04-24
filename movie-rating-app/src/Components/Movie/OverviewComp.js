
import React, {useState, useEffect} from 'react'
import {Row, Col, Rate, Tooltip, Button, Modal } from 'antd'
import { Link } from 'react-router-dom'
import {CaretRightOutlined} from '@ant-design/icons';
import axios from 'axios';
import { HeartOutlined } from '@ant-design/icons';
const OverviewComp = ({Movie})=>{    
    
    const [glist, setGlist] = useState("")
    const [stars, setStars] = useState(0)
    const [releasedate, setReleasedate] = useState("")
    const [playtime, setPlaytime] = useState("")
    const [year, setYear] = useState("undef")
    const [visible, setVisible] = useState(false)
    const [dlist, setDlist] = useState("")
    const [rcount, setRcount] = useState(0)
    const [later, setLater] = useState(0)        
    const showModal = () => {
        setVisible(true);          
      };
    
      const handleOk = e => {
        setVisible(false);
      };
    
      const handleCancel = e => {
        setVisible(false);
      };            
    useEffect(() => {
       
        if(Movie.genre !== undefined){
            setGlist(
                Movie.genre.map((g, index) => {
                    if (index !== Movie.genre.length - 1)
                        return (<><Link to={`/Movies/${g}`}>{g}</Link> ,</>)
                    else
                        return (<Link  to={`/Movies/${g}`}>{g}</Link>)
                })
                );        
        }else
            setGlist('undef');       
        setStars(Movie.stars/2);        
        if(Movie.release_info !== undefined)
            setReleasedate(Movie.release_info.datestring);
        if(Movie.running_time !== undefined)
            setPlaytime(Movie.running_time.hour + "h  " + Movie.running_time.minute + "min")
        if(Movie.release_year!==undefined)
            setYear(Movie.release_year);
        if(Movie.cast !== undefined){
            let temp = [];
            Movie.cast.forEach(c => {
                if(c.title === "Directed"){                    
                    c.persons.forEach(p=>{
                        temp.push(p.name);
                    })
                }                    
            });     
            setDlist(
                temp.map((d, index) => {
                    if (index !== temp.length - 1)
                        return (<p className="director-name"><Link to={`/Movies/Directed/${d}`}>{d}</Link> ,</p>)
                    else
                        return (<p className="director-name"><Link  to={`/Movies/Directed/${d}`}>{d}</Link></p>)
                })
            );              
        }
        if(Movie.reviews !== undefined)
            setRcount(Movie.reviews.length);
            
            if(localStorage.getItem("user")!=null){
                let list = JSON.parse(localStorage.getItem("user"));
                console.log("list", list.favourite_list.findIndex(x=>x===Movie._id));
                if(list.favourite_list.findIndex(x=>x===Movie._id) >= 0){                    
                    setLater(1);
                }
            }
    }, [Movie])
    let ratecomp = <></>;
    const onChange = (value)=>{           
        setLater(value);
        if(value === 0){//remove from watch later
            let values = {
                email: localStorage.getItem("email"),
                movieid: Movie._id
            }            
            axios.post("/api/removeWatchLater", values).then(response => {
                console.log(response);
            })
            setLater(0);
            let user = JSON.parse(localStorage.getItem("user"));
            user.favourite_list.pop(Movie._id);            
            localStorage.setItem("user", JSON.stringify(user));
        }
        else{//add watch later
            let values = {
                email: localStorage.getItem("email"),
                movieid: Movie._id
            }            
            axios.post("/api/addWatchLater", values).then(response => {
                console.log(response);
            })
            setLater(1);
            let user = JSON.parse(localStorage.getItem("user"));
            user.favourite_list.push(Movie._id);            
            localStorage.setItem("user", JSON.stringify(user));
        } 
    }
    if(localStorage.getItem("user")){
        ratecomp = <div style={{marginTop: "20px"}}><Rate onChange={onChange} character={<HeartOutlined />} count={1} value={later} style={{marginRight: "5px"}}/><span style={{fontSize: 16}}>Watch Later</span></div>;
    }
    return(
        <Row justify="center" style={{marginTop:"5em"}}>
            <Col key="poster-div" xs={18} md={{span:6, offset: 0}} style={{textAlign: "center"}}>                                   
                <div style={{                
                    backgroundImage:`url(${Movie.poster})`,                    
                }}
                className="poster-div"
                >
                </div>     
                {ratecomp}           
            </Col>
            <Col key="info-div"  xs={24} md={{span:12, offset: 2}} align="middle">
                <h1 className="roboto movie-name">
                    {Movie.name}
                </h1>
                <h3>
                    <Link to={`/Movie/Year/${year}`}>
                        {year}
                    </Link>
                </h3>
                <Tooltip placement="bottom" title={Movie.stars}>
                    <div style={{fontSize:'2em'}}>                                                       
                        <Rate disabled allowHalf style={{ fontSize: '1em ', color: '#2196f3' }} value={stars}/>                                                                        
                    </div>                                          
                </Tooltip>
                <span style={{fontSize:15, marginTop: 10}}>
                    ({rcount} reviews)                                                          
                    <span style={{marginLeft: '30px'}}>&nbsp;</span>
                </span>                
                <Row style={{fontSize:'1.1em', marginTop:30}} key="d2ecrorow" >
                    <Col xs={{offset:0,span:24}} md={{offset:0,span:4}} key="dfas2ecfasdfrorow" >
                        Cert. <span style={{fontWeight:700}}> {Movie.rated}</span>
                    </Col>
                    <Col xs={{offset:0,span:24}} md={{span:8, offset: 1}} key="categasdory">
                        {glist}
                    </Col>
                    <Col xs={{offset:0,span:24}} md={{span:6, offset: 1}} key="reledasdaasedate">
                        {releasedate}
                    </Col>                            
                    <Col xs={{offset:0,span:24}} md={{span:3}} key="plaasdasytime">
                        {playtime}
                    </Col>
                    <Col xs={24} key="desasdacrip">
                        <Row style={{marginTop: 50}} align="left" key="maindeaq3fsrrow">                          
                            <Col className="roboto movie-description" key="maiasdasdandescrip">                                       
                                {Movie.description}                                       
                            </Col>
                        </Row>
                    </Col>
                </Row>  
                <Row style={{textAlign: 'center', justifyContent:"center", marginTop: 20}}>
                    <Col>
                    <Modal
                            title={Movie.name}
                            visible={visible}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            footer={[
                            <>
                            </>
                            ]}
                        >
                          <iframe src={Movie.trailer_link} style={{width: "100%", height:"50vh"}} title="trailer"> </iframe>
                        </Modal>
                        <Button type="primary" shape="round" icon={<CaretRightOutlined />}  onClick={showModal}>                            
                            Watch Trailer                            
                        </Button>                        
                    </Col>  
                    <Col xs={24}>
                        <h2 style={{marginTop: 30}}>Directed By :</h2>
                    </Col>                 
                    <Col xs={24}>
                        {dlist}                    
                    </Col>                     
                </Row>                                 
            </Col>                           
        </Row>       
    )
}
export default OverviewComp;