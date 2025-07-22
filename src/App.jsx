// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CustomerDashboard from './components/CustomerDashboard';
import OwnerLogin from './components/OwnerLogin';
import OwnerDashboard from './components/OwnerPage';
import Order from './components/Order';
import ProtectedOwnerRoute from './utils/ProtectedOwnerRoute';

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Customer routes */}
        <Route path="/" element={<CustomerDashboard />} />
        <Route path="/orders" element={<Order />} />

        {/* Owner routes */}
        <Route path="/owner/login" element={<OwnerLogin />} />
        <Route path="/ownerpage" element={
          <ProtectedOwnerRoute>
            <OwnerDashboard />
          </ProtectedOwnerRoute>
        } />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
