import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import AdminHomePage from './pages/Admin/HomePage'
import PhuHuynhPage from './pages/Admin/PhuHuynhPage'
import TreEmPage from './pages/Admin/TreEmPage'
import ThietBiPage from './pages/Admin/ThietBiPage'
import GoiPage from './pages/Admin/GoiPage'
import GoiManagementPage from './pages/Admin/GoiManagementPage'
import DrillDownPage from './pages/Admin/DrillDownPage'
import './App.css'

// Protected Route Component
const ProtectedRoute = ({ children, userType }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const currentUserType = localStorage.getItem('userType');
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  if (userType && currentUserType !== userType) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router basename="/">
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute userType="admin">
                <AdminHomePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/phu-huynh" 
            element={
              <ProtectedRoute userType="admin">
                <PhuHuynhPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/tre-em" 
            element={
              <ProtectedRoute userType="admin">
                <TreEmPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/thiet-bi" 
            element={
              <ProtectedRoute userType="admin">
                <ThietBiPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/goi" 
            element={
              <ProtectedRoute userType="admin">
                <GoiPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/goi-management" 
            element={
              <ProtectedRoute userType="admin">
                <GoiManagementPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/drill-down" 
            element={
              <ProtectedRoute userType="admin">
                <DrillDownPage />
              </ProtectedRoute>
            } 
          />
          
          {/* User Routes (for future implementation) */}
          <Route 
            path="/user" 
            element={
              <ProtectedRoute userType="user">
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Trang người dùng</h1>
                    <p className="text-gray-600">Chức năng đang được phát triển...</p>
                    <button 
                      onClick={() => {
                        localStorage.removeItem('userType');
                        localStorage.removeItem('isLoggedIn');
                        window.location.href = '/';
                      }}
                      className="mt-4 px-4 py-2 rounded-lg"
                      style={{ backgroundColor: '#3b82f6', color: '#ffffff' }}
                      onMouseEnter={(e) => { e.target.style.backgroundColor = '#2563eb'; }}
                      onMouseLeave={(e) => { e.target.style.backgroundColor = '#3b82f6'; }}
                    >
                      Đăng xuất
                    </button>
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
  )
}

export default App