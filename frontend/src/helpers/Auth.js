import Config from '../config';
import jwt from 'jsonwebtoken';
import Home from '../layouts/home/Home';
import { useEffect } from 'react';

const ROLE_CUSTOMER = 'customer';
const ROLE_SELLER = 'seller';

function getUrl(path) {
  return Config.API_URL + path;
}

function saveToken(token) {
  localStorage.setItem('token', token);
}

function saveUserData(data) {
  localStorage.setItem('userData', JSON.stringify(data));
}

function getRawToken() {
  return localStorage.getItem('token');
}

function getToken() {
  return jwt.decode(getRawToken()) || false;
}

function isTokenValid() {
  let token = getToken();
  if (!token) return false;
  else return token.exp * 1000 >= Date.now();
}

function deleteToken() {
  localStorage.removeItem('token');
}

function deleteUserData() {
  localStorage.removeItem('userData');
}

// Exported
function getUserData() {
  return JSON.parse(localStorage.getItem('userData'));
}

async function doLogout() {
  deleteUserData();
  deleteToken();
  window.location = '/';
}

async function doLogin(email, password) {
  let response = await fetch(getUrl('auth/local'), {
    method: 'POST',
    body: JSON.stringify({
      identifier: email,
      password: password,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.status === 200) {
    let data = await response.json();
    saveUserData(data.user);
    saveToken(data.jwt);
    return true;
  }
  return response.status;
}

function withAuthAll(Component) {
  return function (props) {
    const allowedUser = [ROLE_SELLER, ROLE_CUSTOMER];
    useEffect(() => {
      if (!isTokenValid()) {
        deleteToken();
        deleteUserData();
      }
    }, [isTokenValid(), props]);

    return !!getUserData() &&
      allowedUser.includes(
        (getUserData().eCommerceRole || '').toLowerCase()
      ) ? (
      <Component {...props} />
    ) : (
      <Home {...props} />
    );
  };
}

function withAuthCustomer(Component) {
  return function (props) {
    const allowedUser = [ROLE_CUSTOMER];
    useEffect(() => {
      if (!isTokenValid()) {
        deleteToken();
        deleteUserData();
      }
    }, [isTokenValid(), props]);

    return !!getUserData() &&
      allowedUser.includes(
        (getUserData().eCommerceRole || '').toLowerCase()
      ) ? (
      <Component {...props} />
    ) : (
      <Home {...props} />
    );
  };
}

function withAuthSeller(Component) {
  return function (props) {
    const allowedUser = [ROLE_SELLER];
    useEffect(() => {
      if (!isTokenValid()) {
        deleteToken();
        deleteUserData();
      }
    }, [isTokenValid(), props]);

    return !!getUserData() &&
      allowedUser.includes(
        (getUserData().eCommerceRole || '').toLowerCase()
      ) ? (
      <Component {...props} />
    ) : (
      <Home {...props} />
    );
  };
}

export {
  doLogout,
  doLogin,
  withAuthCustomer,
  withAuthSeller,
  withAuthAll,
  getUserData,
};
