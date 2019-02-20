import axios from 'axios';
import { GET_ERRORS } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// Register User

export const registerUser = (userData, history) => dispatch => {
     axios
     .post('/api/users/register', userData)
     .then(res => history.push('/login'))
     .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
      );
} ;


//Login - Get User token

export const loginUsers = userData => dispatch => {
  axios.post('/api/users/login', userData)
    .then(res => {
      //Save to local storage
      const {token} = res.data;
      // set tokent to local storage
      localStorage.setItem('jwtToken', token);
      //set token to auth header
      setAuthToken(token);
      //decode token to get user data
      const decode = jwt_decode(token);
    })
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data 
      }));
}

