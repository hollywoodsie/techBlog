import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import styles from './Login.module.scss';
import { fetchLogin, selectIsAuth } from '../../redux/slices/auth';

export function Login() {
  const err = useSelector((state) => state.auth.error);
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  React.useEffect(() => {
    if (err) {
      err.forEach((obj) => {
        setError('password', {
          type: 'server',
          message: obj.msg,
        });
      });
    }
  }, [err]);
  const onSubmit = async (values) => {
    const data = await dispatch(fetchLogin(values));

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };
  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Login menu
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.password?.message)}
          helperText={errors.email?.message ?? []}
          {...register('email', { required: 'Enter e-mail address' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Password"
          type="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Enter password' })}
          fullWidth
        />

        <Button type="submit" size="large" variant="contained" fullWidth>
          SignIn
        </Button>
      </form>
    </Paper>
  );
}
