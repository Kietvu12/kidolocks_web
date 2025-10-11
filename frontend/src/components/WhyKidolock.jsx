import React from 'react'
import componentSlide1 from '../assets/component_slide_1.png'
import componentSlide2 from '../assets/component_slide_2.png'
import componentSlide3 from '../assets/component_slide_3.png'

const WhyKidolock = () => {
    const features = [
        {
            title: "THEO DÕI",
            content: "Phần mềm quản lý trẻ em trên điện thoại và máy tính giúp bạn biết con bạn đang ở đâu 24/7, theo dõi hoạt động kỹ thuật số và thời gian sử dụng thiết bị của các con, đồng thời nhận cảnh báo về những hành vi đáng lo ngại.",
            image: componentSlide1
        },
        {
            title: "GIÁO DỤC", 
            content: "Nuôi dưỡng những thói quen tích cực bằng cách dạy về an toàn kỹ thuật số và khuyến khích việc cân bằng hoạt động giữa trực tuyến và ngoại tuyến",
            image: componentSlide2
        },
        {
            title: "BẢO VỆ",
            content: "Bảo vệ con bạn khỏi những trải nghiệm tiêu cực trên các thiết bị bằng cách chặn nội dung độc hại.",
            image: componentSlide3
        }
    ]

    return (
        <div className="py-24 sm:px-6 lg:px-8" style={{ backgroundColor: 'white' }}>
            <div className="max-w-7xl mx-auto">
                {/* Main Content Container */}
                <div className="relative min-h-[40rem]">
                    {/* Images Section - Shifted to left */}
                    <div className="flex items-center justify-start lg:justify-start">
                    {/* Mobile/Tablet Layout - Text outside image */}
                    <div className="block lg:hidden">
                        <div className="space-y-8">
                            {features.map((feature, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    {/* Image Section */}
                                    <div className="relative h-[20rem] sm:h-[24rem] md:h-[28rem] w-full mb-6">
                                        <img
                                            src={feature.image}
                                            alt={feature.title}
                                            className="w-full h-full object-cover rounded-2xl"
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
                        <div className="grid grid-cols-3 gap-4 lg:gap-6 ml-0 lg:ml-[-2rem] xl:ml-[-4rem]">
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
                                            src={feature.image}
                                            alt={feature.title}
                                            className="w-full h-full object-cover rounded-2xl"
                                        />
                                        
                                        {/* Overlay with content */}
                                        <div className="absolute inset-0 rounded-2xl flex flex-col justify-end p-6 md:p-8 lg:p-10">
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

                    {/* Title Section - Bottom right corner */}
                    <div className="absolute bottom-4 -right-8 lg:bottom-8 lg:-right-12 xl:bottom-12 xl:-right-16 text-right z-10">
                        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight" style={{ fontFamily: 'Myriad Pro', fontWeight: 700 }}>
                            <div className="font-light" style={{ color: '#4B5563' }}>TẠI SAO LẠI LÀ</div>
                            <div className="font-bold" style={{ background: 'linear-gradient(to right, #2563EB, #FB923C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>KIDOLOCK ?</div>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhyKidolock
