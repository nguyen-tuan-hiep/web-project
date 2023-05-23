import React, { useContext, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { UserContext } from '../../providers/AllProviders.jsx';
import { PlacesPage } from '../AllPages.jsx';
import { AccountNav, Spinner } from '../../components/AllComponents.jsx';
import { removeItemFromLocalStorage } from '../../utils/index.js';
import { toast } from 'react-toastify';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

const ProfilePage = () => {
  const { loading, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  let { subpage } = useParams();
  if (!subpage) {
    subpage = 'profile';
  }

  const logout = async () => {
    setUser(null);
    removeItemFromLocalStorage('token');
    toast.success('Logged out');
    setRedirect('/');
    // window.location.reload();
  };

  if (loading) {
    return <Spinner />;
  }

  if (!loading && !user && !redirect) {
    console.log(`loading: ${loading}, user: ${user}, redirect: ${redirect}`);
    return <Navigate to={'/login'} />;
  }

  if (redirect) {
    return <Navigate to={String(redirect)} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <p className="text-center max-w-lg mx-auto ">
          Logged in as {user.name} ({user.email})
          <br />
          <button
            className="primary max-w-sm mt-4 hover:bg-secondary hover:scale-110 transition transform duration-200 ease-out"
            onClick={logout}
          >
            <LoginOutlinedIcon className="mr-2" />
            Logout
          </button>
        </p>
      )}
      {subpage === 'places' && <PlacesPage />}
    </div>
  );
};

export default ProfilePage;
