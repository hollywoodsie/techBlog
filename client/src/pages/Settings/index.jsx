import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useForm } from 'react-hook-form';

import { useSelector } from 'react-redux';
import styles from './Login.module.scss';
import axios from '../../axios';

export function Settings() {
  const userData = useSelector((state) => state.auth.data);
  console.log({ userData });

  const inputFileRef = React.useRef(null);
  const [urlImage, setImageUrl] = React.useState(userData?.avatarUrl ?? '');
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      avatarUrl: urlImage,
      fullName: `${userData?.fullName ?? ''}`,
      email: `${userData?.email ?? ''}`,
      password: ``,
    },
  });

  React.useEffect(() => {
    if (userData) {
      setImageUrl(userData.avatarUrl);

      reset(userData);
    }
  }, [userData]);

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
      console.warn(error);
      alert('Error while uploading image');
    }
  };

  const onSubmit = async (values) => {
    await axios
      .patch('/settings', values)
      .then(() => {
        alert('Changed successfully');
      })
      .catch((e) => {
        const someErrors = e.response;
        // back errors
        if (someErrors.data.message) {
          setError(`${someErrors.data.params}`, {
            type: 'server',
            message: someErrors.data.message,
          });
        }
        // validation errors
        for (let i = 0; i < someErrors.data.length; i += 1) {
          if (someErrors.data[i].param === 'password') {
            setError('password', {
              type: 'server',
              message: someErrors.data[i].msg,
            });
          } else if (someErrors.data[i].param === 'fullName') {
            setError('fullName', {
              type: 'server',
              message: someErrors.data[i].msg,
            });
          } else
            setError('email', {
              type: 'server',
              message: someErrors.data[i].msg,
            });
        }
      });
  };
  const onClickRemoveImage = async () => {
    setValue('avatarUrl', '');
    setImageUrl('');
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
          {...register('password')}
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
}
