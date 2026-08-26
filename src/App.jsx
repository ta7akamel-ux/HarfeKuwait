import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { Analytics } from "@vercel/analytics/react";

import Home from './pages/Home';
import AluminumKitchens from './pages/AluminumKitchens';
import KitchenRepair from './pages/KitchenRepair';
import DismantlingInstallation from './pages/DismantlingInstallation';
import CabinetRepair from './pages/CabinetRepair';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/صيانة-مطابخ-المنيوم" element={<AluminumKitchens />} />
          <Route path="/صيانة-مطابخ-المنيوم/" element={<AluminumKitchens />} />
          <Route path="/تصليح-مطابخ-الكويت" element={<KitchenRepair />} />
          <Route path="/تصليح-مطابخ-الكويت/" element={<KitchenRepair />} />
          <Route path="/فك-وتركيب-مطابخ" element={<DismantlingInstallation />} />
          <Route path="/فك-وتركيب-مطابخ/" element={<DismantlingInstallation />} />
          <Route path="/تصليح-كبتات-المطابخ" element={<CabinetRepair />} />
          <Route path="/تصليح-كبتات-المطابخ/" element={<CabinetRepair />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      {typeof window !== 'undefined' && <Analytics />}
    </>
  );
}
