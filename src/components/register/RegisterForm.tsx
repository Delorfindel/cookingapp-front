import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { useQuery } from '@apollo/client';
import { useAuthContext } from '@contexts/AuthContext';
import AuthService from '@services/auth';
import Link from 'next/link';
import styles from './RegisterForm.module.scss';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [registerErrorMsg, setRegisterErrorMsg] = useState('');
  const [AuthState, dispatch] = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmPasswordError(false);
    const auth = new AuthService();

    auth.register(username, email, password).then(({ user }) => {
      dispatch({
        type: 'addUser',
        payload: { user },
      });
    }).catch((err) => setRegisterError(true))
  };

  useEffect(() => {
    setConfirmPasswordError(false);
    confirmPassword !== password ? setConfirmPasswordError(true) : setConfirmPasswordError(false)
  }, [confirmPassword, password]);

  return (
    <>
      <div className={styles.wrapper}>
        <form className="w-5/6 px-8 pt-6 pb-8 mb-4 bg-white shadow-lg rounded-xl lg:w-1/2" onSubmit={handleSubmit}>
          <div className="items-center mb-6">
            <div className="">
              <label className="block pr-4 mb-1 text-gray-500">
                Email
              </label>
            </div>
            <div className="">
              <input
                className="w-full px-4 py-2 text-gray-700 bg-white shadow-lg appearance-none rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="items-center mb-6">
            <div className="">
              <label className="block pr-4 mb-1 text-gray-500">
                Username
              </label>
            </div>
            <div className="">
              <input
                className="w-full px-4 py-2 text-gray-700 bg-white shadow-lg appearance-none rounded-xl"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="items-center mb-6">
            <div className="">
              <label className="block pr-4 mb-1 text-gray-500">
                Mot de passe
              </label>
            </div>
            <div className="">
              <input
                className={`bg-white shadow-lg appearance-none border-2 rounded-xl w-full py-2 px-4 text-gray-700 leading-tight`}
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="items-center">
            <div className="">
              <label className="block pr-4 mb-1 text-gray-500">
                Confirmez le mot de passe
              </label>
            </div>
            <div className="">
              <input
                className={`bg-white shadow-lg appearance-none border-2 rounded-xl w-full py-2 px-4 text-gray-700 leading-tight ${confirmPasswordError && 'border-red-400'}`}
                id="password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {confirmPasswordError
              && (
                <div className="flex flex-1 mt-2">
                  <a className="text-sm text-red-500 mt-2" href="#">
                    Le mot de passe est différent.
                  </a>
                </div>
              )}
          </div>
          <div className="pb-5 mb-5 border-b border-gray-400" />
          <div className="flex justify-center mt-5">
            <button type="submit" className="w-full md:w-1/2 cta">
              <p>s'inscrire</p>
            </button>
          </div>
          <div className="flex flex-row items-center justify-between px-4">
            <Link passHref href="/">
              <a className="mt-5 text-center primary" href="/">
                ← Retour
              </a>
            </Link>
            <Link passHref href="/login">
              <a className="mt-5 text-center primary" href="/register">
                Déjà membre ?
              </a>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
