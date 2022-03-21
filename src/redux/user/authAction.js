import axios from 'axios';
import { returnErrors } from '../error/errorAction';
import { UPDATE_FAIL, UPDATE_SUCCESS, USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS,
     LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, EXPIRE_EXTEND } from '../types';
import { loggedUsed } from '../../api/Api';
import { createSession } from '../../api/Api';
import { usercreate } from '../../api/Api';


export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });
    // get token from localstorage
    const token = getState().auth.token;
    console.log("Token from load User", token);

    // Header
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    // if token , add to headers
    if (token) {
        config.headers['x-auth-token'] = token;

        axios.get(loggedUsed, config)
            .then(res => dispatch({
                type: USER_LOADED,
                payload: res.data

            }))
            .catch(err => {
                console.log(err);
                // dispatch(returnErrors(err.response.data, err.response.status));
                // dispatch({
                //     type: AUTH_ERROR
                // });
            })
    }else{
        dispatch({
            type: AUTH_ERROR

        })
    }
}




// Login User
export const login = ({ email, password }) => dispatch => {
    // Headers
    const config = {
        headers: { 'Content-Type': 'application/json' }
    }
    // Request body

    const body = JSON.stringify({ Email:email, password });
    console.log(body);

    axios.post(createSession, body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "LOGIN_FAIL"));
            dispatch({
                type: AUTH_ERROR
            });
        })

}


// Register User

export const register = ({ name, email, password, profile }) => dispatch => {
    // Headers
    const config = {
        headers: { 'Content-Type': 'application/json' }
    }
    // Request body

    const body = JSON.stringify({ name, Email: email, password, profile });

    axios.post(usercreate, body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            console.log("catch block error")
            dispatch(returnErrors(err.response.data, err.response.status, "REGISTER_FAIL"));
            dispatch({
                type: AUTH_ERROR
            });
        })

}


// Logout uSER
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};
