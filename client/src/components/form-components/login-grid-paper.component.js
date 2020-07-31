import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

export default function GridPaper(props) {
  return (
    <Grid
      container
      direction="column"
      spacing={4}
      alignItems={'center'}
      justify="center"
      style={{ minHeight: '80vh' }}
    >
      <Box
        alignItems={'center'}
        justify="center"
        boxShadow={20}
        p={4}
        height="0%"
        // style={{ width: '20rem', height: '20rem', minHeight: '80vh' }}
      >
        <Grid
          container
          direction="column"
          spacing={2}
          // alignItems={'center'}
          // justify="center"
          // style={{ minHeight: '80vh' }}
        >
          {props.children.map((child) => (
            <Grid item>{child}</Grid>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
}
