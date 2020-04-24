import React from 'react'
import {Row, Col,BackTop } from 'antd'
import Gallery  from "../Light/Gallery";
const CastComp = ({Cast})=>{
    //console.log('Cast', Cast)
    return(
        <div style={{marginTop: 30, textAlign: 'center'}} >            
            <h1 className="mont" style={{marginBottom: 20}}>Major Cast</h1>
            <Gallery list={Cast[Cast.length - 1].persons} />            
            {
                Cast.map((c,index)=>{
                    if(index === Cast.length - 1)
                        return(<></>);
                    else
                        return(
                        <>     
                        <div style={{textAlign: 'center', marginBottom: 30}}>
                            <h1 className="mont" style={{marginBottom: 20}}>{c.title} By</h1>
                            {                                
                                c.persons.map((p,index2)=>{
                                    return(
                                        <Row>
                                            <Col xs={{span: 8, offset: 3}} md={{span:6, offset: 6}}><h3>{p.name}</h3></Col>
                                            <Col xs={{span: 11, offset: 1}} md={6}><p>{p.role}</p></Col>                                            
                                        </Row>
                                    )
                                })
                            }
                        </div>
                        </>
                        )                
                })
            }
             <BackTop/>                         
        </div>
    )
}
export default CastComp;