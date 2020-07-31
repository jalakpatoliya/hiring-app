import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function DropDown({ menuValues, label, handleChange, ...otherProps }) {
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
        <Select value={age} onChange={handleChange} label={label} {...otherProps}>
          {menuValues.map((menuValue) => (
            <MenuItem value={menuValue}>{menuValue}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
