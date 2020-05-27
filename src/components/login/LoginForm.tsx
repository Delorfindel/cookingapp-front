import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useQuery } from '@apollo/client';
import { useAuthContext } from '@contexts/AuthContext'
import AuthService from '@services/auth'
import Router from 'next/router'

export default function LoginForm() {
  const [email, setEmail] = useState("anthony@test.com");
  const [password, setPassword] = useState("1234567");
  const [error, setError] = useState(false);
  const [AuthState, dispatch] = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    const auth = new AuthService;
    auth.login(email, password).then(({jwt, user}) => {
      dispatch({
        type: 'addUser',
        payload: { user }
      });
    }).catch(err => setError(true));
  }

  useEffect(() => {
    if (error)
      setError(false);
  }, [password])

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <form className="bg-white shadow-lg rounded-xl px-8 pt-6 pb-8 mb-4 w-5/6 lg:w-1/2" onSubmit={handleSubmit}>
          <div className="items-center mb-6">
            <div className="">
              <label className="block text-gray-500 mb-1 pr-4">
                Email
              </label>
            </div>
            <div className="">
              <input className="bg-white shadow-lg appearance-none rounded-xl w-full py-2 px-4 text-gray-700"
                value={email} onChange={e => setEmail(e.target.value)} required
              />
            </div>
          </div>
          <div className="items-center mb-4">
            <div className="">
              <label className="block text-gray-500 mb-1 pr-4">
                Mot de passe
              </label>
            </div>
            <div className="">
              <input className={`bg-white shadow-lg appearance-none border-2 rounded-xl w-full py-2 px-4 text-gray-700 leading-tight ${error && 'border-red-400'}`}
                id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required
              />
            </div>
            {error &&
              <div className={`flex flex-1 mt-2`}>
                <a className="text-sm  text-red-500" href="#">
                  Mot de passe ou email incorrect.
                </a>
              </div>
            }
          </div>
          <div className="flex justify-end flex-1 mb-5 pb-5 border-b border-gray-400">
            <a className="text-sm  primary" href="#">
              Mot de passe oublié ?
            </a>
          </div>
          <div className="flex justify-center mt-5">
            <button type="submit" className="md:w-1/2 w-full cta">
              <p>se connecter</p>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
