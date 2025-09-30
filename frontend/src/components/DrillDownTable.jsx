import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import apiService from '../services/api';

const DrillDownTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, has-device, no-device, has-package, no-package

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await apiService.getDrillDownData();
      if (response.success) {
        setData(response.data);
      } else {
        setError('Không thể tải dữ liệu');
      }
    } catch (error) {
      console.error('Error loading drill-down data:', error);
      setError('Lỗi khi tải dữ liệu');
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getStatusBadge = (row) => {
    if (!row.thietBiId) {
      return <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">Chưa có thiết bị</span>;
    }
    if (!row.goiActive) {
      return <span className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded-full">Chưa có gói</span>;
    }
    return <span className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded-full">Đang hoạt động</span>;
  };

  const filteredData = data.filter(row => {
    const matchesSearch = 
      row.phuHuynhTen.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.treEmTen.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.thietBiTen.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (row.goiActive?.ten && row.goiActive.ten.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter = (() => {
      switch (filterStatus) {
        case 'has-device':
          return row.thietBiId !== null;
        case 'no-device':
          return row.thietBiId === null;
        case 'has-package':
          return row.goiActive !== null;
        case 'no-package':
          return row.goiActive === null && row.thietBiId !== null;
        default:
          return true;
      }
    })();

    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <span className="ml-4 text-gray-600">Đang tải dữ liệu...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Lỗi tải dữ liệu</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadData}
            className="px-4 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: '#3b82f6', color: '#ffffff' }}
            onMouseEnter={(e) => { e.target.style.backgroundColor = '#2563eb'; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = '#3b82f6'; }}
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Drill-down View</h2>
            <p className="text-blue-100 mt-1">Phụ huynh → Trẻ em → Thiết bị + Gói</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{filteredData.length}</div>
            <div className="text-blue-100 text-sm">Tổng số bản ghi</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên phụ huynh, trẻ em, thiết bị hoặc gói..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="sm:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tất cả</option>
              <option value="has-device">Có thiết bị</option>
              <option value="no-device">Chưa có thiết bị</option>
              <option value="has-package">Có gói hoạt động</option>
              <option value="no-package">Chưa có gói</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phụ huynh
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trẻ em
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thiết bị
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gói dịch vụ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                  <div className="text-4xl mb-4">📊</div>
                  <p>Không có dữ liệu phù hợp</p>
                </td>
              </tr>
            ) : (
              filteredData.map((row, index) => (
                <motion.tr
                  key={`${row.phuHuynhId}-${row.treEmId}-${row.thietBiId || 'no-device'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Phụ huynh */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-semibold">
                          {row.phuHuynhTen.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {row.phuHuynhTen}
                        </div>
                        <div className="text-sm text-gray-500">
                          {row.phuHuynhEmail}
                        </div>
                        <div className="text-xs text-gray-400">
                          {row.phuHuynhSdt}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Trẻ em */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-600 text-sm">👶</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {row.treEmTen}
                        </div>
                        <div className="text-sm text-gray-500">
                          {row.treEmLop} • {row.treEmGioiTinh}
                        </div>
                        <div className="text-xs text-gray-400">
                          {row.treEmTruong}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Thiết bị */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-purple-600 text-sm">💻</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {row.thietBiTen}
                        </div>
                        <div className="text-sm text-gray-500">
                          {row.thietBiLoai}
                        </div>
                        <div className="text-xs text-gray-400 font-mono">
                          {row.thietBiMa}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Gói dịch vụ */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {row.goiActive ? (
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-sm font-medium text-green-900">
                          {row.goiActive.ten}
                        </div>
                        <div className="text-sm text-green-700">
                          {formatPrice(row.goiActive.gia)}
                        </div>
                        <div className="text-xs text-green-600">
                          {row.goiActive.loaiGoi === 'TRA_PHI' ? 'Trả phí' : 'Miễn phí'} • 
                          {row.goiActive.thoiHan} tháng
                        </div>
                        <div className="text-xs text-green-500">
                          {formatDate(row.goiActive.ngayBatDau)} - {formatDate(row.goiActive.ngayKetThuc)}
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500 italic">
                        Chưa có gói
                      </div>
                    )}
                  </td>

                  {/* Trạng thái */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(row)}
                  </td>

                  {/* Thao tác */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {row.thietBiId && (
                        <>
                          <button
                            onClick={() => {
                              // TODO: Implement edit functionality
                              alert('Chức năng sửa thiết bị đang được phát triển');
                            }}
                            className="text-blue-600 hover:text-blue-900 transition-colors"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => {
                              // TODO: Implement change package functionality
                              alert('Chức năng đổi gói đang được phát triển');
                            }}
                            className="text-orange-600 hover:text-orange-900 transition-colors"
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
                            className="text-red-600 hover:text-red-900 transition-colors"
                          >
                            Xóa
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div>
            Hiển thị {filteredData.length} trong tổng số {data.length} bản ghi
          </div>
          <div>
            Cập nhật lần cuối: {new Date().toLocaleString('vi-VN')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrillDownTable;
