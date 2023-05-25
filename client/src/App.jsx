import React from 'react';
import axios from 'axios';
import './styles/App.css';
import { Route, Routes } from 'react-router-dom';
import {
  BookedCancelPage,
  BookedPlacesPage,
  IndexPage,
  LoginPage,
  NotFound,
  PlacePage,
  PlacesFormPage,
  PlacesPage,
  ProfilePage,
  RegisterPage,
  PaymentCancel,
} from './pages/AllPages.jsx';
import { getItemFromLocalStorage } from './utils';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  MapProvider,
  PlaceProvider,
  ThemeProvider,
  UserProvider,
} from './providers/AllProviders.jsx';
import { Header } from './components/AllComponents.jsx';

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
          <Header />
          <MapProvider>
            <Routes>
              {/* <Route path="/" element={<Layout />}> */}
              <Route index element={<IndexPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/account" element={<ProfilePage />} />
              <Route path="/account/places" element={<PlacesPage />} />
              <Route path="/account/places/new" element={<PlacesFormPage />} />
              <Route path="/account/places/:id" element={<PlacesFormPage />} />
              <Route path="/place/:id" element={<PlacePage />} />
              <Route path="/account/bookings" element={<BookedPlacesPage />} />
              <Route
                path="/account/bookings/:id"
                element={<BookedCancelPage />}
              />
              <Route path="/payment-cancel" element={<PaymentCancel />} />
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
