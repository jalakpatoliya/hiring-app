import React, { useState, useContext, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/current-user.context';
import Header from '../header/header.comopnent';

function HomePage({ history }) {
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

  useEffect(() => {
    try {
      // if user exist in local storage retrieve it
      const getUserFromLocalStorage = async () => {
        let user = localStorage.getItem('user');
        if (user) {
          user = JSON.parse(user);

          //set current user in context
          setCurrentUser(user);
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
      <Header />
    </div>
  );
}

export default withRouter(HomePage);
