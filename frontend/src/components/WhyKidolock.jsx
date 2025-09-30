import React from 'react'
import componentSlide from '../assets/component_slide.png'

const WhyKidolock = () => {
    const features = [
        {
            title: "THEO DÕI",
            content: "Phần mềm quản lý trẻ em trên điện thoại và máy tính giúp bạn biết con bạn đang ở đâu 24/7, theo dõi hoạt động kỹ thuật số và thời gian sử dụng thiết bị của các con, đồng thời nhận cảnh báo về những hành vi đáng lo ngại."
        },
        {
            title: "GIÁO DỤC", 
            content: "Nuôi dưỡng những thói quen tích cực bằng cách dạy về an toàn kỹ thuật số và khuyến khích việc cân bằng hoạt động giữa trực tuyến và ngoại tuyến"
        },
        {
            title: "BẢO VỆ",
            content: "Bảo vệ con bạn khỏi những trải nghiệm tiêu cực trên các thiết bị bằng cách chặn nội dung độc hại."
        }
    ]

    return (
        <div className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'white' }}>
            <div className="max-w-7xl mx-auto">
                {/* Title Section - At the top */}
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight">
                        <span className="font-thin" style={{ color: '#4B5563' }}>TẠI SAO LẠI LÀ</span> <span className="font-bold" style={{ background: 'linear-gradient(to right, #2563EB, #FB923C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>KIDLOCKS</span> <span className="font-bold" style={{ background: 'linear-gradient(to right, #2563EB, #FB923C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>?</span>
                    </h2>
                </div>

                {/* Images Section - Below title */}
                <div className="flex items-center justify-center">
                    {/* Mobile/Tablet Layout - Text outside image */}
                    <div className="block lg:hidden">
                        <div className="space-y-8">
                            {features.map((feature, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    {/* Image Section */}
                                    <div className="relative h-[20rem] sm:h-[24rem] md:h-[28rem] w-full mb-6">
                                        <img
                                            src={componentSlide}
                                            alt={feature.title}
                                            className="w-full h-full object-cover rounded-2xl shadow-lg"
                                        />
                                    </div>
                                    
                                    {/* Content Section - Outside image */}
                                    <div className="text-center px-4">
                                        <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: '#1F2937' }}>
                                            {feature.title}
                                        </h3>
                                        <p className="leading-relaxed text-base sm:text-lg" style={{ color: '#4B5563' }}>
                                            {feature.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Desktop/Laptop Layout - Text inside image */}
                    <div className="hidden lg:block">
                        <div className="grid grid-cols-3 gap-4 lg:gap-6">
                            {features.map((feature, index) => (
                                <div 
                                    key={index} 
                                    className={`relative ${
                                        index === 0 ? 'mt-0' : 
                                        index === 1 ? 'mt-8 sm:mt-16' : 
                                        'mt-4 sm:mt-8'
                                    }`}
                                >
                                    {/* Vertical Rectangle Image - Extended */}
                                    <div className="relative h-[24rem] md:h-[28rem] lg:h-[32rem] xl:h-[36rem]">
                                        <img
                                            src={componentSlide}
                                            alt={feature.title}
                                            className="w-full h-full object-cover rounded-2xl shadow-lg"
                                        />
                                        
                                        {/* Overlay with content */}
                                        <div className="absolute inset-0 rounded-2xl flex flex-col justify-end p-6 md:p-8 lg:p-10" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
                                            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6" style={{ color: 'white' }}>
                                                {feature.title}
                                            </h3>
                                            <p className="leading-relaxed text-sm md:text-base lg:text-base" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                                                {feature.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhyKidolock
