import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/api';

const ThietBiPage = () => {
  const [thietBiList, setThietBiList] = useState([]);
  const [treEmList, setTreEmList] = useState([]);
  const [goiList, setGoiList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showGoiModal, setShowGoiModal] = useState(false);
  const [editingThietBi, setEditingThietBi] = useState(null);
  const [selectedThietBi, setSelectedThietBi] = useState(null);
  const [formData, setFormData] = useState({
    ma_tre_em: '',
    ma_thiet_bi: '',
    loai_thiet_bi: 'Laptop',
    ten_thiet_bi: ''
  });
  const [goiFormData, setGoiFormData] = useState({
    thong_tin_goi_id: '',
    gia: '',
    phuong_thuc_thanh_toan: '',
    ma_giao_dich: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [treEmRes, goiRes] = await Promise.all([
        apiService.getAllTreEm(),
        apiService.getAllGoi()
      ]);
      
      if (treEmRes.success) {
        setTreEmList(treEmRes.data);
        // Flatten all devices from all children
        const allThietBi = [];
        treEmRes.data.forEach(tre => {
          if (tre.thietBiList) {
            tre.thietBiList.forEach(thietBi => {
              allThietBi.push({
                ...thietBi,
                treEm: tre
              });
            });
          }
        });
        setThietBiList(allThietBi);
      }
      if (goiRes.success) {
        setGoiList(goiRes.data);
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

  const handleGoiInputChange = (e) => {
    const { name, value } = e.target;
    setGoiFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingThietBi) {
        await apiService.updateThietBi(editingThietBi.nguoi_dung_id, formData);
      } else {
        await apiService.createThietBi(formData);
      }
      setShowModal(false);
      setEditingThietBi(null);
      resetForm();
      loadData();
    } catch (error) {
      console.error('Error saving thiet bi:', error);
      alert('Có lỗi xảy ra khi lưu thông tin');
    }
  };

  const handleGoiSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.changeGoiDichVu(selectedThietBi.nguoi_dung_id, goiFormData);
      setShowGoiModal(false);
      setSelectedThietBi(null);
      resetGoiForm();
      loadData();
    } catch (error) {
      console.error('Error changing goi:', error);
      alert('Có lỗi xảy ra khi thay đổi gói dịch vụ');
    }
  };

  const handleEdit = (thietBi) => {
    setEditingThietBi(thietBi);
    setFormData({
      ma_tre_em: thietBi.ma_tre_em,
      ma_thiet_bi: thietBi.ma_thiet_bi || '',
      loai_thiet_bi: thietBi.loai_thiet_bi || 'Laptop',
      ten_thiet_bi: thietBi.ten_thiet_bi || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa thiết bị này?')) {
      try {
        await apiService.deleteThietBi(id);
        loadData();
      } catch (error) {
        console.error('Error deleting thiet bi:', error);
        alert('Có lỗi xảy ra khi xóa thiết bị');
      }
    }
  };

  const handleChangeGoi = (thietBi) => {
    setSelectedThietBi(thietBi);
    setGoiFormData({
      thong_tin_goi_id: '',
      gia: '',
      phuong_thuc_thanh_toan: '',
      ma_giao_dich: ''
    });
    setShowGoiModal(true);
  };

  const openCreateModal = () => {
    setEditingThietBi(null);
    resetForm();
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      ma_tre_em: '',
      ma_thiet_bi: '',
      loai_thiet_bi: 'Laptop',
      ten_thiet_bi: ''
    });
  };

  const resetGoiForm = () => {
    setGoiFormData({
      thong_tin_goi_id: '',
      gia: '',
      phuong_thuc_thanh_toan: '',
      ma_giao_dich: ''
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingThietBi(null);
    resetForm();
  };

  const closeGoiModal = () => {
    setShowGoiModal(false);
    setSelectedThietBi(null);
    resetGoiForm();
  };

  const getActiveGoi = (thietBi) => {
    if (thietBi.goiDichVuList && thietBi.goiDichVuList.length > 0) {
      return thietBi.goiDichVuList.find(goi => goi.trang_thai === 'DANG_HOAT_DONG');
    }
    return null;
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
              <h1 className="text-2xl font-bold text-gray-900">Quản lý thiết bị</h1>
              <p className="text-gray-600">Quản lý thiết bị và gói dịch vụ</p>
            </div>
            <button
              onClick={openCreateModal}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Thêm thiết bị
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
                <div className="text-3xl font-bold text-purple-600">{thietBiList.length}</div>
                <div className="text-gray-600">Tổng thiết bị</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {thietBiList.filter(tb => tb.loai_thiet_bi === 'Laptop').length}
                </div>
                <div className="text-gray-600">Laptop</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {thietBiList.filter(tb => tb.loai_thiet_bi === 'Desktop').length}
                </div>
                <div className="text-gray-600">Desktop</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {thietBiList.filter(tb => getActiveGoi(tb)).length}
                </div>
                <div className="text-gray-600">Có gói hoạt động</div>
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
                    Tên thiết bị
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loại thiết bị
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trẻ em
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gói đang dùng
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
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
                    </td>
                  </tr>
                ) : thietBiList.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                      Không có dữ liệu
                    </td>
                  </tr>
                ) : (
                  thietBiList.map((thietBi) => {
                    const activeGoi = getActiveGoi(thietBi);
                    return (
                      <tr key={thietBi.nguoi_dung_id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {thietBi.nguoi_dung_id.substring(0, 8)}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {thietBi.ten_thiet_bi || 'Chưa đặt tên'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            thietBi.loai_thiet_bi === 'Laptop' ? 'bg-blue-100 text-blue-800' :
                            thietBi.loai_thiet_bi === 'Desktop' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {thietBi.loai_thiet_bi || 'Chưa xác định'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {thietBi.treEm?.ten_tre || 'Chưa liên kết'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {activeGoi ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {activeGoi.thongTinGoi?.ten}
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              Chưa có gói
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(thietBi.ngay_tao).toLocaleDateString('vi-VN')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(thietBi)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Sửa
                            </button>
                            <button
                              onClick={() => handleChangeGoi(thietBi)}
                              className="text-orange-600 hover:text-orange-900"
                            >
                              Đổi gói
                            </button>
                            <button
                              onClick={() => handleDelete(thietBi.nguoi_dung_id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Thiet Bi Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-xl font-bold mb-4">
              {editingThietBi ? 'Sửa thông tin thiết bị' : 'Thêm thiết bị mới'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trẻ em *
                </label>
                <select
                  name="ma_tre_em"
                  value={formData.ma_tre_em}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Chọn trẻ em</option>
                  {treEmList.map(tre => (
                    <option key={tre.ma_tre_em} value={tre.ma_tre_em}>
                      {tre.ten_tre} - {tre.phuHuynh?.ten_phu_huynh}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mã thiết bị
                </label>
                <input
                  type="text"
                  name="ma_thiet_bi"
                  value={formData.ma_thiet_bi}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loại thiết bị
                </label>
                <select
                  name="loai_thiet_bi"
                  value={formData.loai_thiet_bi}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Laptop">Laptop</option>
                  <option value="Desktop">Desktop</option>
                  <option value="Tablet">Tablet</option>
                  <option value="Mobile">Mobile</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên thiết bị
                </label>
                <input
                  type="text"
                  name="ten_thiet_bi"
                  value={formData.ten_thiet_bi}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg"
                >
                  {editingThietBi ? 'Cập nhật' : 'Tạo mới'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Goi Modal */}
      {showGoiModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
          >
            <h2 className="text-xl font-bold mb-4">
              Thay đổi gói dịch vụ cho: {selectedThietBi?.ten_thiet_bi}
            </h2>
            <form onSubmit={handleGoiSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gói dịch vụ *
                </label>
                <select
                  name="thong_tin_goi_id"
                  value={goiFormData.thong_tin_goi_id}
                  onChange={handleGoiInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="">Chọn gói dịch vụ</option>
                  {goiList.map(goi => (
                    <option key={goi.id} value={goi.id}>
                      {goi.ten} - {goi.loai_goi === 'TRA_PHI' ? `${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(goi.gia)}` : 'Miễn phí'}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giá (VNĐ)
                </label>
                <input
                  type="number"
                  name="gia"
                  value={goiFormData.gia}
                  onChange={handleGoiInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phương thức thanh toán
                </label>
                <input
                  type="text"
                  name="phuong_thuc_thanh_toan"
                  value={goiFormData.phuong_thuc_thanh_toan}
                  onChange={handleGoiInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mã giao dịch
                </label>
                <input
                  type="text"
                  name="ma_giao_dich"
                  value={goiFormData.ma_giao_dich}
                  onChange={handleGoiInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeGoiModal}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
                >
                  Thay đổi gói
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ThietBiPage;
