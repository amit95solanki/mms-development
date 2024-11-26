import axios from 'axios';

export const REGISTER_URL = `http://localhost:8000/api/v1/user/new`;
export const LOGIN_URL = `/user/login`;
export const REQUEST_PASSWORD_URL = 'api/auth/forgot-password';

export function login({ email, password }) {
  return axios.post(LOGIN_URL, { email, password });
}

export function register({ firstName, lastName, email, photo, gender, password, dob }) {
  // console.log('name, email, photo, gender, password, dob', firstName, lastName, email, photo, gender, password, dob);

  return axios.post(REGISTER_URL, {
    firstName,
    lastName,
    email,
    photo,
    gender,
    password,
    dob,
  });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, {
    email,
  });
}
