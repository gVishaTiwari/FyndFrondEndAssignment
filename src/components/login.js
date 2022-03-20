import React, { useState, useEffect, useRef } from 'react';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import axios from "axios";
import styles from '../styles/login.module.css';
import { connect } from 'react-redux';
import { login, register } from "../redux/user/authAction";

export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
export const LoginWithToast = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [IsLogin, setIsLogin] = useState(true);

  const { addToast } = useToasts();

  useEffect(() => {
    if (props.isAuthenticated) {
      props.history.push('/dashboard/trending')
    }
  }, [props.isAuthenticated])

  const { error } = props
  const prevError = usePrevious({ error });

  useEffect(() => {
    if (error !== prevError) {
      if (error.id === "REGISTER_FAIL") {
        addToast(error.msg.message, {
          autoDismiss: true,
          appearance: 'error',
        });
      }
      else if (error.id === "LOGIN_FAIL") {
        addToast(error.msg.message, {
          autoDismiss: true,
          appearance: 'error',
        });
      }
    }
  }, [props.error])


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return addToast('Please enter both email and password', {
        appearance: 'error',
        autoDismiss: true,
      });
    }

    const user = {
      email, password
    }
    props.login(user);
    console.log(props.isAuthenticated)

  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {

      addToast('Please fill all the fields', {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      addToast('Make sure password and confirm password matches', {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    }

    props.register({ name, email, password, profile: 'user' })
    // addToast('Successfully Registered, Please login', {
    //   appearance: 'success',
    // });
    // setTimeout(() => {
    //   props.history.push('/dashboard')
    // }, 2000);

  };

  return (

    <>
      {IsLogin ?
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <span className={styles.loginSignupHeader}>Log In</span>

          <div className={styles.field}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <input
              type="password"
              placeholder="Paasword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <button>
              Log In
            </button>
          </div>
          <div style={{ marginTop: '10px' }}>New User? <a href="#" onClick={() => setIsLogin(false)}><b>Register Now</b></a></div>
        </form>
        :
        <form className={styles.loginForm} onSubmit={handleFormSubmit}>
          <span className={styles.loginSignupHeader}> Signup</span>
          <div className={styles.field}>
            <input
              placeholder="Name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className={styles.field}>
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className={styles.field}>
            <input
              placeholder="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <input
              placeholder="Confirm Password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <button type="submit">
              Signup
            </button>
          </div>
          <div style={{ marginTop: '10px' }}>Have an account? <a href="#" onClick={() => setIsLogin(true)}><b>Login</b></a></div>
        </form>
      }
    </>

  );
};
const Login = (props) => {
  return (
    <ToastProvider>
      <LoginWithToast {...props} />
    </ToastProvider>
  )
}
const mapStateToProps = state => {
  return ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    error: state.error
  })
}


export default connect(mapStateToProps, { login, register })(Login);