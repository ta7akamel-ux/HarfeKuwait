import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { Analytics } from "@vercel/analytics/react";

import Home from './pages/Home';
import AluminumKitchens from './pages/AluminumKitchens';
import KitchenRepair from './pages/KitchenRepair';
import DismantlingInstallation from './pages/DismantlingInstallation';
import CabinetRepair from './pages/CabinetRepair';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Canonical trailing-slash routes */}
          <Route path="/صيانة-مطابخ-المنيوم/" element={<AluminumKitchens />} />
          <Route path="/تصليح-مطابخ-الكويت/" element={<KitchenRepair />} />
          <Route path="/فك-وتركيب-مطابخ/" element={<DismantlingInstallation />} />
          <Route path="/تصليح-كبتات-المطابخ/" element={<CabinetRepair />} />

          {/* Redirect non-trailing-slash to canonical trailing-slash */}
          <Route path="/صيانة-مطابخ-المنيوم" element={<Navigate to="/صيانة-مطابخ-المنيوم/" replace />} />
          <Route path="/تصليح-مطابخ-الكويت" element={<Navigate to="/تصليح-مطابخ-الكويت/" replace />} />
          <Route path="/فك-وتركيب-مطابخ" element={<Navigate to="/فك-وتركيب-مطابخ/" replace />} />
          <Route path="/تصليح-كبتات-المطابخ" element={<Navigate to="/تصليح-كبتات-المطابخ/" replace />} />

          {/* 404 catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      {typeof window !== 'undefined' && <Analytics />}
    </>
  );
}
