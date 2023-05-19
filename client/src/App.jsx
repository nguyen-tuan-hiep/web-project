import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import IndexPage from './pages/IndexPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import PlacesPage from './pages/PlacesPage';
import PlacesFormPage from './pages/PlacesFormPage';
import PlacePage from './pages/PlacePage';
import BookedCancelPage from './pages/BookedCancelPage';
import { getItemFromLocalStorage } from './utils';
import BookedPlacesPage from './pages/BookedPlacesPage';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './providers/UserProvider';
import { PlaceProvider } from './providers/PlaceProvider';
import Footer from './components/Footer';
import NotFound from './pages/ErrorPage/NotFound';
import React, { createContext } from 'react';
const token = getItemFromLocalStorage('token');
import './styles/App.css';
import { MapProvider } from './providers/MapProvider.jsx';
import Header from './components/Header';

// axios.defaults.baseURL = 'https://airbnb-clone-production.up.railway.app';
axios.defaults.baseURL = 'http://localhost:8001';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = React.useState('light');
  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  };
  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <div className="App" id={theme}>
        <div className="my-6 px-8 flex flex-col">
          <Header />
          <UserProvider>
            <PlaceProvider>
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
        </div>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
