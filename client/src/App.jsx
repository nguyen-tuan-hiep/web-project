import React from 'react';
import axios from 'axios';
import './styles/App.css';
import { useLocation } from 'react-router-dom';
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
import AnimationRoutes from './components/AnimationRoutes';

const token = getItemFromLocalStorage('token');

// axios.defaults.baseURL = 'https://airbnb-clone-production.up.railway.app';
axios.defaults.baseURL = 'http://localhost:8001';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

function App() {
  const location = useLocation();
  return (
    <ThemeProvider>
      <UserProvider>
        <PlaceProvider>
          <Header />
          <MapProvider>
            <AnimationRoutes />
            <ToastContainer autoClose={2000} transition={Slide} />
          </MapProvider>
        </PlaceProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
