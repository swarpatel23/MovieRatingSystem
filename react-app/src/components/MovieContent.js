import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import Fab from '@material-ui/core/Fab';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Typography from '@material-ui/core/Typography';
import MyComponent from './CarouselSlider'
import LargeCarouselSlider from './LargeCarouselSlider'
import { Redirect } from 'react-router-dom'
import { Review } from './Review';
import axios from 'axios';

const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

const useStyles = makeStyles(theme => ({
    posterRow: {
        marginTop: "0px",
        [theme.breakpoints.up('sm')]: {
            paddingTop: "30px",
        },
    },
    posterCol: {
        [theme.breakpoints.down('xs')]: {
            padding: "0px",
        }
    },
    BlackCoverBg: {
        background: "none",
        color: 'white',
        fontFamily: 'Nunito',
        [theme.breakpoints.down('xs')]: {
            display: "block",
            background: "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(8,8,8,1) 4%);",
            padding: "25px",
        }
    },
    RowContent: {
        [theme.breakpoints.down('xs')]: {
            paddingLeft: theme.spacing(0),
        },
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(7),
        }
    },
    customIconFont: {
        fontFamily: "Nunito",
        textTransform: "none",
        fontSize: "1.2em,"
    },
    subheader: {
        fontFamily: "Nunito",
        fontSize: "2em",
    },
    MoreDetails: {
        paddingTop: theme.spacing(2),
        marginLeft: theme.spacing(0),
        [theme.breakpoints.up('md')]: {
            paddingTop: theme.spacing(20),
            marginLeft: theme.spacing(2),
        },
    },
    reviews: {
        paddingTop: theme.spacing(0),
        marginLeft: theme.spacing(0),
        [theme.breakpoints.up('md')]: {
            paddingTop: theme.spacing(2),
            marginLeft: theme.spacing(2),
        },
    },
    mainsubheader: {
        fontFamily: "Nunito",
        fontSize: "2.8em",
        color: "white",
    },
    description: {
        fontFamily: "Nunito",
        maxHeight: "50px",
    }
}));
export const MovieContent = ({ source, movie }) => {
    const classes = useStyles();
    //const castDetails = [{"image":"https://m.media-amazon.com/images/M/MV5BMjAxNDQyNDkxM15BMl5BanBnXkFtZTcwNTQyNTA0MQ@@._V1_UY317_CR131,0,214,317_AL__QL50.jpg","link":"/name/nm0451379/?ref_=ttfc_fc_cl_i1","name":"Akshaye Khanna","role":"Ashish Khanna ","_id":"5e36a11e65527d3f082c7278"},{"image":"https://m.media-amazon.com/images/M/MV5BMTUyNTg5NTgwMl5BMl5BanBnXkFtZTcwNzQyNTA0MQ@@._V1_UY317_CR131,0,214,317_AL__QL50.jpg","link":"/name/nm1779702/?ref_=ttfc_fc_cl_i2","name":"Ayesha Takia","role":"Rani Bhalla ","_id":"5e36a11e65527d3f082c7279"},{"image":"https://m.media-amazon.com/images/M/MV5BMDVlYWIxNGEtZmZiZi00ZWNmLWI2NTEtYzQ2OTBjNDU2N2MxXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_UY317_CR20,0,214,317_AL__QL50.jpg","link":"/name/nm1324246/?ref_=ttfc_fc_cl_i3","name":"Mallika Sherawat","role":"Sania ","_id":"5e36a11e65527d3f082c727a"},{"image":"https://m.media-amazon.com/images/M/MV5BODUwMzUyNTUxMl5BMl5BanBnXkFtZTcwNDM2ODIyOA@@._V1_UY317_CR4,0,214,317_AL__QL50.jpg","link":"/name/nm0792911/?ref_=ttfc_fc_cl_i4","name":"Sunil Shetty","role":"Anna ","_id":"5e36a11e65527d3f082c727b"},{"image":"https://m.media-amazon.com/images/M/MV5BMjExNDgyMTM2OV5BMl5BanBnXkFtZTgwMjk5MTMzOTE@._V1_UX214_CR0,0,214,317_AL__QL50.jpg","link":"/name/nm0012778/?ref_=ttfc_fc_cl_i5","name":"Aftab Shivdasani","role":"Rohit Chopra ","_id":"5e36a11e65527d3f082c727c"},{"image":"https://m.media-amazon.com/images/M/MV5BMjMyMjc1OTgzNF5BMl5BanBnXkFtZTgwMDY1NDMzOTE@._V1_UY317_CR4,0,214,317_AL__QL50.jpg","link":"/name/nm0451600/?ref_=ttfc_fc_cl_i6","name":"Anupam Kher","role":"Mangal Pratap Bhalla ","_id":"5e36a11e65527d3f082c727d"},{"image":"https://m.media-amazon.com/images/M/MV5BM2FmZGY4NDctMzczOC00MTg3LWExZDUtYWU5NTNkMTA4YzZhXkEyXkFqcGdeQXVyODI0MDE3OQ@@._V1_UX214_CR0,0,214,317_AL__QL50.jpg","link":"/name/nm0004109/?ref_=ttfc_fc_cl_i7","name":"Gulshan Grover","role":"Lukha - Malaysian Don ","_id":"5e36a11e65527d3f082c727e"},{"image":"https://m.media-amazon.com/images/M/MV5BNmI0ZTdiNDUtNzM1Yi00YjYzLWEzMjctMmM5YjNhODgwYzJhXkEyXkFqcGdeQXVyMTExNDQ2MTI@._V1_UX214_CR0,0,214,317_AL__QL50.jpg","link":"/name/nm0315551/?ref_=ttfc_fc_cl_i8","name":"Vijayendra Ghatge","role":"Mr. Bhalla ","_id":"5e36a11e65527d3f082c727f"},{"image":"https://m.media-amazon.com/images/M/MV5BMjQ4N2IxYmMtYTc3NC00YThhLTkzNGQtYzk4MjM5ZGFiMGU3XkEyXkFqcGdeQXVyMTExNDQ2MTI@._V1_UY317_CR8,0,214,317_AL__QL50.jpg","link":"/name/nm0455454/?ref_=ttfc_fc_cl_i9","name":"Dinesh Hingoo","role":"D. Lal - Undertaker ","_id":"5e36a11e65527d3f082c7280"},{"image":"https://m.media-amazon.com/images/M/MV5BNTc4ZjFlMjUtODU3MS00M2JhLTlkMzEtMmIyODFiMjAwZmJhXkEyXkFqcGdeQXVyNTE0MDc0NTM@._V1_UY317_CR93,0,214,317_AL__QL50.jpg","link":"/name/nm1224082/?ref_=ttfc_fc_cl_i10","name":"Boman Irani","role":"Dr. Rustom ","_id":"5e36a11e65527d3f082c7281"},{"image":null,"link":"/name/nm1473802/?ref_=ttfc_fc_cl_i11","name":"Dinesh Lamba","role":"()","_id":"5e36a11e65527d3f082c7282"},{"image":null,"link":"/name/nm2266838/?ref_=ttfc_fc_cl_i12","name":"Hemang Tanna","role":"Kakkad ","_id":"5e36a11e65527d3f082c7283"},{"image":"https://m.media-amazon.com/images/M/MV5BNGQ4YjkyMzMtM2E4OS00YmMzLWEyY2YtYjY0ZmUzYmEzNzFiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_UY317_CR19,0,214,317_AL__QL50.jpg","link":"/name/nm0890622/?ref_=ttfc_fc_cl_i13","name":"Mita Vasisht","role":"Devika Chouhan ","_id":"5e36a11e65527d3f082c7284"},{"image":"https://m.media-amazon.com/images/M/MV5BMTQ3MTI4MzUyNl5BMl5BanBnXkFtZTgwMjAzMTMzOTE@._V1_UY317_CR0,0,214,317_AL__QL50.jpg","link":"/name/nm1056425/?ref_=ttfc_fc_cl_i14","name":"Rajpal Yadav","role":"'Shayar' Kanpuri ","_id":"5e36a11e65527d3f082c7285"}];
    let details = movie;
    let date = 1;
    let month = "April";
    let year = "2020";
    let genre_list = [];
    let castDetails = [];
    let reviewlist = [];
    if (details.release_info != undefined) {
        date = details.release_info.date;
        month = details.release_info.month;
        year = details.release_info.year;
    }
    if (details.genre != undefined) {
        genre_list = details.genre;
    }
    if (details.cast != undefined) {
        castDetails = details.cast[details.cast.length - 1];
    }
    if (details.reviews != undefined) {
        reviewlist = details.reviews;
    }
    console.log('castDetails', castDetails.persons)

    function predict(e) {
        console.log(e.target.value);
        axios.post("/model/predict", { "review": e.target.value }).then(response => {
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        /* <Grid container>
             <img src={process.env.PUBLIC_URL + params.source}
            style={{
                maxWidth: "100%",
                height: "auto"
            }}
            />
        </Grid> */
        <>
            <Container fluid="true">
                <Row className={classes.posterRow}>
                    <Col xs={{ span: 12, offset: 0 }} sm={{ span: 4, offset: 0 }} className={classes.posterCol}>
                        <img
                            alt="img"
                            src={process.env.PUBLIC_URL + source}
                            style={{
                                maxWidth: "100%",
                                height: "auto",
                            }}
                        />
                    </Col>
                    <Col xs={{ span: 12 }} sm={{ span: 8, offset: 0 }} className={classes.BlackCoverBg}>
                        <Row className={classes.RowContent}>
                            <Col xs>

                                <h1 style={{ fontSize: "4em", fontFamily: "Nunito", clear: "right" }}>{details.name}
                                    <small>
                                        <Link href="#" onClick={preventDefault} style={{ color: "white", fontSize: "0.5em", paddingLeft: "15px" }}>{details.release_year}</Link>
                                    </small>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 98" style={{ width: "100px", float: "right", paddingRight: "5px" }}>
                                        <g id="ratings" transform="translate(-1700.558 -191.5)">
                                            <path id="Icon_ionic-md-star" data-name="Icon ionic-md-star" d="M23.9,35.218l12.422,7.495L33.035,28.576,44,19.07,29.544,17.828,23.9,4.5,18.252,17.828,3.8,19.07l10.966,9.506L11.475,42.713Z" transform="translate(1721 215)" fill="#fff" stroke="#fff" stroke-width="1" />
                                            <text id="_10" data-name="/ 10" fill="#fff" stroke="#fff" transform="translate(1821.058 245.458)" stroke-width="1" font-size="18" font-family="Nunito-LightItalic, Nunito" font-weight="300" font-style="italic"><tspan x="0" y="18">/ 10</tspan></text>
                                            <text id="_5" data-name="5" transform="translate(1773.117 192.5)" fill="#fff" stroke="#fff" stroke-width="1" font-size="70" font-family="Nunito-Regular, Nunito"><tspan x="0" y="71">{details.stars}</tspan></text>
                                            <g id="Rectangle_5" data-name="Rectangle 5" transform="translate(1700.558 195)" fill="none" stroke="#fff" stroke-width="1">
                                                <rect width="160" height="86.857" rx="18" stroke="none" />
                                                <rect x="0.5" y="0.5" width="159" height="85.857" rx="17.5" fill="none" />
                                            </g>
                                        </g>
                                    </svg>
                                </h1>
                            </Col>
                        </Row>
                        <Row className={classes.RowContent}>
                            <Col xs={{ span: 12 }} md={{ span: 8 }}>
                                <Row>
                                    <Col xs={{ span: 3 }}>
                                        {/* 10 April 2020                             */}
                                        {date} {month} {year}
                                    </Col>
                                    <Col xs={{ span: 3 }}>
                                        {details.rated}
                                    </Col>
                                    <Col xs={{ span: 6 }}>
                                        {genre_list.map((g, index) => {
                                            if (index !== genre_list.length - 1)
                                                return (<><Link style={{ color: "white" }} to={`/movie/${g}`}>{g}</Link> ,</>)
                                            else
                                                return (<Link style={{ color: "white" }} to={`/movie/${g}`}>{g}</Link>)

                                        })}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className={classes.RowContent} style={{ marginTop: "2.2em", fontSize: "1.2em" }}>
                            <Col xs={{ span: 12 }} md={{ span: 10 }} noWrap>
                                {details.description}
                            </Col>
                            <Col xs={{ span: 12 }} style={{ marginTop: "2.3em" }}>
                                <Fab variant="extended">
                                    <PlayArrowIcon className={classes.extendedIcon} style={{ fontSize: "3em" }} />
                                    <Typography className={classes.customIconFont} style={{ padding: ".0em .7em" }} >
                                        {/* <Link to={`${details.trailer_link}`}>Watch Trailer</Link> */}
                                        <a href={`${details.trailer_link}`}>Watch Trailer</a>
                                    </Typography>
                                </Fab>
                            </Col>
                            <Col xs={{ span: 12 }} style={{ marginTop: "2.3em" }}>
                                <Row>
                                    <Col>
                                        <Typography className={classes.subheader}>
                                            Photos
                                    </Typography>
                                    </Col>
                                </Row>
                                <MyComponent imageurl={details.images} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Container fluid="false">
                <Row className={classes.MoreDetails}>
                    <Col xs={{ span: 12, offset: 0 }} style={{ marginTop: "2.3em" }}>
                        <Row>
                            <Col xs={{ span: 12, offset: 0 }} >
                                <Typography className={classes.mainsubheader}>
                                    Cast
                                </Typography>
                            </Col>
                            <Col xs={{ span: 12, offset: 0 }} >
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{ marginLeft: "0px", marginRight: "0px" }}>
                    <Col>
                        <LargeCarouselSlider cast={castDetails} perslide={6} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 10, offset: 1 }} >

                        <Typography className={classes.mainsubheader}>
                            Enter Your Experience:
                                </Typography>
                        <textarea class="form-control" rows="5" id="comment" onChange={predict}></textarea>

                    </Col>

                </Row>
                <Row className={classes.reviews}>
                    <Col xs={{ span: 12, offset: 0 }}>
                        <Row>
                            <Col xs={{ span: 12, offset: 0 }} >
                                <Typography className={classes.mainsubheader}>
                                    Review
                                </Typography>
                            </Col>

                            <Col xs={{ span: 12, offset: 0 }} >
                                <Review reviews={reviewlist} />
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </Container>
        </>
    );

}

