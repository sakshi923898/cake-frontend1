import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CustomerDashboard from './components/CustomerDashboard';
import OwnerLogin from './components/OwnerLogin';
import OwnerPage from './components/OwnerPage';
import ProtectedOwnerRoute from './utils/ProtectedOwnerRoute';

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Use "*" to catch nested routes under "/" */}
        <Route path="*" element={<CustomerDashboard />} />

        {/* Owner login and dashboard routes */}
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
