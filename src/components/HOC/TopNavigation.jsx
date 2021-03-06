import React from 'react';
import { useHistory } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from "@auth0/auth0-react";
import AppBar from '@material-ui/core/AppBar';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textAlign:'left',
      fontWeight:'bold'
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
      padding: theme.spacing(0, 2),
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
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  
const TopNavigation =()=>{
    const classes = useStyles();
    const { push } = useHistory();
    const { user, isAuthenticated, isLoading } = useAuth0();
    console.log(isAuthenticated);
    console.log(user);
    console.log(isLoading);
    const LoginButton = () => {
      const { loginWithPopup } = useAuth0();
    
      return <Button color="inherit" onClick={() => loginWithPopup()}>Log In</Button>;
    };
    const LogoutButton = () => {
      const { user, logout } = useAuth0();
      const [anchorEl, setAnchorEl] = React.useState(null);
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
      return (
        <>
        <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <Avatar alt={user.nickname} src={user.picture} />
 {user.nickname} <ArrowDropDown />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={()=> logout({ returnTo: window.location.origin })}>Logout</MenuItem>
        </Menu>
        </>
      );
    };
    
    return (<AppBar position="static" color="secondary">
    <Toolbar>
      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      
      <Typography variant="h3" component="h1" className={classes.title}>
        APEXPATH 
      </Typography>
      
      <Button color="inherit" onClick={()=>{push('/');}}>Home</Button>
       <Button color="inherit">About</Button>
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
        {isAuthenticated && 
        <LogoutButton />
        }
        {!isAuthenticated && 
      <LoginButton />
        }

 
    </Toolbar>
  </AppBar>)
}
export default TopNavigation;