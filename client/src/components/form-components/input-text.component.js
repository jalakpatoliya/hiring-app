import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function InputText({ handleChange, label, ...otherProps }) {
  const classes = useStyles();
  return <TextField name={otherProps.name} onChange={handleChange} {...otherProps} label={label} />;
}
