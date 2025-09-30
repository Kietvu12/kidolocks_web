import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/api';

const PhuHuynhPage = () => {
  const [phuHuynhList, setPhuHuynhList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPhuHuynh, setEditingPhuHuynh] = useState(null);
  const [formData, setFormData] = useState({
    email_phu_huynh: '',
    ten_phu_huynh: '',
    sdt: '',
    mat_khau: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadPhuHuynhList();
  }, []);

  const loadPhuHuynhList = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getAllPhuHuynh();
      if (response.success) {
        setPhuHuynhList(response.data);
      }
    } catch (error) {
      console.error('Error loading phu huynh list:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPhuHuynh) {
        await apiService.updatePhuHuynh(editingPhuHuynh.ma_phu_huynh, formData);
      } else {
        await apiService.createPhuHuynh(formData);
      }
      setShowModal(false);
      setEditingPhuHuynh(null);
      setFormData({ email_phu_huynh: '', ten_phu_huynh: '', sdt: '', mat_khau: '' });
      loadPhuHuynhList();
    } catch (error) {
      console.error('Error saving phu huynh:', error);
      alert('Có lỗi xảy ra khi lưu thông tin');
    }
  };

  const handleEdit = (phuHuynh) => {
    setEditingPhuHuynh(phuHuynh);
    setFormData({
      email_phu_huynh: phuHuynh.email_phu_huynh,
      ten_phu_huynh: phuHuynh.ten_phu_huynh,
      sdt: phuHuynh.sdt,
      mat_khau: ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phụ huynh này?')) {
      try {
        await apiService.deletePhuHuynh(id);
        loadPhuHuynhList();
      } catch (error) {
        console.error('Error deleting phu huynh:', error);
        alert('Có lỗi xảy ra khi xóa phụ huynh');
      }
    }
  };

  const openCreateModal = () => {
    setEditingPhuHuynh(null);
    setFormData({ email_phu_huynh: '', ten_phu_huynh: '', sdt: '', mat_khau: '' });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingPhuHuynh(null);
    setFormData({ email_phu_huynh: '', ten_phu_huynh: '', sdt: '', mat_khau: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <button
                onClick={() => navigate('/admin')}
                className="text-gray-600 hover:text-gray-900 mb-2"
              >
                ← Quay lại
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Quản lý phụ huynh</h1>
              <p className="text-gray-600">Quản lý thông tin tài khoản phụ huynh</p>
            </div>
            <button
              onClick={openCreateModal}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Thêm phụ huynh
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{phuHuynhList.length}</div>
                <div className="text-gray-600">Tổng phụ huynh</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {phuHuynhList.reduce((total, ph) => total + (ph.treEmList?.length || 0), 0)}
                </div>
                <div className="text-gray-600">Tổng trẻ em</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {phuHuynhList.filter(ph => ph.treEmList?.length > 0).length}
                </div>
                <div className="text-gray-600">Phụ huynh có con</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên phụ huynh
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số điện thoại
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số trẻ em
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày tạo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                    </td>
                  </tr>
                ) : phuHuynhList.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                      Không có dữ liệu
                    </td>
                  </tr>
                ) : (
                  phuHuynhList.map((phuHuynh) => (
                    <tr key={phuHuynh.ma_phu_huynh} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {phuHuynh.ma_phu_huynh}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {phuHuynh.ten_phu_huynh || 'Chưa cập nhật'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {phuHuynh.email_phu_huynh}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {phuHuynh.sdt || 'Chưa cập nhật'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {phuHuynh.treEmList?.length || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(phuHuynh.ngay_tao).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(phuHuynh)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDelete(phuHuynh.ma_phu_huynh)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
          >
            <h2 className="text-xl font-bold mb-4">
              {editingPhuHuynh ? 'Sửa thông tin phụ huynh' : 'Thêm phụ huynh mới'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email_phu_huynh"
                  value={formData.email_phu_huynh}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên phụ huynh
                </label>
                <input
                  type="text"
                  name="ten_phu_huynh"
                  value={formData.ten_phu_huynh}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  name="sdt"
                  value={formData.sdt}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu {editingPhuHuynh ? '(để trống nếu không đổi)' : '*'}
                </label>
                <input
                  type="password"
                  name="mat_khau"
                  value={formData.mat_khau}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={!editingPhuHuynh}
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                >
                  {editingPhuHuynh ? 'Cập nhật' : 'Tạo mới'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PhuHuynhPage;
