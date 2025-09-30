import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/api';

const GoiManagementPage = () => {
  const [goiList, setGoiList] = useState([]);
  const [noiDungList, setNoiDungList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form states
  const [showGoiForm, setShowGoiForm] = useState(false);
  const [showNoiDungForm, setShowNoiDungForm] = useState(false);
  const [editingGoi, setEditingGoi] = useState(null);
  const [editingNoiDung, setEditingNoiDung] = useState(null);
  const [selectedGoiId, setSelectedGoiId] = useState(null);

  // Form data
  const [goiForm, setGoiForm] = useState({
    ten: '',
    mo_ta: '',
    gia: '',
    loai_goi: 'MIEN_PHI',
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
      setError(null);
      const response = await apiService.getAllGoi();
      if (response.success) {
        setGoiList(response.data);
      } else {
        setError('Không thể tải danh sách gói dịch vụ');
      }
    } catch (error) {
      console.error('Error loading goi list:', error);
      setError('Lỗi khi tải danh sách gói dịch vụ');
    } finally {
      setIsLoading(false);
    }
  };

  const loadNoiDungList = async (goiId) => {
    try {
      const response = await apiService.getNoiDungByGoi(goiId);
      if (response.success) {
        setNoiDungList(response.data);
      }
    } catch (error) {
      console.error('Error loading noi dung list:', error);
    }
  };

  // CRUD Operations for Goi
  const handleCreateGoi = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.createGoi(goiForm);
      if (response.success) {
        await loadGoiList();
        setShowGoiForm(false);
        resetGoiForm();
        alert('Tạo gói dịch vụ thành công!');
      } else {
        alert('Lỗi khi tạo gói dịch vụ: ' + response.message);
      }
    } catch (error) {
      console.error('Error creating goi:', error);
      alert('Lỗi khi tạo gói dịch vụ');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateGoi = async (id) => {
    try {
      setIsLoading(true);
      const response = await apiService.updateGoi(id, goiForm);
      if (response.success) {
        await loadGoiList();
        setShowGoiForm(false);
        setEditingGoi(null);
        resetGoiForm();
        alert('Cập nhật gói dịch vụ thành công!');
      } else {
        alert('Lỗi khi cập nhật gói dịch vụ: ' + response.message);
      }
    } catch (error) {
      console.error('Error updating goi:', error);
      alert('Lỗi khi cập nhật gói dịch vụ');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteGoi = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa gói dịch vụ này?')) {
      try {
        setIsLoading(true);
        const response = await apiService.deleteGoi(id);
        if (response.success) {
          await loadGoiList();
          alert('Xóa gói dịch vụ thành công!');
        } else {
          alert('Lỗi khi xóa gói dịch vụ: ' + response.message);
        }
      } catch (error) {
        console.error('Error deleting goi:', error);
        alert('Lỗi khi xóa gói dịch vụ');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // CRUD Operations for NoiDung
  const handleCreateNoiDung = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.addNoiDungToGoi(selectedGoiId, noiDungForm.noi_dung);
      if (response.success) {
        await loadNoiDungList(selectedGoiId);
        setShowNoiDungForm(false);
        resetNoiDungForm();
        alert('Thêm nội dung thành công!');
      } else {
        alert('Lỗi khi thêm nội dung: ' + response.message);
      }
    } catch (error) {
      console.error('Error creating noi dung:', error);
      alert('Lỗi khi thêm nội dung');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateNoiDung = async (id) => {
    try {
      setIsLoading(true);
      const response = await apiService.updateNoiDungGoi(id, noiDungForm.noi_dung);
      if (response.success) {
        await loadNoiDungList(selectedGoiId);
        setShowNoiDungForm(false);
        setEditingNoiDung(null);
        resetNoiDungForm();
        alert('Cập nhật nội dung thành công!');
      } else {
        alert('Lỗi khi cập nhật nội dung: ' + response.message);
      }
    } catch (error) {
      console.error('Error updating noi dung:', error);
      alert('Lỗi khi cập nhật nội dung');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNoiDung = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nội dung này?')) {
      try {
        setIsLoading(true);
        const response = await apiService.deleteNoiDungGoi(id);
        if (response.success) {
          await loadNoiDungList(selectedGoiId);
          alert('Xóa nội dung thành công!');
        } else {
          alert('Lỗi khi xóa nội dung: ' + response.message);
        }
      } catch (error) {
        console.error('Error deleting noi dung:', error);
        alert('Lỗi khi xóa nội dung');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Form handlers
  const resetGoiForm = () => {
    setGoiForm({
      ten: '',
      mo_ta: '',
      gia: '',
      loai_goi: 'MIEN_PHI',
      thoi_han_thang: 1
    });
  };

  const resetNoiDungForm = () => {
    setNoiDungForm({
      noi_dung: ''
    });
  };

  const openEditGoiForm = (goi) => {
    setEditingGoi(goi);
    setGoiForm({
      ten: goi.ten || '',
      mo_ta: goi.mo_ta || '',
      gia: goi.gia || '',
      loai_goi: goi.loai_goi || 'MIEN_PHI',
      thoi_han_thang: goi.thoi_han_thang || 1
    });
    setShowGoiForm(true);
  };

  const openEditNoiDungForm = (noiDung) => {
    setEditingNoiDung(noiDung);
    setNoiDungForm({
      noi_dung: noiDung.noi_dung || ''
    });
    setShowNoiDungForm(true);
  };

  const openNoiDungManagement = (goiId) => {
    setSelectedGoiId(goiId);
    loadNoiDungList(goiId);
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
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Quản lý gói dịch vụ</h1>
                <p className="text-gray-600">Tạo và quản lý các gói dịch vụ</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => navigate('/admin')}
                  className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  ← Quay lại Dashboard
                </button>
                <button
                  onClick={() => {
                    setShowGoiForm(true);
                    setEditingGoi(null);
                    resetGoiForm();
                  }}
                  className="px-4 py-2 rounded-lg transition-colors flex items-center"
                  style={{ backgroundColor: '#3b82f6', color: '#ffffff' }}
                  onMouseEnter={(e) => { e.target.style.backgroundColor = '#2563eb'; }}
                  onMouseLeave={(e) => { e.target.style.backgroundColor = '#3b82f6'; }}
                >
                  <span className="mr-2">➕</span>
                  Thêm gói mới
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600">Đang tải...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <span className="text-red-500 mr-2">⚠️</span>
              <span className="text-red-700">{error}</span>
            </div>
          </div>
        )}

        {/* Goi List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goiList.map((goi) => (
            <motion.div
              key={goi.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📦</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditGoiForm(goi)}
                      className="text-blue-600 hover:text-blue-800 text-sm px-3 py-1 rounded border border-blue-200 hover:bg-blue-50 transition-colors"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteGoi(goi.id)}
                      className="text-red-600 hover:text-red-800 text-sm px-3 py-1 rounded border border-red-200 hover:bg-red-50 transition-colors"
                    >
                      Xóa
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{goi.ten}</h3>
                <p className="text-sm text-gray-600 mb-3">{goi.mo_ta}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Giá:</span>
                    <span className="font-medium text-green-600">{formatPrice(goi.gia)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Loại:</span>
                    <span className={`font-medium ${
                      goi.loai_goi === 'TRA_PHI' ? 'text-orange-600' : 'text-green-600'
                    }`}>
                      {goi.loai_goi === 'TRA_PHI' ? 'Trả phí' : 'Miễn phí'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Thời hạn:</span>
                    <span className="font-medium">{goi.thoi_han_thang} tháng</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Số tính năng:</span>
                    <span className="font-medium text-purple-600">
                      {goi.noiDungList?.length || 0}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => openNoiDungManagement(goi.id)}
                  className="w-full py-2 px-4 rounded-lg transition-colors text-sm"
                  style={{ backgroundColor: '#8b5cf6', color: '#ffffff' }}
                  onMouseEnter={(e) => { e.target.style.backgroundColor = '#7c3aed'; }}
                  onMouseLeave={(e) => { e.target.style.backgroundColor = '#8b5cf6'; }}
                >
                  Quản lý nội dung ({goi.noiDungList?.length || 0})
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {goiList.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Chưa có gói dịch vụ</h3>
            <p className="text-gray-600 mb-4">Tạo gói dịch vụ đầu tiên để bắt đầu</p>
            <button
              onClick={() => {
                setShowGoiForm(true);
                setEditingGoi(null);
                resetGoiForm();
              }}
              className="px-6 py-3 rounded-lg transition-colors"
              style={{ backgroundColor: '#3b82f6', color: '#ffffff' }}
              onMouseEnter={(e) => { e.target.style.backgroundColor = '#2563eb'; }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = '#3b82f6'; }}
            >
              Tạo gói đầu tiên
            </button>
          </div>
        )}
      </div>

      {/* Goi Form Modal */}
      {showGoiForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingGoi ? 'Sửa gói dịch vụ' : 'Thêm gói dịch vụ mới'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên gói</label>
                <input
                  type="text"
                  value={goiForm.ten}
                  onChange={(e) => setGoiForm({...goiForm, ten: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ví dụ: Gói 1 năm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea
                  value={goiForm.mo_ta}
                  onChange={(e) => setGoiForm({...goiForm, mo_ta: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Mô tả chi tiết về gói dịch vụ"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Giá (VNĐ)</label>
                <input
                  type="number"
                  value={goiForm.gia}
                  onChange={(e) => setGoiForm({...goiForm, gia: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loại gói</label>
                <select
                  value={goiForm.loai_goi}
                  onChange={(e) => setGoiForm({...goiForm, loai_goi: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="MIEN_PHI">Miễn phí</option>
                  <option value="TRA_PHI">Trả phí</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thời hạn (tháng)</label>
                <input
                  type="number"
                  value={goiForm.thoi_han_thang}
                  onChange={(e) => setGoiForm({...goiForm, thoi_han_thang: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowGoiForm(false);
                  setEditingGoi(null);
                  resetGoiForm();
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={() => editingGoi ? handleUpdateGoi(editingGoi.id) : handleCreateGoi()}
                disabled={isLoading}
                className="px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                style={{ backgroundColor: '#3b82f6', color: '#ffffff' }}
                onMouseEnter={(e) => { if (!e.target.disabled) e.target.style.backgroundColor = '#2563eb'; }}
                onMouseLeave={(e) => { if (!e.target.disabled) e.target.style.backgroundColor = '#3b82f6'; }}
              >
                {isLoading ? 'Đang xử lý...' : (editingGoi ? 'Cập nhật' : 'Tạo mới')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NoiDung Management Modal */}
      {selectedGoiId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Quản lý nội dung gói</h3>
              <button
                onClick={() => setSelectedGoiId(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              <button
                onClick={() => {
                  setShowNoiDungForm(true);
                  setEditingNoiDung(null);
                  resetNoiDungForm();
                }}
                className="px-4 py-2 rounded-lg transition-colors text-sm"
                style={{ backgroundColor: '#22c55e', color: '#ffffff' }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = '#16a34a'; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = '#22c55e'; }}
              >
                ➕ Thêm nội dung
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {noiDungList.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Chưa có nội dung nào</p>
              ) : (
                noiDungList.map((noiDung) => (
                  <div key={noiDung.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">{noiDung.noi_dung}</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditNoiDungForm(noiDung)}
                        className="text-blue-600 hover:text-blue-800 text-xs px-2 py-1 rounded border border-blue-200 hover:bg-blue-50 transition-colors"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDeleteNoiDung(noiDung.id)}
                        className="text-red-600 hover:text-red-800 text-xs px-2 py-1 rounded border border-red-200 hover:bg-red-50 transition-colors"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* NoiDung Form Modal */}
      {showNoiDungForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingNoiDung ? 'Sửa nội dung' : 'Thêm nội dung mới'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
                <textarea
                  value={noiDungForm.noi_dung}
                  onChange={(e) => setNoiDungForm({...noiDungForm, noi_dung: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="4"
                  placeholder="Mô tả tính năng của gói"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowNoiDungForm(false);
                  setEditingNoiDung(null);
                  resetNoiDungForm();
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={() => editingNoiDung ? handleUpdateNoiDung(editingNoiDung.id) : handleCreateNoiDung()}
                disabled={isLoading}
                className="px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                style={{ backgroundColor: '#22c55e', color: '#ffffff' }}
                onMouseEnter={(e) => { if (!e.target.disabled) e.target.style.backgroundColor = '#16a34a'; }}
                onMouseLeave={(e) => { if (!e.target.disabled) e.target.style.backgroundColor = '#22c55e'; }}
              >
                {isLoading ? 'Đang xử lý...' : (editingNoiDung ? 'Cập nhật' : 'Thêm mới')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoiManagementPage;
