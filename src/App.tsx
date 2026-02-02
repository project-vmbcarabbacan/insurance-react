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
        <Route path="manage-teams" element={<ManageTeam />} />
      </Route>

    </Routes>
  </Router>
}

export default App
