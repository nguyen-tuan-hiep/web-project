import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import {
  BookedPlacePage,
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
  PaymentSuccessful,
} from '../pages/AllPages';
import { AnimatePresence } from 'framer-motion';

function AnimationRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
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
        <Route path="/account/bookings/:id" element={<BookedPlacePage />} />
        <Route path="/payment-cancel" element={<PaymentCancel />} />
        <Route path="/payment-successful" element={<PaymentSuccessful />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimationRoutes;
