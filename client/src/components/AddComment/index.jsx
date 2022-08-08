import React from 'react';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import styles from './AddComment.module.scss';

export function Index() {
  return (
    <div className={styles.root}>
      <Avatar
        classes={{ root: styles.avatar }}
        src="https://mui.com/static/images/avatar/5.jpg"
      />
      <div className={styles.form}>
        <TextField
          label="Comment"
          variant="outlined"
          maxRows={10}
          multiline
          fullWidth
        />
        <Button variant="contained">Send comment</Button>
      </div>
    </div>
  );
}
