import React, { useState } from 'react';
import kilovia from '../assets/kilovia.png';
import kidolocks from '../assets/kidolocks.png';
import huce from '../assets/huce.png';
import rdsic from '../assets/rdsic.png';

const ContactSection = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle email submission
        console.log('Email submitted:', email);
        setEmail('');
    };

    return (
        <div className="relative overflow-hidden" style={{background: 'linear-gradient(to bottom, #60a5fa, #2dd4bf, #3b82f6)'}}>
            {/* Background Pattern */}
            <div className="absolute inset-0" style={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}}></div>
            
            <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col lg:flex-row items-center justify-between mb-16">
                        <div className="text-center lg:text-left mb-8 lg:mb-0">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase mb-4" style={{color: 'white'}}>
                                HÃY ĐỂ CHÚNG TÔI LIÊN LẠC VỚI BẠN
                            </h1>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="nhập email của bạn"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="px-6 py-3 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 min-w-[300px] sm:min-w-[400px]"
                                style={{backgroundColor: 'white'}}
                            />
                            <button
                                onClick={handleSubmit}
                                className="px-8 py-3 font-bold rounded-lg transition-colors uppercase"
                                style={{backgroundColor: 'white', color: '#1f2937'}}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                            >
                                GỬI
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                        {/* Left Section - RDSIC Training System */}
                        <div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase mb-4" style={{color: 'white'}}>
                                HỆ THỐNG ĐÀO TẠO RDSIC
                            </h2>
                            <p className="text-lg mb-8" style={{color: 'white'}}>
                                Thương hiệu thuộc Viện Tin Học Xây Dựng, Trường Đại Học Xây Dựng Hà Nội
                            </p>
                            
                            <div className="space-y-2">
                                <div className="flex flex-col sm:flex-row" style={{color: 'white'}}>
                                    <span className="font-medium w-32 sm:w-40 mb-1 sm:mb-0">
                                        <span className="sm:hidden">Trụ sở chính</span>
                                        <span className="hidden sm:inline">Trụ sở chính :</span>
                                    </span>
                                    <span>Phòng 901B nhà Thí Nghiệm, Trường Đại học Xây Dựng Hà Nội, số 55 Giải Phóng, Hà Nội</span>
                                </div>
                                <div className="flex flex-col sm:flex-row" style={{color: 'white'}}>
                                    <span className="font-medium w-32 sm:w-40 mb-1 sm:mb-0">
                                        <span className="sm:hidden">Địa chỉ đào tạo 2</span>
                                        <span className="hidden sm:inline">Địa chỉ đào tạo 2 :</span>
                                    </span>
                                    <span>Khu vực trường Kiến Trúc - Văn Quán, Hà Đông, Hà Nội</span>
                                </div>
                                <div className="flex flex-col sm:flex-row" style={{color: 'white'}}>
                                    <span className="font-medium w-32 sm:w-40 mb-1 sm:mb-0">
                                        <span className="sm:hidden">Địa chỉ đào tạo 3</span>
                                        <span className="hidden sm:inline">Địa chỉ đào tạo 3 :</span>
                                    </span>
                                    <span>Trung Tâm Bồi Dưỡng Chính Trị Quận Phú Nhuận - Số 178 Đường Lê Văn Sỹ, P.10, Q. Phú Nhuận, TPHCM</span>
                                </div>
                                <div className="flex flex-col sm:flex-row" style={{color: 'white'}}>
                                    <span className="font-medium w-32 sm:w-40 mb-1 sm:mb-0">
                                        <span className="sm:hidden">Địa chỉ đào tạo 4</span>
                                        <span className="hidden sm:inline">Địa chỉ đào tạo 4 :</span>
                                    </span>
                                    <span>Trường Cao Đẳng Xây Dựng TPHCM, SỐ 190, Võ Văn Ngân, P.Linh Chiểu, Q. Thủ Đức, TPHCM</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Contact Information */}
                        <div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase mb-8" style={{color: 'white'}}>
                                THÔNG TIN LIÊN HỆ
                            </h2>
                            
                            <div className="space-y-2">
                                <div className="flex flex-col sm:flex-row" style={{color: 'white'}}>
                                    <span className="font-medium w-20 sm:w-24 mb-1 sm:mb-0">
                                        <span className="sm:hidden">Hotline</span>
                                        <span className="hidden sm:inline">Hotline :</span>
                                    </span>
                                    <span>0989 427 809</span>
                                </div>
                                <div className="flex flex-col sm:flex-row" style={{color: 'white'}}>
                                    <span className="w-20 sm:w-24 mb-1 sm:mb-0"></span>
                                    <span>0914 388 841</span>
                                </div>
                                <div className="flex flex-col sm:flex-row" style={{color: 'white'}}>
                                    <span className="font-medium w-20 sm:w-24 mb-1 sm:mb-0">
                                        <span className="sm:hidden">Email</span>
                                        <span className="hidden sm:inline">Email :</span>
                                    </span>
                                    <span>admin@rdsic.edu.vn</span>
                                </div>
                                <div className="flex flex-col sm:flex-row" style={{color: 'white'}}>
                                    <span className="font-medium w-20 sm:w-24 mb-1 sm:mb-0">
                                        <span className="sm:hidden">Website</span>
                                        <span className="hidden sm:inline">Website :</span>
                                    </span>
                                    <span>rdsic.edu.vn</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="flex flex-col lg:flex-row items-center justify-between">
                        {/* Left - Products */}
                        <div className="mb-8 lg:mb-0">
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase mb-6" style={{color: 'white'}}>
                                SẢN PHẨM
                            </h3>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={kidolocks}
                                        alt="Kidolocks"
                                        className="w-12 h-12 object-contain"
                                    />
                                    <span className="font-bold text-lg" style={{color: 'white'}}>Kidolock</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={kilovia}
                                        alt="Kilovia"
                                        className="w-12 h-12 object-contain"
                                    />
                                    <span className="font-bold text-lg" style={{color: 'white'}}>Kilovia</span>
                                </div>
                            </div>
                        </div>

                        {/* Right - Logos and Copyright */}
                        <div className="text-center lg:text-right">
                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-6 mb-4">
                                <img
                                    src={rdsic}
                                    alt="RDSIC"
                                    className="w-16 h-16 object-contain"
                                />
                                <img
                                    src={huce}
                                    alt="HUCE"
                                    className="w-16 h-16 object-contain"
                                />
                            </div>
                            <p className="text-sm" style={{color: 'white'}}>
                                @2025 RDSIC ALL RIGHTS RESERVED
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
