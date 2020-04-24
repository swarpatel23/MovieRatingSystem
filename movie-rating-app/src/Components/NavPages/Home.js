import React from 'react';
function Home (){
    document.title = "Home";
    return(
        <div> 
            <div className="home-container">
                <div className="grid-item" style={{alignSelf:"center"}}>
                    <img src="/logof.svg" className="home-logo" alt="cinema-paradise"/>           
                </div>
                <div className="grid-item" style={{alignSelf:"center"}}>
                    <h1 className="home-title">System Based on Machine learning and React</h1>                    
                    <h4 style={{marginBottom: "2em"}}>Helps To Rate Movie through sentiment analysis of comments</h4>
                    <small>Submitted By</small>
                    <div style={{display:"grid", gridTemplateColumns:"50% 50%"}}>
                    <p>Priyank Kumar Chaudhari (CE-104)</p>
                    <p>Swar M. Patel (CE-96)</p>
                    </div>
                </div>                
            </div>        
        </div>
    )
}

export default Home;