import Axios from 'axios';
import Cookies from 'universal-cookie';
import Router from 'next/router';

const storageTokenKey = 'authToken';
const storageProfileKey = 'authProfile';
const url = 'https://cookingapp-back.herokuapp.com';

export default class AuthService {
cookie = null;

//don't forget to handle roles if necessary by decoding jwt
constructor() {
  this.cookie = new Cookies();
}

  saveToken = (t) => this.cookie.set(storageTokenKey, t, { path: '/', maxAge: 365 * 24 * 60 * 60 * 1000 });

  logout = () => {
    this.cookie.remove(storageTokenKey);
    Router.push('/');
  }

  register = (username, email, password) => new Promise((resolve, reject) => {
    Axios.post(`${url}/auth/local/register`, {
      email,
      username,
      password
    }).then((res) => res.data).then((data) => {
      this.saveToken(data.jwt);
      Router.push('/');
      return resolve(data);
    }).catch((err) => reject(err));
  });

  login = (identifier, password) => new Promise((resolve, reject) => {
    Axios.post(`${url}/auth/local`, {
      identifier,
      password,
    }).then((res) => res.data).then((data) => {
      this.saveToken(data.jwt);
      Router.push('/');
      return resolve(data);
    }).catch((err) => reject({ message: 'Invalid email or password.' }));
  });

  me = (t) => new Promise((resolve, reject) => {
    Axios.get(`${url}/users/me`, {
      headers: { Authorization: `Bearer ${t}` },
    }).then((res) => res.data).then((data) => resolve(data)).catch((err) => reject(err));
  });

  getTokenSSR(ctx) {
    const cookies = new Cookies(ctx.req ? ctx.req.headers.cookie : null);
    const token = cookies.get(storageTokenKey);

    return token;
  }
}
