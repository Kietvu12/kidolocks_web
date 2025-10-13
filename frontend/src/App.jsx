import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import ChangePasswordPage from './pages/ChangePasswordPage'
import PaymentPage from './pages/PaymentPage'
import PaymentCallbackPage from './pages/PaymentCallbackPage'
import WalletPage from './pages/WalletPage'
import AdminHomePage from './pages/Admin/HomePage'
import PhuHuynhPage from './pages/Admin/PhuHuynhPage'
import TreEmPage from './pages/Admin/TreEmPage'
import ThietBiPage from './pages/Admin/ThietBiPage'
import GoiPage from './pages/Admin/GoiPage'
import GoiManagementPage from './pages/Admin/GoiManagementPage'
import DrillDownPage from './pages/Admin/DrillDownPage'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router basename="/">
          <div className="App">
            <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            
            {/* Change Password Route - Protected */}
            <Route 
              path="/change-password" 
              element={
                <ProtectedRoute>
                  <ChangePasswordPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Payment Routes */}
            <Route 
              path="/payment/:packageId" 
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/payment/callback" 
              element={<PaymentCallbackPage />} 
            />
            
            {/* Wallet Route - Protected */}
            <Route 
              path="/wallet" 
              element={
                <ProtectedRoute>
                  <WalletPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminHomePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/phu-huynh" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <PhuHuynhPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/tre-em" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <TreEmPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/thiet-bi" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <ThietBiPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/goi" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <GoiPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/goi-management" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <GoiManagementPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/drill-down" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <DrillDownPage />
                </ProtectedRoute>
              } 
            />
            
            {/* User Routes (for future implementation) */}
            <Route 
              path="/user" 
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-2xl font-bold text-gray-900 mb-4">Trang người dùng</h1>
                      <p className="text-gray-600">Chức năng đang được phát triển...</p>
                    </div>
                  </div>
                </ProtectedRoute>
              } 
            />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  </LanguageProvider>
  )
}

export default App