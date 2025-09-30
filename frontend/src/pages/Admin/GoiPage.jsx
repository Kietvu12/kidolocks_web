import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/api';

const GoiPage = () => {
  const [goiList, setGoiList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showNoiDungModal, setShowNoiDungModal] = useState(false);
  const [editingGoi, setEditingGoi] = useState(null);
  const [selectedGoi, setSelectedGoi] = useState(null);
  const [formData, setFormData] = useState({
    ten: '',
    mo_ta: '',
    gia: '',
    loai_goi: 'TRA_PHI',
    thoi_han_thang: 1
  });
  const [noiDungForm, setNoiDungForm] = useState({
    noi_dung: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadGoiList();
  }, []);

  const loadGoiList = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getAllGoi();
      if (response.success) {
        setGoiList(response.data);
      }
    } catch (error) {
      console.error('Error loading goi list:', error);
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

  const handleNoiDungChange = (e) => {
    const { name, value } = e.target;
    setNoiDungForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        gia: parseFloat(formData.gia),
        thoi_han_thang: parseInt(formData.thoi_han_thang)
      };

      if (editingGoi) {
        await apiService.updateGoi(editingGoi.id, submitData);
      } else {
        await apiService.createGoi(submitData);
      }
      setShowModal(false);
      setEditingGoi(null);
      resetForm();
      loadGoiList();
    } catch (error) {
      console.error('Error saving goi:', error);
      alert('Có lỗi xảy ra khi lưu thông tin');
    }
  };

  const handleNoiDungSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.addNoiDungToGoi(selectedGoi.id, noiDungForm.noi_dung);
      setShowNoiDungModal(false);
      setNoiDungForm({ noi_dung: '' });
      loadGoiList();
    } catch (error) {
      console.error('Error adding noi dung:', error);
      alert('Có lỗi xảy ra khi thêm nội dung');
    }
  };

  const handleEdit = (goi) => {
    setEditingGoi(goi);
    setFormData({
      ten: goi.ten,
      mo_ta: goi.mo_ta || '',
      gia: goi.gia.toString(),
      loai_goi: goi.loai_goi,
      thoi_han_thang: goi.thoi_han_thang.toString()
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa gói dịch vụ này?')) {
      try {
        await apiService.deleteGoi(id);
        loadGoiList();
      } catch (error) {
        console.error('Error deleting goi:', error);
        alert('Có lỗi xảy ra khi xóa gói dịch vụ');
      }
    }
  };

  const handleAddNoiDung = (goi) => {
    setSelectedGoi(goi);
    setNoiDungForm({ noi_dung: '' });
    setShowNoiDungModal(true);
  };

  const openCreateModal = () => {
    setEditingGoi(null);
    resetForm();
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      ten: '',
      mo_ta: '',
      gia: '',
      loai_goi: 'TRA_PHI',
      thoi_han_thang: 1
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingGoi(null);
    resetForm();
  };

  const closeNoiDungModal = () => {
    setShowNoiDungModal(false);
    setSelectedGoi(null);
    setNoiDungForm({ noi_dung: '' });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
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
              <h1 className="text-2xl font-bold text-gray-900">Quản lý gói dịch vụ</h1>
              <p className="text-gray-600">Quản lý các gói dịch vụ và nội dung</p>
            </div>
            <button
              onClick={openCreateModal}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Thêm gói dịch vụ
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
                <div className="text-3xl font-bold text-orange-600">{goiList.length}</div>
                <div className="text-gray-600">Tổng gói dịch vụ</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {goiList.filter(g => g.loai_goi === 'TRA_PHI').length}
                </div>
                <div className="text-gray-600">Gói trả phí</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {goiList.filter(g => g.loai_goi === 'MIEN_PHI').length}
                </div>
                <div className="text-gray-600">Gói miễn phí</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {isLoading ? (
            <div className="col-span-full text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            </div>
          ) : goiList.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              Không có dữ liệu
            </div>
          ) : (
            goiList.map((goi) => (
              <motion.div
                key={goi.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className={`p-6 ${goi.loai_goi === 'TRA_PHI' ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 'bg-gradient-to-r from-blue-500 to-blue-600'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{goi.ten}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      goi.loai_goi === 'TRA_PHI' ? 'bg-white/20 text-white' : 'bg-white/20 text-white'
                    }`}>
                      {goi.loai_goi === 'TRA_PHI' ? 'Trả phí' : 'Miễn phí'}
                    </span>
                  </div>
                  <div className="text-white/90 mb-4">
                    <div className="text-2xl font-bold">{formatPrice(goi.gia)}</div>
                    <div className="text-sm">Thời hạn: {goi.thoi_han_thang} tháng</div>
                  </div>
                  {goi.mo_ta && (
                    <p className="text-white/80 text-sm">{goi.mo_ta}</p>
                  )}
                </div>
                
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Nội dung gói:</h4>
                  <div className="space-y-2 mb-4">
                    {goi.noiDungList && goi.noiDungList.length > 0 ? (
                      goi.noiDungList.slice(0, 3).map((noiDung, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <p className="text-sm text-gray-600">{noiDung.noi_dung}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">Chưa có nội dung</p>
                    )}
                    {goi.noiDungList && goi.noiDungList.length > 3 && (
                      <p className="text-sm text-gray-500">+{goi.noiDungList.length - 3} nội dung khác</p>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAddNoiDung(goi)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-3 rounded-lg transition-colors"
                    >
                      Thêm nội dung
                    </button>
                    <button
                      onClick={() => handleEdit(goi)}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white text-sm py-2 px-3 rounded-lg transition-colors"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(goi.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-3 rounded-lg transition-colors"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>

      {/* Goi Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-xl font-bold mb-4">
              {editingGoi ? 'Sửa gói dịch vụ' : 'Thêm gói dịch vụ mới'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên gói *
                </label>
                <input
                  type="text"
                  name="ten"
                  value={formData.ten}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả
                </label>
                <textarea
                  name="mo_ta"
                  value={formData.mo_ta}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giá (VNĐ) *
                </label>
                <input
                  type="number"
                  name="gia"
                  value={formData.gia}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loại gói *
                </label>
                <select
                  name="loai_goi"
                  value={formData.loai_goi}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="TRA_PHI">Trả phí</option>
                  <option value="MIEN_PHI">Miễn phí</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thời hạn (tháng) *
                </label>
                <input
                  type="number"
                  name="thoi_han_thang"
                  value={formData.thoi_han_thang}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                  min="1"
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
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
                >
                  {editingGoi ? 'Cập nhật' : 'Tạo mới'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Noi Dung Modal */}
      {showNoiDungModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
          >
            <h2 className="text-xl font-bold mb-4">
              Thêm nội dung cho gói: {selectedGoi?.ten}
            </h2>
            <form onSubmit={handleNoiDungSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nội dung *
                </label>
                <textarea
                  name="noi_dung"
                  value={noiDungForm.noi_dung}
                  onChange={handleNoiDungChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Nhập nội dung/tính năng của gói..."
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeNoiDungModal}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white rounded-lg"
                  style={{ backgroundColor: '#f97316', color: '#ffffff' }}
                  onMouseEnter={(e) => { e.target.style.backgroundColor = '#ea580c'; }}
                  onMouseLeave={(e) => { e.target.style.backgroundColor = '#f97316'; }}
                >
                  Thêm nội dung
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default GoiPage;
