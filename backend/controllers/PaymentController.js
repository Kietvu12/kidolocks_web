const crypto = require('crypto');
const moment = require('moment');
const { GoiDichVu, ThongTinGoi, PhuHuynh } = require('../models');

// ================== CONFIG VNPAY ==================
const vnp_TmnCode = process.env.VNP_TMN_CODE || "DHXDTEST";
const vnp_HashSecret = process.env.VNP_HASH_SECRET || "00N0EYXHIRGRWYSVYU2J5YJQFKINETWE";
const vnp_Url = process.env.VNP_URL || "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
const vnp_ReturnUrl = process.env.VNP_RETURN_URL || "https://kidolock.com/api_kidolocks/api/payment/vnpay-return";

// Debug environment variables
console.log('=== ENVIRONMENT VARIABLES DEBUG ===');
console.log('process.env.FRONTEND_URL:', process.env.FRONTEND_URL);
console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
console.log('vnp_ReturnUrl:', vnp_ReturnUrl);
console.log('=== END ENV DEBUG ===');

// Helper: lấy IP client
function getClientIp(req) {
  let ip =
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    req.ip ||
    "127.0.0.1";
  if (!ip) ip = "127.0.0.1";
  if (ip.startsWith("::ffff:")) ip = ip.replace("::ffff:", "");
  if (ip === "::1") ip = "127.0.0.1";
  if (ip.includes("%")) ip = ip.split("%")[0];
  return ip;
}

// Sort object keys
function sortObject(obj) {
  const sorted = {};
  Object.keys(obj)
    .sort()
    .forEach((k) => {
      sorted[k] = obj[k];
    });
  return sorted;
}

// Encode theo chuẩn VNPAY (dùng + thay vì %20)
function encodeVnpay(value) {
  return encodeURIComponent(value).replace(/%20/g, "+");
}

// Build signData và URL
function buildVnpUrl(params) {
  params = sortObject(params);

  const encoded = {};
  const parts = [];
  Object.keys(params).forEach((k) => {
    if (!params[k]) return;
    const v = String(params[k]);
    const ev = encodeVnpay(v);
    encoded[k] = ev;
    parts.push(`${k}=${ev}`);
  });

  const signData = parts.join("&");

  const hmac = crypto.createHmac("sha512", vnp_HashSecret);
  const signature = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  encoded["vnp_SecureHash"] = signature;
  encoded["vnp_SecureHashType"] = "SHA512";

  const qs = Object.keys(encoded)
    .map((k) => `${k}=${encoded[k]}`)
    .join("&");

  return { url: `${vnp_Url}?${qs}`, signData, signature };
}

class PaymentController {
  // Tạo thanh toán VNPay
  static async createPayment(req, res) {
    try {
      const { phu_huynh_id, thong_tin_goi_id } = req.body;

      // Validate input
      if (!phu_huynh_id || !thong_tin_goi_id) {
        return res.status(400).json({
          success: false,
          message: 'Thiếu thông tin phụ huynh hoặc gói dịch vụ'
        });
      }

      // Kiểm tra phụ huynh tồn tại
      const phuHuynh = await PhuHuynh.findByPk(phu_huynh_id);
      if (!phuHuynh) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy phụ huynh'
        });
      }

      // Kiểm tra gói dịch vụ tồn tại
      const thongTinGoi = await ThongTinGoi.findByPk(thong_tin_goi_id);
      if (!thongTinGoi) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy gói dịch vụ'
        });
      }

      // Tạo mã giao dịch duy nhất
      const now = new Date();
      const orderId = `KIDLOCK_${moment(now).format('YYYYMMDDHHmmss')}_${phu_huynh_id}`;
      const amount = parseInt(thongTinGoi.gia);

      // Tạo record gói dịch vụ với trạng thái chưa thanh toán
      const goiDichVu = await GoiDichVu.create({
        phu_huynh_id: phu_huynh_id,
        thong_tin_goi_id: thong_tin_goi_id,
        gia: amount,
        trang_thai: 'CHUA_THANH_TOAN',
        phuong_thuc_thanh_toan: 'VNPAY',
        vnp_txn_ref: orderId,
        vnp_order_info: `Thanh toan goi ${thongTinGoi.ten} - ${phuHuynh.ten_phu_huynh}`,
        ngay_mua: now
      });

      // Tạo URL thanh toán VNPay
      const ipAddr = getClientIp(req);
      const createDate = moment(now).format("YYYYMMDDHHmmss");

      let vnp_Params = {
        vnp_Version: "2.1.0",
        vnp_Command: "pay",
        vnp_TmnCode: vnp_TmnCode,
        vnp_Locale: "vn",
        vnp_CurrCode: "VND",
        vnp_TxnRef: orderId,
        vnp_OrderInfo: `Thanh toan goi ${thongTinGoi.ten}`,
        vnp_OrderType: "other",
        vnp_Amount: String(amount * 100), // nhân 100
        vnp_ReturnUrl: vnp_ReturnUrl,
        vnp_IpAddr: ipAddr,
        vnp_CreateDate: createDate,
      };

      const { url, signData, signature } = buildVnpUrl(vnp_Params);

      console.log("=== DEBUG SIGN DATA ===");
      console.log(signData);
      console.log("=== DEBUG SIGNATURE ===");
      console.log(signature);
      console.log("=== PAYMENT URL ===");
      console.log(url);
      console.log("=== VNP RETURN URL IN PAYMENT ===");
      console.log("vnp_ReturnUrl used:", vnp_ReturnUrl);

      res.json({
        success: true,
        message: 'Tạo thanh toán thành công',
        data: {
          payment_url: url,
          order_id: orderId,
          amount: amount,
          package_name: thongTinGoi.ten,
          goi_dich_vu_id: goiDichVu.id
        }
      });

    } catch (error) {
      console.error('Error creating payment:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi tạo thanh toán',
        error: error.message
      });
    }
  }

  // Xử lý callback từ VNPay
  static async handleVnpayReturn(req, res) {
    console.log('=== VNPAY CALLBACK RECEIVED ===');
    console.log('Request URL:', req.url);
    console.log('Request Query:', req.query);
    console.log('Request Headers:', req.headers);
    console.log('=== END CALLBACK INFO ===');
    
    try {
      const query = { ...req.query };
      const secureHash = query.vnp_SecureHash;
      delete query.vnp_SecureHash;
      delete query.vnp_SecureHashType;

      const sorted = sortObject(query);
      const parts = [];
      Object.keys(sorted).forEach((k) => {
        if (!sorted[k]) return;
        parts.push(`${k}=${encodeVnpay(String(sorted[k]))}`);
      });
      const signData = parts.join("&");

      const hmac = crypto.createHmac("sha512", vnp_HashSecret);
      const computed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

      console.log("=== RETURN SIGN DATA ===");
      console.log(signData);
      console.log("=== RETURN COMPUTED HASH ===");
      console.log(computed);
      console.log("=== RETURN RECEIVED HASH ===");
      console.log(secureHash);

      if (!secureHash) {
        return res.status(400).json({
          success: false,
          message: 'Không có vnp_SecureHash trong query'
        });
      }

      // Verify signature
      if (computed !== secureHash.toLowerCase()) {
        return res.status(400).json({
          success: false,
          message: 'Sai chữ ký xác thực'
        });
      }

      const vnp_ResponseCode = query.vnp_ResponseCode;
      const vnp_TxnRef = query.vnp_TxnRef;
      const vnp_TransactionStatus = query.vnp_TransactionStatus;

      // Tìm gói dịch vụ theo mã giao dịch
      const g = await GoiDichVu.findOne({
        where: { vnp_txn_ref: vnp_TxnRef },
        include: [
          { model: ThongTinGoi, as: 'thongTinGoi' },
          { model: PhuHuynh, as: 'phuHuynh' }
        ]
      });

      if (!goiDichVu) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy giao dịch'
        });
      }

      // Cập nhật trạng thái giao dịch
      await goiDichVu.update({
        vnp_response_code: vnp_ResponseCode,
        vnp_transaction_status: vnp_TransactionStatus,
        ma_giao_dich: query.vnp_TransactionNo || vnp_TxnRef
      });

      // Xử lý kết quả thanh toán
      if (vnp_ResponseCode === '00') {
        // Thanh toán thành công
        await goiDichVu.update({
          trang_thai: 'CHUA_GAN_THIET_BI'
        });

        // Redirect về frontend với thông tin thành công
        const frontendUrl = process.env.FRONTEND_URL || 'https://kidolock.com';
        const redirectUrl = `${frontendUrl}/payment/callback?vnp_ResponseCode=${vnp_ResponseCode}&vnp_TxnRef=${vnp_TxnRef}&vnp_Amount=${query.vnp_Amount}&vnp_TransactionStatus=${vnp_TransactionStatus}`;
        
        console.log('=== PAYMENT SUCCESS REDIRECT DEBUG ===');
        console.log('frontendUrl:', frontendUrl);
        console.log('redirectUrl:', redirectUrl);
        console.log('=== END DEBUG ===');
        
        res.redirect(redirectUrl);
      } else {
        // Thanh toán thất bại
        await goiDichVu.update({
          trang_thai: 'HUY'
        });

        // Redirect về frontend với thông tin thất bại
        const frontendUrl = process.env.FRONTEND_URL || 'https://kidolock.com';
        const redirectUrl = `${frontendUrl}/payment/callback?vnp_ResponseCode=${vnp_ResponseCode}&vnp_TxnRef=${vnp_TxnRef}&vnp_Amount=${query.vnp_Amount}&vnp_TransactionStatus=${vnp_TransactionStatus}`;
        
        res.redirect(redirectUrl);
      }

    } catch (error) {
      console.error('Error handling VNPay return:', error);
      
      // Redirect về frontend với thông tin lỗi
      const frontendUrl = process.env.FRONTEND_URL || 'https://kidolock.com';
      const redirectUrl = `${frontendUrl}/payment/callback?error=server_error`;
      
      res.redirect(redirectUrl);
    }
  }

  // Lấy danh sách gói đã mua của phụ huynh
  static async getPurchasedPackages(req, res) {
    try {
      const { phu_huynh_id } = req.params;

      const packages = await GoiDichVu.findAll({
        where: { phu_huynh_id: phu_huynh_id },
        include: [
          { model: ThongTinGoi, as: 'thongTinGoi' },
          { model: PhuHuynh, as: 'phuHuynh' }
        ],
        order: [['ngay_mua', 'DESC']]
      });

      res.json({
        success: true,
        data: packages
      });

    } catch (error) {
      console.error('Error getting purchased packages:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy danh sách gói',
        error: error.message
      });
    }
  }

  // Gán gói cho thiết bị
  static async assignPackageToDevice(req, res) {
    try {
      const { goi_dich_vu_id, ma_thiet_bi } = req.body;

      // Validate input
      if (!goi_dich_vu_id || !ma_thiet_bi) {
        return res.status(400).json({
          success: false,
          message: 'Thiếu thông tin gói dịch vụ hoặc mã thiết bị'
        });
      }

      // Tìm gói dịch vụ
      const goiDichVu = await GoiDichVu.findByPk(goi_dich_vu_id, {
        include: [{ model: ThongTinGoi, as: 'thongTinGoi' }]
      });

      if (!goiDichVu) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy gói dịch vụ'
        });
      }

      // Kiểm tra trạng thái gói
      if (goiDichVu.trang_thai !== 'CHUA_GAN_THIET_BI') {
        return res.status(400).json({
          success: false,
          message: 'Gói này không thể gán cho thiết bị'
        });
      }

      // Tìm người dùng theo mã thiết bị
      const { NguoiDung } = require('../models');
      const nguoiDung = await NguoiDung.findOne({
        where: { ma_thiet_bi: ma_thiet_bi }
      });

      if (!nguoiDung) {
        return res.status(404).json({
          success: false,
          message: 'Không tìm thấy thiết bị'
        });
      }

      // Tính ngày kết thúc
      const ngayBatDau = new Date();
      const ngayKetThuc = new Date();
      ngayKetThuc.setMonth(ngayKetThuc.getMonth() + goiDichVu.thongTinGoi.thoi_han_thang);

      // Cập nhật gói dịch vụ
      await goiDichVu.update({
        ma_thiet_bi: ma_thiet_bi,
        nguoi_dung_id: nguoiDung.nguoi_dung_id,
        ngay_bat_dau: ngayBatDau,
        ngay_ket_thuc: ngayKetThuc,
        trang_thai: 'DANG_HOAT_DONG'
      });

      res.json({
        success: true,
        message: 'Gán gói cho thiết bị thành công',
        data: {
          goi_dich_vu_id: goiDichVu.id,
          ma_thiet_bi: ma_thiet_bi,
          ngay_bat_dau: ngayBatDau,
          ngay_ket_thuc: ngayKetThuc,
          trang_thai: 'DANG_HOAT_DONG'
        }
      });

    } catch (error) {
      console.error('Error assigning package to device:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi gán gói cho thiết bị',
        error: error.message
      });
    }
  }

  // Lấy danh sách gói chưa gán thiết bị
  static async getUnassignedPackages(req, res) {
    try {
      const { phu_huynh_id } = req.params;

      const packages = await GoiDichVu.findAll({
        where: { 
          phu_huynh_id: phu_huynh_id,
          trang_thai: 'CHUA_GAN_THIET_BI'
        },
        include: [
          { model: ThongTinGoi, as: 'thongTinGoi' },
          { model: PhuHuynh, as: 'phuHuynh' }
        ],
        order: [['ngay_mua', 'DESC']]
      });

      res.json({
        success: true,
        data: packages
      });

    } catch (error) {
      console.error('Error getting unassigned packages:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi server khi lấy danh sách gói chưa gán',
        error: error.message
      });
    }
  }
}

module.exports = PaymentController;
