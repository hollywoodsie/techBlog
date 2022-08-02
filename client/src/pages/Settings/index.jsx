import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import axios from '../../axios';

import {
  selectIsAuth,
  fetchRegister,
  fetchAuthMe,
} from '../../redux/slices/auth';

export const Settings = () => {
  const userData = useSelector((state) => state.auth.data);

  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const inputFileRef = React.useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: {
      avatarUrl: ``,
      fullName: `${userData?.fullName ?? ''}`,
      email: `${userData?.email ?? ''}`,
      password: `**********`,
    },
  });

  React.useEffect(() => {
    if (userData) {
      console.log('reset');

      reset(userData);
    }
  }, [userData, reset]);
  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/images', formData);
      const temporaryUrl = await axios.get(`images/${data}`);
      console.warn(`temp =${temporaryUrl.data}`);
      setValue('avatarUrl', temporaryUrl.data);
    } catch (error) {
      console.warn(error);
      alert('Error while uploading image');
    }
  };
  const onSubmit = async (values) => {
    const data = await axios.patch('/settings', values);
    if (!data.payload) {
      return alert('Register failed');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (!userData) return null;
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        User Info
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.avatar}>
          <Avatar
            src={userData.avatarUrl}
            sx={{ width: 100, height: 100 }}
            onClick={() => inputFileRef.current.click()}
            {...register('avatarUrl')}
          />
        </div>
        <input
          ref={inputFileRef}
          type="file"
          onChange={handleChangeFile}
          hidden
        />
        <TextField
          className={styles.field}
          label="Full name"
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Enter full name' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Enter e-mail address' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Enter password' })}
          fullWidth
        />
        <Button
          disabled={false}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Save Changes
        </Button>
      </form>
    </Paper>
  );
};
