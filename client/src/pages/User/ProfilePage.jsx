import React, { useContext, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { UserContext } from '../../providers/AllProviders.jsx';
import { PlacesPage } from '../AllPages.jsx';
import { AccountNav, Spinner } from '../../components/AllComponents.jsx';
import { removeItemFromLocalStorage } from '../../utils/index.js';
import { toast } from 'react-toastify';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import Avatar from '@mui/material/Avatar';
import { motion } from 'framer-motion';
import { containerVariants } from '../../components/Constant/Constants.jsx';
import EditIcon from '@mui/icons-material/Edit';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import CardTravelOutlinedIcon from '@mui/icons-material/CardTravelOutlined';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import axios from 'axios';

const ProfilePage = () => {
  const { loading, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  const [showForm, setShowForm] = useState(false); // Add state for showing/hiding the form

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

  const updateProfile = (description, name, email) => {
    axios
      .post(
        `/user/update/${user._id}`,
        {
          description,
          name,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        setUser(res.data);
        toast.success('Profile updated');
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const uploadProfilePicture = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('profilePicture', file);

    axios
      .post(`/upload-profile-picture/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        const { url } = res.data;
        setUser((prevUser) => ({ ...prevUser, profilePicture: url }));
        toast.success('Profile picture updated');
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const toggleForm = () => {
    setShowForm(!showForm); // Toggle the form visibility
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      // exit="exit"
    >
      <AccountNav />
      {subpage === 'profile' && (
        <div>
          <div className="text-center max-w-lg mx-auto">
            <div className="text-center">
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <Avatar
                  alt={user.name}
                  src={user.profilePicture}
                  sx={{ width: 150, height: 150, margin: '0 auto' }}
                />
                <input
                  type="file"
                  accept="image/*"
                  id="upload-profile-picture"
                  className="hidden"
                  onChange={uploadProfilePicture}
                />
                <button
                  onClick={() => {
                    document.getElementById('upload-profile-picture').click();
                  }}
                  style={{
                    position: 'absolute',
                    bottom: '0px',
                    right: '0px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <EditIcon />
                </button>
              </div>
              <p className="font-bold text-lg mt-4">
                Logged in as {user.name} ({user.email})
              </p>
              <p className="mt-2">{user.description}</p>
            </div>
            <br />
          </div>

          <div className="max-w-lg mx-auto text-center">
            {!showForm ? (
              <button
                className="primary max-w-sm hover:bg-secondary hover:scale-110 transition transform duration-200 ease-out"
                onClick={toggleForm}
              >
                Update Profile
              </button>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: -50, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.5 }}
                transition={{ duration: 0.5 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  updateProfile(
                    e.target.description.value,
                    e.target.name.value,
                    e.target.email.value
                  );
                }}
              >
                <h2 className="text-center text-2xl font-bold mb-4">
                  Update profile
                </h2>
                <div className="mb-4">
                  <label
                    className="block text-sm font-bold mb-2 text-left"
                    htmlFor="name"
                  >
                    <p>Name</p>
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
                    id="name"
                    type="text"
                    placeholder="Name"
                    defaultValue={user.name}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-bold mb-2 text-left"
                    htmlFor="email"
                  >
                    <p>Email</p>
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
                    id="email"
                    type="email"
                    placeholder="Email"
                    defaultValue={user.email}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-bold mb-2 text-left"
                    htmlFor="description"
                  >
                    <p>Description</p>
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
                    id="description"
                    type="text"
                    placeholder="Description"
                    defaultValue={user.description}
                  />
                </div>
                <div className="flex items-center justify-between gap-20">
                  <button
                    className="primary max-w-sm hover:bg-secondary hover:scale-110 transition transform duration-200 ease-out"
                    type="submit"
                  >
                    Update
                  </button>
                  <button
                    className="primary max-w-sm hover:bg-secondary hover:scale-110 transition transform duration-200 ease-out"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent form submission
                      toggleForm(); // Hide the form
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </motion.form>
            )}

            <button
              className="primary max-w-sm mt-4 hover:bg-secondary hover:scale-110 transition transform duration-200 ease-out"
              onClick={logout}
            >
              <LoginOutlinedIcon className="mr-2" />
              Logout
            </button>
          </div>
          <div className="items-center justify-center grid grid-cols-3 gap-x-8 gap-y-8 mx-40 my-10 grid-rows-auto">
            <div className="shadow-3xl p-4 rounded-xl h-40">
              <AccountBoxOutlinedIcon
                style={{ paddingBottom: '5px', fontSize: '50px' }}
              />
              <p className="font-bold text-lg">Personal info</p>
              <p>Provide personal details and how we can reach you</p>
            </div>

            <div className="shadow-3xl p-4 rounded-xl h-40">
              <SecurityOutlinedIcon
                style={{ paddingBottom: '5px', fontSize: '50px' }}
              />
              <p className="font-bold text-lg">Login & security</p>
              <p>Update your password and secure your account</p>
            </div>

            <div className="shadow-3xl p-4 rounded-xl h-40">
              <PaymentOutlinedIcon
                style={{ paddingBottom: '5px', fontSize: '50px' }}
              />
              <p className="font-bold text-lg">Payments & payouts</p>
              <p>Review payments, payouts, coupons, and gift cards</p>
            </div>

            <div className="shadow-3xl p-4 rounded-xl h-40">
              <PaidOutlinedIcon
                style={{ paddingBottom: '5px', fontSize: '50px' }}
              />
              <p className="font-bold text-lg">Taxes</p>
              <p>Manage taxpayer information and tax documents</p>
            </div>

            <div className="shadow-3xl p-4 rounded-xl h-40">
              <NotificationsNoneOutlinedIcon
                style={{ paddingBottom: '5px', fontSize: '50px' }}
              />
              <p className="font-bold text-lg">Notifications</p>
              <p>
                Choose notification preferences and how you want to be contacted
              </p>
            </div>

            <div className="shadow-3xl p-4 rounded-xl h-40">
              <VisibilityOutlinedIcon
                style={{ paddingBottom: '5px', fontSize: '50px' }}
              />
              <p className="font-bold text-lg">Privacy & sharing</p>
              <p>
                Manage your personal data, connected services, and data sharing
                settings
              </p>
            </div>

            <div className="shadow-3xl p-4 rounded-xl h-40">
              <PublicOutlinedIcon
                style={{ paddingBottom: '5px', fontSize: '50px' }}
              />
              <p className="font-bold text-lg">Global preferences</p>
              <p>Set your default language, currency, and timezone</p>
            </div>

            <div className="shadow-3xl p-4 rounded-xl h-40">
              <CardTravelOutlinedIcon
                style={{ paddingBottom: '5px', fontSize: '50px' }}
              />
              <p className="font-bold text-lg">Travel for work</p>
              <p>Add a work email for business trip benefits</p>
            </div>

            <div className="shadow-3xl p-4 rounded-xl h-40">
              <LeaderboardOutlinedIcon
                style={{ paddingBottom: '5px', fontSize: '50px' }}
              />
              <p className="font-bold text-lg">Professional hosting tools</p>
              <p>
                Get professional tools if you manage several properties on
                Airbnb
              </p>
            </div>
          </div>
        </div>
      )}
      {subpage === 'places' && <PlacesPage />}
    </motion.div>
  );
};

export default ProfilePage;
