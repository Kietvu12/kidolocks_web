import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const GoiManagement = ({ maThietBi, onClose, onDataUpdated }) => {
  const [goiList, setGoiList] = useState([]);
  const [activeGoi, setActiveGoi] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Form states
  const [showTimeForm, setShowTimeForm] = useState(false);
  const [showExtendForm, setShowExtendForm] = useState(false);
  const [timeForm, setTimeForm] = useState({
    ngay_bat_dau: '',
    ngay_ket_thuc: ''
  });
  const [extendForm, setExtendForm] = useState({
    so_thang_gia_han: ''
  });

  useEffect(() => {
    if (maThietBi) {
      loadGoiData();
    }
  }, [maThietBi]);

  const loadGoiData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Load all packages for this device
      const goiResponse = await apiService.getGoiByThietBi(maThietBi);
      if (goiResponse.success) {
        setGoiList(goiResponse.data);
      }

      // Load active package
      try {
        const activeResponse = await apiService.getActiveGoiByThietBi(maThietBi);
        if (activeResponse.success) {
          setActiveGoi(activeResponse.data);
        }
      } catch (error) {
        // No active package found, this is normal
        setActiveGoi(null);
      }
    } catch (error) {
      console.error('Error loading goi data:', error);
      setError('Lỗi khi tải dữ liệu gói dịch vụ');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTime = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.updateGoiTimeForThietBi(maThietBi, timeForm);
      if (response.success) {
        alert('Cập nhật thời gian gói dịch vụ thành công!');
        setShowTimeForm(false);
        setTimeForm({ ngay_bat_dau: '', ngay_ket_thuc: '' });
        await loadGoiData();
        // Truyền dữ liệu đã cập nhật cho component cha
        if (onDataUpdated && response.data) {
          onDataUpdated(response.data);
        }
      } else {
        alert('Lỗi khi cập nhật thời gian: ' + response.message);
      }
    } catch (error) {
      console.error('Error updating goi time:', error);
      alert('Lỗi khi cập nhật thời gian gói dịch vụ');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExtendGoi = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.extendGoiForThietBi(maThietBi, parseInt(extendForm.so_thang_gia_han));
      if (response.success) {
        alert('Gia hạn gói dịch vụ thành công!');
        setShowExtendForm(false);
        setExtendForm({ so_thang_gia_han: '' });
        await loadGoiData();
        // Truyền dữ liệu đã cập nhật cho component cha
        if (onDataUpdated && response.data) {
          onDataUpdated(response.data);
        }
      } else {
        alert('Lỗi khi gia hạn gói: ' + response.message);
      }
    } catch (error) {
      console.error('Error extending goi:', error);
      alert('Lỗi khi gia hạn gói dịch vụ');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Chưa có';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getStatusBadge = (trangThai) => {
    switch (trangThai) {
      case 'DANG_HOAT_DONG':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">Đang hoạt động</span>;
      case 'HET_HAN':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">Hết hạn</span>;
      case 'HUY':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800">Đã hủy</span>;
      default:
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800">Không xác định</span>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Quản lý gói dịch vụ thiết bị</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

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

        {/* Active Package */}
        {activeGoi && (
          <div className="mb-8 bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-green-900">Gói đang hoạt động</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setTimeForm({
                      ngay_bat_dau: activeGoi.ngay_bat_dau ? activeGoi.ngay_bat_dau.split('T')[0] : '',
                      ngay_ket_thuc: activeGoi.ngay_ket_thuc ? activeGoi.ngay_ket_thuc.split('T')[0] : ''
                    });
                    setShowTimeForm(true);
                  }}
                  className="px-3 py-1 rounded text-sm"
                  style={{ backgroundColor: '#3b82f6', color: '#ffffff' }}
                  onMouseEnter={(e) => { e.target.style.backgroundColor = '#2563eb'; }}
                  onMouseLeave={(e) => { e.target.style.backgroundColor = '#3b82f6'; }}
                >
                  Sửa thời gian
                </button>
                <button
                  onClick={() => setShowExtendForm(true)}
                  className="px-3 py-1 rounded text-sm"
                  style={{ backgroundColor: '#f97316', color: '#ffffff' }}
                  onMouseEnter={(e) => { e.target.style.backgroundColor = '#ea580c'; }}
                  onMouseLeave={(e) => { e.target.style.backgroundColor = '#f97316'; }}
                >
                  Gia hạn
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Tên gói:</p>
                <p className="font-semibold text-green-900">
                  {activeGoi.thongTinGoi && activeGoi.thong_tin_goi_id ? activeGoi.thongTinGoi.ten : 'Gói đã bị xóa'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Giá:</p>
                <p className="font-semibold text-green-900">
                  {activeGoi.thongTinGoi && activeGoi.thong_tin_goi_id ? formatPrice(activeGoi.thongTinGoi.gia) : 'Không xác định'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ngày bắt đầu:</p>
                <p className="font-semibold text-green-900">{formatDate(activeGoi.ngay_bat_dau)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ngày kết thúc:</p>
                <p className="font-semibold text-green-900">{formatDate(activeGoi.ngay_ket_thuc)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Package History */}
        <div className="mb-6">
          <h4 className="text-lg font-bold text-gray-900 mb-4">Lịch sử gói dịch vụ</h4>
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tên gói</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Giá</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Ngày bắt đầu</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Ngày kết thúc</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {goiList.map((goi) => (
                  <tr key={goi.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">
                        {goi.thongTinGoi && goi.thong_tin_goi_id ? goi.thongTinGoi.ten : 'Gói đã bị xóa'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {goi.thongTinGoi && goi.thong_tin_goi_id ? goi.thongTinGoi.mo_ta : 'Thông tin gói không còn khả dụng'}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatPrice(goi.gia)}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatDate(goi.ngay_bat_dau)}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{formatDate(goi.ngay_ket_thuc)}</td>
                    <td className="px-4 py-3 text-center">{getStatusBadge(goi.trang_thai)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Time Update Form */}
        {showTimeForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h4 className="text-lg font-semibold mb-4">Cập nhật thời gian gói dịch vụ</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ngày bắt đầu</label>
                  <input
                    type="date"
                    value={timeForm.ngay_bat_dau}
                    onChange={(e) => setTimeForm({...timeForm, ngay_bat_dau: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ngày kết thúc</label>
                  <input
                    type="date"
                    value={timeForm.ngay_ket_thuc}
                    onChange={(e) => setTimeForm({...timeForm, ngay_ket_thuc: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowTimeForm(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  onClick={handleUpdateTime}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-lg disabled:opacity-50"
                  style={{ backgroundColor: '#3b82f6', color: '#ffffff' }}
                  onMouseEnter={(e) => { if (!e.target.disabled) e.target.style.backgroundColor = '#2563eb'; }}
                  onMouseLeave={(e) => { if (!e.target.disabled) e.target.style.backgroundColor = '#3b82f6'; }}
                >
                  {isLoading ? 'Đang cập nhật...' : 'Cập nhật'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Extend Form */}
        {showExtendForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h4 className="text-lg font-semibold mb-4">Gia hạn gói dịch vụ</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số tháng gia hạn</label>
                  <input
                    type="number"
                    min="1"
                    value={extendForm.so_thang_gia_han}
                    onChange={(e) => setExtendForm({...extendForm, so_thang_gia_han: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập số tháng gia hạn"
                  />
                </div>
                {activeGoi && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Ngày kết thúc hiện tại:</strong> {formatDate(activeGoi.ngay_ket_thuc)}
                    </p>
                    <p className="text-sm text-blue-800">
                      <strong>Ngày kết thúc sau gia hạn:</strong> {
                        extendForm.so_thang_gia_han ? 
                        formatDate(new Date(new Date(activeGoi.ngay_ket_thuc).setMonth(new Date(activeGoi.ngay_ket_thuc).getMonth() + parseInt(extendForm.so_thang_gia_han)))) :
                        'Chưa nhập số tháng'
                      }
                    </p>
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowExtendForm(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  onClick={handleExtendGoi}
                  disabled={isLoading || !extendForm.so_thang_gia_han}
                  className="px-4 py-2 rounded-lg disabled:opacity-50"
                  style={{ backgroundColor: '#f97316', color: '#ffffff' }}
                  onMouseEnter={(e) => { if (!e.target.disabled) e.target.style.backgroundColor = '#ea580c'; }}
                  onMouseLeave={(e) => { if (!e.target.disabled) e.target.style.backgroundColor = '#f97316'; }}
                >
                  {isLoading ? 'Đang gia hạn...' : 'Gia hạn'}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg"
            style={{ backgroundColor: '#6b7280', color: '#ffffff' }}
            onMouseEnter={(e) => { e.target.style.backgroundColor = '#525866'; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = '#6b7280'; }}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoiManagement;
