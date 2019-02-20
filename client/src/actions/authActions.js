import axios from 'axios';
import { GET_ERRORS } from './types'
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
    
    })
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data 
      }));
}

