import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';
import Header from '../../pages/header/header.comopnent';
import DropDown from '../form-components/drop-down.component';
import InputText from '../form-components/input-text.component';
import LoginGridPaper from '../form-components/login-grid-paper.component';
import { useForm } from 'react-hook-form';
import SnackBar from '../form-components/snackbar.component';

const SignUp = ({ history }) => {
  const { register, handleSubmit, errors } = useForm();

  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
    role: '',
  });

  const [snackBar, setSnackBar] = useState({
    message: '',
    open: false,
    severity: 'info', //error,infor,success,warning
  });

  const { email, password, role } = userCredentials;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const onSubmit = async () => {
    try {
      //signUp
      await axios.post(`api/signup`, { email, password });
      alert('SignUp successfull, pls login');
      //moving to login page
      history.push('/login');
    } catch ({
      response: {
        data: {
          error: { message },
        },
      },
    }) {
      setSnackBar({
        ...snackBar,
        message: message ? message : 'Error',
        open: true,
        severity: 'error',
      });
    }
  };

  return (
    <div>
      <Header />
      <SnackBar state={snackBar} setState={setSnackBar} />
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
          <DropDown
            menuValues={['candidate', 'employer']}
            name="role"
            value={role}
            onChange={handleChange}
            label="Role"
            style={{ minWidth: 225 }}
            required
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
            SignUp
          </Button>
        </LoginGridPaper>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
