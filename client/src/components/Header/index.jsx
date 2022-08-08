import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Header.module.scss';
import { selectIsAuth, logout } from '../../redux/slices/auth';

export function Header() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link to="/">
            <img src="/logo.png" alt="" />
            <div className={styles.logoText}>TechBlog</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Create post</Button>
                </Link>
                <Link to="/settings">
                  <Button variant="contained">Settings</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  LogOut
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">SignIn</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">SignUp</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
