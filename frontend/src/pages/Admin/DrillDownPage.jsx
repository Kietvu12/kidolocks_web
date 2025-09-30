import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/api';

const DrillDownPage = () => {
  const [currentView, setCurrentView] = useState('phu-huynh'); // phu-huynh, tre-em, thiet-bi
  const [selectedPhuHuynh, setSelectedPhuHuynh] = useState(null);
  const [selectedTreEm, setSelectedTreEm] = useState(null);
  const [phuHuynhList, setPhuHuynhList] = useState([]);
  const [treEmList, setTreEmList] = useState([]);
  const [thietBiList, setThietBiList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

  const loadTreEmList = async (phuHuynhId) => {
    try {
      setIsLoading(true);
      const response = await apiService.getTreEmByPhuHuynh(phuHuynhId);
      if (response.success) {
        setTreEmList(response.data);
      }
    } catch (error) {
      console.error('Error loading tre em list:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadThietBiList = async (treEmId) => {
    try {
      setIsLoading(true);
      const response = await apiService.getThietBiByTreEm(treEmId);
      if (response.success) {
        setThietBiList(response.data);
      }
    } catch (error) {
      console.error('Error loading thiet bi list:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhuHuynhClick = (phuHuynh) => {
    setSelectedPhuHuynh(phuHuynh);
    setSelectedTreEm(null);
    setThietBiList([]);
    setCurrentView('tre-em');
    loadTreEmList(phuHuynh.ma_phu_huynh);
  };

  const handleTreEmClick = (treEm) => {
    setSelectedTreEm(treEm);
    setThietBiList([]);
    setCurrentView('thiet-bi');
    loadThietBiList(treEm.ma_tre_em);
  };

  const handleBackToPhuHuynh = () => {
    setCurrentView('phu-huynh');
    setSelectedPhuHuynh(null);
    setSelectedTreEm(null);
    setTreEmList([]);
    setThietBiList([]);
  };

  const handleBackToTreEm = () => {
    setCurrentView('tre-em');
    setSelectedTreEm(null);
    setThietBiList([]);
  };

  const getActiveGoi = (thietBi) => {
    if (thietBi.goiDichVuList && thietBi.goiDichVuList.length > 0) {
      return thietBi.goiDichVuList.find(goi => goi.trang_thai === 'DANG_HOAT_DONG');
    }
    return null;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const Breadcrumb = () => (
    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <button
        onClick={handleBackToPhuHuynh}
        className="hover:text-blue-600 transition-colors"
      >
        Phụ huynh
      </button>
      {selectedPhuHuynh && (
        <>
          <span>›</span>
          <button
            onClick={handleBackToTreEm}
            className="hover:text-blue-600 transition-colors"
          >
            {selectedPhuHuynh.ten_phu_huynh || selectedPhuHuynh.email_phu_huynh}
          </button>
        </>
      )}
      {selectedTreEm && (
        <>
          <span>›</span>
          <span className="text-gray-900 font-medium">{selectedTreEm.ten_tre}</span>
        </>
      )}
    </div>
  );

  const PhuHuynhView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Danh sách phụ huynh</h2>
        <button
          onClick={() => navigate('/admin')}
          className="text-gray-600 hover:text-gray-900"
        >
          ← Quay lại Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        ) : phuHuynhList.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            Không có dữ liệu
          </div>
        ) : (
          phuHuynhList.map((phuHuynh) => (
            <motion.div
              key={phuHuynh.ma_phu_huynh}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handlePhuHuynhClick(phuHuynh)}
              className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all border-l-4 border-blue-500"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">👨‍👩‍👧‍👦</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {phuHuynh.ten_phu_huynh || 'Chưa cập nhật'}
                  </h3>
                  <p className="text-sm text-gray-600">{phuHuynh.email_phu_huynh}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Số trẻ em:</span>
                  <span className="font-medium text-green-600">
                    {phuHuynh.treEmList?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Số điện thoại:</span>
                  <span className="font-medium">{phuHuynh.sdt || 'Chưa cập nhật'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ngày tạo:</span>
                  <span className="font-medium">
                    {new Date(phuHuynh.ngay_tao).toLocaleDateString('vi-VN')}
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Click để xem trẻ em
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );

  const TreEmView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Trẻ em của {selectedPhuHuynh?.ten_phu_huynh || selectedPhuHuynh?.email_phu_huynh}
        </h2>
        <button
          onClick={handleBackToPhuHuynh}
          className="text-gray-600 hover:text-gray-900"
        >
          ← Quay lại
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          </div>
        ) : treEmList.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            Không có trẻ em
          </div>
        ) : (
          treEmList.map((treEm) => (
            <motion.div
              key={treEm.ma_tre_em}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleTreEmClick(treEm)}
              className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all border-l-4 border-green-500"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">👶</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{treEm.ten_tre}</h3>
                  <p className="text-sm text-gray-600">
                    {treEm.lop ? `Lớp ${treEm.lop}` : 'Chưa cập nhật lớp'}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Giới tính:</span>
                  <span className={`font-medium ${
                    treEm.gioi_tinh === 'Nam' ? 'text-blue-600' :
                    treEm.gioi_tinh === 'Nữ' ? 'text-pink-600' :
                    'text-gray-600'
                  }`}>
                    {treEm.gioi_tinh}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Trường:</span>
                  <span className="font-medium">{treEm.truong || 'Chưa cập nhật'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Số thiết bị:</span>
                  <span className="font-medium text-purple-600">
                    {treEm.thietBiList?.length || 0}
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Click để xem thiết bị
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );

  const ThietBiView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Thiết bị của {selectedTreEm?.ten_tre}
        </h2>
        <button
          onClick={handleBackToTreEm}
          className="text-gray-600 hover:text-gray-900"
        >
          ← Quay lại
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          </div>
        ) : thietBiList.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            Không có thiết bị
          </div>
        ) : (
          thietBiList.map((thietBi) => {
            const activeGoi = getActiveGoi(thietBi);
            return (
              <motion.div
                key={thietBi.nguoi_dung_id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl">💻</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {thietBi.ten_thiet_bi || 'Chưa đặt tên'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {thietBi.loai_thiet_bi || 'Chưa xác định'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Mã thiết bị:</span>
                    <span className="font-medium font-mono text-xs">
                      {thietBi.ma_thiet_bi || 'Chưa có'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Gói đang dùng:</span>
                    {activeGoi ? (
                      <span className="font-medium text-green-600">
                        {activeGoi.thongTinGoi?.ten}
                      </span>
                    ) : (
                      <span className="font-medium text-red-600">Chưa có gói</span>
                    )}
                  </div>

                  {activeGoi && (
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Giá:</span>
                          <span className="font-medium text-green-700">
                            {formatPrice(activeGoi.thongTinGoi?.gia)}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Loại:</span>
                          <span className="font-medium text-green-700">
                            {activeGoi.thongTinGoi?.loai_goi === 'TRA_PHI' ? 'Trả phí' : 'Miễn phí'}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Thời hạn:</span>
                          <span className="font-medium text-green-700">
                            {activeGoi.thongTinGoi?.thoi_han_thang} tháng
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Ngày bắt đầu:</span>
                          <span className="font-medium text-green-700">
                            {new Date(activeGoi.ngay_bat_dau).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Ngày kết thúc:</span>
                          <span className="font-medium text-green-700">
                            {new Date(activeGoi.ngay_ket_thuc).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Ngày tạo:</span>
                    <span className="font-medium">
                      {new Date(thietBi.ngay_tao).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        // TODO: Implement edit functionality
                        alert('Chức năng sửa thiết bị đang được phát triển');
                      }}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-3 rounded-lg transition-colors"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => {
                        // TODO: Implement change package functionality
                        alert('Chức năng đổi gói đang được phát triển');
                      }}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-sm py-2 px-3 rounded-lg transition-colors"
                    >
                      Đổi gói
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Bạn có chắc chắn muốn xóa thiết bị này?')) {
                          // TODO: Implement delete functionality
                          alert('Chức năng xóa thiết bị đang được phát triển');
                        }
                      }}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-3 rounded-lg transition-colors"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <h1 className="text-2xl font-bold text-gray-900">Quản lý hệ thống</h1>
            <p className="text-gray-600">Drill-down: Phụ huynh → Trẻ em → Thiết bị + Gói</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />
        
        {currentView === 'phu-huynh' && <PhuHuynhView />}
        {currentView === 'tre-em' && <TreEmView />}
        {currentView === 'thiet-bi' && <ThietBiView />}
      </div>
    </div>
  );
};

export default DrillDownPage;
