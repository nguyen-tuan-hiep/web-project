import { Route, Routes } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import ProfilePage from './pages/User/ProfilePage.jsx';
import LoginPage from './pages/User/LoginPage.jsx';
import RegisterPage from './pages/User/RegisterPage.jsx';
import axios from 'axios';
import PlacesPage from './pages/Place/PlacesPage.jsx';
import PlacesFormPage from './pages/Place/PlacesFormPage.jsx';
import PlacePage from './pages/Place/PlacePage.jsx';
import BookedCancelPage from './pages/Book/BookedCancelPage.jsx';
import { getItemFromLocalStorage } from './utils';
import BookedPlacesPage from './pages/Book/BookedPlacesPage.jsx';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './providers/UserProvider';
import { PlaceProvider } from './providers/PlaceProvider';
import NotFound from './pages/ErrorPage/NotFound';
import React from 'react';
import './styles/App.css';
import { MapProvider } from './providers/MapProvider.jsx';
import Layout from './components/Layout.jsx';
import { ThemeProvider } from './providers/ThemeProvider';

const token = getItemFromLocalStorage('token');

// axios.defaults.baseURL = 'https://airbnb-clone-production.up.railway.app';
axios.defaults.baseURL = 'http://localhost:8001';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

function App() {
  return (
    <ThemeProvider>
          <UserProvider>
            <PlaceProvider>
            <Layout />
              <MapProvider>
                <Routes>
                  {/* <Route path="/" element={<Layout />}> */}
                  <Route index element={<IndexPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/account" element={<ProfilePage />} />
                  <Route path="/account/places" element={<PlacesPage />} />
                  <Route
                    path="/account/places/new"
                    element={<PlacesFormPage />}
                  />
                  <Route
                    path="/account/places/:id"
                    element={<PlacesFormPage />}
                  />
                  <Route path="/place/:id" element={<PlacePage />} />
                  <Route
                    path="/account/bookings"
                    element={<BookedPlacesPage />}
                  />
                  <Route
                    path="/account/bookings/:id"
                    element={<BookedCancelPage />}
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <ToastContainer autoClose={2000} transition={Slide} />
              </MapProvider>
            </PlaceProvider>
          </UserProvider>
    </ThemeProvider>
  );
}

export default App;
