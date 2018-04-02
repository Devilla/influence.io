import { call, put, select } from 'redux-saga/effects';

export const base =
  process.env.NODE_ENV === 'production'
    ? 'http://strapi.useinfluence.co/'
    : 'http://localhost:1337/'; // eslint-disable-line

// const getToken = state => state.getIn(['auth', 'token']);//state.auth.token;

// const base = `${base}`;

export const GET = (url) => {
  const token = JSON.parse(localStorage.getItem('authToken')).token;

  return fetch(base + url, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })
  .then(res => res.json())
  .then(res => res)
};


export const GETFILE = (url) => {
  const token = JSON.parse(localStorage.getItem('authToken')).token;
  console.log(token, "=========tokentokeoerwei");
  return fetch(base + url, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })
  .then(res => res)
};

export const POST = (url, body) => {
  const token = JSON.parse(localStorage.getItem('authToken')).token;
  return fetch(base + url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  .then(res => res.json())
  .then(res => res)
};

export const PUT = (url, body) => {
  const token = JSON.parse(localStorage.getItem('authToken')).token;
  return fetch(base + url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  .then(res => res.json())
  .then(res => res)
};

export const DELETE = (url) => {
  const token = JSON.parse(localStorage.getItem('authToken')).token;
  return fetch(base + url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(res => res)
};

// TODO refactor
export const POSTFILE = (url, body) => {
  const token = JSON.parse(localStorage.getItem('authToken')).token;
  return fetch(base + url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  })
  .then(res => res.json())
  .then(res => res)
};
