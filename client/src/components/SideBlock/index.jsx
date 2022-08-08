import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import styles from './SideBlock.module.scss';

export function SideBlock({ title, children }) {
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography variant="h6" classes={{ root: styles.title }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
}
