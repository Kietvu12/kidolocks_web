import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import LoadingOverlay from '../components/LoadingOverlay';

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const { sendChangePasswordOTP, changePasswordWithOTP } = useAuth();
  const [step, setStep] = useState(1); // 1: Send OTP, 2: Change Password
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
  });

  // Form states
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    otp: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validate password requirements when new password changes
    if (name === 'newPassword') {
      validatePasswordRequirements(value);
    }
    
    setError('');
    setMessage('');
  };

  const validatePasswordRequirements = (password) => {
    setPasswordRequirements({
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    });
  };

  const isPasswordValid = () => {
    return Object.values(passwordRequirements).every(requirement => requirement);
  };

  const RequirementItem = ({ met, text }) => (
    <div className={`flex items-center space-x-2 text-sm ${met ? 'text-green-600' : 'text-gray-500'}`}>
      {met ? (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      )}
      <span>{text}</span>
    </div>
  );

  const validatePassword = () => {
    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      setError('Vui lòng điền đầy đủ thông tin');
      return false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Mật khẩu mới xác nhận không khớp');
      return false;
    }

    if (!isPasswordValid()) {
      setError('Mật khẩu mới chưa đáp ứng yêu cầu bảo mật');
      return false;
    }

    if (formData.oldPassword === formData.newPassword) {
      setError('Mật khẩu mới phải khác mật khẩu cũ');
      return false;
    }

    return true;
  };

  const handleSendOTP = async () => {
    if (!validatePassword()) {
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const result = await sendChangePasswordOTP();
      
      if (result.success) {
        setMessage('Mã OTP đã được gửi đến số điện thoại của bạn');
        // Trong development, hiển thị OTP để test
        if (result.data && result.data.otp) {
        }
        setStep(2);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (!formData.otp) {
      setError('Vui lòng nhập mã OTP');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const result = await changePasswordWithOTP(
        formData.oldPassword, 
        formData.newPassword, 
        formData.otp
      );
      
      if (result.success) {
        setMessage('Đổi mật khẩu thành công!');
        setLoading(false);
        setRedirecting(true);
        setTimeout(() => {
          navigate('/admin');
        }, 2000);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <img 
            src="/logo.png" 
            alt="KidsLock" 
            className="mx-auto h-16 w-auto"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đổi mật khẩu
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Thay đổi mật khẩu của bạn một cách an toàn
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <span className="ml-2 text-sm font-medium">Nhập mật khẩu</span>
            </div>
            <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              <span className="ml-2 text-sm font-medium">Xác thực OTP</span>
            </div>
          </div>

          {/* Messages */}
          {message && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
              {message}
            </div>
          )}
          
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {/* Step 1: Password Form */}
          {step === 1 && (
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSendOTP(); }}>
              <div>
                <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
                  Mật khẩu hiện tại
                </label>
                <div className="mt-1 relative">
                  <input
                    id="oldPassword"
                    name="oldPassword"
                    type={showOldPassword ? "text" : "password"}
                    required
                    value={formData.oldPassword}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Nhập mật khẩu hiện tại"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                  >
                    {showOldPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  Mật khẩu mới
                </label>
                <div className="mt-1 relative">
                  <input
                    id="newPassword"
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    required
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Nhập mật khẩu mới"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                
                {/* Password Requirements */}
                {formData.newPassword && (
                  <div className="mt-3 p-3 rounded-md space-y-2" style={{backgroundColor: '#f9fafb'}}>
                    <p className="text-sm font-medium" style={{color: '#374151'}}>Yêu cầu mật khẩu:</p>
                    <RequirementItem 
                      met={passwordRequirements.length} 
                      text="Ít nhất 6 ký tự" 
                    />
                    <RequirementItem 
                      met={passwordRequirements.uppercase} 
                      text="Có ít nhất 1 chữ in hoa (A-Z)" 
                    />
                    <RequirementItem 
                      met={passwordRequirements.lowercase} 
                      text="Có ít nhất 1 chữ in thường (a-z)" 
                    />
                    <RequirementItem 
                      met={passwordRequirements.number} 
                      text="Có ít nhất 1 chữ số (0-9)" 
                    />
                    <RequirementItem 
                      met={passwordRequirements.specialChar} 
                      text="Có ít nhất 1 ký tự đặc biệt (!@#$%^&*...)" 
                    />
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Xác nhận mật khẩu mới
                </label>
                <div className="mt-1 relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Nhập lại mật khẩu mới"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Đang gửi OTP...' : 'Gửi mã OTP'}
                </button>
              </div>
            </form>
          )}

          {/* Step 2: OTP Verification */}
          {step === 2 && (
            <form className="space-y-6" onSubmit={handleChangePassword}>
              <div className="text-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Xác thực OTP</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Mã OTP đã được gửi đến số điện thoại của bạn
                </p>
              </div>

              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  Mã OTP
                </label>
                <div className="mt-1">
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    value={formData.otp}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-center text-lg tracking-widest"
                    placeholder="Nhập mã OTP"
                    maxLength="6"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Mã OTP có hiệu lực trong 5 phút
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Quay lại
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Đang đổi mật khẩu...' : 'Đổi mật khẩu'}
                </button>
              </div>
            </form>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Hoặc</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => navigate('/admin')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Quay lại trang chủ
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Loading Overlay */}
      <LoadingOverlay 
        isVisible={redirecting} 
        message="Đổi mật khẩu thành công!" 
      />
    </div>
  );
};

export default ChangePasswordPage;
