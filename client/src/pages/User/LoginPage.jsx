import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../providers/AllProviders.jsx';
import { setItemsInLocalStorage } from '../../utils/index.js';
import ProfilePage from './ProfilePage.jsx';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('user/login', { email, password });
      setItemsInLocalStorage('token', data.token);
      setUser(data.user);

      toast.success('Login successfully!');
      setRedirect(true);
    } catch (err) {
      if (err.response) {
        const { message } = err.response.data;
        toast.error(message);
      } else if (err.request) {
        toast.error(err.request);
      } else {
        console.error('Error: ', err.message);
      }
    }
  };

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  if (user) {
    return <ProfilePage />;
  }

  return (
    <div className="mt-4 grow flex justify-around items-center">
      <div className="mb-40">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleFormSubmit}>
          <input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            id="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary hover:bg-secondary transition mt-2">
            Login
          </button>
          <div className="text-center py-2 text-gray-500">
            <span className="register">Don't have an account yet? </span>
            <Link className="text-black underline" to={'/register'}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
