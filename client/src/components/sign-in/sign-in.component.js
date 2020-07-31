import axios from 'axios';
import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import { CurrentUserContext } from '../../contexts/current-user.context';
import { withRouter } from 'react-router';
import Header from '../../pages/header/header.comopnent';
import InputText from '../form-components/input-text.component';
import LoginGridPaper from '../form-components/login-grid-paper.component';
import { useForm } from 'react-hook-form';

const SignIn = ({ history }) => {
  const { register, handleSubmit, errors } = useForm();
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });
  const { email, password } = userCredentials;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const onSubmit = async () => {
    // e.preventDefault();
    try {
      //signing in
      const {
        data: { token },
      } = await axios.post(`api/login`, { email, password });
      await setCurrentUser({ email, token });

      localStorage.setItem('user', JSON.stringify({ email, token }));

      //moving to home page
      history.push('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
        <LoginGridPaper>
          <InputText
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            label="Email"
            required
            variant="outlined"
            ref={register({ required: true })}
          />
          <InputText
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            label="Password"
            required
            variant="outlined"
            ref={register({ required: true })}
          />
          <Button
            type="submit"
            variant="contained"
            style={{
              minWidth: 200,
              color: 'white',
              backgroundColor: '#469ac6',
              padding: '15px 95px',
            }}
            disableElevation
          >
            SignIn
          </Button>
        </LoginGridPaper>
      </form>
    </div>
  );
};

export default withRouter(SignIn);
