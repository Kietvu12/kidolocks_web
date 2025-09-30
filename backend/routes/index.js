const express = require('express');
const router = express.Router();

// Import controllers
const PhuHuynhController = require('../controllers/PhuHuynhController');
const TreEmController = require('../controllers/TreEmController');
const ThietBiController = require('../controllers/ThietBiController');
const GoiController = require('../controllers/GoiController');

// ==================== PHỤ HUYNH ROUTES ====================
// Lấy danh sách tất cả phụ huynh
router.get('/phu-huynh', PhuHuynhController.getAllPhuHuynh);

// Lấy thông tin phụ huynh theo ID
router.get('/phu-huynh/:id', PhuHuynhController.getPhuHuynhById);

// Tạo phụ huynh mới
router.post('/phu-huynh', PhuHuynhController.createPhuHuynh);

// Cập nhật thông tin phụ huynh
router.put('/phu-huynh/:id', PhuHuynhController.updatePhuHuynh);

// Xóa phụ huynh
router.delete('/phu-huynh/:id', PhuHuynhController.deletePhuHuynh);

// Đăng nhập phụ huynh
router.post('/phu-huynh/login', PhuHuynhController.loginPhuHuynh);

// API giải mã mật khẩu (chỉ để test)
router.post('/phu-huynh/decrypt-password', PhuHuynhController.decryptPassword);

// ==================== TRẺ EM ROUTES ====================
// Lấy danh sách trẻ em của một phụ huynh
router.get('/phu-huynh/:phuHuynhId/tre-em', TreEmController.getTreEmByPhuHuynh);

// Lấy thông tin chi tiết một trẻ em
router.get('/tre-em/:id', TreEmController.getTreEmById);

// Tạo trẻ em mới
router.post('/tre-em', TreEmController.createTreEm);

// Cập nhật thông tin trẻ em
router.put('/tre-em/:id', TreEmController.updateTreEm);

// Xóa trẻ em
router.delete('/tre-em/:id', TreEmController.deleteTreEm);

// Lấy tất cả trẻ em (cho admin)
router.get('/tre-em', TreEmController.getAllTreEm);

// ==================== THIẾT BỊ ROUTES ====================
// Lấy danh sách thiết bị của một trẻ em
router.get('/tre-em/:treEmId/thiet-bi', ThietBiController.getThietBiByTreEm);

// Lấy thông tin chi tiết một thiết bị
router.get('/thiet-bi/:id', ThietBiController.getThietBiById);

// Tạo thiết bị mới
router.post('/thiet-bi', ThietBiController.createThietBi);

// Cập nhật thông tin thiết bị
router.put('/thiet-bi/:id', ThietBiController.updateThietBi);

// Xóa thiết bị
router.delete('/thiet-bi/:id', ThietBiController.deleteThietBi);

// Thay đổi gói dịch vụ cho thiết bị
router.put('/thiet-bi/:thietBiId/change-goi', ThietBiController.changeGoiDichVu);

// Lấy lịch sử gói dịch vụ của thiết bị
router.get('/thiet-bi/:thietBiId/lich-su-goi', ThietBiController.getLichSuGoiDichVu);

// Lấy dữ liệu drill-down: Phụ huynh → Trẻ em → Thiết bị + Gói
router.get('/drill-down', ThietBiController.getDrillDownData);

// ==================== GÓI DỊCH VỤ ROUTES ====================
// Lấy danh sách tất cả gói dịch vụ
router.get('/goi', GoiController.getAllGoi);

// Lấy thông tin chi tiết một gói
router.get('/goi/:id', GoiController.getGoiById);

// Tạo gói dịch vụ mới
router.post('/goi', GoiController.createGoi);

// Cập nhật thông tin gói dịch vụ
router.put('/goi/:id', GoiController.updateGoi);

// Xóa gói dịch vụ
router.delete('/goi/:id', GoiController.deleteGoi);

// Lấy danh sách gói theo loại
router.get('/goi/loai/:loai_goi', GoiController.getGoiByType);

// Lấy thống kê sử dụng gói
router.get('/goi/:id/thong-ke', GoiController.getGoiStatistics);

// Lấy nội dung của gói
router.get('/goi/:id/noi-dung', GoiController.getNoiDungByGoi);

// Lấy danh sách gói dịch vụ của một thiết bị
router.get('/thiet-bi/:ma_thiet_bi/goi', GoiController.getGoiByThietBi);

// Lấy gói đang hoạt động của một thiết bị
router.get('/thiet-bi/:ma_thiet_bi/goi/active', GoiController.getActiveGoiByThietBi);

// Cập nhật thời gian gói dịch vụ của thiết bị
router.put('/thiet-bi/:ma_thiet_bi/goi/time', GoiController.updateGoiTimeForThietBi);

// Gia hạn gói dịch vụ của thiết bị
router.put('/thiet-bi/:ma_thiet_bi/goi/extend', GoiController.extendGoiForThietBi);

// ==================== NỘI DUNG GÓI ROUTES ====================
// Thêm nội dung cho gói
router.post('/goi/:goiId/noi-dung', GoiController.addNoiDungToGoi);

// Cập nhật nội dung gói
router.put('/noi-dung/:noiDungId', GoiController.updateNoiDungGoi);

// Xóa nội dung gói
router.delete('/noi-dung/:noiDungId', GoiController.deleteNoiDungGoi);

// ==================== HEALTH CHECK ====================
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API KidsLock đang hoạt động bình thường',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
