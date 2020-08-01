import React, { createContext, useState } from 'react';

export const SnackBarContext = createContext();

export const SnackBarProvider = (props) => {
  const [snackbar, setSnackbar] = useState({
    message: '',
    open: false,
    severity: 'info', //error,infor,success,warning
    vertical: 'top',
    horizontal: 'center',
  });

  return (
    <SnackBarContext.Provider value={[snackbar, setSnackbar]}>
      {props.children}
    </SnackBarContext.Provider>
  );
};
