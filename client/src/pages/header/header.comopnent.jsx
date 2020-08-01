import React, { useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { CurrentUserContext } from '../../contexts/current-user.context';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { withRouter } from 'react-router-dom';
import Snackbar from '../../components/form-components/snackbar.component';

function Header({ history, match }) {
  let user = localStorage.getItem('user');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    history.push('/login');
    handleClose();
  };

  const handleMenu = () => {
    history.push('/');
  };

  // check if user is logged in or not
  useEffect(() => {
    try {
      // if user exist in local storage retrieve it
      const getUserFromLocalStorage = async () => {
        if (user) {
          user = JSON.parse(user);
          //set current user in context
          setCurrentUser(user);
        } else if (match.url == '/signup' || match.url == '/login') {
        } else {
          history.push('/login');
        }
      };
      getUserFromLocalStorage();
    } catch (error) {
      alert(error.message);
    }
  }, []);

  return (
    <div>
      <Snackbar />
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <AccountCircleRoundedIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {user ? (
          <div>
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            <MenuItem onClick={handleMenu}>Menu</MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem onClick={() => history.push('/login')}>Sign In</MenuItem>
            <MenuItem onClick={() => history.push('/signup')}>Sign Up</MenuItem>
          </div>
        )}
      </Menu>
    </div>
  );
}

export default withRouter(Header);
