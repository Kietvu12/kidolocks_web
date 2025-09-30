import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Filter, 
  User, 
  Users, 
  Smartphone, 
  X, 
  ChevronDown,
  ChevronUp,
  Calendar,
  Shield,
  GraduationCap,
  School,
  Laptop,
  Monitor,
  Tablet,
  Phone
} from 'lucide-react';

// SearchableInput component with suggestions
const SearchableInput = ({ 
  value, 
  onChange, 
  placeholder, 
  suggestions = [], 
  className = "",
  icon: Icon = Search 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (value) {
      const filtered = suggestions.filter(item => 
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions(suggestions);
    }
  }, [value, suggestions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          inputRef.current && !inputRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
    setIsOpen(true);
  };

  const handleSuggestionClick = (suggestion) => {
    onChange(suggestion);
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className={`w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
          placeholder={placeholder}
        />
      </div>
      
      {isOpen && filteredSuggestions.length > 0 && (
        <div 
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 cursor-pointer text-sm border-b last:border-b-0"
              style={{
                color: '#374151',
                borderBottomColor: '#f3f4f6'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#dbeafe';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const FilterSystem = ({ 
  onFilterChange, 
  phuHuynhList = [], 
  treEmList = [], 
  thietBiList = [],
  goiList = [],
  currentFilters = {}
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    // Phụ huynh filters
    phuHuynh: {
      ten: '',
      email: '',
      sdt: '',
      loaiTaiKhoan: ''
    },
    // Trẻ em filters
    treEm: {
      ten: '',
      lop: '',
      truong: ''
    },
    // Thiết bị filters
    thietBi: {
      maThietBi: '',
      tenThietBi: '',
      loaiThietBi: '',
      goiDichVu: ''
    }
  });

  // Generate suggestions from data
  const getSuggestions = (type, field) => {
    switch (type) {
      case 'phuHuynh':
        switch (field) {
          case 'ten':
            return [...new Set(phuHuynhList.map(p => p.ten_phu_huynh).filter(Boolean))];
          case 'email':
            return [...new Set(phuHuynhList.map(p => p.email_phu_huynh).filter(Boolean))];
          case 'sdt':
            return [...new Set(phuHuynhList.map(p => p.sdt).filter(Boolean))];
          default:
            return [];
        }
      case 'treEm':
        switch (field) {
          case 'ten':
            return [...new Set(treEmList.map(t => t.ten_tre).filter(Boolean))];
          case 'truong':
            return [...new Set(treEmList.map(t => t.truong).filter(Boolean))];
          default:
            return [];
        }
      case 'thietBi':
        switch (field) {
          case 'maThietBi':
            return [...new Set(thietBiList.map(t => t.ma_thiet_bi).filter(Boolean))];
          case 'tenThietBi':
            return [...new Set(thietBiList.map(t => t.ten_thiet_bi).filter(Boolean))];
          default:
            return [];
        }
      default:
        return [];
    }
  };

  const handleFilterChange = (category, field, value) => {
    const newFilters = {
      ...filters,
      [category]: {
        ...filters[category],
        [field]: value
      }
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      phuHuynh: { ten: '', email: '', sdt: '', loaiTaiKhoan: '' },
      treEm: { ten: '', lop: '', truong: '' },
      thietBi: { maThietBi: '', tenThietBi: '', loaiThietBi: '', goiDichVu: '' }
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const hasActiveFilters = () => {
    return Object.values(filters).some(category => 
      Object.values(category).some(value => value !== '')
    );
  };

  const getFilterCount = () => {
    let count = 0;
    Object.values(filters).forEach(category => {
      Object.values(category).forEach(value => {
        if (value !== '') count++;
      });
    });
    return count;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-6">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: '#dbeafe' }}>
              <Filter className="w-5 h-5" style={{ color: '#2563eb' }} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Bộ lọc & Tìm kiếm</h3>
              <p className="text-sm text-gray-500">Lọc dữ liệu theo nhiều tiêu chí</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {hasActiveFilters() && (
              <button
                onClick={clearFilters}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors font-medium shadow-md hover:shadow-lg"
                style={{
                  backgroundColor: '#dc2626',
                  color: '#ffffff'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#b91c1c';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#dc2626';
                }}
              >
                <X className="w-4 h-4" />
                <span>Xóa bộ lọc</span>
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors"
              style={{
                backgroundColor: '#2563eb',
                color: '#ffffff'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1d4ed8';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#2563eb';
              }}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              <span>{isExpanded ? 'Thu gọn' : 'Mở rộng'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Content */}
      {isExpanded && (
        <div className="p-6 space-y-6">
          {/* Phụ huynh Filters */}
          <div className="rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" >
                <User className="w-5 h-5" style={{ color: '#ffffff' }} />
              </div>
              <h4 className="text-xl font-bold text-blue-900">Lọc theo Phụ huynh</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Tên phụ huynh</label>
                <SearchableInput
                  value={filters.phuHuynh.ten}
                  onChange={(value) => handleFilterChange('phuHuynh', 'ten', value)}
                  placeholder="Nhập tên phụ huynh..."
                  suggestions={getSuggestions('phuHuynh', 'ten')}
                  className="shadow-md"
                  style={{ backgroundColor: '#ffffff' }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Email</label>
                <SearchableInput
                  value={filters.phuHuynh.email}
                  onChange={(value) => handleFilterChange('phuHuynh', 'email', value)}
                  placeholder="Nhập email..."
                  suggestions={getSuggestions('phuHuynh', 'email')}
                  className="shadow-md"
                  style={{ backgroundColor: '#ffffff' }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Số điện thoại</label>
                <SearchableInput
                  value={filters.phuHuynh.sdt}
                  onChange={(value) => handleFilterChange('phuHuynh', 'sdt', value)}
                  placeholder="Nhập số điện thoại..."
                  suggestions={getSuggestions('phuHuynh', 'sdt')}
                  className="shadow-md"
                  style={{ backgroundColor: '#ffffff' }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Loại tài khoản</label>
                <select
                  value={filters.phuHuynh.loaiTaiKhoan}
                  onChange={(e) => handleFilterChange('phuHuynh', 'loaiTaiKhoan', e.target.value)}
                  className="w-full px-4 py-3 border-1 rounded-lg focus:ring-2 shadow-md font-medium"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#93c5fd';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="">Tất cả</option>
                  <option value="Free">Free</option>
                  <option value="Premium">Premium</option>
                </select>
              </div>
            </div>
          </div>

          {/* Trẻ em Filters */}
          <div className="rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5" style={{ color: '#ffffff' }} />
              </div>
              <h4 className="text-xl font-bold text-green-900">Lọc theo Trẻ em</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Tên trẻ em</label>
                <SearchableInput
                  value={filters.treEm.ten}
                  onChange={(value) => handleFilterChange('treEm', 'ten', value)}
                  placeholder="Nhập tên trẻ em..."
                  suggestions={getSuggestions('treEm', 'ten')}
                  className="shadow-md"
                  style={{ backgroundColor: '#ffffff' }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Lớp</label>
                <select
                  value={filters.treEm.lop}
                  onChange={(e) => handleFilterChange('treEm', 'lop', e.target.value)}
                  className="w-full px-4 py-3 border-1 rounded-lg focus:ring-2 shadow-md font-medium"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#22c55e';
                    e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#86efac';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="">Tất cả</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(lop => (
                    <option key={lop} value={lop}>{lop}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Trường</label>
                <select
                  value={filters.treEm.truong}
                  onChange={(e) => handleFilterChange('treEm', 'truong', e.target.value)}
                  className="w-full px-4 py-3 border-1 rounded-lg focus:ring-2 shadow-md font-medium" 
                  onFocus={(e) => {
                    e.target.style.borderColor = '#22c55e';
                    e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#86efac';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="">Tất cả</option>
                  <option value="Mầm non">Mầm non</option>
                  <option value="Tiểu học">Tiểu học</option>
                  <option value="Trung học">Trung học</option>
                  <option value="Phổ thông">Phổ thông</option>
                  <option value="Đại học">Đại học</option>
                </select>
              </div>
            </div>
          </div>

          {/* Thiết bị Filters */}
          <div className="rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <Smartphone className="w-5 h-5" style={{ color: '#ffffff' }} />
              </div>
              <h4 className="text-xl font-bold text-purple-900">Lọc theo Thiết bị</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Mã thiết bị</label>
                <SearchableInput
                  value={filters.thietBi.maThietBi}
                  onChange={(value) => handleFilterChange('thietBi', 'maThietBi', value)}
                  placeholder="Nhập mã thiết bị..."
                  suggestions={getSuggestions('thietBi', 'maThietBi')}
                  className="shadow-md"
                  style={{ backgroundColor: '#ffffff' }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Tên thiết bị</label>
                <SearchableInput
                  value={filters.thietBi.tenThietBi}
                  onChange={(value) => handleFilterChange('thietBi', 'tenThietBi', value)}
                  placeholder="Nhập tên thiết bị..."
                  suggestions={getSuggestions('thietBi', 'tenThietBi')}
                  className="shadow-md"
                  style={{ backgroundColor: '#ffffff' }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Loại thiết bị</label>
                <select
                  value={filters.thietBi.loaiThietBi}
                  onChange={(e) => handleFilterChange('thietBi', 'loaiThietBi', e.target.value)}
                  className="w-full px-4 py-3 border-1 rounded-lg focus:ring-2 shadow-md font-medium"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#8b5cf6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#c4b5fd';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="">Tất cả</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Desktop">Desktop</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Tablet">Tablet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Gói dịch vụ</label>
                <select
                  value={filters.thietBi.goiDichVu}
                  onChange={(e) => handleFilterChange('thietBi', 'goiDichVu', e.target.value)}
                  className="w-full px-4 py-3 border-1 rounded-lg focus:ring-2 shadow-md font-medium"
                  onFocus={(e) => {
                    e.target.style.borderColor = '#8b5cf6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#c4b5fd';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="">Tất cả</option>
                  <option value="CHUA_CO_GOI">Chưa có gói</option>
                  {goiList.map((goi) => (
                    <option key={goi.id} value={goi.ten}>
                      {goi.ten} - {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(goi.gia)} ({goi.loai_goi === 'TRA_PHI' ? 'Trả phí' : 'Miễn phí'})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSystem;
