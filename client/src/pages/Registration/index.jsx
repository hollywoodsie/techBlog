import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import styles from './Login.module.scss';
import axios from '../../axios';

import { selectIsAuth, fetchRegister } from '../../redux/slices/auth';

export function Registration() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const err = useSelector((state) => state.auth.error);

  const [urlImage, setImageUrl] = React.useState('');
  const inputFileRef = React.useRef(null);
  const {
    register,
    handleSubmit,
    setError,
    setValue,

    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });
  React.useEffect(() => {
    if (err) {
      err.forEach((obj) => {
        setError(obj.param, {
          type: 'server',
          message: obj.msg,
        });
      });
    }
  }, [err]);
  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];

      formData.append('image', file);

      const { data } = await axios.post('/images', formData);
      const url = await axios.get(`images/${data}`);
      setImageUrl(url.data);
      setValue('avatarUrl', url.data);
    } catch (error) {
      console.log('Was not uploaded');
    }
  };

  const onClickRemoveImage = async () => {
    setValue('avatarUrl', '');
    setImageUrl('');
  };
  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

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
        Create account
      </Typography>
      <div className={styles.avatar}>
        <Avatar
          src={urlImage}
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
      {urlImage && (
        <IconButton
          aria-label="delete"
          size="large"
          onClick={onClickRemoveImage}
          style={{ margin: '0 auto', display: 'flex' }}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
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
          type="password"
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
          Register
        </Button>
      </form>
    </Paper>
  );
}
