import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/api';
import MultiLevelDropdown from '../../components/MultiLevelDropdown';

const AdminHomePage = () => {
  const [stats, setStats] = useState({
    totalPhuHuynh: 0,
    totalTreEm: 0,
    totalThietBi: 0,
    totalGoi: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const [phuHuynhRes, treEmRes, goiRes] = await Promise.all([
        apiService.getAllPhuHuynh(),
        apiService.getAllTreEm(),
        apiService.getAllGoi()
      ]);

      // Calculate total devices (approximate)
      let totalThietBi = 0;
      if (treEmRes.success) {
        treEmRes.data.forEach(tre => {
          totalThietBi += tre.thietBiList ? tre.thietBiList.length : 0;
        });
      }

      setStats({
        totalPhuHuynh: phuHuynhRes.success ? phuHuynhRes.data.length : 0,
        totalTreEm: treEmRes.success ? treEmRes.data.length : 0,
        totalThietBi,
        totalGoi: goiRes.success ? goiRes.data.length : 0
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const StatCard = ({ title, value, icon, color, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`bg-white rounded-xl p-6 shadow-lg cursor-pointer transition-all hover:shadow-xl ${color}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {isLoading ? '...' : value}
          </p>
        </div>
        <div className="text-4xl opacity-20">
          {icon}
        </div>
      </div>
    </motion.div>
  );

  const QuickActionCard = ({ title, description, icon, onClick, color }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`bg-gradient-to-br ${color} rounded-xl p-6 text-white cursor-pointer shadow-lg hover:shadow-xl transition-all`}
    >
      <div className="flex items-center mb-4">
        <div className="text-3xl mr-4">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-white/80 text-sm">{description}</p>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">KidsLock Admin</h1>
              <p className="text-gray-600">Bảng điều khiển quản trị</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Xin chào, Admin</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{ backgroundColor: '#ef4444', color: '#ffffff' }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = '#dc2626'; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = '#ef4444'; }}
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="col-span-full mb-6"
        >
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/admin/goi-management')}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg transition-all flex items-center shadow-lg hover:shadow-xl"
            >
              <span className="mr-2 text-xl">📦</span>
              <span className="font-semibold">Quản lý gói dịch vụ</span>
            </button>
          </div>
        </motion.div>

        {/* Multi-level Dropdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="col-span-full"
        >
          <MultiLevelDropdown />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminHomePage;
