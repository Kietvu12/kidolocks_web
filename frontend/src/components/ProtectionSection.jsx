import React from 'react'
import group2 from '../assets/group_2.png'

const ProtectionSection = () => {
    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Side - Text Content */}
                    <div className="order-2 lg:order-1">
                        <div className="space-y-8">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 uppercase tracking-wide border-b border-gray-600 pb-2">
                                BẢO VỆ CON BẠN KHỎI NHỮNG TRẢI NGHIỆM TIÊU CỰC
                            </h2>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-xl text-gray-700 leading-relaxed">
                                        Ngăn chặn các truy cập độc hại với tính năng <span className="font-semibold">Hạn chế tìm kiếm</span>
                                    </p>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-xl text-gray-700 leading-relaxed">
                                        Ẩn các kết quả tìm kiếm, nội dung tiêu cực, gây ảnh hưởng xấu đến tâm lý trẻ
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Character and UI Overlay */}
                    <div className="relative order-1 lg:order-2">
                        <div className="relative">
                            {/* Character Image */}
                            <div className="flex justify-center lg:justify-end">
                                <img
                                    src={group2}
                                    alt="Family protection illustration"
                                    className="w-full max-w-lg lg:max-w-xl h-auto"
                                />
                            </div>

                            {/* UI Overlay - Keyword Management Panel */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProtectionSection
