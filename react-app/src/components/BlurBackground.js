import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme=>({
    backBlur : {
        height: "90vh",
        width: "100%",        
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "absolute",    
        filter: "blur(1px)",
        overflow: "hidden",
        
        [theme.breakpoints.down('xs')]: {           
            display: "none",
            // width:"100vw",
            // height: "50vh",
        },
    },
    blackBack:{
        height: "110vh",
        width: "101%",
        transform: "translate(-1% , -1%)",
        position: "absolute",
        backgroundImage:"linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.7150210425967262) 15%)",
        [theme.breakpoints.down('xs')]: {           
            display: "none",
        },
    },
}));
export default function BlurBackground(params){
    const classes = useStyles();
    return (   
        <>     
            <div 
            style={{ backgroundImage:"url("+params.source+")"}}
            className = {classes.backBlur}
            />            
            <div                         
            className = {classes.blackBack}
            />        
            </>
    );
    
}
