import React from 'react';
import { useLocation } from 'react-router-dom';
import ContactFloatingButtons from './ContactFloatingButtons';

const ConditionalContactButtons = () => {
    const location = useLocation();
    
    // Danh sách các route không hiển thị contact buttons
    const hiddenRoutes = [
        '/login',
        '/register', 
        '/forgot-password',
        '/change-password'
    ];
    
    // Kiểm tra xem route hiện tại có trong danh sách ẩn không
    const shouldHide = hiddenRoutes.some(route => location.pathname.startsWith(route));
    
    // Chỉ render ContactFloatingButtons nếu không phải là route bị ẩn
    if (shouldHide) {
        return null;
    }
    
    return <ContactFloatingButtons />;
};

export default ConditionalContactButtons;
