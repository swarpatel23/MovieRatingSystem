import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from "@material-ui/core/Button"
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { Link, Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 300,
      },
    },
  },
  HeaderItems: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(2),
    fontFamily: 'Nunito',
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  headerbuttonfont: {
    textTransform: 'none',
    fontSize: '1.2em',
  },
  headerlink: {
    color: "white",
  },
}));

export default function Header(props) {

  const isLoggedIn = localStorage.getItem('isLoggedIn');
  let history = useHistory();

  const classes = useStyles();
  let button;

  if (isLoggedIn) {
    button = <div><p color="inherit" className={classes.headerbuttonfont}>Hello, {localStorage.getItem('username')}</p>
      <Button
        color="inherit"
        className={classes.HeaderItems}
        onClick={() => {
          localStorage.clear();
          history.push('/login')

        }}
      >
        <Typography className={classes.headerbuttonfont} noWrap>Logout</Typography>
      </Button></div >;
  } else {
    button = <Button
      color="inherit"
      className={classes.HeaderItems}
      component={Link} to="/Login">
      <Typography className={classes.headerbuttonfont} noWrap>Login</Typography>
    </Button>
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ background: 'black' }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link to="/" className={classes.headerlink}>
              Company
            </Link>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

          <Button
            color="inherit"
            className={classes.HeaderItems}
            component={Link} to="/Contact"
          >
            <Typography className={classes.headerbuttonfont} noWrap>Contact Us</Typography>
          </Button>
          <Button
            color="inherit"
            className={classes.HeaderItems}
            component={Link}
            to="/movies"
          >
            <Typography className={classes.headerbuttonfont} noWrap>Movies</Typography>
          </Button>

          {button}


        </Toolbar>
      </AppBar>
    </div>
  );
}
