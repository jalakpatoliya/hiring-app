import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/home/home.component';
import SignUp from './components/sign-up/sign-up.component';
import SignIn from './components/sign-in/sign-in.component';

import { CurrentUserProvider } from './contexts/current-user.context';

const App = () => {
  return (
    <div className="App">
      <CurrentUserProvider>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </CurrentUserProvider>
    </div>
  );
};

export default App;
