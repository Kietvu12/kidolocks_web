import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import LoadingOverlay from '../components/LoadingOverlay';

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginWithPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setMessage('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const result = await loginWithPassword(formData.phone, formData.password);
      
      if (result.success) {
        setMessage('Đăng nhập thành công!');
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
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8" style={{backgroundColor: '#f9fafb'}}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <img 
            src="/logo.png" 
            alt="KidsLock" 
            className="mx-auto h-16 w-auto"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold" style={{color: '#111827'}}>
            Đăng nhập vào tài khoản của bạn
          </h2>
          <p className="mt-2 text-center text-sm" style={{color: '#4b5563'}}>
            Hoặc{' '}
            <button
              onClick={() => navigate('/register')}
              className="font-medium"
              style={{color: '#2563eb'}}
              onMouseEnter={(e) => e.target.style.color = '#1d4ed8'}
              onMouseLeave={(e) => e.target.style.color = '#2563eb'}
            >
              đăng ký tài khoản mới
            </button>
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10" style={{backgroundColor: '#ffffff'}}>
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

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium" style={{color: '#374151'}}>
                Số điện thoại
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Nhập số điện thoại của bạn"
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
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Nhập mật khẩu"
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
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm" style={{color: '#111827'}}>
                  Ghi nhớ đăng nhập
                </label>
              </div>

              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => navigate('/reset-password')}
                  className="font-medium"
                  style={{color: '#2563eb'}}
                  onMouseEnter={(e) => e.target.style.color = '#1d4ed8'}
                  onMouseLeave={(e) => e.target.style.color = '#2563eb'}
                >
                  Quên mật khẩu?
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{backgroundColor: '#2563eb', color: '#ffffff'}}
                onMouseEnter={(e) => !e.target.disabled && (e.target.style.backgroundColor = '#1d4ed8')}
                onMouseLeave={(e) => !e.target.disabled && (e.target.style.backgroundColor = '#2563eb')}
              >
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </button>
            </div>
          </form>

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
                onClick={() => navigate('/register')}
                className="w-full inline-flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium transition-colors"
                style={{borderColor: '#d1d5db', color: '#6b7280', backgroundColor: '#ffffff'}}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#ffffff'}
              >
                Tạo tài khoản mới
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Loading Overlay */}
      <LoadingOverlay 
        isVisible={redirecting} 
        message="Đăng nhập thành công!" 
      />
    </div>
  );
};

export default LoginPage;