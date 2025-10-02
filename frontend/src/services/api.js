const API_BASE_URL = 'https://kidolock.com/api_kidolocks/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Get token from localStorage
  getToken() {
    return localStorage.getItem('token');
  }

  // Set token to localStorage
  setToken(token) {
    localStorage.setItem('token', token);
  }

  // Remove token from localStorage
  removeToken() {
    localStorage.removeItem('token');
  }

  // Get user info from localStorage
  getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Set user info to localStorage
  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Remove user info from localStorage
  removeUser() {
    localStorage.removeItem('user');
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.getToken();
  }

  // Check if user is admin
  isAdmin() {
    const user = this.getUser();
    return user && user.la_admin === true;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getToken();
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        // If token is invalid, clear auth data
        if (response.status === 401 || response.status === 403) {
          this.removeToken();
          this.removeUser();
          // Redirect to login page if not already there
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
        }
        throw new Error(data.message || 'Có lỗi xảy ra');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // ==================== AUTHENTICATION API ====================
  // Gửi OTP cho đăng ký
  async sendRegistrationOTP(phone) {
    return this.post('/auth/send-registration-otp', { sdt: phone });
  }

  // Đăng ký phụ huynh với OTP
  async registerPhuHuynh(data) {
    const response = await this.post('/auth/register', data);
    if (response.success && response.data.token) {
      this.setToken(response.data.token);
      this.setUser(response.data.user);
    }
    return response;
  }

  // Gửi OTP cho đăng nhập
  async sendLoginOTP(phone) {
    return this.post('/auth/send-login-otp', { sdt: phone });
  }

  // Đăng nhập với OTP
  async loginWithOTP(phone, otp) {
    const response = await this.post('/auth/login-otp', { sdt: phone, otp });
    if (response.success && response.data.token) {
      this.setToken(response.data.token);
      this.setUser(response.data.user);
    }
    return response;
  }

  // Đăng nhập với mật khẩu
  async loginPhuHuynh(email, password) {
    const response = await this.post('/auth/login', { email_phu_huynh: email, mat_khau: password });
    if (response.success && response.data.token) {
      this.setToken(response.data.token);
      this.setUser(response.data.user);
    }
    return response;
  }

  // Gửi OTP cho reset password
  async sendResetPasswordOTP(phone) {
    return this.post('/auth/send-reset-otp', { sdt: phone });
  }

  // Reset password với OTP
  async resetPassword(phone, otp, newPassword) {
    return this.post('/auth/reset-password', { 
      sdt: phone, 
      otp, 
      mat_khau_moi: newPassword 
    });
  }

  // Lấy thông tin user hiện tại
  async getCurrentUser() {
    return this.get('/auth/me');
  }

  // Đăng xuất
  logout() {
    this.removeToken();
    this.removeUser();
    window.location.href = '/login';
  }

  // ==================== PHỤ HUYNH API ====================
  async getAllPhuHuynh() {
    return this.get('/phu-huynh');
  }

  async getPhuHuynhById(id) {
    return this.get(`/phu-huynh/${id}`);
  }

  async createPhuHuynh(data) {
    return this.post('/phu-huynh', data);
  }

  async updatePhuHuynh(id, data) {
    return this.put(`/phu-huynh/${id}`, data);
  }

  async deletePhuHuynh(id) {
    return this.delete(`/phu-huynh/${id}`);
  }

  // ==================== TRẺ EM API ====================
  async getTreEmByPhuHuynh(phuHuynhId) {
    return this.get(`/phu-huynh/${phuHuynhId}/tre-em`);
  }

  async getTreEmById(id) {
    return this.get(`/tre-em/${id}`);
  }

  async createTreEm(data) {
    return this.post('/tre-em', data);
  }

  async updateTreEm(id, data) {
    return this.put(`/tre-em/${id}`, data);
  }

  async deleteTreEm(id) {
    return this.delete(`/tre-em/${id}`);
  }

  async getAllTreEm() {
    return this.get('/tre-em');
  }

  // ==================== THIẾT BỊ API ====================
  async getThietBiByTreEm(treEmId) {
    return this.get(`/tre-em/${treEmId}/thiet-bi`);
  }

  async getThietBiById(id) {
    return this.get(`/thiet-bi/${id}`);
  }

  async createThietBi(data) {
    return this.post('/thiet-bi', data);
  }

  async updateThietBi(id, data) {
    return this.put(`/thiet-bi/${id}`, data);
  }

  async deleteThietBi(id) {
    return this.delete(`/thiet-bi/${id}`);
  }

  async changeGoiDichVu(thietBiId, data) {
    return this.put(`/thiet-bi/${thietBiId}/change-goi`, data);
  }

  async getLichSuGoiDichVu(thietBiId) {
    return this.get(`/thiet-bi/${thietBiId}/lich-su-goi`);
  }

  // ==================== GÓI DỊCH VỤ API ====================
  async getAllGoi() {
    return this.get('/goi');
  }

  async getGoiById(id) {
    return this.get(`/goi/${id}`);
  }

  async createGoi(data) {
    return this.post('/goi', data);
  }

  async updateGoi(id, data) {
    return this.put(`/goi/${id}`, data);
  }

  async deleteGoi(id) {
    return this.delete(`/goi/${id}`);
  }

  async getGoiByType(loaiGoi) {
    return this.get(`/goi/loai/${loaiGoi}`);
  }

  async getGoiStatistics(id) {
    return this.get(`/goi/${id}/thong-ke`);
  }

  // ==================== NỘI DUNG GÓI API ====================
  async addNoiDungToGoi(goiId, noiDung) {
    return this.post(`/goi/${goiId}/noi-dung`, { noi_dung: noiDung });
  }

  async updateNoiDungGoi(noiDungId, noiDung) {
    return this.put(`/noi-dung/${noiDungId}`, { noi_dung: noiDung });
  }

  async deleteNoiDungGoi(noiDungId) {
    return this.delete(`/noi-dung/${noiDungId}`);
  }

  async getNoiDungByGoi(goiId) {
    return this.get(`/goi/${goiId}/noi-dung`);
  }

  // ==================== GÓI DỊCH VỤ THIẾT BỊ API ====================
  async getGoiByThietBi(maThietBi) {
    return this.get(`/thiet-bi/${maThietBi}/goi`);
  }

  async getActiveGoiByThietBi(maThietBi) {
    return this.get(`/thiet-bi/${maThietBi}/goi/active`);
  }

  async updateGoiTimeForThietBi(maThietBi, data) {
    return this.put(`/thiet-bi/${maThietBi}/goi/time`, data);
  }

  async extendGoiForThietBi(maThietBi, soThangGiaHan) {
    return this.put(`/thiet-bi/${maThietBi}/goi/extend`, { so_thang_gia_han: soThangGiaHan });
  }

  // ==================== DRILL-DOWN API ====================
  async getDrillDownData() {
    return this.get('/drill-down');
  }

  // ==================== CHANGE PACKAGE API ====================
  async changePackageForDevice(thietBiId, goiId) {
    return this.put(`/thiet-bi/${thietBiId}/change-goi`, { thong_tin_goi_id: goiId });
  }

  // ==================== PAYMENT API ====================
  async createPayment(data) {
    return this.post('/payment/create', data);
  }

  async getPurchasedPackages(phuHuynhId) {
    return this.get(`/payment/purchased/${phuHuynhId}`);
  }

  async getUnassignedPackages(phuHuynhId) {
    return this.get(`/payment/unassigned/${phuHuynhId}`);
  }

  async assignPackageToDevice(data) {
    return this.post('/payment/assign', data);
  }

  // ==================== HEALTH CHECK ====================
  async healthCheck() {
    return this.get('/health');
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;
