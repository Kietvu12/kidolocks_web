import React, { useState } from 'react';

const SubscriptionWorkflowSection = () => {
    const [expandedSections, setExpandedSections] = useState({
        pricingLevels: true,
        autoRenewal: true,
        cancelAutoRenewal: true
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <div className="py-24 px-4 sm:px-6 lg:px-8" style={{backgroundColor: 'white'}}>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                        <span style={{color: '#1f2937'}}>CÁCH THỨC HOẠT ĐỘNG CỦA</span> <span style={{color: '#f97316'}}>GÓI ĐĂNG KÝ</span>
                    </h2>
                </div>

                {/* Content Sections */}
                <div className="space-y-6">
                    {/* Section 1: CÁC MỨC GIÁ */}
                    <div className="rounded-lg p-6" style={{backgroundColor: 'white'}}>
                        <div className="flex items-center mb-4">
                            <button 
                                onClick={() => toggleSection('pricingLevels')}
                                className="font-bold text-2xl mr-3 transition-colors"
                                style={{color: '#2563eb'}}
                                onMouseEnter={(e) => e.target.style.color = '#1d4ed8'}
                                onMouseLeave={(e) => e.target.style.color = '#2563eb'}
                            >
                                {expandedSections.pricingLevels ? '−' : '+'}
                            </button>
                            <h3 className="text-xl font-bold" style={{color: '#111827'}}>CÁC MỨC GIÁ</h3>
                        </div>
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            expandedSections.pricingLevels ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                            <p className="leading-relaxed" style={{color: '#374151'}}>
                                Gói đăng ký của bạn sẽ tự động gia hạn mỗi kỳ cho đến khi bạn hủy bỏ gói đăng ký. Để đảm bảo chức năng bảo vệ không bị gián đoạn, chúng tôi sẽ cố gắng tính phí qua phương thức thanh toán của bạn 20 ngày trước khi gói đăng ký của bạn kết thúc. Chúng tôi sẽ thông báo cho bạn về lần tự động gia hạn sắp tới qua email.
                            </p>
                        </div>
                    </div>

                    {/* Section 2: TỰ ĐỘNG GIA HẠN */}
                    <div className="rounded-lg p-6" style={{backgroundColor: 'white'}}>
                        <div className="flex items-center mb-4">
                            <button 
                                onClick={() => toggleSection('autoRenewal')}
                                className="font-bold text-2xl mr-3 transition-colors"
                                style={{color: '#2563eb'}}
                                onMouseEnter={(e) => e.target.style.color = '#1d4ed8'}
                                onMouseLeave={(e) => e.target.style.color = '#2563eb'}
                            >
                                {expandedSections.autoRenewal ? '−' : '+'}
                            </button>
                            <h3 className="text-xl font-bold" style={{color: '#111827'}}>TỰ ĐỘNG GIA HẠN</h3>
                        </div>
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            expandedSections.autoRenewal ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                            <p className="leading-relaxed" style={{color: '#374151'}}>
                                Gói đăng ký của bạn sẽ tự động gia hạn mỗi kỳ cho đến khi bạn hủy bỏ gói đăng ký. Để đảm bảo chức năng bảo vệ không bị gián đoạn, chúng tôi sẽ cố gắng tính phí qua phương thức thanh toán của bạn 20 ngày trước khi gói đăng ký của bạn kết thúc. Chúng tôi sẽ thông báo cho bạn về lần tự động gia hạn sắp tới qua email.
                            </p>
                        </div>
                    </div>

                    {/* Section 3: HỦY BỎ TỰ ĐỘNG GIA HẠN */}
                    <div className="rounded-lg p-6" style={{backgroundColor: 'white'}}>
                        <div className="flex items-center mb-4">
                            <button 
                                onClick={() => toggleSection('cancelAutoRenewal')}
                                className="font-bold text-2xl mr-3 transition-colors"
                                style={{color: '#2563eb'}}
                                onMouseEnter={(e) => e.target.style.color = '#1d4ed8'}
                                onMouseLeave={(e) => e.target.style.color = '#2563eb'}
                            >
                                {expandedSections.cancelAutoRenewal ? '−' : '+'}
                            </button>
                            <h3 className="text-xl font-bold" style={{color: '#111827'}}>HỦY BỎ TỰ ĐỘNG GIA HẠN</h3>
                        </div>
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            expandedSections.cancelAutoRenewal ? 'max-h-none opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                            <div className="space-y-4 leading-relaxed" style={{color: '#374151'}}>
                                <p>
                                    Bạn có thể hủy bỏ tự động gia hạn gói đăng ký của mình bất cứ lúc nào.
                                </p>
                                <p>
                                    Nếu bạn hủy bỏ, bạn sẽ được bảo vệ đầy đủ đến khi kết thúc kỳ mà đã thanh toán. Sau ngày này, gói đăng ký của bạn sẽ kết thúc và bạn sẽ không bị tính phí cho bất kỳ khoảng thời gian nào sau này.
                                </p>
                                <p>
                                    <strong>Để hủy bỏ:</strong>
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Mở biên nhận qua email mà bạn nhận được sau lần mua hàng đầu tiên hoặc email có nhắc nhở tự động gia hạn.</li>
                                    <li>Truy cập vào liên kết đến trang chứa các điều kiện tự động gia hạn gói đăng ký của bạn.</li>
                                    <li>Chọn Hủy bỏ tự động gia hạn. Bạn sẽ sớm nhận được email xác nhận việc hủy bỏ tự động gia hạn.</li>
                                </ul>
                                <p>
                                    Bạn cũng có thể hủy bỏ tự động gia hạn bằng cách liên hệ với bộ phận Hỗ trợ khách hàng của Kidolock.
                                </p>
                                <p>
                                    Nếu bạn đã bị trừ tiền cho kỳ gói đăng ký tiếp theo, bạn có 30 ngày kể từ ngày thanh toán để yêu cầu hoàn lại toàn bộ khoản thanh toán gia hạn.
                                </p>
                                <p>
                                    Để yêu cầu hoàn tiền, vui lòng liên hệ với bộ phận Hỗ trợ khách hàng của Kidolock.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionWorkflowSection;
