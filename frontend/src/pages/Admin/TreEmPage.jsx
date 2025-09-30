import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/api';

const TreEmPage = () => {
  const [treEmList, setTreEmList] = useState([]);
  const [phuHuynhList, setPhuHuynhList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTreEm, setEditingTreEm] = useState(null);
  const [formData, setFormData] = useState({
    ma_phu_huynh: '',
    ten_tre: '',
    lop: '',
    ngay_sinh: '',
    truong: '',
    gioi_tinh: 'Khác',
    email_tre_em: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [treEmRes, phuHuynhRes] = await Promise.all([
        apiService.getAllTreEm(),
        apiService.getAllPhuHuynh()
      ]);
      
      if (treEmRes.success) {
        setTreEmList(treEmRes.data);
      }
      if (phuHuynhRes.success) {
        setPhuHuynhList(phuHuynhRes.data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
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
      if (editingTreEm) {
        await apiService.updateTreEm(editingTreEm.ma_tre_em, formData);
      } else {
        await apiService.createTreEm(formData);
      }
      setShowModal(false);
      setEditingTreEm(null);
      resetForm();
      loadData();
    } catch (error) {
      console.error('Error saving tre em:', error);
      alert('Có lỗi xảy ra khi lưu thông tin');
    }
  };

  const handleEdit = (treEm) => {
    setEditingTreEm(treEm);
    setFormData({
      ma_phu_huynh: treEm.ma_phu_huynh,
      ten_tre: treEm.ten_tre,
      lop: treEm.lop || '',
      ngay_sinh: treEm.ngay_sinh || '',
      truong: treEm.truong || '',
      gioi_tinh: treEm.gioi_tinh,
      email_tre_em: treEm.email_tre_em || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa trẻ em này?')) {
      try {
        await apiService.deleteTreEm(id);
        loadData();
      } catch (error) {
        console.error('Error deleting tre em:', error);
        alert('Có lỗi xảy ra khi xóa trẻ em');
      }
    }
  };

  const openCreateModal = () => {
    setEditingTreEm(null);
    resetForm();
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      ma_phu_huynh: '',
      ten_tre: '',
      lop: '',
      ngay_sinh: '',
      truong: '',
      gioi_tinh: 'Khác',
      email_tre_em: ''
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTreEm(null);
    resetForm();
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
              <h1 className="text-2xl font-bold text-gray-900">Quản lý trẻ em</h1>
              <p className="text-gray-600">Quản lý thông tin trẻ em và thiết bị</p>
            </div>
            <button
              onClick={openCreateModal}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Thêm trẻ em
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{treEmList.length}</div>
                <div className="text-gray-600">Tổng trẻ em</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {treEmList.filter(te => te.gioi_tinh === 'Nam').length}
                </div>
                <div className="text-gray-600">Nam</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">
                  {treEmList.filter(te => te.gioi_tinh === 'Nữ').length}
                </div>
                <div className="text-gray-600">Nữ</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {treEmList.reduce((total, te) => total + (te.thietBiList?.length || 0), 0)}
                </div>
                <div className="text-gray-600">Tổng thiết bị</div>
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
                    Tên trẻ em
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phụ huynh
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lớp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Giới tính
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số thiết bị
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
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
                    </td>
                  </tr>
                ) : treEmList.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                      Không có dữ liệu
                    </td>
                  </tr>
                ) : (
                  treEmList.map((treEm) => (
                    <tr key={treEm.ma_tre_em} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {treEm.ma_tre_em}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {treEm.ten_tre}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {treEm.phuHuynh?.ten_phu_huynh || 'Chưa cập nhật'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {treEm.lop || 'Chưa cập nhật'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          treEm.gioi_tinh === 'Nam' ? 'bg-blue-100 text-blue-800' :
                          treEm.gioi_tinh === 'Nữ' ? 'bg-pink-100 text-pink-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {treEm.gioi_tinh}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {treEm.thietBiList?.length || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(treEm)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDelete(treEm.ma_tre_em)}
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
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-xl font-bold mb-4">
              {editingTreEm ? 'Sửa thông tin trẻ em' : 'Thêm trẻ em mới'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phụ huynh *
                </label>
                <select
                  name="ma_phu_huynh"
                  value={formData.ma_phu_huynh}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Chọn phụ huynh</option>
                  {phuHuynhList.map(ph => (
                    <option key={ph.ma_phu_huynh} value={ph.ma_phu_huynh}>
                      {ph.ten_phu_huynh || ph.email_phu_huynh}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên trẻ em *
                </label>
                <input
                  type="text"
                  name="ten_tre"
                  value={formData.ten_tre}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lớp
                </label>
                <input
                  type="text"
                  name="lop"
                  value={formData.lop}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ngày sinh
                </label>
                <input
                  type="date"
                  name="ngay_sinh"
                  value={formData.ngay_sinh}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trường
                </label>
                <input
                  type="text"
                  name="truong"
                  value={formData.truong}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giới tính
                </label>
                <select
                  name="gioi_tinh"
                  value={formData.gioi_tinh}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email trẻ em
                </label>
                <input
                  type="email"
                  name="email_tre_em"
                  value={formData.email_tre_em}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                >
                  {editingTreEm ? 'Cập nhật' : 'Tạo mới'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TreEmPage;
