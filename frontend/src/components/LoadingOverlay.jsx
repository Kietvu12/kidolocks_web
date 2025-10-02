import React from 'react';

const LoadingOverlay = ({ isVisible, message = "Đang chuyển hướng..." }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm mx-4 text-center shadow-2xl">
        {/* Loading Spinner */}
        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
        </div>
        
        {/* Loading Message */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {message}
        </h3>
        
        <p className="text-sm text-gray-600">
          Vui lòng đợi trong giây lát...
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
