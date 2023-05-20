import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ThemeContext, UserContext } from '../../providers/AllProviders.jsx';
import { SearchBar } from '../AllComponents.jsx';
import { AccountCircle, Brightness4, Brightness7, Menu } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { HeartIcon } from '@heroicons/react/solid';

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  return (
    <div className='py-4 px-8 flex flex-col'>
      <header className='flex items-center justify-between'>
        <Link to={'/'} className='flex items-center gap-1'>
          <img
            className='h-8 w-8 md:h-10 md:w-10 min-w-[36px]'
            src='https://cdn-icons-png.flaticon.com/512/2111/2111320.png'
            alt=''
          />

          <span className='hidden md:block font-bold text-2xl text-red-500'>
          airbnb
        </span>
        </Link>
        <SearchBar />

        <div className={'switch'}>
          <IconButton
            onClick={toggleTheme}
            className='flex hover:scale-110 transition transform duration-200 ease-out'
          >
            {theme === 'dark' ? (
              <Brightness7 style={{ color: 'white' }} />
            ) : (
              <Brightness4 style={{ color: 'black' }} />
            )}
          </IconButton>
        </div>

        <div className='bookmart'>
          <HeartIcon
            className='z-0 hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2
                  cursor-pointer hover:bg-red-700 duration-200 ease-out'
            onClick={() => {
              console.log('Open bookmark');
            }}
          />
        </div>

        <div
          className='flex items-center space-x-4 cursor-pointer hover:scale-110 transition transform duration-200 ease-out'>
          <Link
            to={user ? '/account' : '/login'}
            className='flex gap-2 items-center border border-gray-300 rounded-3xl py-2 px-4  hover:shadow-3xl'
          >
            <Menu />
            <div className='overflow-hidden'>
              <AccountCircle />
            </div>
            {user && <div className='hidden sm:block username'>{user.name}</div>}
          </Link>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default Header;