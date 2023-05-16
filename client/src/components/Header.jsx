import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';
import SearchBar from './SearchBar';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReactSwitch from 'react-switch';
import { ThemeContext } from '../App';

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  return (
    <header className="flex items-center justify-between">
      <Link to={'/'} className="flex items-center gap-1">
        <img
          className="h-8 w-8 md:h-10 md:w-10"
          src="https://cdn-icons-png.flaticon.com/512/2111/2111320.png"
          alt=""
        />

        <span className="hidden md:block font-bold text-2xl text-red-500">
          airbnb
        </span>
      </Link>

      <SearchBar />

      <div className="switch">
        <ReactSwitch onChange={toggleTheme} checked={theme === 'light'} />
      </div>

      <div className="flex items-center space-x-4 cursor-pointer hover:scale-110 transition transform duration-200 ease-out">
        <Link
          to={user ? '/account' : '/login'}
          className="flex gap-2 items-center border border-gray-300 rounded-3xl py-2 px-4  hover:shadow-3xl"
        >
          <MenuIcon />
          <div className="overflow-hidden">
            <AccountCircleIcon />
          </div>
          {user && <div className="username">{user.name}</div>}
        </Link>
      </div>
    </header>
  );
};
