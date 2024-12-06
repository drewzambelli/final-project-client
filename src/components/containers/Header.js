/*==================================================
Header.js

It contains the Header component to be displayed on every page.
The header contains navigation links to every other page.
================================================== */
// Import "material" library for building UI with React components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import '@fontsource/poppins';

import { Link } from 'react-router-dom';
import { colors } from '@material-ui/core';


// Define styling for the header
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    fontType: 'bold',
    fontFamily: "'sans-serif'", /*This is the font I want here but i want poppins elsewhere*/
    fontSize: '35px', 
    color: '#ebc220' /*i want something closer to gold*/
  },
  appBar:{
    backgroundColor: '#8b0000', /*burgandy-ish color */
    shadows: ['none'],
  },
  greeting:{
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: "50%",
    margin: "auto",
  },
  // links:{
  //   textDecoration: 'none',
  //   marginRight: theme.spacing(2),
  //   backgroundColor: '#ffd700', // Gold
  //   color: '#5c3a2e', // Maroon text
  //   '&:hover': {
  //     backgroundColor: '#daa520', // Burnished gold on hover
  // }
  // },
  button: {
    marginRight: theme.spacing(2),
    backgroundColor: '#ffd700', // Gold
    color: '#5c3a2e', // Maroon text
    '&:hover': {
      backgroundColor: '#daa520', // Burnished gold on hover
  },
},
}));

// Header component, displayed on every page
// Links to every other page
const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0} className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title} color="inherit" >
            Campus Management System
          </Typography>

          <Link className={classes.button} to={'/'} >
            <Button variant="contained" >
              Home
            </Button>
          </Link>

          <Link className={classes.button} to={'/campuses'} >
            <Button variant="contained" >
              All Campuses
            </Button>
          </Link>

          <Link className={classes.button} to={'/students'} >
            <Button variant="contained">
              All Students
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );    
}

export default Header;
 