import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logoImage from '/logo.png'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isCountryOpen, setIsCountryOpen] = useState(false)
    const navigate = useNavigate()
    
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    const userType = localStorage.getItem('userType')

    return (
        <div className="w-full">
            <header
                aria-label="Menu điều hướng chính"
                role="navigation"
                className="shadow-lg sticky top-0 z-50 font-sans"
                style={{backgroundColor: 'white'}}
            >
                <div className="w-full px-3 sm:px-4 lg:px-8">
                    <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <button
                                onClick={() => navigate('/')}
                                className="flex items-center space-x-2 sm:space-x-3 transition-colors"
                                style={{color: '#2563eb'}}
                                onMouseEnter={(e) => e.target.style.color = '#1d4ed8'}
                                onMouseLeave={(e) => e.target.style.color = '#2563eb'}
                            >
                                <div className="flex items-center space-x-1 sm:space-x-2">
                                    <img 
                                        src={logoImage} 
                                        alt="Kidolock Logo" 
                                        className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 object-contain"
                                    />
                                    <span className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight" style={{color: '#111827'}}>idolock</span>
                                </div>
                                <span className="sr-only">Logo Kidolock</span>
                            </button>
                        </div>
                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex space-x-8 flex-1 justify-center">
                            <div className="relative group">
                                <button className="px-4 py-3 text-base font-medium transition-colors rounded-md" style={{color: '#374151'}} onMouseEnter={(e) => e.target.style.color = '#2563eb'} onMouseLeave={(e) => e.target.style.color = '#374151'}>
                                    Dành cho gia đình
                                </button>
                                <div className="absolute left-0 mt-2 w-[900px] sm:w-[700px] md:w-[800px] lg:w-[900px] rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border" style={{backgroundColor: 'white', borderColor: '#e5e7eb'}}>
                                    <div className="p-4 sm:p-6 lg:p-8">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                                            {/* Cột 1: Giải pháp bảo mật */}
                                            <div>
                                                <h3 className="text-2xl font-bold mb-8 tracking-tight" style={{color: '#111827'}}>Giải pháp bảo mật</h3>
                                                
                                                <div className="space-y-8">
                                                    <div>
                                                        <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{color: '#9ca3af'}}>BẢO VỆ CAO CẤP</div>
                                                        <a href="/premium" className="block group">
                                                            <div className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors" style={{color: '#111827'}}>Kidolock Premium</div>
                                                            <div className="inline-block bg-purple-100 text-purple-800 text-xs font-bold px-4 py-2 rounded-full mb-3">SẢN PHẨM BÁN CHẠY NHẤT</div>
                                                            <div className="text-sm text-gray-600 leading-relaxed">Bảo vệ toàn diện cho các thiết bị, quyền riêng tư & danh tính trực tuyến của bạn</div>
                                                        </a>
                                                    </div>
                                                    
                                                    <div>
                                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">BẢO VỆ NÂNG CAO</div>
                                                        <a href="/plus" className="block group">
                                                            <div className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Kidolock Plus</div>
                                                            <div className="text-sm text-gray-600 leading-relaxed">Kết hợp các tính năng bảo mật, hiệu năng & quyền riêng tư trong một ứng dụng</div>
                                                        </a>
                                                    </div>
                                                    
                                                    <div>
                                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">BẢO VỆ TIÊU CHUẨN</div>
                                                        <a href="/standard" className="block group">
                                                            <div className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Kidolock Standard</div>
                                                            <div className="text-sm text-gray-600 leading-relaxed">Bảo vệ nâng cao kèm công cụ tăng cường hiệu năng thiết bị</div>
                                                        </a>
                                                    </div>
                                                </div>
                                                
                                                <div className="mt-8 pt-6 border-t border-gray-200">
                                                    <a href="/home-security" className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center group">
                                                        Xem tất cả các giải pháp 
                                                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                            
                                            {/* Cột 2: Quyền riêng tư & Trẻ nhỏ */}
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Quyền riêng tư & Trẻ nhỏ</h3>
                                                
                                                <div className="space-y-8">
                                                    <div>
                                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">CHỨC NĂNG QUẢN LÝ NGƯỜI DÙNG</div>
                                                        <a href="/safe-kids" className="block group">
                                                            <div className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Kidolock Safe Kids</div>
                                                            <div className="text-sm text-gray-600 leading-relaxed">Giải pháp kiểm soát linh hoạt dành cho cha mẹ & thiết bị theo dõi qua GPS dành cho con bạn.</div>
                                                        </a>
                                                    </div>
                                                    
                                                    <div>
                                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">VPN</div>
                                                        <a href="/vpn" className="block group">
                                                            <div className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Kidolock VPN Secure Connection</div>
                                                            <div className="text-sm text-gray-600 leading-relaxed">VPN riêng tư và bảo mật để tận hưởng internet mà không phải đánh đổi bằng tốc độ.</div>
                                                        </a>
                                                    </div>
                                                    
                                                    <div>
                                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">BẢO VỆ MẬT KHẨU</div>
                                                        <a href="/password-manager" className="block group">
                                                            <div className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Kidolock Password Manager</div>
                                                            <div className="text-sm text-gray-600 leading-relaxed">Kho bảo mật cấp ngân hàng cho mật khẩu & tài liệu của bạn.</div>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Cột 3: Hỗ trợ & Tải xuống */}
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Hỗ trợ & Tải xuống</h3>
                                                <div className="space-y-6">
                                                    <a href="/renewal" className="flex items-center space-x-4 p-4 rounded-lg  group">
                                                        <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span className="text-gray-900 font-semibold group-hover:text-blue-600 transition-colors">Gia hạn giấy phép</span>
                                                    </a>
                                                    
                                                    <a href="/support" className="flex items-center space-x-4 p-4 rounded-lg  group">
                                                        <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                                                        </svg>
                                                        <span className="text-gray-900 font-semibold group-hover:text-blue-600 transition-colors">Hỗ trợ</span>
                                                    </a>
                                                    
                                                    <a href="/downloads" className="flex items-center space-x-4 p-4 rounded-lg  group">
                                                        <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                        <span className="text-gray-900 font-semibold group-hover:text-blue-600 transition-colors">Bản dùng thử & Bản tải xuống</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="relative group">
                                <button className="px-4 py-3 text-base font-medium transition-colors rounded-md" style={{color: '#374151'}} onMouseEnter={(e) => e.target.style.color = '#2563eb'} onMouseLeave={(e) => e.target.style.color = '#374151'}>
                                    Dành cho doanh nghiệp
                                </button>
                                <div className="absolute left-0 mt-2 w-[800px] sm:w-[600px] md:w-[700px] lg:w-[800px] rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border" style={{backgroundColor: 'white', borderColor: '#e5e7eb'}}>
                                    <div className="p-4 sm:p-6 lg:p-8">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                                            {/* Cột 1: Giải pháp doanh nghiệp */}
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Giải pháp doanh nghiệp</h3>
                                                
                                                <div className="space-y-8">
                                                    <div>
                                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">BẢO MẬT DOANH NGHIỆP</div>
                                                        <a href="/business" className="block group">
                                                            <div className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Kidolock Business Security</div>
                                                            <div className="text-sm text-gray-600 leading-relaxed">Bảo vệ toàn diện cho mạng doanh nghiệp, endpoint và dữ liệu quan trọng</div>
                                                        </a>
                                                    </div>
                                                    
                                                    <div>
                                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">QUẢN LÝ TẬP TRUNG</div>
                                                        <a href="/enterprise" className="block group">
                                                            <div className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Kidolock Enterprise Security</div>
                                                            <div className="text-sm text-gray-600 leading-relaxed">Giải pháp quản lý bảo mật tập trung cho doanh nghiệp lớn</div>
                                                        </a>
                                                    </div>
                                                    
                                                    <div>
                                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">BẢO MẬT CLOUD</div>
                                                        <a href="/cloud-security" className="block group">
                                                            <div className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Kidolock Cloud Security</div>
                                                            <div className="text-sm text-gray-600 leading-relaxed">Bảo vệ dữ liệu và ứng dụng trên cloud một cách an toàn</div>
                                                        </a>
                                                    </div>
                                                </div>
                                                
                                                <div className="mt-8 pt-6 border-t border-gray-200">
                                                    <a href="/business" className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center group">
                                                        Xem tất cả giải pháp doanh nghiệp 
                                                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                            
                                            {/* Cột 2: Hỗ trợ & Tài nguyên */}
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Hỗ trợ & Tài nguyên</h3>
                                                
                                                <div className="space-y-6">
                                                    <a href="/business/downloads" className="flex items-center space-x-4 p-4 rounded-lg  group">
                                                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                        <span className="text-gray-900 font-semibold group-hover:text-blue-600 transition-colors">Các bản tải về</span>
                                                    </a>
                                                    
                                                    <a href="/business/support" className="flex items-center space-x-4 p-4 rounded-lg  group">
                                                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                                                        </svg>
                                                        <span className="text-gray-900 font-semibold group-hover:text-blue-600 transition-colors">Hỗ trợ doanh nghiệp</span>
                                                    </a>
                                                    
                                                    <a href="/business/training" className="flex items-center space-x-4 p-4 rounded-lg  group">
                                                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                        </svg>
                                                        <span className="text-gray-900 font-semibold group-hover:text-blue-600 transition-colors">Đào tạo & Chứng chỉ</span>
                                                    </a>
                                                    
                                                    <a href="/business/partners" className="flex items-center space-x-4 p-4 rounded-lg  group">
                                                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                        </svg>
                                                        <span className="text-gray-900 font-semibold group-hover:text-blue-600 transition-colors">Chương trình đối tác</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="relative group">
                                <button className="px-4 py-3 text-base font-medium transition-colors rounded-md" style={{color: '#374151'}} onMouseEnter={(e) => e.target.style.color = '#2563eb'} onMouseLeave={(e) => e.target.style.color = '#374151'}>
                                    Đối tác
                                </button>
                                <div className="absolute left-0 mt-2 w-[700px] sm:w-[500px] md:w-[600px] lg:w-[700px] rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border" style={{backgroundColor: 'white', borderColor: '#e5e7eb'}}>
                                    <div className="p-4 sm:p-6 lg:p-8">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                                            {/* Cột 1: Tìm đối tác */}
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Tìm đối tác</h3>
                                                <div className="space-y-6">
                                                    <a href="/partners/b2b" className="flex items-center space-x-4 p-4 rounded-lg  group">
                                                        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                        </svg>
                                                        <span className="text-gray-900 font-semibold group-hover:text-blue-600 transition-colors">Các đơn vị cung cấp cho doanh nghiệp</span>
                                                    </a>
                                                    <a href="/partners/b2c" className="flex items-center space-x-4 p-4 rounded-lg  group">
                                                        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                        </svg>
                                                        <span className="text-gray-900 font-semibold group-hover:text-blue-600 transition-colors">Các đơn vị cung cấp giải pháp tiêu dùng</span>
                                                    </a>
                                                    <a href="/partners/distributors" className="flex items-center space-x-4 p-4 rounded-lg  group">
                                                        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                        </svg>
                                                        <span className="text-gray-900 font-semibold group-hover:text-blue-600 transition-colors">Hợp tác với các đơn vị phân phối</span>
                                                    </a>
                                                    <a href="/partners/learning" className="flex items-center space-x-4 p-4 rounded-lg  group">
                                                        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                        </svg>
                                                        <span className="text-gray-900 font-semibold group-hover:text-blue-600 transition-colors">Tìm một trung tâm học tập</span>
                                                    </a>
                                                </div>
                                            </div>
                                            
                                            {/* Cột 2: Trở thành đối tác */}
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Trở thành đối tác</h3>
                                                <div className="space-y-6">
                                                    <a href="/partners/united" className="flex items-center space-x-4 p-4 rounded-lg  group">
                                                        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                                        </svg>
                                                        <span className="text-gray-900 font-semibold group-hover:text-blue-600 transition-colors">Cổng đối tác Kidolock United</span>
                                                    </a>
                                                    <a href="/partners/b2b-join" className="flex items-center space-x-4 p-4 rounded-lg  group">
                                                        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                        </svg>
                                                        <span className="text-gray-900 font-semibold group-hover:text-blue-600 transition-colors">Trở thành đối tác B2B</span>
                                                    </a>
                                                    <a href="/partners/b2c-join" className="flex items-center space-x-4 p-4 rounded-lg  group">
                                                        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                        </svg>
                                                        <span className="text-gray-900 font-semibold group-hover:text-blue-600 transition-colors">Trở thành đối tác B2C</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="relative group">
                                <button className="px-4 py-3 text-base font-medium transition-colors rounded-md" style={{color: '#374151'}} onMouseEnter={(e) => e.target.style.color = '#2563eb'} onMouseLeave={(e) => e.target.style.color = '#374151'}>
                                    Giới thiệu về Chúng tôi
                                </button>
                                <div className="absolute left-0 mt-2 w-[600px] sm:w-[400px] md:w-[500px] lg:w-[600px] rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border" style={{backgroundColor: 'white', borderColor: '#e5e7eb'}}>
                                    <div className="p-4 sm:p-6 lg:p-8">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                                            {/* Cột 1: Về chúng tôi */}
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Về chúng tôi</h3>
                                                <div className="space-y-6">
                                                    <a href="/about" className="flex items-center space-x-4 p-4 rounded-lg  group">
                                                        <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span className="text-gray-900 font-semibold group-hover:text-blue-600 transition-colors">Tìm hiểu về chúng tôi</span>
                                                    </a>
                                                    <a href="/contact" className="flex items-center space-x-4 p-4 rounded-lg  group">
                                                        <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                        </svg>
                                                        <span className="text-gray-900 font-semibold group-hover:text-blue-600 transition-colors">Liên hệ với chúng tôi</span>
                                                    </a>
                                                    <a href="/careers" className="flex items-center space-x-4 p-4 rounded-lg  group">
                                                        <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                                                        </svg>
                                                        <span className="text-gray-900 font-semibold group-hover:text-blue-600 transition-colors">Nghề nghiệp</span>
                                                    </a>
                                                </div>
                                            </div>
                                            
                                            {/* Cột 2: Truyền thông */}
                    <div>
                                                <h3 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Truyền thông</h3>
                                                <div className="space-y-6">
                                                    <a href="/press" className="flex items-center space-x-4 p-4 rounded-lg  group">
                                                        <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                                        </svg>
                                                        <span className="text-gray-900 font-semibold group-hover:text-blue-600 transition-colors">Trung tâm báo chí</span>
                                                    </a>
                                                    <a href="/press-releases" className="flex items-center space-x-4 p-4 rounded-lg  group">
                                                        <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                        <span className="text-gray-900 font-semibold group-hover:text-blue-600 transition-colors">Thông cáo báo chí</span>
                                                    </a>
                                                    <a href="/sponsorships" className="flex items-center space-x-4 p-4 rounded-lg  group">
                                                        <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                        </svg>
                                                        <span className="text-gray-900 font-semibold group-hover:text-blue-600 transition-colors">Tài trợ</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                        </div>
                        </nav>
                        {/* Header Actions */}
                        <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
                            {/* Country Selector - Hidden on mobile */}
                            <div className="relative hidden sm:block">
                                <button 
                                    onClick={() => setIsCountryOpen(!isCountryOpen)}
                                    className="p-2 sm:p-3 transition-colors rounded-lg"
                                    style={{color: '#4b5563'}}
                                    onMouseEnter={(e) => e.target.style.color = '#2563eb'}
                                    onMouseLeave={(e) => e.target.style.color = '#4b5563'}
                                    aria-label="Chọn quốc gia/khu vực"
                                >
                                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                                d="M9.34.04a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm6.87 6h-1.9a10.85 10.85 0 0 0-1.35-3.56 7.55 7.55 0 0 1 3.25 3.56Zm.63 3c0 .5-.05 1-.14 1.5h-2.18c.04-.49.08-.99.08-1.5 0-.5 0-1.01-.08-1.5h2.18c.1.5.14 1 .14 1.5Zm-15 0c0-.5.06-1 .15-1.5h2.18a16.33 16.33 0 0 0 0 3H1.99c-.1-.5-.14-1-.15-1.5Zm3.75 0c0-.5.03-1 .09-1.5h2.91v3H5.68c-.06-.5-.08-1-.09-1.5Zm4.5-7.34c1.19.5 2.19 2.17 2.68 4.34H10.1V1.7Zm-1.5 0v4.34H5.92C6.42 3.87 7.41 2.2 8.6 1.7Zm0 10.34v4.34c-1.18-.5-2.18-2.16-2.67-4.34H8.6Zm1.5 4.34v-4.34h2.68c-.5 2.18-1.49 3.84-2.67 4.34Zm0-5.84v-3h2.92c.11 1 .11 2 0 3H10.1ZM5.74 2.48c-.65 1.1-1.1 2.3-1.34 3.56H2.47a7.55 7.55 0 0 1 3.26-3.56Zm-3.26 9.56H4.4c.23 1.26.69 2.46 1.34 3.56a7.55 7.55 0 0 1-3.26-3.56Zm10.5 3.56c.66-1.1 1.11-2.3 1.35-3.56h1.91a7.55 7.55 0 0 1-3.27 3.56h.01Z"
                                                fill="currentColor"></path>
                                    </svg>
                                </button>
                            </div>

                            {/* Search Button - Hidden on mobile */}
                            <button 
                                className="hidden sm:block p-2 sm:p-3 transition-colors rounded-lg"
                                style={{color: '#4b5563'}}
                                onMouseEnter={(e) => e.target.style.color = '#2563eb'}
                                onMouseLeave={(e) => e.target.style.color = '#4b5563'}
                                aria-label="Mở tìm kiếm"
                            >
                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M16.8 14.17c0 .2-.08.4-.22.54l-1.07 1.06a.71.71 0 0 1-.53.23c-.2 0-.39-.08-.53-.22l-4.08-4.11a6.34 6.34 0 0 1-3.28.96 6.12 6.12 0 0 1-4.44-1.86 5.7 5.7 0 0 1-1.35-2 6.11 6.11 0 0 1 0-4.92c.34-.76.79-1.43 1.35-2A6.9 6.9 0 0 1 4.63.52a6.12 6.12 0 0 1 6.9 1.35 5.7 5.7 0 0 1 1.35 2 5.98 5.98 0 0 1 .26 4.18c-.17.56-.4 1.07-.7 1.55l4.08 4.1c.2.12.28.29.28.48Zm-8.03-4.02c.5-.22.95-.53 1.34-.9a4.37 4.37 0 0 0 1.24-2.98c0-.59-.12-1.12-.34-1.63-.22-.5-.53-.96-.9-1.35a4.34 4.34 0 0 0-2.96-1.24 3.9 3.9 0 0 0-1.62.34c-.5.23-.95.53-1.35.9a4.37 4.37 0 0 0-1.23 2.98c0 .6.12 1.13.34 1.63.22.5.53.96.9 1.35a4.34 4.34 0 0 0 2.96 1.24 4 4 0 0 0 1.62-.34Z"
                                                fill="currentColor"></path>
                                </svg>
                            </button>

                            {/* User Account Section - Hidden on mobile */}
                            <div className="relative hidden sm:block">
                                {isLoggedIn ? (
                                    <div className="flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg" style={{backgroundColor: '#eff6ff'}}>
                                        <div className="flex items-center space-x-2">
                                            <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M.75 12v-.02a2.6 2.6 0 0 1 2.67-2.65h2.45L8 14.43l2.13-5.1h2.45a2.6 2.6 0 0 1 2.67 2.65v.04l.75 5.3H0L.75 12ZM8 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
                                                    fill="currentColor"></path>
                                            </svg>
                                            <div className="text-left">
                                                <div className="text-xs font-medium" style={{color: '#111827'}}>
                                                    {userType === 'admin' ? 'Quản trị viên' : 'Phụ huynh'}
                                                </div>
                                                <div className="text-xs font-semibold" style={{color: '#2563eb'}}>
                                                    {userType === 'admin' ? 'ADMIN' : 'PREMIUM'}
                                                </div>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => {
                                                localStorage.removeItem('isLoggedIn')
                                                localStorage.removeItem('userType')
                                                navigate('/')
                                            }}
                                            className="transition-colors"
                                            style={{color: '#6b7280'}}
                                            onMouseEnter={(e) => e.target.style.color = '#dc2626'}
                                            onMouseLeave={(e) => e.target.style.color = '#6b7280'}
                                            title="Đăng xuất"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 14H3.333A1.333 1.333 0 0 1 2 12.667V3.333A1.333 1.333 0 0 1 3.333 2H6M10.667 11.333L14 8l-3.333-3.333M10.667 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                ) : (
                                    <button 
                                        onClick={() => navigate('/login')}
                                        className="flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 transition-colors rounded-lg"
                                        style={{color: '#374151'}}
                                        onMouseEnter={(e) => e.target.style.color = '#2563eb'}
                                        onMouseLeave={(e) => e.target.style.color = '#374151'}
                                    >
                                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M.75 12v-.02a2.6 2.6 0 0 1 2.67-2.65h2.45L8 14.43l2.13-5.1h2.45a2.6 2.6 0 0 1 2.67 2.65v.04l.75 5.3H0L.75 12ZM8 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
                                                    fill="currentColor"></path>
                                        </svg>
                                        <span className="text-xs sm:text-sm font-medium">Tài khoản của tôi</span>
                                        <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                    d="M9.7.3a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4A1 1 0 0 1 1.7.3L5 3.58 8.3.29a1 1 0 0 1 1.4 0Z">
                                                </path>
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {/* Mobile Menu Button */}
                            <button 
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden p-2 sm:p-3 transition-colors rounded-lg"
                                style={{color: '#4b5563'}}
                                onMouseEnter={(e) => e.target.style.color = '#2563eb'}
                                onMouseLeave={(e) => e.target.style.color = '#4b5563'}
                            >
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            </div>
                        </div>
                    </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden border-t shadow-lg" style={{backgroundColor: 'white', borderColor: '#e5e7eb'}}>
                        <div className="px-3 sm:px-4 pt-3 sm:pt-4 pb-4 sm:pb-6 space-y-3 sm:space-y-4">
                            <div className="space-y-1 sm:space-y-2">
                                <div className="px-2 sm:px-3 py-2 text-sm sm:text-base font-semibold text-gray-900 border-b border-gray-200">Dành cho gia đình</div>
                                <button onClick={() => navigate('/')} className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700  hover:text-blue-600 transition-colors rounded-lg">Kidolock Premium</button>
                                <button onClick={() => navigate('/')} className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700  hover:text-blue-600 transition-colors rounded-lg">Kidolock Plus</button>
                                <button onClick={() => navigate('/')} className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700  hover:text-blue-600 transition-colors rounded-lg">Kidolock Standard</button>
                                <button onClick={() => navigate('/')} className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700  hover:text-blue-600 transition-colors rounded-lg">Kidolock Safe Kids</button>
                                <button onClick={() => navigate('/')} className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700  hover:text-blue-600 transition-colors rounded-lg">Kidolock VPN Secure Connection</button>
                                <button onClick={() => navigate('/')} className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700  hover:text-blue-600 transition-colors rounded-lg">Kidolock Password Manager</button>
                </div>
                            
                            <div className="space-y-1 sm:space-y-2">
                                <div className="px-2 sm:px-3 py-2 text-sm sm:text-base font-semibold text-gray-900 border-b border-gray-200">Dành cho doanh nghiệp</div>
                                <button onClick={() => navigate('/')} className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700  hover:text-blue-600 transition-colors rounded-lg">Sản phẩm</button>
                                <button onClick={() => navigate('/')} className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700  hover:text-blue-600 transition-colors rounded-lg">Các bản tải về</button>
                                <button onClick={() => navigate('/')} className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700  hover:text-blue-600 transition-colors rounded-lg">Doanh nghiệp</button>
                </div>
                            
                            <div className="space-y-1 sm:space-y-2">
                                <div className="px-2 sm:px-3 py-2 text-sm sm:text-base font-semibold text-gray-900 border-b border-gray-200">Đối tác</div>
                                <button onClick={() => navigate('/')} className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700  hover:text-blue-600 transition-colors rounded-lg">Các đơn vị cung cấp cho doanh nghiệp</button>
                                <button onClick={() => navigate('/')} className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700  hover:text-blue-600 transition-colors rounded-lg">Các đơn vị cung cấp giải pháp tiêu dùng</button>
                                        </div>
                            
                            <div className="space-y-1 sm:space-y-2">
                                <div className="px-2 sm:px-3 py-2 text-sm sm:text-base font-semibold text-gray-900 border-b border-gray-200">Giới thiệu về Chúng tôi</div>
                                <button onClick={() => navigate('/')} className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700  hover:text-blue-600 transition-colors rounded-lg">Tìm hiểu về chúng tôi</button>
                                <button onClick={() => navigate('/')} className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700  hover:text-blue-600 transition-colors rounded-lg">Liên hệ với chúng tôi</button>
                                <button onClick={() => navigate('/')} className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm text-gray-700  hover:text-blue-600 transition-colors rounded-lg">Nghề nghiệp</button>
                                        </div>
                                        </div>
                                    </div>
                )}

                {/* Country Selector Dropdown */}
                {isCountryOpen && (
                    <div className="absolute top-full right-0 mt-2 w-96 rounded-xl shadow-xl border z-50" style={{backgroundColor: 'white', borderColor: '#e5e7eb'}}>
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold" style={{color: '#111827'}}>Chọn quốc gia/khu vực</h3>
                                <button 
                                    onClick={() => setIsCountryOpen(false)}
                                    className="p-2  rounded-lg transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" style={{color: '#6b7280'}}>
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                        </div>
                            
                            <div className="grid grid-cols-2 gap-6 max-h-96 overflow-y-auto">
                                <div>
                                    <h4 className="font-semibold mb-3" style={{color: '#2563eb'}}>Asia & Pacific</h4>
                                    <div className="space-y-2">
                                        <a href="https://www.kaspersky.com.au/?ignoreredirects=true" className="block text-sm px-2 py-1 rounded transition-colors" style={{color: '#374151'}} onMouseEnter={(e) => e.target.style.color = '#2563eb'} onMouseLeave={(e) => e.target.style.color = '#374151'}>Australia</a>
                                        <a href="https://www.kaspersky.co.in/?ignoreredirects=true" className="block text-sm px-2 py-1 rounded transition-colors" style={{color: '#374151'}} onMouseEnter={(e) => e.target.style.color = '#2563eb'} onMouseLeave={(e) => e.target.style.color = '#374151'}>India</a>
                                        <a href="https://www.kaspersky.com.vn/" className="block text-sm font-semibold px-2 py-1 rounded" style={{color: '#2563eb', backgroundColor: '#eff6ff'}}>Việt Nam</a>
                                        <a href="https://www.kaspersky.co.th/" className="block text-sm px-2 py-1 rounded transition-colors" style={{color: '#374151'}} onMouseEnter={(e) => e.target.style.color = '#2563eb'} onMouseLeave={(e) => e.target.style.color = '#374151'}>ไทย (Thailand)</a>
                                        <a href="https://www.kaspersky.co.kr/" className="block text-sm px-2 py-1 rounded transition-colors" style={{color: '#374151'}} onMouseEnter={(e) => e.target.style.color = '#2563eb'} onMouseLeave={(e) => e.target.style.color = '#374151'}>한국 (Korea)</a>
                                        <a href="https://www.kaspersky.com.cn/?ignoreredirects=true" className="block text-sm px-2 py-1 rounded transition-colors" style={{color: '#374151'}} onMouseEnter={(e) => e.target.style.color = '#2563eb'} onMouseLeave={(e) => e.target.style.color = '#374151'}>中国 (China)</a>
                                        <a href="https://www.kaspersky.co.jp/" className="block text-sm px-2 py-1 rounded transition-colors" style={{color: '#374151'}} onMouseEnter={(e) => e.target.style.color = '#2563eb'} onMouseLeave={(e) => e.target.style.color = '#374151'}>日本語 (Japan)</a>
                                        </div>
                                    </div>
                                
                                <div>
                                    <h4 className="font-semibold mb-3" style={{color: '#2563eb'}}>Americas</h4>
                                    <div className="space-y-2">
                                        <a href="https://usa.kaspersky.com/?ignoreredirects=true" className="block text-sm px-2 py-1 rounded transition-colors" style={{color: '#374151'}} onMouseEnter={(e) => e.target.style.color = '#2563eb'} onMouseLeave={(e) => e.target.style.color = '#374151'}>United States</a>
                                        <a href="https://www.kaspersky.ca/?ignoreredirects=true" className="block text-sm px-2 py-1 rounded transition-colors" style={{color: '#374151'}} onMouseEnter={(e) => e.target.style.color = '#2563eb'} onMouseLeave={(e) => e.target.style.color = '#374151'}>Canada - English</a>
                                        <a href="https://latam.kaspersky.com/?ignoreredirects=true" className="block text-sm px-2 py-1 rounded transition-colors" style={{color: '#374151'}} onMouseEnter={(e) => e.target.style.color = '#2563eb'} onMouseLeave={(e) => e.target.style.color = '#374151'}>América Latina</a>
                                        </div>
                                    
                                    <h4 className="font-semibold mb-3 mt-6" style={{color: '#2563eb'}}>Europe</h4>
                                    <div className="space-y-2">
                                        <a href="https://www.kaspersky.co.uk/?ignoreredirects=true" className="block text-sm px-2 py-1 rounded transition-colors" style={{color: '#374151'}} onMouseEnter={(e) => e.target.style.color = '#2563eb'} onMouseLeave={(e) => e.target.style.color = '#374151'}>United Kingdom</a>
                                        <a href="https://www.kaspersky.de/?ignoreredirects=true" className="block text-sm px-2 py-1 rounded transition-colors" style={{color: '#374151'}} onMouseEnter={(e) => e.target.style.color = '#2563eb'} onMouseLeave={(e) => e.target.style.color = '#374151'}>Deutschland</a>
                                        <a href="https://www.kaspersky.fr/?ignoreredirects=true" className="block text-sm px-2 py-1 rounded transition-colors" style={{color: '#374151'}} onMouseEnter={(e) => e.target.style.color = '#2563eb'} onMouseLeave={(e) => e.target.style.color = '#374151'}>France</a>
                                        <a href="https://www.kaspersky.es/?ignoreredirects=true" className="block text-sm px-2 py-1 rounded transition-colors" style={{color: '#374151'}} onMouseEnter={(e) => e.target.style.color = '#2563eb'} onMouseLeave={(e) => e.target.style.color = '#374151'}>España</a>
                                        </div>
                                    </div>
                    </div>
                </div>
                </div>
                )}
            </header>
        </div>
    )
}

export default Navbar