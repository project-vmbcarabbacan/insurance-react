import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react'
import './App.css'
import { useAppDispatch } from './app/stores/hooks'
import { csrf } from './app/stores/slices/authSlice'
import { AuthPage } from './pages/AuthPage'
import { Dashboard } from './pages/Dashboard';
import { MainLayout } from './components/Layout/MainLayout';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { ManageTeam } from './pages/Teams';
import { Customers } from './pages/Customers';
import { VehicleInsurancePage } from './pages/Products/VehiclePage';
import { HealthInsurancePage } from './pages/Products/HealthPage';
import { CustomerDetails } from './pages/CustomerDetail';

// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   return <MainLayout>{children}</MainLayout>
// }
function App() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(csrf())
  }, [dispatch])


  return <Router>
    <Routes>
      <Route path="/login" element={<AuthPage />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="customers" element={<Customers />} />
        <Route path="customer/:customer_id" element={<CustomerDetails />} />
        <Route path="teams" element={<ManageTeam />} />
        <Route path="leads/vehicle/create/:customer_id" element={<VehicleInsurancePage />} />
        <Route path="leads/vehicle/update/:customer_id/:lead_id" element={<VehicleInsurancePage />} />
        <Route path="leads/health/create/:customer_id" element={<HealthInsurancePage />} />
        <Route path="leads/health/update/:customer_id/:lead_id" element={<HealthInsurancePage />} />
      </Route>

    </Routes>
  </Router>
}

export default App
