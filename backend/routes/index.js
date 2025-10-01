const express = require('express');
const router = express.Router();

// Import controllers
const PhuHuynhController = require('../controllers/PhuHuynhController');
const TreEmController = require('../controllers/TreEmController');
const ThietBiController = require('../controllers/ThietBiController');
const GoiController = require('../controllers/GoiController');
const PaymentController = require('../controllers/PaymentController');

// Import middleware
const { authenticateToken, requireAdmin } = require('../utils/jwtUtils');

// ==================== AUTHENTICATION ROUTES ====================
// Gửi OTP cho đăng ký
router.post('/auth/send-registration-otp', PhuHuynhController.sendRegistrationOTP);

// Đăng ký phụ huynh với OTP
router.post('/auth/register', PhuHuynhController.registerPhuHuynh);

// Gửi OTP cho đăng nhập
router.post('/auth/send-login-otp', PhuHuynhController.sendLoginOTP);

// Đăng nhập với OTP
router.post('/auth/login-otp', PhuHuynhController.loginWithOTP);

// Đăng nhập với mật khẩu
router.post('/auth/login', PhuHuynhController.loginPhuHuynh);

// Gửi OTP cho reset password
router.post('/auth/send-reset-otp', PhuHuynhController.sendResetPasswordOTP);

// Reset password với OTP
router.post('/auth/reset-password', PhuHuynhController.resetPassword);

// Lấy thông tin user hiện tại
router.get('/auth/me', authenticateToken, PhuHuynhController.getCurrentUser);

// ==================== PHỤ HUYNH ROUTES ====================
// Lấy danh sách tất cả phụ huynh (chỉ admin)
router.get('/phu-huynh', authenticateToken, requireAdmin, PhuHuynhController.getAllPhuHuynh);

// Lấy thông tin phụ huynh theo ID (chỉ admin)
router.get('/phu-huynh/:id', authenticateToken, requireAdmin, PhuHuynhController.getPhuHuynhById);

// Tạo phụ huynh mới (chỉ admin)
router.post('/phu-huynh', authenticateToken, requireAdmin, PhuHuynhController.createPhuHuynh);

// Cập nhật thông tin phụ huynh (chỉ admin)
router.put('/phu-huynh/:id', authenticateToken, requireAdmin, PhuHuynhController.updatePhuHuynh);

// Xóa phụ huynh (chỉ admin)
router.delete('/phu-huynh/:id', authenticateToken, requireAdmin, PhuHuynhController.deletePhuHuynh);

// API giải mã mật khẩu (chỉ để test - chỉ admin)
router.post('/phu-huynh/decrypt-password', authenticateToken, requireAdmin, PhuHuynhController.decryptPassword);

// ==================== TRẺ EM ROUTES ====================
// Lấy danh sách trẻ em của một phụ huynh (cần authentication)
router.get('/phu-huynh/:phuHuynhId/tre-em', authenticateToken, TreEmController.getTreEmByPhuHuynh);

// Lấy thông tin chi tiết một trẻ em (cần authentication)
router.get('/tre-em/:id', authenticateToken, TreEmController.getTreEmById);

// Tạo trẻ em mới (cần authentication)
router.post('/tre-em', authenticateToken, TreEmController.createTreEm);

// Cập nhật thông tin trẻ em (cần authentication)
router.put('/tre-em/:id', authenticateToken, TreEmController.updateTreEm);

// Xóa trẻ em (cần authentication)
router.delete('/tre-em/:id', authenticateToken, TreEmController.deleteTreEm);

// Lấy tất cả trẻ em (chỉ admin)
router.get('/tre-em', authenticateToken, requireAdmin, TreEmController.getAllTreEm);

// ==================== THIẾT BỊ ROUTES ====================
// Lấy danh sách thiết bị của một trẻ em (cần authentication)
router.get('/tre-em/:treEmId/thiet-bi', authenticateToken, ThietBiController.getThietBiByTreEm);

// Lấy thông tin chi tiết một thiết bị (cần authentication)
router.get('/thiet-bi/:id', authenticateToken, ThietBiController.getThietBiById);

// Tạo thiết bị mới (cần authentication)
router.post('/thiet-bi', authenticateToken, ThietBiController.createThietBi);

// Cập nhật thông tin thiết bị (cần authentication)
router.put('/thiet-bi/:id', authenticateToken, ThietBiController.updateThietBi);

// Xóa thiết bị (cần authentication)
router.delete('/thiet-bi/:id', authenticateToken, ThietBiController.deleteThietBi);

// Thay đổi gói dịch vụ cho thiết bị (cần authentication)
router.put('/thiet-bi/:thietBiId/change-goi', authenticateToken, ThietBiController.changeGoiDichVu);

// Lấy lịch sử gói dịch vụ của thiết bị (cần authentication)
router.get('/thiet-bi/:thietBiId/lich-su-goi', authenticateToken, ThietBiController.getLichSuGoiDichVu);

// Lấy dữ liệu drill-down: Phụ huynh → Trẻ em → Thiết bị + Gói (chỉ admin)
router.get('/drill-down', authenticateToken, requireAdmin, ThietBiController.getDrillDownData);

// ==================== GÓI DỊCH VỤ ROUTES ====================
// Lấy danh sách tất cả gói dịch vụ (public - không cần auth)
router.get('/goi', GoiController.getAllGoi);

// Lấy thông tin chi tiết một gói (public - không cần auth)
router.get('/goi/:id', GoiController.getGoiById);

// Tạo gói dịch vụ mới (chỉ admin)
router.post('/goi', authenticateToken, requireAdmin, GoiController.createGoi);

// Cập nhật thông tin gói dịch vụ (chỉ admin)
router.put('/goi/:id', authenticateToken, requireAdmin, GoiController.updateGoi);

// Xóa gói dịch vụ (chỉ admin)
router.delete('/goi/:id', authenticateToken, requireAdmin, GoiController.deleteGoi);

// Lấy danh sách gói theo loại (public - không cần auth)
router.get('/goi/loai/:loai_goi', GoiController.getGoiByType);

// Lấy thống kê sử dụng gói (chỉ admin)
router.get('/goi/:id/thong-ke', authenticateToken, requireAdmin, GoiController.getGoiStatistics);

// Lấy nội dung của gói (public - không cần auth)
router.get('/goi/:id/noi-dung', GoiController.getNoiDungByGoi);

// Lấy danh sách gói dịch vụ của một thiết bị (cần authentication)
router.get('/thiet-bi/:ma_thiet_bi/goi', authenticateToken, GoiController.getGoiByThietBi);

// Lấy gói đang hoạt động của một thiết bị (cần authentication)
router.get('/thiet-bi/:ma_thiet_bi/goi/active', authenticateToken, GoiController.getActiveGoiByThietBi);

// Cập nhật thời gian gói dịch vụ của thiết bị (cần authentication)
router.put('/thiet-bi/:ma_thiet_bi/goi/time', authenticateToken, GoiController.updateGoiTimeForThietBi);

// Gia hạn gói dịch vụ của thiết bị (cần authentication)
router.put('/thiet-bi/:ma_thiet_bi/goi/extend', authenticateToken, GoiController.extendGoiForThietBi);

// ==================== NỘI DUNG GÓI ROUTES ====================
// Thêm nội dung cho gói (chỉ admin)
router.post('/goi/:goiId/noi-dung', authenticateToken, requireAdmin, GoiController.addNoiDungToGoi);

// Cập nhật nội dung gói (chỉ admin)
router.put('/noi-dung/:noiDungId', authenticateToken, requireAdmin, GoiController.updateNoiDungGoi);

// Xóa nội dung gói (chỉ admin)
router.delete('/noi-dung/:noiDungId', authenticateToken, requireAdmin, GoiController.deleteNoiDungGoi);

// ==================== PAYMENT ROUTES ====================
// Tạo thanh toán VNPay
router.post('/payment/create', authenticateToken, PaymentController.createPayment);

// Xử lý callback từ VNPay (không cần auth vì là webhook)
router.get('/payment/vnpay-return', PaymentController.handleVnpayReturn);

// Lấy danh sách gói đã mua của phụ huynh
router.get('/payment/purchased/:phu_huynh_id', authenticateToken, PaymentController.getPurchasedPackages);

// Lấy danh sách gói chưa gán thiết bị
router.get('/payment/unassigned/:phu_huynh_id', authenticateToken, PaymentController.getUnassignedPackages);

// Gán gói cho thiết bị
router.post('/payment/assign', authenticateToken, PaymentController.assignPackageToDevice);

// ==================== HEALTH CHECK ====================
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API KidsLock đang hoạt động bình thường',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
