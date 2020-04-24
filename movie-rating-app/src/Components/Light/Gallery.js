import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import {LeftOutlined,RightOutlined} from '@ant-design/icons';
import '../../../node_modules/react-alice-carousel/lib/alice-carousel.css';
import { Button } from 'antd';

export default class Gallery extends React.Component {
    items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]    
    //obj = [{"image":"https://m.media-amazon.com/images/M/MV5BZDk1ZmU0NGYtMzQ2Yi00N2NjLTkyNWEtZWE2NTU4NTJiZGUzXkEyXkFqcGdeQXVyMTExNDQ2MTI@._V1_UY317_CR4,0,214,317_AL__QL50.jpg","link":"/name/nm0451321/?ref_=ttfc_fc_cl_i1","name":"Shah Rukh Khan","role":"Gopal ","_id":{"$oid":"5e36ad5045fd4709107c4fde"}},{"image":"https://m.media-amazon.com/images/M/MV5BNTk0OTFkZGItYTQxMi00YTUwLTlkMGEtMTIyZDNlNDc0MzRlXkEyXkFqcGdeQXVyMTgzNTY5OTc@._V1_UY317_CR51,0,214,317_AL__QL50.jpg","link":"/name/nm0002043/?ref_=ttfc_fc_cl_i2","name":"Madhuri Dixit","role":"Radha ","_id":{"$oid":"5e36ad5045fd4709107c4fdf"}},{"image":"https://m.media-amazon.com/images/M/MV5BMjMwNTIxODg0OF5BMl5BanBnXkFtZTgwODg2NzM0OTE@._V1_UY317_CR11,0,214,317_AL__QL50.jpg","link":"/name/nm0006795/?ref_=ttfc_fc_cl_i3","name":"Salman Khan","role":"Suraj ","_id":{"$oid":"5e36ad5045fd4709107c4fe0"}},{"image":"https://m.media-amazon.com/images/M/MV5BNzc0MTJlOTEtYjMxOS00YjdlLWE3ZWEtYzViNDNhNzk0Mzk0XkEyXkFqcGdeQXVyMTExNDQ2MTI@._V1_UY317_CR18,0,214,317_AL__QL50.jpg","link":"/name/nm0013158/?ref_=ttfc_fc_cl_i4","name":"Atul Agnihotri","role":"Prashant ","_id":{"$oid":"5e36ad5045fd4709107c4fe1"}},{"image":"https://m.media-amazon.com/images/M/MV5BZmFmMmNiYjYtNGU1Zi00MzYyLWEwMzAtNWRlZDlkOGZlMjY3XkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_UX214_CR0,0,214,317_AL__QL50.jpg","link":"/name/nm0710046/?ref_=ttfc_fc_cl_i5","name":"Suman Ranganath","role":"Nita (\n \n (as Suman Ranganathan))","_id":{"$oid":"5e36ad5045fd4709107c4fe2"}},{"image":"https://m.media-amazon.com/images/M/MV5BMjEyMjEyODkzN15BMl5BanBnXkFtZTcwODkxMTY1Mg@@._V1_UX214_CR0,0,214,317_AL__QL50.jpg","link":"/name/nm0706787/?ref_=ttfc_fc_cl_i6","name":"Aishwarya Rai Bachchan","role":"Special Appearence (\n \n (as Aishwarya Rai))","_id":{"$oid":"5e36ad5045fd4709107c4fe3"}},{"image":"https://m.media-amazon.com/images/M/MV5BMDBkODNiY2MtMzJmOC00ODRlLTk5ZTktMzkyZGRhMWNhOGUyXkEyXkFqcGdeQXVyMTExNDQ2MTI@._V1_UY317_CR9,0,214,317_AL__QL50.jpg","link":"/name/nm0622186/?ref_=ttfc_fc_cl_i7","name":"Alok Nath","role":"Dev Narayan (\n \n (as Aloknath))","_id":{"$oid":"5e36ad5045fd4709107c4fe4"}},{"image":"https://m.media-amazon.com/images/M/MV5BYWIzYjZkZTAtNDM0MS00YjBiLWJlMjItZDY1YTJhNjMxNTExXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_UX214_CR0,0,214,317_AL__QL50.jpg","link":"/name/nm0045119/?ref_=ttfc_fc_cl_i8","name":"Aruna Irani","role":"Laxmi ","_id":{"$oid":"5e36ad5045fd4709107c4fe5"}},{"image":"https://m.media-amazon.com/images/M/MV5BZGUwNDEzZmMtMjIyZC00YTRiLTk3NTUtNzA1ZDJlMjM4ZDYwXkEyXkFqcGdeQXVyMTExNDQ2MTI@._V1_UY317_CR22,0,214,317_AL__QL50.jpg","link":"/name/nm0073426/?ref_=ttfc_fc_cl_i9","name":"Laxmikant Berde","role":"Hasmukh (\n \n (as Laxmimkant Berde))","_id":{"$oid":"5e36ad5045fd4709107c4fe6"}},{"image":"https://m.media-amazon.com/images/M/MV5BNzY2Mjk2N2QtOWQ0Ni00ZWI3LThmOGQtNGFkOGM3Mzg5YzMwL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTExNDQ2MTI@._V1_UY317_CR0,0,214,317_AL__QL50.jpg","link":"/name/nm0025630/?ref_=ttfc_fc_cl_i10","name":"Vikas Anand","role":"Ramu ","_id":{"$oid":"5e36ad5045fd4709107c4fe7"}},{"image":"https://m.media-amazon.com/images/M/MV5BYTI2NzU0NWYtMGEyNi00ZWY4LTg4ZGEtNTc1MjBkNGViOTJlXkEyXkFqcGdeQXVyMjQ2MDI5ODE@._V1_UY317_CR175,0,214,317_AL__QL50.jpg","link":"/name/nm0788861/?ref_=ttfc_fc_cl_i11","name":"Asha Sharma","role":"()","_id":{"$oid":"5e36ad5045fd4709107c4fe8"}},{"image":null,"link":"/name/nm0539498/?ref_=ttfc_fc_cl_i12","name":"Payal Malhotra","role":"()","_id":{"$oid":"5e36ad5045fd4709107c4fe9"}},{"image":"https://m.media-amazon.com/images/M/MV5BMjQ4N2IxYmMtYTc3NC00YThhLTkzNGQtYzk4MjM5ZGFiMGU3XkEyXkFqcGdeQXVyMTExNDQ2MTI@._V1_UY317_CR8,0,214,317_AL__QL50.jpg","link":"/name/nm0455454/?ref_=ttfc_fc_cl_i13","name":"Dinesh Hingoo","role":"Gopal's lawyer ","_id":{"$oid":"5e36ad5045fd4709107c4fea"}},{"image":null,"link":"/name/nm2227235/?ref_=ttfc_fc_cl_i14","name":"Azad Khatri","role":"()","_id":{"$oid":"5e36ad5045fd4709107c4feb"}},{"image":null,"link":"/name/nm2226098/?ref_=ttfc_fc_cl_i15","name":"Sajal Bohra","role":"(as Sajal Bora) ","_id":{"$oid":"5e36ad5045fd4709107c4fec"}}];    
    constructor(props){
      super(props);
      console.log('props.list',props.list);
      this.state = {
        responsive: { 1300: { items: 5 }, 768: {items: 3}, 300: {items: 1} },      
        objItems : this.props.list.map((x,index)=>{
          let img = process.env.PUBLIC_URL + "/actor.svg";
          if(x.image != null)
            img = x.image;
          return(
          <div className="cast-img">
            <img src={img} style={{userSelect:"none",pointerEvents:"none",userDrag:"none"}} alt={x.name} />
            <h3 style={{marginTop: "0.2em"}}>{x.name}</h3>
            <h4 style={{marginTop: "0.2em", color:"rgba(255, 255, 255, 0.65)",width:"inherit"}}>{x.role}</h4>
          </div>
          )
        }),
        galleryItems: this.items.map((i,index) => {
          let colors = ["#04e762","#008bf8","#E84855","#FFE74C","#29335C"];
          return(
            <h1 style={{backgroundColor:colors[index%5]}}>
              {i}
            </h1>
          )
        }),
      } 
    };
    
    thumbItem = (item, i) => (
      <span key={item} onClick={() => this.Carousel.slideTo(i)}>
        *{' '}
      </span>
    )
      
    render() {
      return (
        <div style={{display: "flex"}} >
        <Button onClick={() => this.Carousel.slidePrev()} className="alice-carousel-btn"><LeftOutlined /></Button>
        <div style={{             
          margin: "0em 1.5em",          
          paddingLeft: "0em",
          overflow: "hidden",
          width: "100%"
          }}>                    
          <AliceCarousel                        
            responsive={this.state.responsive}
            dotsDisabled={true}
            buttonsDisabled={true}
            swipeDisabled ={false}
            touchTrackingEnabled = {true}
            mouseTrackingEnabled = {true}
            infinite = {false}            
            items={this.state.objItems}
            ref={(el) => (this.Carousel = el)}                        
          />          
          {/* <nav>{this.items.map(this.thumbItem)}</nav> */}          
        </div>
        <Button onClick={() => this.Carousel.slideNext()} className="alice-carousel-btn"><RightOutlined /></Button>
        </div>
      )
    }
  }