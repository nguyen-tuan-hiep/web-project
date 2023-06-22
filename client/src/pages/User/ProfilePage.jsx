import React, { useContext, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { UserContext } from '../../providers/AllProviders.jsx';
import { PlacesPage } from '../AllPages.jsx';
import { AccountNav, Spinner } from '../../components/AllComponents.jsx';
import { removeItemFromLocalStorage } from '../../utils/index.js';
import { toast } from 'react-toastify';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { motion } from 'framer-motion';
import { containerVariants } from '../../components/Constant/Constants.jsx';

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
    return <Navigate to={'/login'} />;
  }

  if (redirect) {
    return <Navigate to={String(redirect)} />;
  }

  return (
    <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    // exit="exit"
    >
      <AccountNav />
      {subpage === 'profile' && (
        <div
        >
          <p className="text-center max-w-lg mx-auto">
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
        </div>
      )}
      {subpage === 'places' && <PlacesPage />}
    </motion.div>
  );
};

export default ProfilePage;
