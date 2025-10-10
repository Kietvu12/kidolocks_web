import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import LoadingOverlay from '../components/LoadingOverlay';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { sendRegistrationOTP, register } = useAuth();
  const [step, setStep] = useState(1); // 1: Form info, 2: OTP verification
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    name: '',
    password: '',
    confirmPassword: '',
    otp: ''
  });

  // Password requirements state
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setMessage('');

    // Validate password requirements when password changes
    if (name === 'password') {
      validatePasswordRequirements(value);
    }
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

  const validateForm = () => {
    if (!formData.email || !formData.phone || !formData.name || !formData.password) {
      setError('Vui lòng điền đầy đủ thông tin');
      return false;
    }

    if (!isPasswordValid()) {
      setError('Mật khẩu chưa đáp ứng yêu cầu bảo mật');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Email không hợp lệ');
      return false;
    }

    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Số điện thoại không hợp lệ');
      return false;
    }

    return true;
  };

  const handleSendOTP = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const result = await sendRegistrationOTP(formData.phone);
      
      if (result.success) {
        setMessage('Mã OTP đã được gửi đến số điện thoại của bạn');
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

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!formData.otp) {
      setError('Vui lòng nhập mã OTP');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const result = await register({
        email_phu_huynh: formData.email,
        sdt: formData.phone,
        ten_phu_huynh: formData.name,
        mat_khau: formData.password,
        otp: formData.otp
      });
      
      if (result.success) {
        setMessage('Đăng ký thành công!');
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

  const RequirementItem = ({ met, text }) => (
    <div className={`flex items-center space-x-2 text-sm ${met ? 'text-green-600' : 'text-gray-500'}`}>
      {met ? (
        <CheckCircle className="h-4 w-4" />
      ) : (
        <XCircle className="h-4 w-4" />
      )}
      <span>{text}</span>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8" style={{backgroundColor: '#f9fafb'}}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <img 
            src="/logo.png" 
            alt="KidsLock" 
            className="mx-auto h-16 w-auto"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold" style={{color: '#111827'}}>
            Đăng ký tài khoản mới
          </h2>
          <p className="mt-2 text-center text-sm" style={{color: '#4b5563'}}>
            Hoặc{' '}
            <button
              onClick={() => navigate('/login')}
              className="font-medium"
              style={{color: '#2563eb'}}
              onMouseEnter={(e) => e.target.style.color = '#1d4ed8'}
              onMouseLeave={(e) => e.target.style.color = '#2563eb'}
            >
              đăng nhập với tài khoản có sẵn
            </button>
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10" style={{backgroundColor: '#ffffff'}}>
          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className={`flex items-center ${step >= 1 ? '' : ''}`} style={{color: step >= 1 ? '#2563eb' : '#9ca3af'}}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 1 ? '' : ''
              }`} style={{
                backgroundColor: step >= 1 ? '#2563eb' : '#e5e7eb',
                color: step >= 1 ? '#ffffff' : '#4b5563'
              }}>
                1
              </div>
              <span className="ml-2 text-sm font-medium">Thông tin</span>
            </div>
            <div className={`w-8 h-0.5 ${step >= 2 ? '' : ''}`} style={{backgroundColor: step >= 2 ? '#2563eb' : '#e5e7eb'}}></div>
            <div className={`flex items-center ${step >= 2 ? '' : ''}`} style={{color: step >= 2 ? '#2563eb' : '#9ca3af'}}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 2 ? '' : ''
              }`} style={{
                backgroundColor: step >= 2 ? '#2563eb' : '#e5e7eb',
                color: step >= 2 ? '#ffffff' : '#4b5563'
              }}>
                2
              </div>
              <span className="ml-2 text-sm font-medium">Xác thực</span>
            </div>
          </div>

          {/* Messages */}
          {message && (
            <div className="mb-4 px-4 py-3 rounded-md" style={{backgroundColor: '#f0fdf4', borderColor: '#bbf7d0', borderWidth: '1px', color: '#166534'}}>
              {message}
            </div>
          )}
          
          {error && (
            <div className="mb-4 px-4 py-3 rounded-md" style={{backgroundColor: '#fef2f2', borderColor: '#fecaca', borderWidth: '1px', color: '#dc2626'}}>
              {error}
            </div>
          )}

          {/* Step 1: Registration Form */}
          {step === 1 && (
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSendOTP(); }}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium" style={{color: '#374151'}}>
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Nhập email của bạn"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium" style={{color: '#374151'}}>
                  Số điện thoại
                </label>
                <div className="mt-1">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                <p className="mt-1 text-xs" style={{color: '#6b7280'}}>
                  Chúng tôi sẽ gửi mã OTP đến số điện thoại này để xác thực
                </p>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium" style={{color: '#374151'}}>
                  Họ và tên
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Nhập họ và tên"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium" style={{color: '#374151'}}>
                  Mật khẩu
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                
                {/* Password Requirements */}
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
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium" style={{color: '#374151'}}>
                  Xác nhận mật khẩu
                </label>
                <div className="mt-1 relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`appearance-none block w-full px-3 py-2 pr-10 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                      formData.confirmPassword && formData.password !== formData.confirmPassword
                        ? 'border-red-300'
                        : formData.confirmPassword && formData.password === formData.confirmPassword
                        ? 'border-green-300'
                        : 'border-gray-300'
                    }`}
                    placeholder="Nhập lại mật khẩu"
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
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">Mật khẩu xác nhận không khớp</p>
                )}
                {formData.confirmPassword && formData.password === formData.confirmPassword && isPasswordValid() && (
                  <p className="mt-1 text-sm text-green-600">Mật khẩu khớp và đạt yêu cầu</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading || !isPasswordValid() || formData.password !== formData.confirmPassword}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{backgroundColor: '#2563eb', color: '#ffffff'}}
                  onMouseEnter={(e) => !e.target.disabled && (e.target.style.backgroundColor = '#1d4ed8')}
                  onMouseLeave={(e) => !e.target.disabled && (e.target.style.backgroundColor = '#2563eb')}
                >
                  {loading ? 'Đang gửi OTP...' : 'Gửi mã OTP'}
                </button>
              </div>
            </form>
          )}

          {/* Step 2: OTP Verification */}
          {step === 2 && (
            <form className="space-y-6" onSubmit={handleRegister}>
              <div className="text-center mb-6">
                <h3 className="text-lg font-medium" style={{color: '#111827'}}>Xác thực số điện thoại</h3>
                <p className="mt-2 text-sm" style={{color: '#4b5563'}}>
                  Mã OTP đã được gửi đến số điện thoại: <strong>{formData.phone}</strong>
                </p>
              </div>

              <div>
                <label htmlFor="otp" className="block text-sm font-medium" style={{color: '#374151'}}>
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
                <p className="mt-1 text-xs" style={{color: '#6b7280'}}>
                  Mã OTP có hiệu lực trong 5 phút
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-2 px-4 border rounded-md text-sm font-medium transition-colors"
                  style={{borderColor: '#d1d5db', color: '#374151', backgroundColor: '#ffffff'}}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
                >
                  Quay lại
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 px-4 border border-transparent text-sm font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{backgroundColor: '#2563eb', color: '#ffffff'}}
                  onMouseEnter={(e) => !e.target.disabled && (e.target.style.backgroundColor = '#1d4ed8')}
                  onMouseLeave={(e) => !e.target.disabled && (e.target.style.backgroundColor = '#2563eb')}
                >
                  {loading ? 'Đang đăng ký...' : 'Hoàn thành đăng ký'}
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
                <span className="px-2" style={{backgroundColor: '#ffffff', color: '#6b7280'}}>Hoặc</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => navigate('/login')}
                className="w-full inline-flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium transition-colors"
                style={{borderColor: '#d1d5db', color: '#6b7280', backgroundColor: '#ffffff'}}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
              >
                Đăng nhập với tài khoản có sẵn
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Loading Overlay */}
      <LoadingOverlay 
        isVisible={redirecting} 
        message="Đăng ký thành công!" 
      />
    </div>
  );
};

export default RegisterPage;