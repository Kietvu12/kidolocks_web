import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  ChevronDown, 
  ChevronUp,
  User,
  Users,
  Smartphone,
  Star,
  Shield,
  Calendar,
  Package,
  Search,
  X,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Check
} from 'lucide-react';
import apiService from '../services/api';
import GoiManagement from './GoiManagement';
import FilterSystem from './FilterSystem';
import { applyFilters, getFilterStats } from '../utils/filterUtils';

// SearchableInput Component
const SearchableInput = ({ 
  value, 
  onChange, 
  placeholder, 
  options = [], 
  className = "",
  onFocus,
  onBlur
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (value && value.trim() !== '') {
      const filtered = options.filter(option => 
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [value, options]);

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

  const handleInputFocus = () => {
    setIsOpen(true);
    if (onFocus) onFocus();
  };

  const handleInputBlur = () => {
    // Delay để cho phép click vào option
    setTimeout(() => {
      setIsOpen(false);
      if (onBlur) onBlur();
    }, 150);
  };

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
        placeholder={placeholder}
        autoComplete="off"
      />
      
      <AnimatePresence>
        {isOpen && filteredOptions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
          >
            {filteredOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionClick(option)}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between transition-colors"
              >
                <span className="text-sm" style={{color: '#374151'}}>{option}</span>
                {value === option && (
                  <Check className="w-4 h-4" style={{color: '#3b82f6'}} />
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MultiLevelDropdown = () => {
  const [phuHuynhList, setPhuHuynhList] = useState([]);
  const [treEmList, setTreEmList] = useState([]);
  const [thietBiList, setThietBiList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Pop-up states
  const [showTreEmPopup, setShowTreEmPopup] = useState(false);
  const [showThietBiPopup, setShowThietBiPopup] = useState(false);
  const [selectedPhuHuynhForPopup, setSelectedPhuHuynhForPopup] = useState(null);
  const [selectedTreEmForPopup, setSelectedTreEmForPopup] = useState(null);
  
  // New states for table view
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [selectedPhuHuynh, setSelectedPhuHuynh] = useState(null);
  const [showPassword, setShowPassword] = useState({});
  
  // Password form states
  const [showPasswordInForm, setShowPasswordInForm] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
  });
  
  // Goi management states
  const [showGoiManagement, setShowGoiManagement] = useState(false);
  const [selectedThietBiForGoi, setSelectedThietBiForGoi] = useState(null);
  
  // Separate filter states for each level
  const [phuHuynhFilters, setPhuHuynhFilters] = useState({ ten: '', email: '', sdt: '', loaiTaiKhoan: '', vaiTro: '' });
  const [treEmFilters, setTreEmFilters] = useState({ ten: '', lop: '', truong: '', gioiTinh: '' });
  const [thietBiFilters, setThietBiFilters] = useState({ maThietBi: '', tenThietBi: '', loaiThietBi: '', goiDichVu: '' });
  
  // Filter visibility states for mobile
  const [showPhuHuynhFilters, setShowPhuHuynhFilters] = useState(false);
  const [showTreEmFilters, setShowTreEmFilters] = useState(false);
  const [showThietBiFilters, setShowThietBiFilters] = useState(false);
  
  // Pagination states
  const [phuHuynhPagination, setPhuHuynhPagination] = useState({ currentPage: 1, itemsPerPage: 10 });
  const [treEmPagination, setTreEmPagination] = useState({ currentPage: 1, itemsPerPage: 10 });
  const [thietBiPagination, setThietBiPagination] = useState({ currentPage: 1, itemsPerPage: 10 });

  // Pagination logic
  const getPaginatedData = (data, pagination) => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const getTotalPages = (data, itemsPerPage) => {
    return Math.ceil(data.length / itemsPerPage);
  };
  
  const [filteredPhuHuynhList, setFilteredPhuHuynhList] = useState([]);
  const [filteredTreEmList, setFilteredTreEmList] = useState([]);
  const [filteredThietBiList, setFilteredThietBiList] = useState([]);

  // Form states
  const [showPhuHuynhForm, setShowPhuHuynhForm] = useState(false);
  const [showTreEmForm, setShowTreEmForm] = useState(false);
  const [showThietBiForm, setShowThietBiForm] = useState(false);
  const [showChangePackageForm, setShowChangePackageForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedThietBi, setSelectedThietBi] = useState(null);
  const [goiList, setGoiList] = useState([]);
  const [phoneError, setPhoneError] = useState('');
  const [thietBiError, setThietBiError] = useState('');
  const [thietBiSuccess, setThietBiSuccess] = useState('');

  // Wallet states
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [selectedPhuHuynhForWallet, setSelectedPhuHuynhForWallet] = useState(null);
  const [walletPackages, setWalletPackages] = useState([]);
  const [isLoadingWallet, setIsLoadingWallet] = useState(false);
  const [walletError, setWalletError] = useState('');
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [selectedPackageForAssign, setSelectedPackageForAssign] = useState(null);
  const [assignDeviceCode, setAssignDeviceCode] = useState('');

  // Form data
  const [phuHuynhForm, setPhuHuynhForm] = useState({
    ten_phu_huynh: '',
    email_phu_huynh: '',
    sdt: '',
    dia_chi: '',
    mat_khau: ''
  });

  const [treEmForm, setTreEmForm] = useState({
    ten_tre: '',
    lop: '',
    gioi_tinh: '',
    truong: '',
    ngay_sinh: ''
  });

  const [thietBiForm, setThietBiForm] = useState({
    ten_thiet_bi: '',
    loai_thiet_bi: '',
    ma_thiet_bi: ''
  });

  const [changePackageForm, setChangePackageForm] = useState({
    selectedGoiId: ''
  });

  useEffect(() => {
    loadPhuHuynhList();
    loadGoiList();
    loadAvailableRoles();
  }, []);

  // Role management states
  const [availableRoles, setAvailableRoles] = useState(['admin', 'user']);
  const [isUpdatingRoleByUserId, setIsUpdatingRoleByUserId] = useState({});

  const loadAvailableRoles = async () => {
    try {
      const res = await apiService.getAvailableRoles();
      if (res && res.success && Array.isArray(res.data)) {
        setAvailableRoles(res.data);
      }
    } catch (error) {
      // keep default roles on error
    }
  };

  const handleChangeUserRole = async (phuHuynhId, role) => {
    try {
      setIsUpdatingRoleByUserId(prev => ({ ...prev, [phuHuynhId]: true }));
      const res = await apiService.updateUserRole(phuHuynhId, role);
      if (res && res.success) {
        await loadPhuHuynhList();
      } else if (res && res.message) {
        alert(res.message);
      }
    } catch (error) {
      const msg = error?.response?.data?.message || error.message || 'Lỗi khi cập nhật vai trò';
      alert(msg);
    } finally {
      setIsUpdatingRoleByUserId(prev => ({ ...prev, [phuHuynhId]: false }));
    }
  };

  // Password validation functions
  const validatePasswordRequirements = (password) => {
    setPasswordRequirements({
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    });
  };

  const isPasswordValid = () => {
    return Object.values(passwordRequirements).every(requirement => requirement);
  };

  const RequirementItem = ({ met, text }) => (
    <div className={`flex items-center space-x-2 text-sm ${met ? 'text-green-600' : 'text-gray-500'}`}>
      {met ? (
        <CheckCircle className="h-4 w-4" />
      ) : (
        <XCircle className="h-4 w-4" />
      )}
      <span>{text}</span>
    </div>
  );

  // Apply filters for phu huynh
  useEffect(() => {
    const filtered = filterPhuHuynhSimple(phuHuynhList, phuHuynhFilters);
    console.log('Phu huynh filter:', { 
      original: phuHuynhList.length, 
      filtered: filtered.length, 
      filters: phuHuynhFilters 
    });
    setFilteredPhuHuynhList(filtered);
  }, [phuHuynhList, phuHuynhFilters]);

  // Apply filters for tre em
  useEffect(() => {
    const filtered = filterTreEmSimple(treEmList, treEmFilters);
    console.log('Tre em filter:', { 
      original: treEmList.length, 
      filtered: filtered.length, 
      filters: treEmFilters 
    });
    setFilteredTreEmList(filtered);
  }, [treEmList, treEmFilters]);

  // Apply filters for thiet bi
  useEffect(() => {
    const filtered = filterThietBiSimple(thietBiList, thietBiFilters);
    console.log('Thiet bi filter:', { 
      original: thietBiList.length, 
      filtered: filtered.length, 
      filters: thietBiFilters 
    });
    setFilteredThietBiList(filtered);
  }, [thietBiList, thietBiFilters]);

  const loadGoiList = async () => {
    try {
      console.log('Loading goi list...');
      const response = await apiService.getAllGoi();
      console.log('Goi list response:', response);
      if (response.success) {
        setGoiList(response.data);
        console.log('Goi list loaded:', response.data);
      } else {
        console.error('Failed to load goi list:', response.message);
        setError('Không thể tải danh sách gói dịch vụ');
      }
    } catch (error) {
      console.error('Error loading goi list:', error);
      setError('Lỗi khi tải danh sách gói dịch vụ');
    }
  };

  const openWalletModal = async (phuHuynh) => {
    try {
      setSelectedPhuHuynhForWallet(phuHuynh);
      setShowWalletModal(true);
      setIsLoadingWallet(true);
      setWalletError('');
      const res = await apiService.getUnassignedPackages(phuHuynh.ma_phu_huynh);
      if (res && res.success) {
        setWalletPackages(res.data || []);
      } else {
        setWalletError(res?.message || 'Không thể tải ví gói');
      }
    } catch (error) {
      setWalletError(error?.response?.data?.message || error.message || 'Lỗi khi tải ví gói');
    } finally {
      setIsLoadingWallet(false);
    }
  };

  const closeWalletModal = () => {
    setShowWalletModal(false);
    setSelectedPhuHuynhForWallet(null);
    setWalletPackages([]);
    setShowAssignForm(false);
    setSelectedPackageForAssign(null);
    setAssignDeviceCode('');
  };

  const getParentDeviceCodes = (phuHuynh) => {
    if (!phuHuynh || !phuHuynh.treEmList) return [];
    const codes = [];
    phuHuynh.treEmList.forEach(te => {
      if (te.thietBiList) te.thietBiList.forEach(tb => { if (tb.ma_thiet_bi) codes.push(tb.ma_thiet_bi); });
    });
    return Array.from(new Set(codes));
  };

  const openAssignForm = (pkg) => {
    setSelectedPackageForAssign(pkg);
    setAssignDeviceCode('');
    setShowAssignForm(true);
  };

  const submitAssignPackage = async () => {
    if (!selectedPackageForAssign) return;
    const code = assignDeviceCode.trim();
    if (!code) {
      alert('Vui lòng nhập hoặc chọn mã thiết bị');
      return;
    }
    try {
      setIsLoadingWallet(true);
      const res = await apiService.assignPackageToDevice({
        goi_dich_vu_id: selectedPackageForAssign.id,
        ma_thiet_bi: code
      });
      if (res && res.success) {
        alert('Gán gói cho thiết bị thành công!');
        // refresh wallet list
        const refreshed = await apiService.getUnassignedPackages(selectedPhuHuynhForWallet.ma_phu_huynh);
        setWalletPackages(refreshed?.success ? (refreshed.data || []) : []);
        setShowAssignForm(false);
        setSelectedPackageForAssign(null);
        setAssignDeviceCode('');
        // reload main data to reflect active package if needed
        await loadPhuHuynhList();
      } else {
        alert(res?.message || 'Không thể gán gói');
      }
    } catch (error) {
      alert(error?.response?.data?.message || error.message || 'Lỗi khi gán gói');
    } finally {
      setIsLoadingWallet(false);
    }
  };

  const loadPhuHuynhList = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await apiService.getAllPhuHuynh();
      if (response.success) {
        // Load children and devices for each parent
        const phuHuynhWithData = await Promise.all(
          response.data.map(async (phuHuynh) => {
            try {
              // Load children for this parent
              const treEmResponse = await apiService.getTreEmByPhuHuynh(phuHuynh.ma_phu_huynh);
              const treEmList = treEmResponse.success ? treEmResponse.data : [];
              
              // Load devices for each child
              const treEmWithDevices = await Promise.all(
                treEmList.map(async (treEm) => {
                  try {
                    const thietBiResponse = await apiService.getThietBiByTreEm(treEm.ma_tre_em);
                    const thietBiList = thietBiResponse.success ? thietBiResponse.data : [];
                    return { ...treEm, thietBiList };
                  } catch (error) {
                    console.error(`Error loading devices for child ${treEm.ma_tre_em}:`, error);
                    return { ...treEm, thietBiList: [] };
                  }
                })
              );
              
              return { ...phuHuynh, treEmList: treEmWithDevices };
            } catch (error) {
              console.error(`Error loading data for parent ${phuHuynh.ma_phu_huynh}:`, error);
              return { ...phuHuynh, treEmList: [] };
            }
          })
        );
        
        setPhuHuynhList(phuHuynhWithData);
      }
    } catch (error) {
      console.error('Error loading phu huynh list:', error);
      setError('Lỗi khi tải danh sách phụ huynh');
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
        console.log('Loaded tre em from API:', response.data.length);
      }
    } catch (error) {
      console.error('Error loading tre em list:', error);
      setError('Lỗi khi tải danh sách trẻ em');
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
        console.log('Loaded thiet bi from API:', response.data.length);
      }
    } catch (error) {
      console.error('Error loading thiet bi list:', error);
      setError('Lỗi khi tải danh sách thiết bị');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenTreEmPopup = async (phuHuynh) => {
    setSelectedPhuHuynhForPopup(phuHuynh);
    setTreEmFilters({ ten: '', lop: '', truong: '', gioiTinh: '' });
      
      // Get children from the already loaded data
    if (phuHuynh.treEmList && phuHuynh.treEmList.length > 0) {
        setTreEmList(phuHuynh.treEmList);
      console.log('Loaded tre em from cache:', phuHuynh.treEmList.length);
      } else {
      console.log('Loading tre em from API...');
      await loadTreEmList(phuHuynh.ma_phu_huynh);
    }
    setShowTreEmPopup(true);
  };

  const handleOpenThietBiPopup = async (treEm, phuHuynh) => {
    setSelectedTreEmForPopup(treEm);
    setSelectedPhuHuynhForPopup(phuHuynh);
    setThietBiFilters({ maThietBi: '', tenThietBi: '', loaiThietBi: '', goiDichVu: '' });
    
    // Get devices from the already loaded data
    if (treEm.thietBiList && treEm.thietBiList.length > 0) {
      setThietBiList(treEm.thietBiList);
      console.log('Loaded thiet bi from cache:', treEm.thietBiList.length);
    } else {
      console.log('Loading thiet bi from API...');
      await loadThietBiList(treEm.ma_tre_em);
    }
    setShowThietBiPopup(true);
  };

  const handleCloseTreEmPopup = () => {
    setShowTreEmPopup(false);
    setSelectedPhuHuynhForPopup(null);
    setTreEmList([]);
    setFilteredTreEmList([]);
  };

  const handleCloseThietBiPopup = () => {
    setShowThietBiPopup(false);
    setSelectedTreEmForPopup(null);
    setThietBiList([]);
    setFilteredThietBiList([]);
  };

  // CRUD Operations
  const handleCreatePhuHuynh = async () => {
    // Validation
    if (!phuHuynhForm.ten_phu_huynh.trim()) {
      alert('Vui lòng nhập tên phụ huynh');
      return;
    }
    if (!phuHuynhForm.email_phu_huynh.trim()) {
      alert('Vui lòng nhập email');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(phuHuynhForm.email_phu_huynh)) {
      alert('Email không đúng định dạng');
      return;
    }
    
    if (!phuHuynhForm.mat_khau.trim()) {
      alert('Vui lòng nhập mật khẩu');
      return;
    }
    
    // Password validation with requirements
    if (!isPasswordValid()) {
      alert('Mật khẩu chưa đáp ứng yêu cầu bảo mật');
      return;
    }
    
    // Phone number validation
    if (phuHuynhForm.sdt.trim()) {
      const phoneValidation = validatePhoneNumber(phuHuynhForm.sdt);
      if (!phoneValidation.isValid) {
        alert(phoneValidation.message);
        return;
      }
    }

    try {
      setIsLoading(true);
      const response = await apiService.createPhuHuynh(phuHuynhForm);
      if (response.success) {
        await loadPhuHuynhList();
        setShowPhuHuynhForm(false);
        resetPhuHuynhForm();
        alert('Tạo phụ huynh thành công!');
      } else {
        // Handle specific error cases
        console.log('Response error:', response);
        if (response.message) {
          if (response.message.includes('Email đã được sử dụng') || response.message.includes('email')) {
            alert('Email này đã được sử dụng. Vui lòng chọn email khác.');
          } else if (response.message.includes('Số điện thoại đã được sử dụng') || response.message.includes('số điện thoại')) {
            alert('Số điện thoại này đã được sử dụng. Vui lòng chọn số điện thoại khác.');
          } else {
            alert('Lỗi khi tạo phụ huynh: ' + response.message);
          }
        } else {
          alert('Lỗi khi tạo phụ huynh: ' + (response.error || 'Không xác định'));
        }
      }
    } catch (error) {
      console.error('Error creating phu huynh:', error);
      console.log('Error details:', error.response);
      
      // Handle different types of errors
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        console.log('Error data:', errorData);
        
        if (errorData.message) {
          if (errorData.message.includes('Email đã được sử dụng') || errorData.message.includes('email')) {
            alert('Email này đã được sử dụng. Vui lòng chọn email khác.');
          } else if (errorData.message.includes('Số điện thoại đã được sử dụng') || errorData.message.includes('số điện thoại')) {
            alert('Số điện thoại này đã được sử dụng. Vui lòng chọn số điện thoại khác.');
          } else {
            alert('Lỗi khi tạo phụ huynh: ' + errorData.message);
          }
        } else if (errorData.error) {
          alert('Lỗi khi tạo phụ huynh: ' + errorData.error);
        } else {
          alert('Lỗi khi tạo phụ huynh: ' + error.message);
        }
      } else {
        alert('Lỗi khi tạo phụ huynh: ' + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePhuHuynh = async (id) => {
    // Validation
    if (!phuHuynhForm.ten_phu_huynh.trim()) {
      alert('Vui lòng nhập tên phụ huynh');
      return;
    }
    if (!phuHuynhForm.email_phu_huynh.trim()) {
      alert('Vui lòng nhập email');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(phuHuynhForm.email_phu_huynh)) {
      alert('Email không đúng định dạng');
      return;
    }
    
    // Password validation with requirements (only if password is provided)
    if (phuHuynhForm.mat_khau && phuHuynhForm.mat_khau.trim()) {
      if (!isPasswordValid()) {
        alert('Mật khẩu chưa đáp ứng yêu cầu bảo mật');
        return;
      }
    }
    
    // Phone number validation
    if (phuHuynhForm.sdt.trim()) {
      const phoneValidation = validatePhoneNumber(phuHuynhForm.sdt);
      if (!phoneValidation.isValid) {
        alert(phoneValidation.message);
        return;
      }
    }

    try {
      setIsLoading(true);
      // Chỉ gửi mật khẩu nếu có nhập
      const updateData = { ...phuHuynhForm };
      if (!updateData.mat_khau.trim()) {
        delete updateData.mat_khau;
      }
      
      const response = await apiService.updatePhuHuynh(id, updateData);
      if (response.success) {
        await loadPhuHuynhList();
        setShowPhuHuynhForm(false);
        setEditingItem(null);
        resetPhuHuynhForm();
        alert('Cập nhật phụ huynh thành công!');
      } else {
        // Handle specific error cases
        console.log('Response error:', response);
        if (response.message) {
          if (response.message.includes('Email đã được sử dụng') || response.message.includes('email')) {
            alert('Email này đã được sử dụng. Vui lòng chọn email khác.');
          } else if (response.message.includes('Số điện thoại đã được sử dụng') || response.message.includes('số điện thoại')) {
            alert('Số điện thoại này đã được sử dụng. Vui lòng chọn số điện thoại khác.');
          } else {
            alert('Lỗi khi cập nhật phụ huynh: ' + response.message);
          }
        } else {
          alert('Lỗi khi cập nhật phụ huynh: ' + (response.error || 'Không xác định'));
        }
      }
    } catch (error) {
      console.error('Error updating phu huynh:', error);
      console.log('Error details:', error.response);
      
      // Handle different types of errors
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        console.log('Error data:', errorData);
        
        if (errorData.message) {
          if (errorData.message.includes('Email đã được sử dụng') || errorData.message.includes('email')) {
            alert('Email này đã được sử dụng. Vui lòng chọn email khác.');
          } else if (errorData.message.includes('Số điện thoại đã được sử dụng') || errorData.message.includes('số điện thoại')) {
            alert('Số điện thoại này đã được sử dụng. Vui lòng chọn số điện thoại khác.');
          } else {
            alert('Lỗi khi cập nhật phụ huynh: ' + errorData.message);
          }
        } else if (errorData.error) {
          alert('Lỗi khi cập nhật phụ huynh: ' + errorData.error);
        } else {
          alert('Lỗi khi cập nhật phụ huynh: ' + error.message);
        }
      } else {
        alert('Lỗi khi cập nhật phụ huynh: ' + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePhuHuynh = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phụ huynh này?')) {
      try {
        setIsLoading(true);
        const response = await apiService.deletePhuHuynh(id);
        if (response.success) {
          await loadPhuHuynhList();
          alert('Xóa phụ huynh thành công!');
        } else {
          alert('Lỗi khi xóa phụ huynh: ' + response.message);
        }
      } catch (error) {
        console.error('Error deleting phu huynh:', error);
        alert('Lỗi khi xóa phụ huynh');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCreateTreEm = async (phuHuynhId) => {
    // Validation
    if (!treEmForm.ten_tre.trim()) {
      alert('Vui lòng nhập tên trẻ em');
      return;
    }
    if (!treEmForm.gioi_tinh) {
      alert('Vui lòng chọn giới tính');
      return;
    }
    
    // Validate ngày sinh
    if (treEmForm.ngay_sinh) {
      const birthDate = new Date(treEmForm.ngay_sinh);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (birthDate > today) {
        alert('Ngày sinh không thể là ngày trong tương lai');
        return;
      }
      if (age > 18) {
        alert('Trẻ em không thể lớn hơn 18 tuổi');
        return;
      }
      if (age < 0) {
        alert('Ngày sinh không hợp lệ');
        return;
      }
    }

    try {
      setIsLoading(true);
      const response = await apiService.createTreEm({
        ...treEmForm,
        ma_phu_huynh: phuHuynhId
      });
      if (response.success) {
        // Reload data for popup
        if (showTreEmPopup && selectedPhuHuynhForPopup) {
          await loadTreEmList(selectedPhuHuynhForPopup.ma_phu_huynh);
        }
        // Reload main data
        await loadPhuHuynhList();
        setShowTreEmForm(false);
        resetTreEmForm();
        alert('Tạo trẻ em thành công!');
      } else {
        alert('Lỗi khi tạo trẻ em: ' + response.message);
      }
    } catch (error) {
      console.error('Error creating tre em:', error);
      alert('Lỗi khi tạo trẻ em');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTreEm = async (id) => {
    // Validation
    if (!treEmForm.ten_tre.trim()) {
      alert('Vui lòng nhập tên trẻ em');
      return;
    }
    if (!treEmForm.gioi_tinh) {
      alert('Vui lòng chọn giới tính');
      return;
    }
    
    // Validate ngày sinh
    if (treEmForm.ngay_sinh) {
      const birthDate = new Date(treEmForm.ngay_sinh);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (birthDate > today) {
        alert('Ngày sinh không thể là ngày trong tương lai');
        return;
      }
      if (age > 18) {
        alert('Trẻ em không thể lớn hơn 18 tuổi');
        return;
      }
      if (age < 0) {
        alert('Ngày sinh không hợp lệ');
        return;
      }
    }

    try {
      setIsLoading(true);
      const response = await apiService.updateTreEm(id, treEmForm);
      if (response.success) {
        // Reload data for popup
        if (showTreEmPopup && selectedPhuHuynhForPopup) {
          await loadTreEmList(selectedPhuHuynhForPopup.ma_phu_huynh);
        }
        // Reload main data
        await loadPhuHuynhList();
        setShowTreEmForm(false);
        setEditingItem(null);
        resetTreEmForm();
        alert('Cập nhật trẻ em thành công!');
      } else {
        alert('Lỗi khi cập nhật trẻ em: ' + response.message);
      }
    } catch (error) {
      console.error('Error updating tre em:', error);
      alert('Lỗi khi cập nhật trẻ em');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTreEm = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa trẻ em này?')) {
      try {
        setIsLoading(true);
        const response = await apiService.deleteTreEm(id);
        if (response.success) {
          // Reload data for popup
          if (showTreEmPopup && selectedPhuHuynhForPopup) {
            await loadTreEmList(selectedPhuHuynhForPopup.ma_phu_huynh);
          }
          // Reload main data
          await loadPhuHuynhList();
          alert('Xóa trẻ em thành công!');
        } else {
          alert('Lỗi khi xóa trẻ em: ' + response.message);
        }
      } catch (error) {
        console.error('Error deleting tre em:', error);
        alert('Lỗi khi xóa trẻ em');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCreateThietBi = async (treEmId) => {
    try {
      setIsLoading(true);
      setThietBiError('');
      setThietBiSuccess('');
      
      const response = await apiService.createThietBi({
        ...thietBiForm,
        ma_tre_em: treEmId
      });
      
      if (response.success) {
        // Reload data for popup
        if (showThietBiPopup && selectedTreEmForPopup) {
          await loadThietBiList(selectedTreEmForPopup.ma_tre_em);
        }
        // Reload main data
        await loadPhuHuynhList();
        setShowThietBiForm(false);
        resetThietBiForm();
        setThietBiSuccess('Tạo thiết bị thành công!');
        
        // Auto hide success message after 3 seconds
        setTimeout(() => setThietBiSuccess(''), 3000);
      } else {
        // Handle specific error cases
        if (response.message) {
          if (response.message.includes('Mã thiết bị đã tồn tại')) {
            setThietBiError('Mã thiết bị này đã tồn tại trong hệ thống. Vui lòng sử dụng mã khác.');
          } else {
            setThietBiError('Lỗi khi tạo thiết bị: ' + response.message);
          }
        } else {
          setThietBiError('Lỗi khi tạo thiết bị: ' + (response.error || 'Không xác định'));
        }
      }
    } catch (error) {
      console.error('Error creating thiet bi:', error);
      
      // Handle different types of errors
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        
        if (errorData.message) {
          if (errorData.message.includes('Mã thiết bị đã tồn tại')) {
            setThietBiError('Mã thiết bị này đã tồn tại trong hệ thống. Vui lòng sử dụng mã khác.');
          } else {
            setThietBiError('Lỗi khi tạo thiết bị: ' + errorData.message);
          }
        } else if (errorData.error) {
          setThietBiError('Lỗi khi tạo thiết bị: ' + errorData.error);
        } else {
          setThietBiError('Lỗi khi tạo thiết bị: ' + error.message);
        }
      } else {
        setThietBiError('Lỗi khi tạo thiết bị: ' + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateThietBi = async (id) => {
    try {
      setIsLoading(true);
      setThietBiError('');
      setThietBiSuccess('');
      
      const response = await apiService.updateThietBi(id, thietBiForm);
      
      if (response.success) {
        // Reload data for popup
        if (showThietBiPopup && selectedTreEmForPopup) {
          await loadThietBiList(selectedTreEmForPopup.ma_tre_em);
        }
        // Reload main data
        await loadPhuHuynhList();
        setShowThietBiForm(false);
        setEditingItem(null);
        resetThietBiForm();
        setThietBiSuccess('Cập nhật thiết bị thành công!');
        
        // Auto hide success message after 3 seconds
        setTimeout(() => setThietBiSuccess(''), 3000);
      } else {
        // Handle specific error cases
        if (response.message) {
          if (response.message.includes('Mã thiết bị đã tồn tại')) {
            setThietBiError('Mã thiết bị này đã tồn tại trong hệ thống. Vui lòng sử dụng mã khác.');
          } else {
            setThietBiError('Lỗi khi cập nhật thiết bị: ' + response.message);
          }
        } else {
          setThietBiError('Lỗi khi cập nhật thiết bị: ' + (response.error || 'Không xác định'));
        }
      }
    } catch (error) {
      console.error('Error updating thiet bi:', error);
      
      // Handle different types of errors
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        
        if (errorData.message) {
          if (errorData.message.includes('Mã thiết bị đã tồn tại')) {
            setThietBiError('Mã thiết bị này đã tồn tại trong hệ thống. Vui lòng sử dụng mã khác.');
          } else {
            setThietBiError('Lỗi khi cập nhật thiết bị: ' + errorData.message);
          }
        } else if (errorData.error) {
          setThietBiError('Lỗi khi cập nhật thiết bị: ' + errorData.error);
        } else {
          setThietBiError('Lỗi khi cập nhật thiết bị: ' + error.message);
        }
      } else {
        setThietBiError('Lỗi khi cập nhật thiết bị: ' + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteThietBi = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa thiết bị này?')) {
      try {
        setIsLoading(true);
        const response = await apiService.deleteThietBi(id);
        if (response.success) {
          // Reload data for popup
          if (showThietBiPopup && selectedTreEmForPopup) {
            await loadThietBiList(selectedTreEmForPopup.ma_tre_em);
          }
          // Reload main data
          await loadPhuHuynhList();
          alert('Xóa thiết bị thành công!');
        } else {
          alert('Lỗi khi xóa thiết bị: ' + response.message);
        }
      } catch (error) {
        console.error('Error deleting thiet bi:', error);
        alert('Lỗi khi xóa thiết bị');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChangePackage = async () => {
    if (!changePackageForm.selectedGoiId) {
      alert('Vui lòng chọn gói mới');
      return;
    }

    try {
      setIsLoading(true);
      console.log('Changing package for device:', selectedThietBi.nguoi_dung_id, 'to package:', changePackageForm.selectedGoiId);
      const response = await apiService.changePackageForDevice(selectedThietBi.nguoi_dung_id, changePackageForm.selectedGoiId);
      console.log('Change package response:', response);
      if (response.success) {
        // Reload data for popup
        if (showThietBiPopup && selectedTreEmForPopup) {
          await loadThietBiList(selectedTreEmForPopup.ma_tre_em);
        }
        // Reload main data
        await loadPhuHuynhList();
        setShowChangePackageForm(false);
        setSelectedThietBi(null);
        setChangePackageForm({ selectedGoiId: '' });
        alert('Đổi gói thành công!');
      } else {
        alert('Lỗi khi đổi gói: ' + response.message);
      }
    } catch (error) {
      console.error('Error changing package:', error);
      alert('Lỗi khi đổi gói: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Form handlers
  const resetPhuHuynhForm = () => {
    setPhuHuynhForm({
      ten_phu_huynh: '',
      email_phu_huynh: '',
      sdt: '',
      dia_chi: '',
      mat_khau: ''
    });
    setPasswordRequirements({
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      specialChar: false
    });
    setShowPasswordInForm(false);
    setPhoneError('');
  };

  const resetTreEmForm = () => {
    setTreEmForm({
      ten_tre: '',
      lop: '',
      gioi_tinh: '',
      truong: '',
      ngay_sinh: ''
    });
  };

  const resetThietBiForm = () => {
    setThietBiForm({
      ten_thiet_bi: '',
      loai_thiet_bi: '',
      ma_thiet_bi: ''
    });
    setThietBiError('');
    setThietBiSuccess('');
  };

  const openEditForm = (type, item) => {
    setEditingItem(item);
    if (type === 'phuHuynh') {
      setPhuHuynhForm({
        ten_phu_huynh: item.ten_phu_huynh || '',
        email_phu_huynh: item.email_phu_huynh || '',
        sdt: item.sdt || '',
        dia_chi: item.dia_chi || '',
        mat_khau: '' // Không hiển thị mật khẩu cũ khi edit
      });
      setPhoneError(''); // Reset phone error
      setShowPhuHuynhForm(true);
    } else if (type === 'treEm') {
      setTreEmForm({
        ten_tre: item.ten_tre || '',
        lop: item.lop || '',
        gioi_tinh: item.gioi_tinh || '',
        truong: item.truong || '',
        ngay_sinh: item.ngay_sinh || ''
      });
      setShowTreEmForm(true);
    } else if (type === 'thietBi') {
      setThietBiForm({
        ten_thiet_bi: item.ten_thiet_bi || '',
        loai_thiet_bi: item.loai_thiet_bi || '',
        ma_thiet_bi: item.ma_thiet_bi || ''
      });
      setThietBiError('');
      setThietBiSuccess('');
      setShowThietBiForm(true);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getActiveGoi = (thietBi) => {
    if (thietBi.goiDichVuList && thietBi.goiDichVuList.length > 0) {
      const activeGoi = thietBi.goiDichVuList.find(goi => goi.trang_thai === 'DANG_HOAT_DONG');
      // Kiểm tra xem thongTinGoi có tồn tại không (không bị xóa hoặc thong_tin_goi_id = null)
      if (activeGoi && activeGoi.thongTinGoi && activeGoi.thong_tin_goi_id) {
        return activeGoi;
      }
    }
    return null;
  };

  // Helper function to format phone number
  const formatPhoneNumber = (value) => {
    // Remove all non-digit characters except +
    let phone = value.replace(/[^\d+]/g, '');
    
    // If it starts with +84, keep it as is
    if (phone.startsWith('+84')) {
      return phone;
    }
    
    // If it starts with 84, add +
    if (phone.startsWith('84') && phone.length > 2) {
      phone = '+' + phone;
    }
    
    // If it starts with 0, keep it as is
    if (phone.startsWith('0')) {
      return phone;
    }
    
    return phone;
  };

  // Helper function to validate phone number
  const validatePhoneNumber = (phone) => {
    if (!phone.trim()) return { isValid: true, message: '' };
    
    const phoneRegex = /^[0-9+\-\s()]+$/;
    const cleanPhone = phone.replace(/[\s\-()]/g, '');
    
    if (!phoneRegex.test(phone)) {
      return { isValid: false, message: 'Số điện thoại chỉ được chứa số, dấu +, -, (), và khoảng trắng' };
    }
    
    if (cleanPhone.length < 10 || cleanPhone.length > 15) {
      return { isValid: false, message: 'Số điện thoại phải có từ 10-15 chữ số' };
    }
    
    // Kiểm tra số điện thoại Việt Nam
    if (cleanPhone.startsWith('0')) {
      if (cleanPhone.length !== 10) {
        return { isValid: false, message: 'Số điện thoại Việt Nam phải có 10 chữ số (bắt đầu bằng 0)' };
      }
    } else if (cleanPhone.startsWith('+84')) {
      if (cleanPhone.length !== 12) {
        return { isValid: false, message: 'Số điện thoại Việt Nam quốc tế phải có 12 chữ số (bắt đầu bằng +84)' };
      }
    }
    
    return { isValid: true, message: '' };
  };

  // Handle phone number input with real-time validation
  const handlePhoneChange = (value) => {
    const formattedPhone = formatPhoneNumber(value);
    setPhuHuynhForm({...phuHuynhForm, sdt: formattedPhone});
    
    // Real-time validation
    if (formattedPhone.trim()) {
      const validation = validatePhoneNumber(formattedPhone);
      setPhoneError(validation.isValid ? '' : validation.message);
    } else {
      setPhoneError('');
    }
  };

  // Helper function to check if user is premium
  const isPremiumUser = (phuHuynh) => {
    if (!phuHuynh.treEmList) return false;
    
    return phuHuynh.treEmList.some(treEm => 
      treEm.thietBiList && treEm.thietBiList.some(thietBi => 
        thietBi.goiDichVuList && thietBi.goiDichVuList.some(goi => 
          goi.trang_thai === 'DANG_HOAT_DONG' && 
          goi.thongTinGoi && 
          goi.thongTinGoi.loai_goi === 'TRA_PHI'
        )
      )
    );
  };

  // Helper function to get total children count
  const getTotalChildren = (phuHuynh) => {
    return phuHuynh.treEmList ? phuHuynh.treEmList.length : 0;
  };

  // Helper function to get total devices count
  const getTotalDevices = (phuHuynh) => {
    if (!phuHuynh.treEmList) return 0;
    return phuHuynh.treEmList.reduce((total, treEm) => {
      return total + (treEm.thietBiList ? treEm.thietBiList.length : 0);
    }, 0);
  };

  // Helper function to get devices count for a child
  const getChildDevicesCount = (treEm) => {
    return treEm.thietBiList ? treEm.thietBiList.length : 0;
  };

  // Password visibility functions
  const handleShowPassword = (phuHuynhId) => {
    setSelectedPhuHuynh(phuHuynhId);
    setShowPasswordModal(true);
    setPasswordInput('');
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === '123456') {
      setShowPassword(prev => ({
        ...prev,
        [selectedPhuHuynh]: true
      }));
      setShowPasswordModal(false);
      setPasswordInput('');
      setSelectedPhuHuynh(null);
    } else {
      alert('Mật khẩu không đúng!');
    }
  };

  const handleHidePassword = (phuHuynhId) => {
    setShowPassword(prev => ({
      ...prev,
      [phuHuynhId]: false
    }));
  };

  // Goi management functions
  const handleOpenGoiManagement = (thietBi) => {
    setSelectedThietBiForGoi(thietBi);
    setShowGoiManagement(true);
  };


  const handleCloseGoiManagement = () => {
    setShowGoiManagement(false);
    setSelectedThietBiForGoi(null);
  };

  const handleGoiDataUpdated = async (updatedGoiData) => {
    try {
      // Reload data để đảm bảo dữ liệu được cập nhật đúng
      await loadPhuHuynhList();
      
      // Nếu đang trong pop-up thiết bị, reload thietBiList
      if (showThietBiPopup && selectedTreEmForPopup) {
        await loadThietBiList(selectedTreEmForPopup.ma_tre_em);
      }
      
      console.log('Goi data updated successfully');
    } catch (error) {
      console.error('Error updating goi data:', error);
    }
  };

  // Filter handlers
  const handlePhuHuynhFilterChange = (newFilters) => {
    setPhuHuynhFilters(newFilters);
  };

  const handleTreEmFilterChange = (newFilters) => {
    setTreEmFilters(newFilters);
  };

  const handleThietBiFilterChange = (newFilters) => {
    setThietBiFilters(newFilters);
  };

  // Simple filter functions
  const filterPhuHuynhSimple = (phuHuynhList, filters) => {
    if (!phuHuynhList || phuHuynhList.length === 0) return [];
    
    return phuHuynhList.filter(phuHuynh => {
      // Filter by name
      if (filters.ten && filters.ten.trim() !== '') {
        const name = phuHuynh.ten_phu_huynh || '';
        if (!name.toLowerCase().includes(filters.ten.toLowerCase())) {
          return false;
        }
      }
      
      // Filter by email
      if (filters.email && filters.email.trim() !== '') {
        const email = phuHuynh.email_phu_huynh || '';
        if (!email.toLowerCase().includes(filters.email.toLowerCase())) {
          return false;
        }
      }
      
      // Filter by phone
      if (filters.sdt && filters.sdt.trim() !== '') {
        const phone = phuHuynh.sdt || '';
        if (!phone.includes(filters.sdt)) {
          return false;
        }
      }
      
      // Filter by account type
      if (filters.loaiTaiKhoan && filters.loaiTaiKhoan !== '') {
        const isPremium = isPremiumUser(phuHuynh);
        if (filters.loaiTaiKhoan === 'Premium' && !isPremium) {
          return false;
        }
        if (filters.loaiTaiKhoan === 'Free' && isPremium) {
          return false;
        }
      }
      
      // Filter by role (admin/user)
      if (filters.vaiTro && filters.vaiTro !== '') {
        const role = phuHuynh.la_admin ? 'admin' : 'user';
        if (role !== filters.vaiTro) return false;
      }
      
      return true;
    });
  };

  const filterTreEmSimple = (treEmList, filters) => {
    if (!treEmList || treEmList.length === 0) return [];
    
    return treEmList.filter(treEm => {
      // Filter by name
      if (filters.ten && filters.ten.trim() !== '') {
        const name = treEm.ten_tre || '';
        if (!name.toLowerCase().includes(filters.ten.toLowerCase())) {
          return false;
        }
      }
      
      // Filter by class
      if (filters.lop && filters.lop !== '') {
        const lop = treEm.lop || '';
        if (lop !== filters.lop) {
          return false;
        }
      }
      
      // Filter by school
      if (filters.truong && filters.truong !== '') {
        const truong = treEm.truong || '';
        if (truong !== filters.truong) {
          return false;
        }
      }
      
      // Filter by gender
      if (filters.gioiTinh && filters.gioiTinh !== '') {
        const gioiTinh = treEm.gioi_tinh || '';
        if (gioiTinh !== filters.gioiTinh) {
          return false;
        }
      }
      
      return true;
    });
  };

  const filterThietBiSimple = (thietBiList, filters) => {
    if (!thietBiList || thietBiList.length === 0) return [];
    
    return thietBiList.filter(thietBi => {
      // Filter by device name
      if (filters.tenThietBi && filters.tenThietBi.trim() !== '') {
        const name = thietBi.ten_thiet_bi || '';
        if (!name.toLowerCase().includes(filters.tenThietBi.toLowerCase())) {
          return false;
        }
      }
      
      // Filter by device type
      if (filters.loaiThietBi && filters.loaiThietBi !== '') {
        const type = thietBi.loai_thiet_bi || '';
        if (type !== filters.loaiThietBi) {
          return false;
        }
      }
      
      // Filter by device code
      if (filters.maThietBi && filters.maThietBi.trim() !== '') {
        const code = thietBi.ma_thiet_bi || '';
        if (!code.toLowerCase().includes(filters.maThietBi.toLowerCase())) {
          return false;
        }
      }
      
      // Filter by service package
      if (filters.goiDichVu && filters.goiDichVu !== '') {
        const activeGoi = getActiveGoi(thietBi);
        if (filters.goiDichVu === 'CHUA_CO_GOI') {
          if (activeGoi) {
            return false;
          }
        } else {
          if (!activeGoi || !activeGoi.thongTinGoi) {
            return false;
          }
          const goiName = activeGoi.thongTinGoi.ten || '';
          if (!goiName.toLowerCase().includes(filters.goiDichVu.toLowerCase())) {
            return false;
          }
        }
      }
      
      return true;
    });
  };

  // Get suggestion options for filters
  const getPhuHuynhNameOptions = () => {
    return [...new Set(phuHuynhList.map(ph => ph.ten_phu_huynh).filter(Boolean))];
  };

  const getPhuHuynhEmailOptions = () => {
    return [...new Set(phuHuynhList.map(ph => ph.email_phu_huynh).filter(Boolean))];
  };

  const getPhuHuynhPhoneOptions = () => {
    return [...new Set(phuHuynhList.map(ph => ph.sdt).filter(Boolean))];
  };

  const getTreEmNameOptions = () => {
    if (!selectedPhuHuynhForPopup || !selectedPhuHuynhForPopup.treEmList) return [];
    return [...new Set(selectedPhuHuynhForPopup.treEmList.map(te => te.ten_tre).filter(Boolean))];
  };

  const getTreEmClassOptions = () => {
    if (!selectedPhuHuynhForPopup || !selectedPhuHuynhForPopup.treEmList) return [];
    return [...new Set(selectedPhuHuynhForPopup.treEmList.map(te => te.lop).filter(Boolean))];
  };

  const getTreEmSchoolOptions = () => {
    if (!selectedPhuHuynhForPopup || !selectedPhuHuynhForPopup.treEmList) return [];
    return [...new Set(selectedPhuHuynhForPopup.treEmList.map(te => te.truong).filter(Boolean))];
  };

  const getTreEmGenderOptions = () => {
    if (!selectedPhuHuynhForPopup || !selectedPhuHuynhForPopup.treEmList) return [];
    return [...new Set(selectedPhuHuynhForPopup.treEmList.map(te => te.gioi_tinh).filter(Boolean))];
  };

  const getThietBiNameOptions = () => {
    if (!selectedTreEmForPopup || !selectedTreEmForPopup.thietBiList) return [];
    return [...new Set(selectedTreEmForPopup.thietBiList.map(tb => tb.ten_thiet_bi).filter(Boolean))];
  };

  const getThietBiTypeOptions = () => {
    if (!selectedTreEmForPopup || !selectedTreEmForPopup.thietBiList) return [];
    return [...new Set(selectedTreEmForPopup.thietBiList.map(tb => tb.loai_thiet_bi).filter(Boolean))];
  };

  const getThietBiCodeOptions = () => {
    if (!selectedTreEmForPopup || !selectedTreEmForPopup.thietBiList) return [];
    return [...new Set(selectedTreEmForPopup.thietBiList.map(tb => tb.ma_thiet_bi).filter(Boolean))];
  };

  const getGoiDichVuOptions = () => {
    return goiList.map(goi => goi.ten);
  };

  // Pagination component
  const PaginationComponent = ({ 
    currentPage, 
    totalPages, 
    onPageChange, 
    itemsPerPage, 
    onItemsPerPageChange,
    totalItems,
    color = 'blue'
  }) => {
    const colorClasses = {
      blue: {
        active: 'bg-blue-600 text-white',
        inactive: 'text-blue-600 hover:bg-blue-50',
        border: 'border-blue-200'
      },
      green: {
        active: 'bg-green-600 text-white',
        inactive: 'text-green-600 hover:bg-green-50',
        border: 'border-green-200'
      },
      purple: {
        active: 'bg-purple-600 text-white',
        inactive: 'text-purple-600 hover:bg-purple-50',
        border: 'border-purple-200'
      }
    };

    const colors = colorClasses[color] || colorClasses.blue;

    const getVisiblePages = () => {
      const delta = 2;
      const range = [];
      const rangeWithDots = [];

      for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
        range.push(i);
      }

      if (currentPage - delta > 2) {
        rangeWithDots.push(1, '...');
      } else {
        rangeWithDots.push(1);
      }

      rangeWithDots.push(...range);

      if (currentPage + delta < totalPages - 1) {
        rangeWithDots.push('...', totalPages);
      } else if (totalPages > 1) {
        rangeWithDots.push(totalPages);
      }

      return rangeWithDots;
    };

    if (totalPages <= 1) return null;

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-200">
        {/* Items per page selector */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Hiển thị:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(parseInt(e.target.value))}
            className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span>trong {totalItems} mục</span>
        </div>

        {/* Pagination controls */}
        <div className="flex items-center gap-1">
          {/* Previous button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
              currentPage === 1 
                ? 'text-gray-400 border-gray-200 cursor-not-allowed' 
                : `${colors.inactive} border-gray-300 hover:border-gray-400`
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Page numbers */}
          {getVisiblePages().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={page === '...'}
              className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                page === '...'
                  ? 'text-gray-400 border-gray-200 cursor-default'
                  : page === currentPage
                    ? `${colors.active} border-transparent`
                    : `${colors.inactive} border-gray-300 hover:border-gray-400`
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
              currentPage === totalPages 
                ? 'text-gray-400 border-gray-200 cursor-not-allowed' 
                : `${colors.inactive} border-gray-300 hover:border-gray-400`
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  // Get all data for filter system
  const getAllTreEm = () => {
    return phuHuynhList.reduce((acc, phuHuynh) => {
      if (phuHuynh.treEmList) {
        acc.push(...phuHuynh.treEmList);
      }
      return acc;
    }, []);
  };

  const getAllThietBi = () => {
    return phuHuynhList.reduce((acc, phuHuynh) => {
      if (phuHuynh.treEmList) {
        phuHuynh.treEmList.forEach(treEm => {
          if (treEm.thietBiList) {
            acc.push(...treEm.thietBiList);
          }
        });
      }
      return acc;
    }, []);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      <div className="w-full p-4">
    <div className="rounded-xl shadow-lg overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
      {/* Header */}
      <div className="p-6" style={{ color: '#3b82f6' }}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Quản lý hệ thống</h2>
          </div>
          <button
            onClick={() => {
              setShowPhuHuynhForm(true);
              setEditingItem(null);
              resetPhuHuynhForm();
            }}
            className="px-3 sm:px-4 py-2 rounded-lg transition-all flex items-center font-medium shadow-md hover:shadow-lg min-w-fit"
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
            <Plus className="w-4 h-4 mr-2" />
            Thêm phụ huynh
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Phụ huynh Filter System */}
        <div className="mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            {/* Filter Header with Toggle Button */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold" style={{color: '#1f2937'}}>Bộ lọc phụ huynh</h3>
              {/* Mobile Toggle Button */}
              <button
                onClick={() => setShowPhuHuynhFilters(!showPhuHuynhFilters)}
                className="lg:hidden flex items-center px-3 py-2 text-sm font-medium rounded-lg border transition-all"
                style={{ 
                  color: showPhuHuynhFilters ? '#2563eb' : '#6b7280',
                  borderColor: showPhuHuynhFilters ? '#93c5fd' : '#d1d5db',
                  backgroundColor: showPhuHuynhFilters ? '#dbeafe' : '#ffffff'
                }}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                </svg>
                {showPhuHuynhFilters ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
              </button>
            </div>
            
            {/* Filter Content - Hidden on mobile by default */}
            <div className={`${showPhuHuynhFilters ? 'block' : 'hidden'} lg:block`}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{color: '#374151'}}>Tên phụ huynh</label>
                  <SearchableInput
                    value={phuHuynhFilters.ten}
                    onChange={(value) => setPhuHuynhFilters({...phuHuynhFilters, ten: value})}
                    placeholder="Tìm theo tên..."
                    options={getPhuHuynhNameOptions()}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{color: '#374151'}}>Email</label>
                  <SearchableInput
                    value={phuHuynhFilters.email}
                    onChange={(value) => setPhuHuynhFilters({...phuHuynhFilters, email: value})}
                    placeholder="Tìm theo email..."
                    options={getPhuHuynhEmailOptions()}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{color: '#374151'}}>Số điện thoại</label>
                  <SearchableInput
                    value={phuHuynhFilters.sdt}
                    onChange={(value) => setPhuHuynhFilters({...phuHuynhFilters, sdt: value})}
                    placeholder="Tìm theo SĐT..."
                    options={getPhuHuynhPhoneOptions()}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{color: '#374151'}}>Loại tài khoản</label>
                  <select
                    value={phuHuynhFilters.loaiTaiKhoan}
                    onChange={(e) => setPhuHuynhFilters({...phuHuynhFilters, loaiTaiKhoan: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Tất cả</option>
                    <option value="Premium">Premium</option>
                    <option value="Free">Free</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{color: '#374151'}}>Vai trò</label>
                  <select
                    value={phuHuynhFilters.vaiTro}
                    onChange={(e) => setPhuHuynhFilters({...phuHuynhFilters, vaiTro: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Tất cả</option>
                    {availableRoles.map(r => (
                      <option key={r} value={r}>{r === 'admin' ? 'Admin' : 'User'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderBottomColor: '#3b82f6' }}></div>
            <span className="ml-3" style={{ color: '#4b5563' }}>Đang tải...</span>
          </div>
        )}

        {error && (
          <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: '#fef2f2', borderColor: '#fecaca', border: '1px solid' }}>
            <div className="flex items-center">
              <span className="mr-2" style={{ color: '#ef4444' }}>⚠️</span>
              <span style={{ color: '#b91c1c' }}>{error}</span>
            </div>
          </div>
        )}
        {/* Parents Table - Desktop */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full rounded-lg" style={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb' }}>
            <thead style={{ background: 'linear-gradient(to right, #f9fafb, #f3f4f6)' }}>
              <tr>
                <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wider min-w-[200px]" style={{ color: '#374151' }}>Phụ huynh</th>
                <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wider min-w-[200px]" style={{ color: '#374151' }}>Email</th>
                <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wider min-w-[150px]" style={{ color: '#374151' }}>Số điện thoại</th>
                <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wider min-w-[150px]" style={{ color: '#374151' }}>Mật khẩu</th>
                <th className="px-4 py-4 text-center text-sm font-semibold uppercase tracking-wider min-w-[80px]" style={{ color: '#374151' }}>Số trẻ</th>
                <th className="px-4 py-4 text-center text-sm font-semibold uppercase tracking-wider min-w-[100px]" style={{ color: '#374151' }}>Số thiết bị</th>
                <th className="px-4 py-4 text-center text-sm font-semibold uppercase tracking-wider min-w-[140px]" style={{ color: '#374151' }}>Vai trò</th>
                <th className="px-4 py-4 text-center text-sm font-semibold uppercase tracking-wider min-w-[120px]" style={{ color: '#374151' }}>Trạng thái</th>
                <th className="px-4 py-4 text-center text-sm font-semibold uppercase tracking-wider min-w-[200px]" style={{ color: '#374151' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: '#ffffff', borderTopColor: '#e5e7eb' }}>
              {getPaginatedData(filteredPhuHuynhList, phuHuynhPagination).map((phuHuynh) => (
                <tr key={phuHuynh.ma_phu_huynh} className="transition-colors" onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#dbeafe'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
                  <td className="px-4 py-4">
                <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-md" style={{ background: 'linear-gradient(to bottom right, #60a5fa, #2563eb)' }}>
                        <span className="font-bold text-lg" style={{ color: '#ffffff' }}>
                      {phuHuynh.ten_phu_huynh?.charAt(0)?.toUpperCase() || 'P'}
                    </span>
                  </div>
                  <div>
                        <div className="text-base font-semibold" style={{ color: '#111827' }}>
                      {phuHuynh.ten_phu_huynh || 'Chưa cập nhật'}
                  </div>
                        <div className="text-sm" style={{ color: '#6b7280' }}>ID: {phuHuynh.ma_phu_huynh}</div>
                </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium" style={{ color: '#111827' }}>{phuHuynh.email_phu_huynh}</div>
                    <div className="text-xs" style={{ color: '#6b7280' }}>Email đăng nhập</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium" style={{ color: '#111827' }}>{phuHuynh.sdt || 'Chưa có SĐT'}</div>
                    <div className="text-xs" style={{ color: '#6b7280' }}>Liên hệ</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      {showPassword[phuHuynh.ma_phu_huynh] ? (
                        <div className="flex items-center">
                          <span className="font-mono text-sm px-2 py-1 rounded" style={{ color: '#16a34a', backgroundColor: '#f0fdf4' }}>
                            {phuHuynh.mat_khau || 'Không có mật khẩu'}
                          </span>
                          <button
                            onClick={() => handleHidePassword(phuHuynh.ma_phu_huynh)}
                            className="ml-2 p-1 rounded flex items-center"
                            style={{ color: '#ef4444' }}
                            onMouseEnter={(e) => { e.target.style.color = '#dc2626'; e.target.style.backgroundColor = '#fef2f2'; }}
                            onMouseLeave={(e) => { e.target.style.color = '#ef4444'; e.target.style.backgroundColor = 'transparent'; }}
                            title="Ẩn mật khẩu"
                          >
                            <EyeOff className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <span className="text-sm" style={{ color: '#6b7280' }}>••••••••</span>
                          <button
                            onClick={() => handleShowPassword(phuHuynh.ma_phu_huynh)}
                            className="ml-2 p-1 rounded flex items-center"
                            style={{ color: '#3b82f6' }}
                            onMouseEnter={(e) => { e.target.style.color = '#1d4ed8'; e.target.style.backgroundColor = '#dbeafe'; }}
                            onMouseLeave={(e) => { e.target.style.color = '#3b82f6'; e.target.style.backgroundColor = 'transparent'; }}
                            title="Xem mật khẩu"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold" style={{ backgroundColor: '#dcfce7', color: '#166534' }}>
                      {getTotalChildren(phuHuynh)}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold" style={{ backgroundColor: '#f3e8ff', color: '#7c3aed' }}>
                      {getTotalDevices(phuHuynh)}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{
                          background: phuHuynh.la_admin ? '#dbeafe' : '#f3f4f6',
                          color: phuHuynh.la_admin ? '#1d4ed8' : '#374151'
                        }}
                      >
                        {phuHuynh.la_admin ? 'Admin' : 'User'}
                      </span>
                      {/* Role editor for admin */}
                      <select
                        className="border text-xs rounded px-2 py-1"
                        value={phuHuynh.la_admin ? 'admin' : 'user'}
                        onChange={(e) => handleChangeUserRole(phuHuynh.ma_phu_huynh, e.target.value)}
                        disabled={!!isUpdatingRoleByUserId[phuHuynh.ma_phu_huynh]}
                      >
                        {availableRoles.map(r => (
                          <option key={r} value={r}>{r === 'admin' ? 'Admin' : 'User'}</option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {isPremiumUser(phuHuynh) ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-md" style={{ background: 'linear-gradient(to right, #fbbf24, #f59e0b)', color: '#ffffff' }}>
                        Premium
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-md" style={{ background: 'linear-gradient(to right, #9ca3af, #6b7280)', color: '#ffffff' }}>
                        Free
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
                      <button
                        onClick={() => openWalletModal(phuHuynh)}
                        className="text-xs px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border transition-all font-medium flex items-center min-w-fit shadow-sm"
                        style={{ color: '#0ea5e9', borderColor: '#bae6fd', backgroundColor: '#ffffff' }}
                        onMouseEnter={(e) => { e.target.style.color = '#0284c7'; e.target.style.backgroundColor = '#e0f2fe'; }}
                        onMouseLeave={(e) => { e.target.style.color = '#0ea5e9'; e.target.style.backgroundColor = '#ffffff'; }}
                      >
                        <Package className="w-4 h-4 mr-1" />
                        Ví gói
                      </button>
                      <button
                        onClick={() => handleOpenTreEmPopup(phuHuynh)}
                        className="text-xs px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border transition-all font-medium flex items-center min-w-fit shadow-sm"
                        style={{ color: '#16a34a', borderColor: '#bbf7d0', backgroundColor: '#ffffff' }}
                        onMouseEnter={(e) => { e.target.style.color = '#15803d'; e.target.style.backgroundColor = '#f0fdf4'; }}
                        onMouseLeave={(e) => { e.target.style.color = '#16a34a'; e.target.style.backgroundColor = '#ffffff'; }}
                      >
                        <Users className="w-4 h-4 mr-1" />
                            Xem trẻ em
                      </button>
                  <button
                    onClick={() => openEditForm('phuHuynh', phuHuynh)}
                        className="text-xs px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border transition-all font-medium flex items-center min-w-fit shadow-sm"
                        style={{ color: '#2563eb', borderColor: '#93c5fd', backgroundColor: '#ffffff' }}
                        onMouseEnter={(e) => { e.target.style.color = '#1d4ed8'; e.target.style.backgroundColor = '#dbeafe'; }}
                        onMouseLeave={(e) => { e.target.style.color = '#2563eb'; e.target.style.backgroundColor = '#ffffff'; }}
                  >
                    <Edit className="w-3 h-3 mr-1 flex-shrink-0" />
                    <span className="hidden sm:inline">Sửa</span>
                  </button>
                  <button
                    onClick={() => handleDeletePhuHuynh(phuHuynh.ma_phu_huynh)}
                        className="text-xs px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border transition-all font-medium flex items-center min-w-fit shadow-sm"
                        style={{ color: '#dc2626', borderColor: '#fecaca', backgroundColor: '#ffffff' }}
                        onMouseEnter={(e) => { e.target.style.color = '#b91c1c'; e.target.style.backgroundColor = '#fef2f2'; }}
                        onMouseLeave={(e) => { e.target.style.color = '#dc2626'; e.target.style.backgroundColor = '#ffffff'; }}
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Xóa
                  </button>
                </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Parents Cards - Mobile */}
        <div className="lg:hidden space-y-4">
          {getPaginatedData(filteredPhuHuynhList, phuHuynhPagination).map((phuHuynh) => (
            <div key={phuHuynh.ma_phu_huynh} className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
              {/* Header with Avatar and Basic Info */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mr-3 shadow-md" style={{ background: 'linear-gradient(to bottom right, #60a5fa, #2563eb)' }}>
                    <span className="font-bold text-lg" style={{ color: '#ffffff' }}>
                      {phuHuynh.ten_phu_huynh?.charAt(0)?.toUpperCase() || 'P'}
                    </span>
                  </div>
                  <div>
                    <div className="text-lg font-semibold" style={{ color: '#111827' }}>
                      {phuHuynh.ten_phu_huynh || 'Chưa cập nhật'}
                    </div>
                    <div className="text-sm" style={{ color: '#6b7280' }}>ID: {phuHuynh.ma_phu_huynh}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {isPremiumUser(phuHuynh) ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold shadow-md" style={{ background: 'linear-gradient(to right, #fbbf24, #f59e0b)', color: '#ffffff' }}>
                      Premium
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold shadow-md" style={{ background: 'linear-gradient(to right, #9ca3af, #6b7280)', color: '#ffffff' }}>
                      Free
                    </span>
                  )}
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{
                      background: phuHuynh.la_admin ? '#dbeafe' : '#f3f4f6',
                      color: phuHuynh.la_admin ? '#1d4ed8' : '#374151'
                    }}
                  >
                    {phuHuynh.la_admin ? 'Admin' : 'User'}
                  </span>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 gap-3 mb-4">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" style={{ color: '#6b7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <div className="text-sm font-medium" style={{ color: '#111827' }}>{phuHuynh.email_phu_huynh}</div>
                    <div className="text-xs" style={{ color: '#6b7280' }}>Email</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" style={{ color: '#6b7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <div className="text-sm font-medium" style={{ color: '#111827' }}>{phuHuynh.sdt || 'Chưa có SĐT'}</div>
                    <div className="text-xs" style={{ color: '#6b7280' }}>Số điện thoại</div>
                  </div>
                </div>
              </div>

              {/* Password Section */}
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium" style={{ color: '#374151' }}>Mật khẩu:</span>
                  {showPassword[phuHuynh.ma_phu_huynh] ? (
                    <div className="flex items-center">
                      <span className="font-mono text-sm px-2 py-1 rounded mr-2" style={{ color: '#16a34a', backgroundColor: '#f0fdf4' }}>
                        {phuHuynh.mat_khau || 'Không có mật khẩu'}
                      </span>
                      <button
                        onClick={() => handleHidePassword(phuHuynh.ma_phu_huynh)}
                        className="p-1 rounded flex items-center"
                        style={{ color: '#ef4444' }}
                        title="Ẩn mật khẩu"
                      >
                        <EyeOff className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <span className="text-sm mr-2" style={{ color: '#6b7280' }}>••••••••</span>
                      <button
                        onClick={() => handleShowPassword(phuHuynh.ma_phu_huynh)}
                        className="p-1 rounded flex items-center"
                        style={{ color: '#3b82f6' }}
                        title="Xem mật khẩu"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold mr-2" style={{ backgroundColor: '#dcfce7', color: '#166534' }}>
                    {getTotalChildren(phuHuynh)}
                  </div>
                  <span className="text-sm" style={{ color: '#374151' }}>Trẻ em</span>
                </div>
                <div className="flex items-center">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold mr-2" style={{ backgroundColor: '#f3e8ff', color: '#7c3aed' }}>
                    {getTotalDevices(phuHuynh)}
                  </div>
                  <span className="text-sm" style={{ color: '#374151' }}>Thiết bị</span>
                </div>
                <div className="flex items-center">
                  <select
                    className="border text-xs rounded px-2 py-1"
                    value={phuHuynh.la_admin ? 'admin' : 'user'}
                    onChange={(e) => handleChangeUserRole(phuHuynh.ma_phu_huynh, e.target.value)}
                    disabled={!!isUpdatingRoleByUserId[phuHuynh.ma_phu_huynh]}
                  >
                    {availableRoles.map(r => (
                      <option key={r} value={r}>{r === 'admin' ? 'Admin' : 'User'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => openWalletModal(phuHuynh)}
                  className="flex-1 text-xs px-3 py-2 rounded-lg border transition-all font-medium flex items-center justify-center shadow-sm"
                  style={{ color: '#0ea5e9', borderColor: '#bae6fd', backgroundColor: '#ffffff' }}
                >
                  <Package className="w-4 h-4 mr-1" />
                  Ví gói
                </button>
                <button
                  onClick={() => handleOpenTreEmPopup(phuHuynh)}
                  className="flex-1 text-xs px-3 py-2 rounded-lg border transition-all font-medium flex items-center justify-center shadow-sm"
                  style={{ color: '#16a34a', borderColor: '#bbf7d0', backgroundColor: '#ffffff' }}
                >
                  <Users className="w-4 h-4 mr-1" />
                  Xem trẻ em
                </button>
                <button
                  onClick={() => openEditForm('phuHuynh', phuHuynh)}
                  className="flex-1 text-xs px-3 py-2 rounded-lg border transition-all font-medium flex items-center justify-center shadow-sm"
                  style={{ color: '#2563eb', borderColor: '#93c5fd', backgroundColor: '#ffffff' }}
                >
                  <Edit className="w-3 h-3 mr-1" />
                  Sửa
                </button>
                <button
                  onClick={() => handleDeletePhuHuynh(phuHuynh.ma_phu_huynh)}
                  className="flex-1 text-xs px-3 py-2 rounded-lg border transition-all font-medium flex items-center justify-center shadow-sm"
                  style={{ color: '#dc2626', borderColor: '#fecaca', backgroundColor: '#ffffff' }}
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination for Parents */}
        <PaginationComponent
          currentPage={phuHuynhPagination.currentPage}
          totalPages={getTotalPages(filteredPhuHuynhList, phuHuynhPagination.itemsPerPage)}
          onPageChange={(page) => setPhuHuynhPagination({...phuHuynhPagination, currentPage: page})}
          itemsPerPage={phuHuynhPagination.itemsPerPage}
          onItemsPerPageChange={(itemsPerPage) => setPhuHuynhPagination({...phuHuynhPagination, itemsPerPage, currentPage: 1})}
          totalItems={filteredPhuHuynhList.length}
          color="blue"
        />

        {filteredPhuHuynhList.length === 0 && !isLoading && (
          <div className="text-center py-12" style={{color: '#6b7280'}}>
            <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
            <h3 className="text-xl font-semibold mb-2">
              {phuHuynhList.length === 0 ? 'Chưa có phụ huynh nào' : 'Không tìm thấy kết quả phù hợp'}
            </h3>
            <p className="text-sm">
              {phuHuynhList.length === 0 
                ? 'Nhấn "Thêm phụ huynh" để bắt đầu quản lý hệ thống'
                : 'Thử điều chỉnh bộ lọc để tìm kiếm kết quả khác'
              }
            </p>
            {phuHuynhList.length > 0 && (
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200 max-w-md mx-auto">
                <div className="text-sm" style={{color: '#92400e'}}>
                  <strong>Gợi ý:</strong> Kiểm tra lại điều kiện lọc:
                  <br />• Tên phụ huynh/trẻ em có đúng chính tả?
                  <br />• Lớp và trường có khớp với dữ liệu?
                  <br />• Loại thiết bị và gói dịch vụ có đúng?
                                  </div>
                          </div>
                      )}
                    </div>
                )}
            </div>
        </div>
        </div>

      {/* Trẻ em Popup */}
      {showTreEmPopup && selectedPhuHuynhForPopup && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-green-50 to-green-100">
              <div className="flex items-center">
                <button
                  onClick={handleCloseTreEmPopup}
                  className="mr-4 p-2 rounded-lg hover:bg-green-200 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" style={{color: '#16a34a'}} />
                </button>
                <div>
                  <h2 className="text-2xl font-bold" style={{color: '#166534'}}>
                    Trẻ em của {selectedPhuHuynhForPopup.ten_phu_huynh}
                  </h2>
                  <p className="text-sm" style={{color: '#16a34a'}}>
                    Email: {selectedPhuHuynhForPopup.email_phu_huynh}
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseTreEmPopup}
                className="p-2 rounded-lg hover:bg-green-200 transition-colors"
              >
                <X className="w-5 h-5" style={{color: '#16a34a'}} />
              </button>
            </div>

            {/* Filter Section */}
            <div className="p-6 border-b bg-gray-50">
              {/* Filter Header with Toggle Button */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold" style={{color: '#1f2937'}}>Bộ lọc trẻ em</h3>
                {/* Mobile Toggle Button */}
                <button
                  onClick={() => setShowTreEmFilters(!showTreEmFilters)}
                  className="lg:hidden flex items-center px-3 py-2 text-sm font-medium rounded-lg border transition-all"
                  style={{ 
                    color: showTreEmFilters ? '#16a34a' : '#6b7280',
                    borderColor: showTreEmFilters ? '#bbf7d0' : '#d1d5db',
                    backgroundColor: showTreEmFilters ? '#f0fdf4' : '#ffffff'
                  }}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                  </svg>
                  {showTreEmFilters ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
                </button>
              </div>
              
              {/* Filter Content - Hidden on mobile by default */}
              <div className={`${showTreEmFilters ? 'block' : 'hidden'} lg:block`}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{color: '#374151'}}>Tên trẻ em</label>
                    <SearchableInput
                      value={treEmFilters.ten}
                      onChange={(value) => setTreEmFilters({...treEmFilters, ten: value})}
                      placeholder="Tìm theo tên..."
                      options={getTreEmNameOptions()}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{color: '#374151'}}>Lớp</label>
                    <SearchableInput
                      value={treEmFilters.lop}
                      onChange={(value) => setTreEmFilters({...treEmFilters, lop: value})}
                      placeholder="Tìm theo lớp..."
                      options={getTreEmClassOptions()}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{color: '#374151'}}>Trường</label>
                    <SearchableInput
                      value={treEmFilters.truong}
                      onChange={(value) => setTreEmFilters({...treEmFilters, truong: value})}
                      placeholder="Tìm theo trường..."
                      options={getTreEmSchoolOptions()}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{color: '#374151'}}>Giới tính</label>
                    <SearchableInput
                      value={treEmFilters.gioiTinh}
                      onChange={(value) => setTreEmFilters({...treEmFilters, gioiTinh: value})}
                      placeholder="Tìm theo giới tính..."
                      options={getTreEmGenderOptions()}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: '#22c55e' }}>
                  <span className="text-lg font-bold" style={{ color: '#ffffff' }}>TE</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowTreEmForm(true);
                  setEditingItem(null);
                  resetTreEmForm();
                }}
                className="px-3 sm:px-4 py-2 rounded-lg transition-all flex items-center font-medium shadow-md hover:shadow-lg min-w-fit"
                style={{ backgroundColor: '#16a34a', color: '#ffffff' }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = '#15803d'; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = '#16a34a'; }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Thêm trẻ em
              </button>
            </div>

            {/* Children Table - Desktop */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead style={{ background: 'linear-gradient(to right, #f0fdf4, #dcfce7)' }}>
                  <tr>
                    <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wider min-w-[200px]" style={{ color: '#374151' }}>Trẻ em</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wider min-w-[100px]" style={{ color: '#374151' }}>Giới tính</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wider min-w-[120px]" style={{ color: '#374151' }}>Lớp</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wider min-w-[200px]" style={{ color: '#374151' }}>Trường</th>
                    <th className="px-4 py-4 text-center text-sm font-semibold uppercase tracking-wider min-w-[100px]" style={{ color: '#374151' }}>Số thiết bị</th>
                    <th className="px-4 py-4 text-center text-sm font-semibold uppercase tracking-wider min-w-[200px]" style={{ color: '#374151' }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: '#ffffff', borderTopColor: '#e5e7eb' }}>
                    {getPaginatedData(filteredTreEmList, treEmPagination).map((treEm) => (
                    <tr key={treEm.ma_tre_em} className="transition-colors" onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f0fdf4'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}>
                      <td className="px-4 py-4">
                              <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 shadow-md" style={{ background: 'linear-gradient(to bottom right, #4ade80, #16a34a)' }}>
                            <span className="text-sm font-bold" style={{ color: '#ffffff' }}>TE</span>
                                </div>
                                <div>
                            <div className="text-base font-semibold" style={{ color: '#111827' }}>{treEm.ten_tre}</div>
                            <div className="text-sm" style={{ color: '#6b7280' }}>
                              ID: {treEm.ma_tre_em}
                                </div>
                            {treEm.ngay_sinh && treEm.ngay_sinh !== '0000-00-00' && (
                              <div className="text-xs" style={{ color: '#9ca3af' }}>
                                Ngày sinh: {(() => {
                                  const date = new Date(treEm.ngay_sinh);
                                  return isNaN(date.getTime()) ? 'Ngày không hợp lệ' : date.toLocaleDateString('vi-VN');
                                })()}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm font-medium" style={{ color: '#111827' }}>{treEm.gioi_tinh || 'Chưa xác định'}</div>
                        <div className="text-xs" style={{ color: '#6b7280' }}>Giới tính</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm font-medium" style={{ color: '#111827' }}>{treEm.lop || 'Chưa có lớp'}</div>
                        <div className="text-xs" style={{ color: '#6b7280' }}>Lớp học</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm font-medium" style={{ color: '#111827' }}>{treEm.truong || 'Chưa có trường'}</div>
                        <div className="text-xs" style={{ color: '#6b7280' }}>Trường học</div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold" style={{ backgroundColor: '#f3e8ff', color: '#7c3aed' }}>
                          {getChildDevicesCount(treEm)}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
                          <button
                              onClick={() => handleOpenThietBiPopup(treEm, selectedPhuHuynhForPopup)}
                            className="text-xs px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border transition-all font-medium flex items-center min-w-fit shadow-sm"
                            style={{ color: '#9333ea', borderColor: '#d8b4fe', backgroundColor: '#ffffff' }}
                            onMouseEnter={(e) => { e.target.style.color = '#7c3aed'; e.target.style.backgroundColor = '#faf5ff'; }}
                            onMouseLeave={(e) => { e.target.style.color = '#9333ea'; e.target.style.backgroundColor = '#ffffff'; }}
                          >
                              <Smartphone className="w-4 h-4 mr-1" />
                                Xem thiết bị
                          </button>
                                <button
                                  onClick={() => openEditForm('treEm', treEm)}
                            className="text-xs px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border transition-all font-medium flex items-center min-w-fit shadow-sm"
                            style={{ color: '#2563eb', borderColor: '#93c5fd', backgroundColor: '#ffffff' }}
                            onMouseEnter={(e) => { e.target.style.color = '#1d4ed8'; e.target.style.backgroundColor = '#dbeafe'; }}
                            onMouseLeave={(e) => { e.target.style.color = '#2563eb'; e.target.style.backgroundColor = '#ffffff'; }}
                                >
                                  <Edit className="w-3 h-3 mr-1 flex-shrink-0" />
                                  <span className="hidden sm:inline">Sửa</span>
                                </button>
                                <button
                                  onClick={() => handleDeleteTreEm(treEm.ma_tre_em)}
                            className="text-xs px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border transition-all font-medium flex items-center min-w-fit shadow-sm"
                            style={{ color: '#dc2626', borderColor: '#fecaca', backgroundColor: '#ffffff' }}
                            onMouseEnter={(e) => { e.target.style.color = '#b91c1c'; e.target.style.backgroundColor = '#fef2f2'; }}
                            onMouseLeave={(e) => { e.target.style.color = '#dc2626'; e.target.style.backgroundColor = '#ffffff'; }}
                                >
                                  <Trash2 className="w-3 h-3 mr-1" />
                                  Xóa
                                </button>
                              </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Children Cards - Mobile */}
            <div className="lg:hidden space-y-4">
              {getPaginatedData(filteredTreEmList, treEmPagination).map((treEm) => (
                <div key={treEm.ma_tre_em} className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                  {/* Header with Avatar and Basic Info */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-md" style={{ background: 'linear-gradient(to bottom right, #4ade80, #16a34a)' }}>
                        <span className="text-sm font-bold" style={{ color: '#ffffff' }}>TE</span>
                      </div>
                      <div>
                        <div className="text-lg font-semibold" style={{ color: '#111827' }}>{treEm.ten_tre}</div>
                        <div className="text-sm" style={{ color: '#6b7280' }}>ID: {treEm.ma_tre_em}</div>
                        {treEm.ngay_sinh && treEm.ngay_sinh !== '0000-00-00' && (
                          <div className="text-xs" style={{ color: '#9ca3af' }}>
                            Ngày sinh: {(() => {
                              const date = new Date(treEm.ngay_sinh);
                              return isNaN(date.getTime()) ? 'Ngày không hợp lệ' : date.toLocaleDateString('vi-VN');
                            })()}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold mr-2" style={{ backgroundColor: '#f3e8ff', color: '#7c3aed' }}>
                        {getChildDevicesCount(treEm)}
                      </div>
                      <span className="text-sm" style={{ color: '#374151' }}>Thiết bị</span>
                    </div>
                  </div>

                  {/* Information Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" style={{ color: '#6b7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <div>
                        <div className="text-sm font-medium" style={{ color: '#111827' }}>{treEm.gioi_tinh || 'Chưa xác định'}</div>
                        <div className="text-xs" style={{ color: '#6b7280' }}>Giới tính</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" style={{ color: '#6b7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <div>
                        <div className="text-sm font-medium" style={{ color: '#111827' }}>{treEm.lop || 'Chưa có lớp'}</div>
                        <div className="text-xs" style={{ color: '#6b7280' }}>Lớp học</div>
                      </div>
                    </div>
                    <div className="flex items-center col-span-2">
                      <svg className="w-4 h-4 mr-2" style={{ color: '#6b7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <div>
                        <div className="text-sm font-medium" style={{ color: '#111827' }}>{treEm.truong || 'Chưa có trường'}</div>
                        <div className="text-xs" style={{ color: '#6b7280' }}>Trường học</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleOpenThietBiPopup(treEm, selectedPhuHuynhForPopup)}
                      className="flex-1 text-xs px-3 py-2 rounded-lg border transition-all font-medium flex items-center justify-center shadow-sm"
                      style={{ color: '#9333ea', borderColor: '#d8b4fe', backgroundColor: '#ffffff' }}
                    >
                      <Smartphone className="w-4 h-4 mr-1" />
                      Xem thiết bị
                    </button>
                    <button
                      onClick={() => openEditForm('treEm', treEm)}
                      className="flex-1 text-xs px-3 py-2 rounded-lg border transition-all font-medium flex items-center justify-center shadow-sm"
                      style={{ color: '#2563eb', borderColor: '#93c5fd', backgroundColor: '#ffffff' }}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteTreEm(treEm.ma_tre_em)}
                      className="flex-1 text-xs px-3 py-2 rounded-lg border transition-all font-medium flex items-center justify-center shadow-sm"
                      style={{ color: '#dc2626', borderColor: '#fecaca', backgroundColor: '#ffffff' }}
                    >
                      <Trash2 className="w-3 h-3 mr-1" />
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination for Children */}
            <PaginationComponent
              currentPage={treEmPagination.currentPage}
              totalPages={getTotalPages(filteredTreEmList, treEmPagination.itemsPerPage)}
              onPageChange={(page) => setTreEmPagination({...treEmPagination, currentPage: page})}
              itemsPerPage={treEmPagination.itemsPerPage}
              onItemsPerPageChange={(itemsPerPage) => setTreEmPagination({...treEmPagination, itemsPerPage, currentPage: 1})}
              totalItems={filteredTreEmList.length}
              color="green"
            />
            </div>
                            </div>
          </div>
        )}

      {/* Thiết bị Popup */}
      {showThietBiPopup && selectedTreEmForPopup && selectedPhuHuynhForPopup && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-purple-50 to-purple-100">
              <div className="flex items-center">
                <button
                  onClick={handleCloseThietBiPopup}
                  className="mr-4 p-2 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" style={{color: '#9333ea'}} />
                </button>
                <div>
                  <h2 className="text-2xl font-bold" style={{color: '#6b21a8'}}>
                    Thiết bị của {selectedTreEmForPopup.ten_tre} - {selectedPhuHuynhForPopup.ten_phu_huynh}
                  </h2>
                  <p className="text-sm" style={{color: '#9333ea'}}>
                    Trẻ em: {selectedTreEmForPopup.ten_tre} • Phụ huynh: {selectedPhuHuynhForPopup.ten_phu_huynh}
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseThietBiPopup}
                className="p-2 rounded-lg hover:bg-purple-200 transition-colors"
              >
                <X className="w-5 h-5" style={{color: '#9333ea'}} />
              </button>
            </div>

            {/* Filter Section */}
            <div className="p-6 border-b bg-gray-50">
              {/* Filter Header with Toggle Button */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold" style={{color: '#1f2937'}}>Bộ lọc thiết bị</h3>
                {/* Mobile Toggle Button */}
                <button
                  onClick={() => setShowThietBiFilters(!showThietBiFilters)}
                  className="lg:hidden flex items-center px-3 py-2 text-sm font-medium rounded-lg border transition-all"
                  style={{ 
                    color: showThietBiFilters ? '#9333ea' : '#6b7280',
                    borderColor: showThietBiFilters ? '#d8b4fe' : '#d1d5db',
                    backgroundColor: showThietBiFilters ? '#faf5ff' : '#ffffff'
                  }}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                  </svg>
                  {showThietBiFilters ? 'Ẩn bộ lọc' : 'Hiện bộ lọc'}
                </button>
              </div>
              
              {/* Filter Content - Hidden on mobile by default */}
              <div className={`${showThietBiFilters ? 'block' : 'hidden'} lg:block`}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{color: '#374151'}}>Tên thiết bị</label>
                    <SearchableInput
                      value={thietBiFilters.tenThietBi}
                      onChange={(value) => setThietBiFilters({...thietBiFilters, tenThietBi: value})}
                      placeholder="Tìm theo tên..."
                      options={getThietBiNameOptions()}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{color: '#374151'}}>Loại thiết bị</label>
                    <SearchableInput
                      value={thietBiFilters.loaiThietBi}
                      onChange={(value) => setThietBiFilters({...thietBiFilters, loaiThietBi: value})}
                      placeholder="Tìm theo loại..."
                      options={getThietBiTypeOptions()}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{color: '#374151'}}>Mã thiết bị</label>
                    <SearchableInput
                      value={thietBiFilters.maThietBi}
                      onChange={(value) => setThietBiFilters({...thietBiFilters, maThietBi: value})}
                      placeholder="Tìm theo mã..."
                      options={getThietBiCodeOptions()}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{color: '#374151'}}>Gói dịch vụ</label>
                    <SearchableInput
                      value={thietBiFilters.goiDichVu}
                      onChange={(value) => setThietBiFilters({...thietBiFilters, goiDichVu: value})}
                      placeholder="Tìm theo gói..."
                      options={getGoiDichVuOptions()}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 pb-8 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-lg font-bold" style={{color: '#ffffff'}}>TB</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowThietBiForm(true);
                  setEditingItem(null);
                  resetThietBiForm();
                }}
                className="px-3 sm:px-4 py-2 rounded-lg transition-all flex items-center font-medium shadow-md hover:shadow-lg min-w-fit"
                style={{ backgroundColor: '#9333ea', color: '#ffffff' }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = '#7c3aed'; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = '#9333ea'; }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Thêm thiết bị
              </button>
            </div>

            {/* Devices Table - Desktop */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-gradient-to-r from-purple-50 to-purple-100">
                  <tr>
                    <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wider min-w-[200px]" style={{color: '#374151'}}>Thiết bị</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wider min-w-[120px]" style={{color: '#374151'}}>Loại</th>
                    <th className="px-4 py-4 text-left text-sm font-semibold uppercase tracking-wider min-w-[150px]" style={{color: '#374151'}}>Mã thiết bị</th>
                    <th className="px-4 py-4 text-center text-sm font-semibold uppercase tracking-wider min-w-[200px]" style={{color: '#374151'}}>Gói dịch vụ</th>
                    <th className="px-4 py-4 text-center text-sm font-semibold uppercase tracking-wider min-w-[200px]" style={{color: '#374151'}}>Thao tác</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: '#ffffff', borderTopColor: '#e5e7eb' }}>
                    {getPaginatedData(filteredThietBiList, thietBiPagination).map((thietBi) => {
                                        const activeGoi = getActiveGoi(thietBi);
                                        return (
                      <tr key={thietBi.nguoi_dung_id} className="hover:bg-purple-50 transition-colors">
                        <td className="px-4 py-4">
                                              <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mr-4 shadow-md">
                              <span className="text-sm font-bold" style={{color: '#ffffff'}}>TB</span>
                                                </div>
                                                <div>
                              <div className="text-base font-semibold" style={{color: '#111827'}}>
                                                    {thietBi.ten_thiet_bi || 'Chưa đặt tên'}
                                                      </div>
                              <div className="text-sm" style={{color: '#6b7280'}}>ID: {thietBi.nguoi_dung_id}</div>
                                                    </div>
                                                </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm font-medium" style={{color: '#111827'}}>{thietBi.loai_thiet_bi || 'Chưa xác định'}</div>
                          <div className="text-xs" style={{color: '#6b7280'}}>Loại thiết bị</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm font-medium font-mono" style={{color: '#111827'}}>{thietBi.ma_thiet_bi || 'Chưa có mã'}</div>
                          <div className="text-xs" style={{color: '#6b7280'}}>Mã định danh</div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          {activeGoi && activeGoi.thongTinGoi && activeGoi.thong_tin_goi_id ? (
                            <div className="inline-flex flex-col items-center">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-md mb-1" style={{ background: 'linear-gradient(to right, #4ade80, #22c55e)', color: '#ffffff' }}>
                                {activeGoi.thongTinGoi.ten}
                              </span>
                              <div className="text-xs" style={{color: '#4b5563'}}>
                                {formatPrice(activeGoi.thongTinGoi.gia)}
                                              </div>
                              <div className="text-xs" style={{color: '#6b7280'}}>
                                {new Date(activeGoi.ngay_bat_dau).toLocaleDateString('vi-VN')} - {new Date(activeGoi.ngay_ket_thuc).toLocaleDateString('vi-VN')}
                              </div>
                            </div>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-md" style={{ background: 'linear-gradient(to right, #9ca3af, #6b7280)', color: '#ffffff' }}>
                              Chưa có gói
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
                                                <button
                                                  onClick={() => openEditForm('thietBi', thietBi)}
                              className="text-xs px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border transition-all font-medium flex items-center min-w-fit shadow-sm"
                              style={{ color: '#2563eb', borderColor: '#93c5fd', backgroundColor: '#ffffff' }}
                              onMouseEnter={(e) => { e.target.style.color = '#1d4ed8'; e.target.style.backgroundColor = '#dbeafe'; }}
                              onMouseLeave={(e) => { e.target.style.color = '#2563eb'; e.target.style.backgroundColor = '#ffffff'; }}
                                                >
                                                  <Edit className="w-3 h-3 mr-1 flex-shrink-0" />
                                                  <span className="hidden sm:inline">Sửa</span>
                                                </button>
                                                <button
                                                  onClick={() => {
                                                    setSelectedThietBi(thietBi);
                                                    setChangePackageForm({ selectedGoiId: '' });
                                                    setShowChangePackageForm(true);
                                                  }}
                              className="text-orange-600 hover:text-orange-800 text-xs px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-orange-200 hover:bg-orange-50 transition-all font-medium flex items-center min-w-fit bg-white shadow-sm"
                                                >
                                                  <Package className="w-3 h-3 mr-1 flex-shrink-0" />
                                                  <span className="hidden sm:inline">Đổi gói</span>
                                                </button>
                                                <button
                                                  onClick={() => {
                                                    setSelectedThietBiForGoi(thietBi);
                                                    setShowGoiManagement(true);
                                                  }}
                              className="text-xs px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border transition-all font-medium flex items-center min-w-fit bg-white shadow-sm"
                              style={{ color: '#9333ea', borderColor: '#d8b4fe', backgroundColor: '#ffffff' }}
                                                >
                                                  <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                                                  <span className="hidden sm:inline">Quản lý gói</span>
                                                </button>
                                                <button
                                                  onClick={() => handleDeleteThietBi(thietBi.nguoi_dung_id)}
                              className="text-xs px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border transition-all font-medium flex items-center min-w-fit bg-white shadow-sm"
                              style={{ color: '#dc2626', borderColor: '#fecaca', backgroundColor: '#ffffff' }}
                                                >
                                                  <Trash2 className="w-3 h-3 mr-1" />
                                                  Xóa
                                                </button>
                                              </div>
                        </td>
                      </tr>
                                        );
                  })}
                </tbody>
              </table>
            </div>

            {/* Devices Cards - Mobile */}
            <div className="lg:hidden space-y-4">
              {getPaginatedData(filteredThietBiList, thietBiPagination).map((thietBi) => {
                const activeGoi = getActiveGoi(thietBi);
                return (
                  <div key={thietBi.nguoi_dung_id} className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                    {/* Header with Avatar and Basic Info */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mr-3 shadow-md">
                          <span className="text-sm font-bold" style={{color: '#ffffff'}}>TB</span>
                        </div>
                        <div>
                          <div className="text-lg font-semibold" style={{color: '#111827'}}>
                            {thietBi.ten_thiet_bi || 'Chưa đặt tên'}
                          </div>
                          <div className="text-sm" style={{color: '#6b7280'}}>ID: {thietBi.nguoi_dung_id}</div>
                        </div>
                      </div>
                      {activeGoi && activeGoi.thongTinGoi && activeGoi.thong_tin_goi_id ? (
                        <div className="text-right">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold shadow-md" style={{ background: 'linear-gradient(to right, #4ade80, #22c55e)', color: '#ffffff' }}>
                            {activeGoi.thongTinGoi.ten}
                          </span>
                        </div>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold shadow-md" style={{ background: 'linear-gradient(to right, #9ca3af, #6b7280)', color: '#ffffff' }}>
                          Chưa có gói
                        </span>
                      )}
                    </div>

                    {/* Information Grid */}
                    <div className="grid grid-cols-1 gap-3 mb-4">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" style={{ color: '#6b7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <div>
                          <div className="text-sm font-medium" style={{color: '#111827'}}>{thietBi.loai_thiet_bi || 'Chưa xác định'}</div>
                          <div className="text-xs" style={{color: '#6b7280'}}>Loại thiết bị</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" style={{ color: '#6b7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                        </svg>
                        <div>
                          <div className="text-sm font-medium font-mono" style={{color: '#111827'}}>{thietBi.ma_thiet_bi || 'Chưa có mã'}</div>
                          <div className="text-xs" style={{color: '#6b7280'}}>Mã định danh</div>
                        </div>
                      </div>
                    </div>

                    {/* Package Information */}
                    {activeGoi && activeGoi.thongTinGoi && activeGoi.thong_tin_goi_id && (
                      <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-sm font-medium text-green-800 mb-1">Gói dịch vụ hiện tại:</div>
                        <div className="text-sm text-green-700">
                          <div className="font-semibold">{activeGoi.thongTinGoi.ten}</div>
                          <div className="text-xs">{formatPrice(activeGoi.thongTinGoi.gia)}</div>
                          <div className="text-xs">
                            {new Date(activeGoi.ngay_bat_dau).toLocaleDateString('vi-VN')} - {new Date(activeGoi.ngay_ket_thuc).toLocaleDateString('vi-VN')}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => openEditForm('thietBi', thietBi)}
                        className="flex-1 text-xs px-3 py-2 rounded-lg border transition-all font-medium flex items-center justify-center shadow-sm"
                        style={{ color: '#2563eb', borderColor: '#93c5fd', backgroundColor: '#ffffff' }}
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Sửa
                      </button>
                      <button
                        onClick={() => {
                          setSelectedThietBi(thietBi);
                          setChangePackageForm({ selectedGoiId: '' });
                          setShowChangePackageForm(true);
                        }}
                        className="flex-1 text-xs px-3 py-2 rounded-lg border transition-all font-medium flex items-center justify-center shadow-sm"
                        style={{ color: '#f97316', borderColor: '#fed7aa', backgroundColor: '#ffffff' }}
                      >
                        <Package className="w-3 h-3 mr-1" />
                        Đổi gói
                      </button>
                      <button
                        onClick={() => {
                          setSelectedThietBiForGoi(thietBi);
                          setShowGoiManagement(true);
                        }}
                        className="flex-1 text-xs px-3 py-2 rounded-lg border transition-all font-medium flex items-center justify-center shadow-sm"
                        style={{ color: '#9333ea', borderColor: '#d8b4fe', backgroundColor: '#ffffff' }}
                      >
                        <Calendar className="w-3 h-3 mr-1" />
                        Quản lý gói
                      </button>
                      <button
                        onClick={() => handleDeleteThietBi(thietBi.nguoi_dung_id)}
                        className="flex-1 text-xs px-3 py-2 rounded-lg border transition-all font-medium flex items-center justify-center shadow-sm"
                        style={{ color: '#dc2626', borderColor: '#fecaca', backgroundColor: '#ffffff' }}
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Xóa
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
                                          </div>
                                  </div>
                          </div>
                      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Xác thực mật khẩu</h3>
            <p className="text-sm mb-4" style={{color: '#4b5563'}}>
              Nhập mật khẩu để xem mật khẩu của phụ huynh
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu xác thực</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nhập mật khẩu xác thực"
              />
          </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordInput('');
                  setSelectedPhuHuynh(null);
                }}
                className="px-3 sm:px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-md hover:shadow-lg min-w-fit"
              >
                Hủy
              </button>
              <button
                onClick={handlePasswordSubmit}
                className="px-3 sm:px-4 py-2 rounded-lg transition-colors font-medium shadow-md hover:shadow-lg min-w-fit"
                style={{ backgroundColor: '#3b82f6', color: '#ffffff' }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = '#2563eb'; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = '#3b82f6'; }}
              >
                Xác nhận
              </button>
      </div>
          </div>
        </div>
      )}

      {/* Wallet Modal */}
      {showWalletModal && selectedPhuHuynhForWallet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-sky-50 to-sky-100">
              <div>
                <h2 className="text-2xl font-bold" style={{color: '#0c4a6e'}}>
                  Ví gói - {selectedPhuHuynhForWallet.ten_phu_huynh}
                </h2>
                <p className="text-sm" style={{color: '#0369a1'}}>
                  Email: {selectedPhuHuynhForWallet.email_phu_huynh}
                </p>
              </div>
              <button
                onClick={closeWalletModal}
                className="p-2 rounded-lg hover:bg-sky-200 transition-colors"
              >
                <X className="w-5 h-5" style={{color: '#0284c7'}} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {isLoadingWallet ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderBottomColor: '#0ea5e9' }}></div>
                  <span className="ml-3" style={{ color: '#0c4a6e' }}>Đang tải ví gói...</span>
                </div>
              ) : walletError ? (
                <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: '#fef2f2', borderColor: '#fecaca', border: '1px solid' }}>
                  <div className="flex items-center">
                    <span className="mr-2" style={{ color: '#ef4444' }}>⚠️</span>
                    <span style={{ color: '#b91c1c' }}>{walletError}</span>
                  </div>
                </div>
              ) : walletPackages.length === 0 ? (
                <div className="text-center py-12" style={{color: '#6b7280'}}>
                  <div className="text-6xl mb-4">🎁</div>
                  <h3 className="text-xl font-semibold mb-2">Chưa có gói chưa gán thiết bị</h3>
                  <p className="text-sm">Khi người dùng mua gói, gói sẽ xuất hiện ở đây để gán vào thiết bị.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {walletPackages.map((pkg) => (
                    <div key={pkg.id} className="border rounded-lg p-4 shadow-sm bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-base font-semibold" style={{color: '#0f172a'}}>{pkg?.thongTinGoi?.ten || 'Gói dịch vụ'}</div>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{backgroundColor: '#fef3c7', color: '#92400e'}}>Chưa gán</span>
                      </div>
                      <div className="text-sm" style={{color: '#334155'}}>
                        <div>Giá: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(pkg.gia || 0)}</div>
                        <div>Thời hạn: {pkg?.thongTinGoi?.thoi_han_thang || 0} tháng</div>
                        {pkg.vnp_txn_ref && (<div>Mã đơn hàng: {pkg.vnp_txn_ref}</div>)}
                        {pkg.ngay_mua && (<div>Ngày mua: {new Date(pkg.ngay_mua).toLocaleDateString('vi-VN')}</div>)}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          onClick={() => openAssignForm(pkg)}
                          className="text-xs px-3 py-2 rounded-lg border transition-all font-medium flex items-center min-w-fit shadow-sm"
                          style={{ color: '#0284c7', borderColor: '#7dd3fc', backgroundColor: '#ffffff' }}
                        >
                          <Smartphone className="w-4 h-4 mr-1" /> Gán vào thiết bị
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Assign Form */}
            {showAssignForm && selectedPackageForAssign && (
              <div className="p-6 border-t bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{color: '#374151'}}>Chọn mã thiết bị</label>
                    <select
                      value={assignDeviceCode}
                      onChange={(e) => setAssignDeviceCode(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    >
                      <option value="">-- Chọn từ thiết bị của phụ huynh --</option>
                      {getParentDeviceCodes(selectedPhuHuynhForWallet).map(code => (
                        <option key={code} value={code}>{code}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{color: '#374151'}}>Hoặc nhập mã thiết bị</label>
                    <input
                      type="text"
                      value={assignDeviceCode}
                      onChange={(e) => setAssignDeviceCode(e.target.value)}
                      placeholder="Nhập mã thiết bị..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={submitAssignPackage}
                      disabled={isLoadingWallet || !assignDeviceCode.trim()}
                      className="px-4 py-2 rounded-lg transition-colors disabled:opacity-50 font-medium shadow-md hover:shadow-lg min-w-fit"
                      style={{ backgroundColor: '#0ea5e9', color: '#ffffff' }}
                    >
                      {isLoadingWallet ? 'Đang gán...' : 'Gán gói'}
                    </button>
                    <button
                      onClick={() => { setShowAssignForm(false); setSelectedPackageForAssign(null); setAssignDeviceCode(''); }}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-md hover:shadow-lg min-w-fit"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Forms */}
      {/* Phụ huynh Form */}
      {showPhuHuynhForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingItem ? 'Sửa phụ huynh' : 'Thêm phụ huynh mới'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{color: '#374151'}}>Tên phụ huynh</label>
                <input
                  type="text"
                  value={phuHuynhForm.ten_phu_huynh}
                  onChange={(e) => setPhuHuynhForm({...phuHuynhForm, ten_phu_huynh: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{color: '#374151'}}>Email</label>
                <input
                  type="email"
                  value={phuHuynhForm.email_phu_huynh}
                  onChange={(e) => setPhuHuynhForm({...phuHuynhForm, email_phu_huynh: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{color: '#374151'}}>Số điện thoại</label>
                <input
                  type="tel"
                  value={phuHuynhForm.sdt}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    phoneError ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Ví dụ: 0123456789 hoặc +84123456789"
                />
                {phoneError && (
                  <p className="text-red-500 text-xs mt-1">{phoneError}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                <textarea
                  value={phuHuynhForm.dia_chi}
                  onChange={(e) => setPhuHuynhForm({...phuHuynhForm, dia_chi: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{color: '#374151'}}>
                  Mật khẩu {editingItem ? '(để trống nếu không muốn đổi)' : '*'}
                </label>
                <div className="relative">
                  <input
                    type={showPasswordInForm ? "text" : "password"}
                    value={phuHuynhForm.mat_khau}
                    onChange={(e) => {
                      setPhuHuynhForm({...phuHuynhForm, mat_khau: e.target.value});
                      validatePasswordRequirements(e.target.value);
                    }}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={editingItem ? "Nhập mật khẩu mới (tùy chọn)" : "Nhập mật khẩu"}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPasswordInForm(!showPasswordInForm)}
                  >
                    {showPasswordInForm ? (
                      <EyeOff className="h-4 w-4" style={{color: '#9ca3af'}} />
                    ) : (
                      <Eye className="h-4 w-4" style={{color: '#9ca3af'}} />
                    )}
                  </button>
                </div>
                
                {/* Password Requirements - only show if password is being entered */}
                {phuHuynhForm.mat_khau && (
                  <div className="mt-3 p-3 rounded-md space-y-2" style={{backgroundColor: '#f9fafb'}}>
                    <p className="text-sm font-medium" style={{color: '#374151'}}>Yêu cầu mật khẩu:</p>
                    <RequirementItem 
                      met={passwordRequirements.length} 
                      text="Ít nhất 6 ký tự" 
                    />
                    <RequirementItem 
                      met={passwordRequirements.uppercase} 
                      text="Có ít nhất 1 chữ in hoa (A-Z)" 
                    />
                    <RequirementItem 
                      met={passwordRequirements.lowercase} 
                      text="Có ít nhất 1 chữ in thường (a-z)" 
                    />
                    <RequirementItem 
                      met={passwordRequirements.number} 
                      text="Có ít nhất 1 chữ số (0-9)" 
                    />
                    <RequirementItem 
                      met={passwordRequirements.specialChar} 
                      text="Có ít nhất 1 ký tự đặc biệt (!@#$%^&*...)" 
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowPhuHuynhForm(false);
                  setEditingItem(null);
                  resetPhuHuynhForm();
                }}
                className="px-3 sm:px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-md hover:shadow-lg min-w-fit"
              >
                Hủy
              </button>
              <button
                onClick={() => editingItem ? handleUpdatePhuHuynh(editingItem.ma_phu_huynh) : handleCreatePhuHuynh()}
                disabled={isLoading}
                className="px-3 sm:px-4 py-2 rounded-lg transition-colors disabled:opacity-50 font-medium shadow-md hover:shadow-lg min-w-fit"
                style={{ backgroundColor: '#3b82f6', color: '#ffffff' }}
                onMouseEnter={(e) => { if (!e.target.disabled) e.target.style.backgroundColor = '#2563eb'; }}
                onMouseLeave={(e) => { if (!e.target.disabled) e.target.style.backgroundColor = '#3b82f6'; }}
              >
                {isLoading ? 'Đang xử lý...' : (editingItem ? 'Cập nhật' : 'Tạo mới')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trẻ em Form */}
      {showTreEmForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingItem ? 'Sửa trẻ em' : 'Thêm trẻ em mới'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên trẻ em</label>
                <input
                  type="text"
                  value={treEmForm.ten_tre}
                  onChange={(e) => setTreEmForm({...treEmForm, ten_tre: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lớp</label>
                <select
                  value={treEmForm.lop}
                  onChange={(e) => setTreEmForm({...treEmForm, lop: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Chọn lớp</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(lop => (
                    <option key={lop} value={lop}>{lop}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
                <select
                  value={treEmForm.gioi_tinh}
                  onChange={(e) => setTreEmForm({...treEmForm, gioi_tinh: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Chọn giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trường</label>
                <input
                  type="text"
                  value={treEmForm.truong}
                  onChange={(e) => setTreEmForm({...treEmForm, truong: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập tên trường..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label>
                <input
                  type="date"
                  value={treEmForm.ngay_sinh}
                  onChange={(e) => setTreEmForm({...treEmForm, ngay_sinh: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowTreEmForm(false);
                  setEditingItem(null);
                  resetTreEmForm();
                }}
                className="px-3 sm:px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-md hover:shadow-lg min-w-fit"
              >
                Hủy
              </button>
              <button
                onClick={() => editingItem ? handleUpdateTreEm(editingItem.ma_tre_em) : handleCreateTreEm(selectedPhuHuynhForPopup?.ma_phu_huynh)}
                disabled={isLoading}
                className="px-3 sm:px-4 py-2 rounded-lg transition-colors disabled:opacity-50 font-medium shadow-md hover:shadow-lg min-w-fit"
                style={{ backgroundColor: '#22c55e', color: '#ffffff' }}
                onMouseEnter={(e) => { if (!e.target.disabled) e.target.style.backgroundColor = '#16a34a'; }}
                onMouseLeave={(e) => { if (!e.target.disabled) e.target.style.backgroundColor = '#22c55e'; }}
              >
                {isLoading ? 'Đang xử lý...' : (editingItem ? 'Cập nhật' : 'Tạo mới')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Thiết bị Form */}
      {showThietBiForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingItem ? 'Sửa thiết bị' : 'Thêm thiết bị mới'}
            </h3>
            
            {/* Error Message */}
            {thietBiError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {thietBiError}
                </div>
              </div>
            )}
            
            {/* Success Message */}
            {thietBiSuccess && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {thietBiSuccess}
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên thiết bị</label>
                <input
                  type="text"
                  value={thietBiForm.ten_thiet_bi}
                  onChange={(e) => setThietBiForm({...thietBiForm, ten_thiet_bi: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loại thiết bị</label>
                <select
                  value={thietBiForm.loai_thiet_bi}
                  onChange={(e) => setThietBiForm({...thietBiForm, loai_thiet_bi: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Chọn loại thiết bị</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Desktop">Desktop</option>
                  <option value="Tablet">Tablet</option>
                  <option value="Mobile">Mobile</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mã thiết bị</label>
                <input
                  type="text"
                  value={thietBiForm.ma_thiet_bi}
                  onChange={(e) => setThietBiForm({...thietBiForm, ma_thiet_bi: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowThietBiForm(false);
                  setEditingItem(null);
                  resetThietBiForm();
                }}
                className="px-3 sm:px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-md hover:shadow-lg min-w-fit"
              >
                Hủy
              </button>
              <button
                onClick={() => editingItem ? handleUpdateThietBi(editingItem.nguoi_dung_id) : handleCreateThietBi(selectedTreEmForPopup?.ma_tre_em)}
                disabled={isLoading}
                className="px-3 sm:px-4 py-2 rounded-lg transition-colors disabled:opacity-50 font-medium shadow-md hover:shadow-lg min-w-fit"
                style={{ backgroundColor: '#8b5cf6', color: '#ffffff' }}
                onMouseEnter={(e) => { if (!e.target.disabled) e.target.style.backgroundColor = '#7c3aed'; }}
                onMouseLeave={(e) => { if (!e.target.disabled) e.target.style.backgroundColor = '#8b5cf6'; }}
              >
                {isLoading ? 'Đang xử lý...' : (editingItem ? 'Cập nhật' : 'Tạo mới')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Package Form */}
      {showChangePackageForm && selectedThietBi && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Đổi gói cho thiết bị</h3>
            
            {/* Current Package Info */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Thiết bị hiện tại:</h4>
              <p className="text-sm text-gray-600">
                <strong>{selectedThietBi.ten_thiet_bi || 'Chưa đặt tên'}</strong>
              </p>
              <p className="text-sm text-gray-600">
                {selectedThietBi.loai_thiet_bi || 'Chưa xác định'} • {selectedThietBi.ma_thiet_bi || 'Chưa có mã'}
              </p>
              {getActiveGoi(selectedThietBi) && getActiveGoi(selectedThietBi).thongTinGoi && getActiveGoi(selectedThietBi).thong_tin_goi_id ? (
                <div className="mt-2 p-2 bg-green-50 rounded border border-green-200">
                  <p className="text-sm text-green-800">
                    <strong>Gói hiện tại:</strong> {getActiveGoi(selectedThietBi).thongTinGoi.ten}
                  </p>
                  <p className="text-xs text-green-600">
                    {formatPrice(getActiveGoi(selectedThietBi).thongTinGoi.gia)} • 
                    {getActiveGoi(selectedThietBi).thongTinGoi.loai_goi === 'TRA_PHI' ? 'Trả phí' : 'Miễn phí'}
                  </p>
                </div>
              ) : (
                <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-200">
                  <p className="text-sm text-gray-600">
                    <strong>Trạng thái:</strong> Chưa có gói dịch vụ
                  </p>
                </div>
              )}
            </div>

            {/* Package Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Chọn gói mới:</label>
              <select
                value={changePackageForm.selectedGoiId}
                onChange={(e) => setChangePackageForm({...changePackageForm, selectedGoiId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">-- Chọn gói mới --</option>
                {goiList.map((goi) => (
                  <option key={goi.id} value={goi.id}>
                    {goi.ten} - {formatPrice(goi.gia)} ({goi.loai_goi === 'TRA_PHI' ? 'Trả phí' : 'Miễn phí'})
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Package Info */}
            {changePackageForm.selectedGoiId && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                {(() => {
                  const selectedGoi = goiList.find(goi => goi.id === parseInt(changePackageForm.selectedGoiId));
                  return selectedGoi ? (
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">Gói được chọn:</h4>
                      <p className="text-sm text-blue-800">
                        <strong>{selectedGoi.ten}</strong>
                      </p>
                      <p className="text-sm text-blue-700">
                        {formatPrice(selectedGoi.gia)} • {selectedGoi.loai_goi === 'TRA_PHI' ? 'Trả phí' : 'Miễn phí'} • 
                        {selectedGoi.thoi_han_thang} tháng
                      </p>
                      {selectedGoi.mo_ta && (
                        <p className="text-xs text-blue-600 mt-1">{selectedGoi.mo_ta}</p>
                      )}
                    </div>
                  ) : null;
                })()}
              </div>
            )}

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowChangePackageForm(false);
                  setSelectedThietBi(null);
                  setChangePackageForm({ selectedGoiId: '' });
                }}
                className="px-3 sm:px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-md hover:shadow-lg min-w-fit"
              >
                Hủy
              </button>
              <button
                onClick={handleChangePackage}
                disabled={isLoading || !changePackageForm.selectedGoiId}
                className="px-3 sm:px-4 py-2 rounded-lg transition-colors disabled:opacity-50 font-medium shadow-md hover:shadow-lg min-w-fit"
                style={{ backgroundColor: '#f97316', color: '#ffffff' }}
                onMouseEnter={(e) => { if (!e.target.disabled) e.target.style.backgroundColor = '#ea580c'; }}
                onMouseLeave={(e) => { if (!e.target.disabled) e.target.style.backgroundColor = '#f97316'; }}
              >
                {isLoading ? 'Đang xử lý...' : 'Đổi gói'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Goi Management Modal */}
      {showGoiManagement && selectedThietBiForGoi && (
        <GoiManagement
          maThietBi={selectedThietBiForGoi.ma_thiet_bi}
          onClose={handleCloseGoiManagement}
          onDataUpdated={handleGoiDataUpdated}
        />
      )}
    </div>
  );
};

export default MultiLevelDropdown;
