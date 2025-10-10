import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import Navbar from '../components/Navbar';
import heroImg from '../assets/hero_img.png';
import heroWinImg from '../assets/hero_win.png';

const WalletPage = () => {
    const navigate = useNavigate();
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [filters, setFilters] = useState({
        search: '',
        sortBy: 'ngay_mua', // ngay_mua, gia, ten
        sortOrder: 'desc', // asc, desc
        priceRange: 'all' // all, under_100k, 100k_500k, over_500k
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Lấy thông tin user hiện tại
                const userResponse = await apiService.getCurrentUser();
                if (userResponse.success) {
                    setUserInfo(userResponse.data);
                    
                    // Lấy các gói chưa gán thiết bị
                    const packagesResponse = await apiService.getUnassignedPackages(userResponse.data.ma_phu_huynh);
                    if (packagesResponse.success) {
                        setPackages(packagesResponse.data);
                    }
                }
            } catch (error) {
                console.error('Error fetching wallet data:', error);
                setError('Không thể tải dữ liệu ví gói');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    const getPackageDuration = (thoiHanThang) => {
        if (thoiHanThang === 1) return '1 THÁNG';
        if (thoiHanThang === 12) return '1 NĂM';
        if (thoiHanThang === 24) return '2 NĂM';
        return `${thoiHanThang} THÁNG`;
    };

    const handleAssignDevice = (packageId) => {
        // TODO: Implement device assignment logic
        console.log('Assign device for package:', packageId);
        // Có thể mở modal để nhập mã thiết bị hoặc chọn từ danh sách
    };

    // Filter and sort packages
    const getFilteredPackages = () => {
        let filtered = [...packages];

        // Search filter
        if (filters.search) {
            filtered = filtered.filter(pkg => 
                pkg.thongTinGoi?.ten?.toLowerCase().includes(filters.search.toLowerCase()) ||
                pkg.vnp_txn_ref?.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        // Price range filter
        if (filters.priceRange !== 'all') {
            filtered = filtered.filter(pkg => {
                const price = pkg.gia;
                switch (filters.priceRange) {
                    case 'under_100k':
                        return price < 100000;
                    case '100k_500k':
                        return price >= 100000 && price <= 500000;
                    case 'over_500k':
                        return price > 500000;
                    default:
                        return true;
                }
            });
        }

        // Sort packages
        filtered.sort((a, b) => {
            let aValue, bValue;
            
            switch (filters.sortBy) {
                case 'gia':
                    aValue = a.gia;
                    bValue = b.gia;
                    break;
                case 'ten':
                    aValue = a.thongTinGoi?.ten || '';
                    bValue = b.thongTinGoi?.ten || '';
                    break;
                case 'ngay_mua':
                default:
                    aValue = new Date(a.ngay_mua);
                    bValue = new Date(b.ngay_mua);
                    break;
            }

            if (filters.sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        return filtered;
    };

    const filteredPackages = getFilteredPackages();

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 mx-auto mb-4" style={{borderBottomColor: '#2563eb', borderBottomWidth: '2px'}}></div>
                        <p style={{color: '#4b5563'}}>Đang tải ví gói...</p>
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                    <div className="text-center">
                        <div style={{color: '#ef4444', fontSize: '3.75rem'}} className="mb-4">⚠️</div>
                        <h2 className="text-2xl font-bold mb-2" style={{color: '#1f2937'}}>Có lỗi xảy ra</h2>
                        <p className="mb-4" style={{color: '#4b5563'}}>{error}</p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-3 rounded-lg transition-colors"
                            style={{backgroundColor: '#2563eb', color: '#ffffff'}}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
                        >
                            Về trang chủ
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen py-8" style={{background: 'linear-gradient(to bottom right, #dbeafe, #e0e7ff)'}}>
            <div className="container mx-auto px-4">
                {/* Header */}

                {/* User Info */}
                <div className="mx-auto mb-8">
                    <div className="rounded-2xl p-6 shadow-lg" style={{backgroundColor: '#ffffff'}}>
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-4">
                                    <span className="text-xl font-bold" style={{color: '#ffffff'}}>
                                        {userInfo?.ten_phu_huynh?.charAt(0) || 'U'}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold" style={{color: '#1f2937'}}>{userInfo?.ten_phu_huynh}</h3>
                                    <p style={{color: '#4b5563'}}>{userInfo?.email_phu_huynh}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm" style={{color: '#6b7280'}}>Tổng gói chưa gán</p>
                                <p className="text-2xl font-bold" style={{color: '#2563eb'}}>{packages.length}</p>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="border-t pt-6" style={{borderColor: '#e5e7eb'}}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {/* Search */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{color: '#374151'}}>Tìm kiếm</label>
                                    <input
                                        type="text"
                                        placeholder="Tên gói hoặc mã đơn..."
                                        value={filters.search}
                                        onChange={(e) => setFilters({...filters, search: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Sort By */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{color: '#374151'}}>Sắp xếp theo</label>
                                    <select
                                        value={filters.sortBy}
                                        onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="ngay_mua">Ngày mua</option>
                                        <option value="gia">Giá</option>
                                        <option value="ten">Tên gói</option>
                                    </select>
                                </div>

                                {/* Sort Order */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{color: '#374151'}}>Thứ tự</label>
                                    <select
                                        value={filters.sortOrder}
                                        onChange={(e) => setFilters({...filters, sortOrder: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="desc">Mới nhất</option>
                                        <option value="asc">Cũ nhất</option>
                                    </select>
                                </div>

                                {/* Price Range */}
                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{color: '#374151'}}>Khoảng giá</label>
                                    <select
                                        value={filters.priceRange}
                                        onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="all">Tất cả</option>
                                        <option value="under_100k">Dưới 100k</option>
                                        <option value="100k_500k">100k - 500k</option>
                                        <option value="over_500k">Trên 500k</option>
                                    </select>
                                </div>
                            </div>

                            {/* Results Count */}
                            <div className="mt-4 flex justify-between items-center">
                                <p className="text-sm" style={{color: '#4b5563'}}>
                                    Hiển thị {filteredPackages.length} / {packages.length} gói
                                </p>
                                <button
                                    onClick={() => setFilters({
                                        search: '',
                                        sortBy: 'ngay_mua',
                                        sortOrder: 'desc',
                                        priceRange: 'all'
                                    })}
                                    className="text-sm font-medium"
                                    style={{color: '#2563eb'}}
                                    onMouseEnter={(e) => e.target.style.color = '#1d4ed8'}
                                    onMouseLeave={(e) => e.target.style.color = '#2563eb'}
                                >
                                    Xóa bộ lọc
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Packages Grid */}
                <div className="mx-auto">
                    {packages.length === 0 ? (
                        <div className="text-center py-12">
                            <div style={{color: '#9ca3af', fontSize: '3.75rem'}} className="mb-4">📦</div>
                            <h3 className="text-2xl font-bold mb-2" style={{color: '#1f2937'}}>Chưa có gói nào</h3>
                            <p className="mb-6" style={{color: '#4b5563'}}>Bạn chưa có gói dịch vụ nào chưa được gán thiết bị</p>
                            <button
                                onClick={() => navigate('/')}
                                className="px-6 py-3 rounded-lg transition-colors"
                                style={{backgroundColor: '#2563eb', color: '#ffffff'}}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
                            >
                                Mua gói dịch vụ
                            </button>
                        </div>
                    ) : filteredPackages.length === 0 ? (
                        <div className="text-center py-12">
                            <div style={{color: '#9ca3af', fontSize: '3.75rem'}} className="mb-4">🔍</div>
                            <h3 className="text-2xl font-bold mb-2" style={{color: '#1f2937'}}>Không tìm thấy gói</h3>
                            <p className="mb-6" style={{color: '#4b5563'}}>Không có gói nào phù hợp với bộ lọc hiện tại</p>
                            <button
                                onClick={() => setFilters({
                                    search: '',
                                    sortBy: 'ngay_mua',
                                    sortOrder: 'desc',
                                    priceRange: 'all'
                                })}
                                className="px-6 py-3 rounded-lg transition-colors"
                                style={{backgroundColor: '#2563eb', color: '#ffffff'}}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
                            >
                                Xóa bộ lọc
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPackages.map((pkg) => (
                                <div key={pkg.id} className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow" style={{backgroundColor: '#ffffff'}}>
                                    {/* Package Header */}
                                    <div className="text-center mb-4">
                                        <div className="rounded-full px-4 py-2 text-center mb-3 inline-block" 
                                             style={{background: 'linear-gradient(to right, #3b82f6, #4ade80)'}}>
                                            <span className="font-bold" style={{color: '#ffffff'}}>{getPackageDuration(pkg.thongTinGoi?.thoi_han_thang)}</span>
                                        </div>
                                        <h3 className="text-lg font-bold mb-1" style={{color: '#1f2937'}}>{pkg.thongTinGoi?.ten}</h3>
                                        <p className="text-sm" style={{color: '#4b5563'}}>{pkg.thongTinGoi?.mo_ta}</p>
                                    </div>

                                    {/* Package Details */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between text-sm">
                                            <span style={{color: '#4b5563'}}>Giá:</span>
                                            <span className="font-semibold" style={{color: '#16a34a'}}>{formatPrice(pkg.gia)} VND</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span style={{color: '#4b5563'}}>Ngày mua:</span>
                                            <span className="font-semibold">{new Date(pkg.ngay_mua).toLocaleDateString('vi-VN')}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span style={{color: '#4b5563'}}>Mã đơn:</span>
                                            <span className="font-semibold text-xs">{pkg.vnp_txn_ref}</span>
                                        </div>
                                    </div>

                                    {/* Features Preview */}
                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold mb-2" style={{color: '#1f2937'}}>Tính năng:</h4>
                                        <div className="space-y-1">
                                            {pkg.thongTinGoi?.noiDungList?.slice(0, 3).map((feature, idx) => (
                                                <div key={idx} className="flex items-center">
                                                    <div className="w-3 h-3 rounded-full mr-2 flex-shrink-0" style={{backgroundColor: '#3b82f6'}}></div>
                                                    <span className="text-xs" style={{color: '#4b5563'}}>{feature.noi_dung}</span>
                                                </div>
                                            ))}
                                            {pkg.thongTinGoi?.noiDungList?.length > 3 && (
                                                <div className="text-xs italic" style={{color: '#6b7280'}}>
                                                    +{pkg.thongTinGoi.noiDungList.length - 3} tính năng khác
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Hero Image */}
                                    <div className="flex justify-center mb-4">
                                        <img src={heroImg} alt="Hero fighting virus" className="w-20 h-20 object-contain" />
                                    </div>

                                    {/* Action Button */}
                                    {/* <button
                                        onClick={() => handleAssignDevice(pkg.id)}
                                        className="w-full py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                                        style={{background: 'linear-gradient(to right, #f97316, #ea580c)', color: 'white'}}
                                    >
                                        Gán Thiết Bị
                                    </button> */}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Back Button */}
                <div className="text-center mt-8">
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 rounded-lg transition-colors"
                        style={{backgroundColor: '#4b5563', color: '#ffffff'}}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#374151'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#4b5563'}
                    >
                        Về trang chủ
                    </button>
                </div>
            </div>
            </div>
        </>
    );
};

export default WalletPage;
