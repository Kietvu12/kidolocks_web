import React, { useState } from 'react';
import kidApple from '../assets/kid_apple.png';
import kidWindow from '../assets/kid_window.png';
import kidAndroid from '../assets/kid_android.png';
import getItOnGooglePlay from '../assets/get_it_on_gg_play.png';
import getItOnAppStore from '../assets/get_it_on_app_store.png';

const DownloadSection = () => {
    const [expandedSections, setExpandedSections] = useState({
        allDevices: true,
        systemRequirements: true,
        languageSupport: true
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <div className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'white' }}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4" style={{ color: '#111827' }}>
                        TẢI APP NGAY TẠI
                    </h2>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold">
                        <span style={{ color: '#2563EB' }}>MỌI NỀN TẢNG</span> <span style={{ color: '#F97316' }}>THIẾT BỊ</span>
                    </h3>
                </div>

                {/* Download Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {/* Android */}
                    <div className="text-center">
                        <div className="mb-6">
                            <img
                                src={kidAndroid}
                                alt="Android Kid"
                                className="w-64 h-64 mx-auto object-contain"
                            />
                        </div>
                        <div className="mb-4">
                            <img
                                src={getItOnGooglePlay}
                                alt="Get it on Google Play"
                                className="h-16 mx-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
                            />
                        </div>
                    </div>

                    {/* Windows */}
                    <div className="text-center">
                        <div className="mb-6">
                            <img
                                src={kidWindow}
                                alt="Windows Kid"
                                className="w-64 h-64 mx-auto object-contain"
                            />
                        </div>
                        <div className="mb-4">
                            <button className="px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity" style={{ background: 'linear-gradient(to right, #F97316, #2563EB)', color: 'white' }}>
                                DOWNLOAD EXE
                            </button>
                        </div>
                    </div>

                    {/* iOS */}
                    <div className="text-center">
                        <div className="mb-6">
                            <img
                                src={kidApple}
                                alt="Apple Kid"
                                className="w-64 h-64 mx-auto object-contain"
                            />
                        </div>
                        <div className="mb-4">
                            <img
                                src={getItOnAppStore}
                                alt="Download on the App Store"
                                className="h-16 mx-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
                            />
                        </div>
                    </div>
                </div>

                {/* System Requirements */}
                <div className="mt-20">
                    <div className="grid grid-cols-1 gap-1">
                        {/* For All Devices */}
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <button 
                                    onClick={() => toggleSection('allDevices')}
                                    className="font-bold text-3xl mr-3 transition-colors"
                                    style={{ color: '#2563EB' }}
                                    onMouseEnter={(e) => e.target.style.color = '#1D4ED8'}
                                    onMouseLeave={(e) => e.target.style.color = '#2563EB'}
                                >
                                    {expandedSections.allDevices ? '−' : '+'}
                                </button>
                                <h4 className="text-2xl font-bold" style={{ color: '#111827' }}>Cho tất cả thiết bị</h4>
                            </div>
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                expandedSections.allDevices ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                                <ul className="space-y-2 text-lg pt-2" style={{ color: '#374151' }}>
                                    <li>• Yêu cầu có kết nối internet</li>
                                </ul>
                            </div>
                        </div>

                        {/* System Requirements */}
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <button 
                                    onClick={() => toggleSection('systemRequirements')}
                                    className="font-bold text-3xl mr-3 transition-colors"
                                    style={{ color: '#2563EB' }}
                                    onMouseEnter={(e) => e.target.style.color = '#1D4ED8'}
                                    onMouseLeave={(e) => e.target.style.color = '#2563EB'}
                                >
                                    {expandedSections.systemRequirements ? '−' : '+'}
                                </button>
                                <h4 className="text-2xl font-bold" style={{ color: '#111827' }}>Yêu cầu về hệ thống</h4>
                            </div>
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                expandedSections.systemRequirements ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                                <div className="space-y-4 text-base pt-2" style={{ color: '#374151' }}>
                                    <div>
                                        <h5 className="font-semibold mb-2 text-lg" style={{ color: '#111827' }}>Máy tính để bàn và máy tính xách tay chạy Windows®</h5>
                                        <p className="text-sm mb-2"><strong>Hệ điều hành:</strong> Microsoft Windows 11 Home/Pro/Education; Windows 10 Home/Pro/Education; bản cập nhật Microsoft Windows 8 & 8.1 / Pro / 8.1; Microsoft Windows 7 Starter / Home Basic / Home Premium / Professional / Ultimate - SP1 với bản cập nhật KB4474419 & KB4490628 trở lên</p>
                                        <ul className="space-y-1 text-sm">
                                            <li>• <strong>Dung lượng ổ đĩa:</strong> 200 MB dung lượng trống trên ổ cứng</li>
                                            <li>• <strong>Bộ xử lý:</strong> 1 GHz trở lên, x86 hoặc x64</li>
                                            <li>• <strong>Bộ nhớ:</strong> 1 GB (32-bit) hoặc 2 GB (64-bit)</li>
                                            <li>• <strong>Độ phân giải màn hình tối thiểu:</strong> 1024x768</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold mb-2 text-lg" style={{ color: '#111827' }}>Điện thoại thông minh và máy tính bảng Android¹</h5>
                                        <ul className="space-y-1 text-sm">
                                            <li>• <strong>Hệ điều hành:</strong> Android™ 10 - 15</li>
                                            <li>• <strong>Độ phân giải màn hình tối thiểu:</strong> 320 x 480</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold mb-2 text-lg" style={{ color: '#111827' }}>iPhone và iPad</h5>
                                        <ul className="space-y-1 text-sm">
                                            <li>• <strong>Hệ điều hành:</strong> iOS® 18</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Language Support */}
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <button 
                                    onClick={() => toggleSection('languageSupport')}
                                    className="font-bold text-3xl mr-3 transition-colors"
                                    style={{ color: '#2563EB' }}
                                    onMouseEnter={(e) => e.target.style.color = '#1D4ED8'}
                                    onMouseLeave={(e) => e.target.style.color = '#2563EB'}
                                >
                                    {expandedSections.languageSupport ? '−' : '+'}
                                </button>
                                <h4 className="text-2xl font-bold" style={{ color: '#111827' }}>Hỗ trợ ngôn ngữ</h4>
                            </div>
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                expandedSections.languageSupport ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}>
                                <div className="space-y-4 text-base pt-2" style={{ color: '#374151' }}>
                                    <div>
                                        <h5 className="font-semibold mb-2 text-lg" style={{ color: '#111827' }}>Tiếng Việt</h5>
                                        <p className="text-sm">Đảm bảo tính dễ hiểu, dễ sử dụng của hệ thống ở tất cả các nền tảng</p>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold mb-2 text-lg" style={{ color: '#111827' }}>Tiếng Anh</h5>
                                        <p className="text-sm">Dịch thuật chuẩn, đảm bảo hỗ trợ được song ngữ cho đa dạng người dùng</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DownloadSection;