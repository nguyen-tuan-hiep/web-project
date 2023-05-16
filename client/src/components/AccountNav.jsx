import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';
import AddHomeIcon from '@mui/icons-material/AddHome';
import PersonIcon from '@mui/icons-material/Person';
import ListIcon from '@mui/icons-material/List';

const AccountNav = () => {
  const { user } = useContext(UserContext);
  const { pathname } = useLocation();
  let subpage = pathname.split('/')?.[2];

  if (subpage === undefined) {
    subpage = 'profile';
  }

  const linkClases = (type = null) => {
    let classes = 'inline-flex gap-1 py-2 px-6 rounded-full';
    if (type === subpage) {
      classes += ' bg-primary text-white';
    } else {
      classes += ' bg-gray-200';
    }
    return classes;
  };
  return (
    <nav className="w-full flex flex-wrap justify-center mt-8 gap-2 mb-8">
      <div className="flex items-center m-2 mt-5 space-x-4 cursor-pointer hover:scale-110 transition transform duration-200 ease-out nav-item">
        <Link className={linkClases('profile')} to={'/account'}>
          <div className='icon'>
          <PersonIcon />
          My Profile
          </div>
        </Link>
      </div>
      <div className="flex items-center m-2 mt-5 space-x-4 cursor-pointer hover:scale-110 transition transform duration-200 ease-out nav-item">
        <Link
          className={linkClases('bookings')}
          to={`/account/bookings/${user?._id}`}
        >
          <div className='icon'>
          <ListIcon />
          My bookings
          </div>
        </Link>
      </div>
      <div className="flex items-center m-2 mt-5 space-x-4 cursor-pointer hover:scale-110 transition transform duration-200 ease-out nav-item">
        <Link className={linkClases('places')} to={'/account/places'}>
          <div className='icon'>
          <AddHomeIcon  />
          My accomodations
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default AccountNav;
