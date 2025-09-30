const API_BASE_URL = 'https://kidolock.com/api_kidolocks/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
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

  async loginPhuHuynh(email, password) {
    return this.post('/phu-huynh/login', { email_phu_huynh: email, mat_khau: password });
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

  // ==================== HEALTH CHECK ====================
  async healthCheck() {
    return this.get('/health');
  }
}

// Create singleton instance
const apiService = new ApiService();

export default apiService;
